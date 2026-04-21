"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoFinalizeStackingJob = autoFinalizeStackingJob;
const databaseConnection_1 = require("../databaseConnection");
const stacking_1 = __importDefault(require("../models/stacking"));
const stakeProgram_1 = __importDefault(require("../models/stakeProgram"));
const wallet_1 = __importDefault(require("../models/wallet"));
const transaction_1 = __importDefault(require("../models/transaction"));
const notification_1 = __importDefault(require("../models/notification"));
const user_1 = __importDefault(require("../models/user"));
const axios_1 = __importDefault(require("axios")); // Add axios import for API calls
function autoFinalizeStackingJob(job) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (!(job === null || job === void 0 ? void 0 : job.data)) {
            console.error("autoFinalizeStackingJob: No job data provided");
            return;
        }
        let mongoose;
        try {
            mongoose = yield (0, databaseConnection_1.databaseInit)();
            const { stackingId, tenantId } = job.data;
            if (!stackingId || !tenantId) {
                console.error("autoFinalizeStackingJob: missing stackingId or tenantId");
                return;
            }
            const stackingModel = (0, stacking_1.default)(mongoose);
            const stackingRecord = yield stackingModel
                .findOne({ _id: stackingId, tenant: tenantId })
                .populate("plan")
                .populate("user")
                .lean();
            if (!stackingRecord) {
                console.warn(`Stacking record ${stackingId} not found for tenant ${tenantId}`);
                return;
            }
            if (stackingRecord.status !== "active") {
                console.log(`Stacking ${stackingId} already processed with status: ${stackingRecord.status}`);
                return;
            }
            // Ensure plan data
            let plan = stackingRecord.plan;
            if (!plan || !plan.dailyRate || plan.unstakingPeriod === undefined) {
                const stackingPlanModel = (0, stakeProgram_1.default)(mongoose);
                plan = yield stackingPlanModel.findById(stackingRecord.plan).lean();
                if (!plan) {
                    console.error(`Plan ${stackingRecord.plan} not found for stacking ${stackingId}`);
                    return;
                }
            }
            // Calculate rewards - FIXED CALCULATION
            const amount = Number(stackingRecord.amount);
            const dailyRatePercent = Number(plan.dailyRate || 0);
            const unstakingPeriod = Number(plan.unstakingPeriod || 0);
            // Calculate total rewards for the entire stacking period
            const earnedRewards = Number((amount * (dailyRatePercent / 100) * unstakingPeriod).toFixed(8));
            const totalToCredit = Number((amount + earnedRewards).toFixed(8));
            const currency = plan.currency || "USDT";
            const walletModel = (0, wallet_1.default)(mongoose);
            const txModel = (0, transaction_1.default)(mongoose);
            const notifModel = (0, notification_1.default)(mongoose);
            const userModel = (0, user_1.default)(mongoose);
            // ✅ Update stacking record
            yield stackingModel.updateOne({ _id: stackingId, tenant: tenantId }, {
                $set: {
                    status: "completed",
                    earnedRewards,
                    completedAt: new Date(),
                    updatedBy: null,
                },
            });
            // ✅ Update user's wallet (principal + reward)
            const updatedWallet = yield walletModel.findOneAndUpdate({ user: stackingRecord.user._id, symbol: currency, tenant: tenantId }, {
                $inc: { amount: totalToCredit },
                $set: { updatedBy: null, updatedAt: new Date() }
            }, { new: true, upsert: true, runValidators: true });
            // ✅ Create staking reward transaction
            yield txModel.create({
                type: "staking_reward",
                referenceId: stackingRecord._id,
                wallet: updatedWallet._id,
                asset: currency,
                amount: totalToCredit,
                status: "completed",
                direction: "in",
                user: stackingRecord.user._id,
                tenant: tenantId,
                dateTransaction: new Date(),
                createdBy: null,
                updatedBy: null,
            });
            // ✅ Create staking reward notification
            yield notifModel.create({
                userId: stackingRecord.user._id,
                type: "staking",
                message: `Your stacking of ${amount} ${currency} has been completed. You earned ${earnedRewards} ${currency}.`,
                tenant: tenantId,
                forAdmin: false,
                status: "unread",
                createdBy: null,
                updatedBy: null,
            });
            // ✅ REFERRAL COMMISSION FOR EVERY STACKING (REMOVED FIRST STACKING CONDITION)
            const currentUser = yield userModel.findById(stackingRecord.user._id);
            if (!currentUser) {
                console.warn(`User ${stackingRecord.user._id} not found for referral commission`);
                return;
            }
            // ✅ CURRENCY CONVERSION TO USDT FOR COMMISSION CALCULATION
            let commissionBaseAmount = earnedRewards;
            if (currency !== "USDT") {
                try {
                    const coinMap = {
                        BTC: "bitcoin",
                        ETH: "ethereum",
                        SOL: "solana",
                        XRP: "ripple",
                        USDT: "tether",
                        BNB: "binancecoin",
                        ADA: "cardano",
                        DOGE: "dogecoin",
                        DOT: "polkadot",
                    };
                    const coinId = coinMap[currency.toUpperCase()];
                    if (!coinId) {
                        console.warn(`Unsupported coin for conversion: ${currency}`);
                        // If unsupported coin, skip commission to avoid errors
                        return;
                    }
                    const resp = yield axios_1.default.get("https://api.coingecko.com/api/v3/simple/price", {
                        params: {
                            ids: coinId,
                            vs_currencies: "usd",
                        },
                        timeout: 10000, // 10 second timeout
                    });
                    const price = Number(((_a = resp.data[coinId]) === null || _a === void 0 ? void 0 : _a.usd) || 0);
                    if (!price || price <= 0) {
                        console.warn(`Invalid price for ${currency}: ${price}`);
                        // Skip commission if price is invalid
                        return;
                    }
                    commissionBaseAmount = earnedRewards * price;
                    console.log(`Converted ${earnedRewards} ${currency} to ${commissionBaseAmount} USDT at rate: ${price}`);
                }
                catch (error) {
                    console.error(`Error converting ${currency} to USDT:`, error.message);
                    // Skip commission if conversion fails
                    return;
                }
            }
            // ✅ COMMISSION FOR EVERY STACKING (NOT JUST FIRST)
            const commissionLevels = [10, 7, 4]; // 3 levels: 10%, 7%, 4%
            let refSourceUser = currentUser;
            for (let level = 1; level <= 3; level++) {
                if (!refSourceUser.invitationcode)
                    break;
                const refUser = yield userModel.findOne({
                    refcode: refSourceUser.invitationcode,
                });
                if (!refUser)
                    break;
                const commission = Number((commissionBaseAmount * commissionLevels[level - 1]) / 100);
                // Update referrer wallet in USDT
                const refWallet = yield walletModel.findOneAndUpdate({ user: refUser._id, symbol: "USDT", tenant: tenantId }, { $inc: { amount: commission } }, { new: true, upsert: true, runValidators: true });
                // Create commission transaction
                yield txModel.create({
                    type: "referral_commission",
                    referenceId: stackingRecord._id,
                    wallet: refWallet._id,
                    asset: "USDT",
                    amount: commission,
                    status: "completed",
                    direction: "in",
                    user: refUser._id,
                    tenant: tenantId,
                    dateTransaction: new Date(),
                    createdBy: stackingRecord.user._id,
                    updatedBy: null,
                });
                // Create notification for referrer
                yield notifModel.create({
                    userId: refUser._id,
                    type: "commission",
                    message: `You earned ${commission.toFixed(2)} USDT as level ${level} stacking commission from ${currentUser.email || "a user"}.`,
                    tenant: tenantId,
                    forAdmin: false,
                    status: "unread",
                    createdBy: stackingRecord.user._id,
                    updatedBy: null,
                });
                console.log(`💰 Paid level ${level} commission: ${commission.toFixed(2)} USDT to ${refUser.email || refUser._id}`);
                // Move up the chain
                refSourceUser = refUser;
            }
            console.log(`✅ Auto-finalized stacking ${stackingId}: Credited ${totalToCredit} ${currency}`);
        }
        catch (error) {
            console.error("Error in autoFinalizeStackingJob:", error);
            throw error; // Re-throw to let the job queue handle retries
        }
    });
}
//# sourceMappingURL=autoFinalizeStackingJob.js.map