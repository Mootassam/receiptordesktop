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
const mongooseRepository_1 = __importDefault(require("./mongooseRepository"));
const mongooseQueryUtils_1 = __importDefault(require("../utils/mongooseQueryUtils"));
const auditLogRepository_1 = __importDefault(require("./auditLogRepository"));
const Error404_1 = __importDefault(require("../../errors/Error404"));
const fileRepository_1 = __importDefault(require("./fileRepository"));
const futures_1 = __importDefault(require("../models/futures"));
const wallet_1 = __importDefault(require("../models/wallet"));
// 1. CORRECT THE IMPORT: Import the Queue, not the Worker
const notificationServices_1 = require("../../services/notificationServices");
const transaction_1 = __importDefault(require("../models/transaction"));
const Error400_1 = __importDefault(require("../../errors/Error400"));
class FuturesRepository {
    // inside FuturesRepository class:
    static create(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            // Validate futures amount - updated to 30
            if (!data.futuresAmount || data.futuresAmount <= 200) {
                throw new Error400_1.default(options.language, "errors.amountConditions");
            }
            // Get user's USDT wallet and check balance
            const walletModel = (0, wallet_1.default)(options.database);
            const transactionModel = (0, transaction_1.default)(options.database);
            const usdtWallet = yield walletModel.findOne({
                user: currentUser.id,
                symbol: "USDT",
                tenant: currentTenant.id,
                accountType: 'trade'
            });
            if (!usdtWallet) {
                throw new Error400_1.default(options.database, 'errors.usdtWalletNotFound');
            }
            if (usdtWallet.amount < data.futuresAmount) {
                throw new Error400_1.default(options.database, 'errors.insufficientusdtWallet');
            }
            if (usdtWallet.status !== 'active') {
                throw new Error400_1.default(options.database, 'errors.usdtWalletorfrozen');
            }
            try {
                // 1. Deduct the futures amount from USDT wallet
                const updatedWallet = yield walletModel.findOneAndUpdate({
                    _id: usdtWallet._id,
                    tenant: currentTenant.id,
                    amount: { $gte: data.futuresAmount },
                    accountType: 'trade'
                }, {
                    $inc: { amount: -data.futuresAmount },
                    $set: { updatedBy: currentUser.id, updatedAt: new Date() },
                }, { new: true });
                if (!updatedWallet) {
                    throw new Error400_1.default(options.database, 'errors.insufficientusdtWallet');
                }
                const openPositionTime = data.openPositionTime
                    ? new Date(data.openPositionTime)
                    : new Date();
                const durationMs = yield this.parseDurationToMs(data.contractDuration || "60s");
                const expiryTime = new Date(openPositionTime.getTime() + durationMs);
                const payload = Object.assign(Object.assign({}, data), { openPositionTime,
                    expiryTime, finalized: false, finalizedAt: null, tenant: currentTenant.id, createdBy: currentUser.id, updatedBy: currentUser.id });
                // 2. Create the futures trade
                const [record] = yield (0, futures_1.default)(options.database).create([payload], options);
                // 3. Create transaction record for the deduction
                yield transactionModel.create({
                    type: "futures_reserved",
                    referenceId: record._id,
                    wallet: usdtWallet._id,
                    asset: "USDT",
                    amount: data.futuresAmount,
                    status: "completed",
                    direction: "out",
                    user: currentUser.id,
                    tenant: currentTenant.id,
                    createdBy: currentUser.id,
                    updatedBy: currentUser.id,
                    dateTransaction: new Date(),
                    description: `Futures trade reserved: ${data.futuresAmount} USDT for ${data.futuresStatus} position`
                });
                yield (0, notificationServices_1.sendNotification)({
                    userId: currentUser.id,
                    message: `Futures trade created: ${data.futuresAmount} USDT`,
                    type: "futures",
                    forAdmin: true,
                    options,
                });
                yield this._createAuditLog(auditLogRepository_1.default.CREATE, record.id, payload, options);
                return this.findById(record.id, options);
            }
            catch (error) {
                console.error('Futures creation failed:', error);
                throw error;
            }
        });
    }
    static update(id, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            const FuturesModel = (0, futures_1.default)(options.database);
            const walletModel = (0, wallet_1.default)(options.database);
            const transactionModel = (0, transaction_1.default)(options.database);
            // Load record
            let record = yield FuturesModel.findById(id);
            if (!record || String(record.tenant) !== String(currentTenant.id)) {
                throw new Error404_1.default();
            }
            if (record.finalized) {
                throw new Error400_1.default(options.language, "futures.alreadyFinalized");
            }
            const isControlUpdate = data.control === "loss" || data.control === "profit";
            // Your profit calculation formula with null checks
            const calculateProfit = (amount, leverage, duration) => {
                if (!amount || !leverage || !duration)
                    return 0;
                const data = [
                    { duration: "30", payout: "20" },
                    { duration: "60", payout: "30" },
                    { duration: "120", payout: "50" },
                    { duration: "86400", payout: "60" },
                    { duration: "172800", payout: "70" },
                    { duration: "259200", payout: "80" },
                    { duration: "604800", payout: "90" },
                    { duration: "1296000", payout: "100" },
                ];
                const leverageNum = parseFloat((leverage === null || leverage === void 0 ? void 0 : leverage.toString()) || "0");
                const durationNum = parseInt((duration === null || duration === void 0 ? void 0 : duration.toString()) || "0", 10);
                const amountNum = Number(amount) || 0;
                // Find the matching payout for the given duration
                const durationData = data.find((d) => parseInt(d.duration, 10) === durationNum);
                // If no match, return 0
                if (!durationData)
                    return 0;
                const payoutNum = parseFloat(durationData.payout);
                // Calculate profit
                const profit = (amountNum * leverageNum * payoutNum) / 100;
                return profit;
            };
            // NEW: Calculate closing price based on your data pattern
            // UPDATED: Calculate closing price based on your new requirements
            const calculateClosingPrice = (openPrice, direction, // "long" or "short"
            control, // "profit" or "loss"
            assetType // "BTC/USDT", "ETH/USDT", etc.
            ) => {
                const basePrice = openPrice;
                // Generate random percentage between 0.002% and 0.005%
                const randomPercentage = 0.002 + Math.random() * (0.005 - 0.002); // 0.002% to 0.005%
                const change = basePrice * (randomPercentage / 100); // convert percent to decimal
                if (control === "profit") {
                    if (direction === "long") {
                        // Long + profit → price increases
                        return basePrice + change;
                    }
                    else {
                        // Short + profit → price decreases
                        return basePrice - change;
                    }
                }
                else {
                    if (direction === "long") {
                        // Long + loss → price decreases
                        return basePrice - change;
                    }
                    else {
                        // Short + loss → price increases
                        return basePrice + change;
                    }
                }
            };
            try {
                if (isControlUpdate) {
                    const selectedWallet = yield walletModel.findOne({
                        user: record.createdBy,
                        symbol: "USDT",
                        tenant: currentTenant.id,
                        accountType: 'trade'
                    });
                    if (!selectedWallet) {
                        throw new Error400_1.default(options.language, "errors.usdtWalletNotFoundForUser", {
                            userId: record.createdBy
                        });
                    }
                    // CALCULATE PROFIT USING YOUR FORMULA WITH SAFE ACCESS
                    const profitAmount = calculateProfit(record.futuresAmount, record.leverage, record.contractDuration);
                    const lossAmount = record.futuresAmount;
                    // VALIDATE AND USE MANUAL CLOSING PRICE (MAX $100)
                    let closePrice = data.closePositionPrice; // Use provided closing price
                    // Validate closing price doesn't exceed $100
                    if (closePrice && closePrice > 100) {
                        throw new Error400_1.default(options.language, "errors.closingPriceExceedLimit");
                    }
                    // If no manual closing price provided, calculate it USING NEW FORMULA
                    if (!closePrice) {
                        closePrice = calculateClosingPrice(record.openPositionPrice, record.futuresStatus, // "long" or "short"
                        data.control, // "profit" or "loss"
                        record.futuresPair // "BTC/USDT", "ETH/USDT", etc.
                        );
                    }
                    // USE MANUAL CLOSE TIME OR CURRENT TIME
                    const closeTime = data.closePositionTime || new Date();
                    // USE MANUAL PROFIT/LOSS AMOUNT OR CALCULATE IT
                    let finalProfitLossAmount;
                    if (data.profitAndLossAmount !== undefined) {
                        finalProfitLossAmount = data.profitAndLossAmount;
                    }
                    else {
                        // Use your profit formula for profit, keep existing logic for loss
                        finalProfitLossAmount = data.control === "profit" ? profitAmount : -lossAmount;
                    }
                    // Handle wallet updates based on profit/loss
                    if (data.control === "profit") {
                        console.log("🚀 ~ FuturesRepository ~ update ~ profitAmount:", profitAmount);
                        if (!(profitAmount > 0)) {
                            throw new Error400_1.default(options.language, "errors.profitAmountInvalid");
                        }
                        // Add profit to wallet (original amount + profit)
                        yield walletModel.findOneAndUpdate({ _id: selectedWallet._id, tenant: currentTenant.id, accountType: 'trade' }, {
                            $inc: { amount: profitAmount + record.futuresAmount },
                            $set: { updatedBy: currentUser.id, updatedAt: new Date() },
                        }, { new: true });
                        // Create profit transaction
                        yield transactionModel.create({
                            type: "futures_profit",
                            referenceId: record._id,
                            wallet: selectedWallet._id,
                            asset: "USDT",
                            amount: profitAmount + record.futuresAmount,
                            status: "completed",
                            direction: "in",
                            user: record.createdBy,
                            tenant: currentTenant.id,
                            createdBy: currentUser.id,
                            updatedBy: currentUser.id,
                            dateTransaction: new Date(),
                            description: `Futures profit: ${profitAmount} USDT profit + ${record.futuresAmount} USDT returned`
                        });
                    }
                    else {
                        // For loss - amount was already deducted during creation
                        // Just record the loss transaction (no wallet update needed)
                        const lossAmount = record.futuresAmount;
                        if (!(lossAmount > 0)) {
                            throw new Error400_1.default(options.language, "errors.lossAmountInvalid");
                        }
                        // Create loss transaction (amount already deducted during trade creation)
                        yield transactionModel.create({
                            type: "futures_loss",
                            referenceId: record._id,
                            wallet: selectedWallet._id,
                            asset: "USDT",
                            amount: lossAmount,
                            status: "completed",
                            direction: "out",
                            user: record.createdBy,
                            tenant: currentTenant.id,
                            createdBy: currentUser.id,
                            updatedBy: currentUser.id,
                            dateTransaction: new Date(),
                            description: `Futures loss: ${lossAmount} USDT (Trade amount lost)`
                        });
                    }
                    // Finalize futures record WITH MANUAL VALUES
                    yield FuturesModel.updateOne({ _id: id, tenant: currentTenant.id, finalized: { $ne: true } }, {
                        $set: {
                            control: data.control,
                            finalized: true,
                            finalizedAt: new Date(),
                            updatedBy: currentUser.id,
                            profitAndLossAmount: finalProfitLossAmount,
                            closePositionPrice: closePrice,
                            closePositionTime: closeTime,
                        },
                    });
                }
                else {
                    // Regular update (non-control update) - allow updating closing price and time
                    const updateData = Object.assign(Object.assign({}, data), { updatedBy: currentUser.id });
                    // Validate closing price for regular updates too
                    if (data.closePositionPrice && data.closePositionPrice > 100) {
                        throw new Error400_1.default(options.language, "errors.closingPriceExceedLimit");
                    }
                    yield FuturesModel.updateOne({ _id: id, tenant: currentTenant.id }, updateData);
                }
                yield this._createAuditLog(auditLogRepository_1.default.UPDATE, id, data, options);
                record = yield this.findById(id, options);
                return record;
            }
            catch (err) {
                throw err;
            }
        });
    }
    // Helper method to calculate profit amount
    static calculateProfitAmount(futuresRecord) {
        // Your profit calculation logic here
        // This is a simplified example - adjust based on your business rules
        const baseAmount = futuresRecord.futuresAmount;
        const leverage = futuresRecord.leverage;
        const duration = futuresRecord.contractDuration;
        // Example calculation: profit = baseAmount * leverage * durationMultiplier
        let durationMultiplier = 1;
        // Adjust profit based on contract duration
        switch (futuresRecord.contractDuration) {
            case '60s':
                durationMultiplier = 0.10; // 10%
                break;
            case '120s':
                durationMultiplier = 0.20; // 20%
                break;
            case '180s':
                durationMultiplier = 0.40; // 40%
                break;
            case '240s':
                durationMultiplier = 0.80; // 80%
                break;
            default:
                durationMultiplier = 0.10; // 10% default
        }
        return baseAmount * leverage * durationMultiplier;
    }
    static parseDurationToMs(duration) {
        return __awaiter(this, void 0, void 0, function* () {
            if (duration == null)
                return 0;
            if (typeof duration === "number")
                return duration * 1000; // assume seconds
            if (typeof duration !== "string")
                return 0;
            const trimmed = duration.trim().toLowerCase();
            if (/^\d+$/.test(trimmed)) {
                return parseInt(trimmed, 10) * 1000;
            }
            const m = trimmed.match(/^(\d+)(s|m|h|d)?$/);
            if (!m)
                return 0;
            const v = Number(m[1]);
            const unit = m[2] || "s";
            switch (unit) {
                case "s":
                    return v * 1000;
                case "m":
                    return v * 60 * 1000;
                case "h":
                    return v * 60 * 60 * 1000;
                case "d":
                    return v * 24 * 60 * 60 * 1000;
                default:
                    return v * 1000;
            }
        });
    }
    static destroy(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let record = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, futures_1.default)(options.database).findById(id), options);
            if (!record || String(record.tenant) !== String(currentTenant.id)) {
                throw new Error404_1.default();
            }
            yield (0, futures_1.default)(options.database).deleteOne({ _id: id }, options);
            yield this._createAuditLog(auditLogRepository_1.default.DELETE, id, record, options);
        });
    }
    static count(filter, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            return mongooseRepository_1.default.wrapWithSessionIfExists((0, futures_1.default)(options.database).countDocuments(Object.assign(Object.assign({}, filter), { tenant: currentTenant.id })), options);
        });
    }
    static findById(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let record = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, futures_1.default)(options.database)
                .findById(id)
                .populate("user")
                .populate("createdBy"), options);
            if (!record || String(record.tenant) !== String(currentTenant.id)) {
                throw new Error404_1.default();
            }
            return this._fillFileDownloadUrls(record);
        });
    }
    static findAndCountAll(_a, options_1) {
        return __awaiter(this, arguments, void 0, function* ({ filter, limit = 500, offset = 0, orderBy = "" }, options) {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let criteriaAnd = [];
            criteriaAnd.push({
                tenant: currentTenant.id,
            });
            if (filter) {
                if (filter.id) {
                    criteriaAnd.push({
                        ["_id"]: mongooseQueryUtils_1.default.uuid(filter.id),
                    });
                }
                if (filter.user) {
                    criteriaAnd.push({
                        createdBy: filter.user,
                    });
                }
                if (filter.idnumer) {
                    criteriaAnd.push({
                        idnumer: {
                            $regex: mongooseQueryUtils_1.default.escapeRegExp(filter.idnumer),
                            $options: "i",
                        },
                    });
                }
            }
            const sort = mongooseQueryUtils_1.default.sort(orderBy || "createdAt_DESC");
            const skip = Number(offset || 0) || undefined;
            const limitEscaped = Number(limit || 0) || undefined;
            const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;
            let rows = yield (0, futures_1.default)(options.database)
                .find(criteria)
                .skip(skip)
                .limit(limitEscaped)
                .sort(sort)
                .populate("user")
                .populate("createdBy");
            const count = yield (0, futures_1.default)(options.database).countDocuments(criteria);
            rows = yield Promise.all(rows.map(this._fillFileDownloadUrls));
            return { rows, count };
        });
    }
    static findAndCountAllMobile(_a, options_1) {
        return __awaiter(this, arguments, void 0, function* ({ filter, limit = 500, offset = 0, orderBy = "" }, options) {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            let criteriaAnd = [];
            criteriaAnd.push({
                tenant: currentTenant.id,
            });
            criteriaAnd.push({
                createdBy: currentUser.id,
            });
            if (filter) {
                criteriaAnd.push({
                    finalized: filter,
                });
                if (filter.id) {
                    criteriaAnd.push({
                        ["_id"]: mongooseQueryUtils_1.default.uuid(filter.id),
                    });
                }
                criteriaAnd.push({
                    createdBy: currentUser.id,
                });
                if (filter.idnumer) {
                    criteriaAnd.push({
                        idnumer: {
                            $regex: mongooseQueryUtils_1.default.escapeRegExp(filter.idnumer),
                            $options: "i",
                        },
                    });
                }
            }
            const sort = mongooseQueryUtils_1.default.sort(orderBy || "createdAt_DESC");
            const skip = Number(offset || 0) || undefined;
            const limitEscaped = Number(limit || 0) || undefined;
            const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;
            let rows = yield (0, futures_1.default)(options.database)
                .find(criteria)
                .skip(skip)
                .sort(sort)
                .populate("createdBy");
            const count = yield (0, futures_1.default)(options.database).countDocuments(criteria);
            rows = yield Promise.all(rows.map(this._fillFileDownloadUrls));
            return { rows, count };
        });
    }
    static findAllAutocomplete(search, limit, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let criteriaAnd = [
                {
                    tenant: currentTenant.id,
                },
            ];
            if (search) {
                criteriaAnd.push({
                    $or: [
                        {
                            _id: mongooseQueryUtils_1.default.uuid(search),
                        },
                        {
                            titre: {
                                $regex: mongooseQueryUtils_1.default.escapeRegExp(search),
                                $options: "i",
                            },
                        },
                    ],
                });
            }
            const sort = mongooseQueryUtils_1.default.sort("titre_ASC");
            const limitEscaped = Number(limit || 0) || undefined;
            const criteria = { $and: criteriaAnd };
            const records = yield (0, futures_1.default)(options.database)
                .find(criteria)
                .limit(limitEscaped)
                .sort(sort);
            return records.map((record) => ({
                id: record.id,
                label: record.title,
            }));
        });
    }
    static _createAuditLog(action, id, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            // await AuditLogRepository.log(
            //   {
            //     entityName: Futures(options.database).modelName,
            //     entityId: id,
            //     action,
            //     values: data,
            //   },
            //   options
            // );
        });
    }
    static _fillFileDownloadUrls(record) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!record) {
                return null;
            }
            const output = record.toObject ? record.toObject() : record;
            output.photo = yield fileRepository_1.default.fillDownloadUrl(output.photo);
            return output;
        });
    }
}
exports.default = FuturesRepository;
//# sourceMappingURL=futuresRepository.js.map