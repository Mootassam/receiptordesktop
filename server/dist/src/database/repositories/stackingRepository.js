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
const stacking_1 = __importDefault(require("../models/stacking"));
const stakeProgram_1 = __importDefault(require("../models/stakeProgram")); // Import the StackingPlan model
const wallet_1 = __importDefault(require("../models/wallet"));
const scheduleStackingJob_1 = require("../utils/scheduleStackingJob");
const Error400_1 = __importDefault(require("../../errors/Error400"));
class StackingRepository {
    static create(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            // Fetch the stacking plan
            const plan = yield (0, stakeProgram_1.default)(options.database).findById(data.plan);
            if (!plan)
                throw new Error404_1.default();
            // Validation: Check amount
            if (data.amount < plan.minimumStake)
                throw new Error(`Amount must be at least ${plan.minimumStake} ${plan.currency}`);
            if (data.amount > plan.maxStake)
                throw new Error(`Amount cannot exceed ${plan.maxStake} ${plan.currency}`);
            // Check user's wallet balance
            const WalletModel = (0, wallet_1.default)(options.database);
            const wallet = yield WalletModel.findOne({ user: currentUser.id, symbol: plan.currency });
            if (!wallet)
                throw new Error400_1.default(options.language, "errors.walletNotFoundForCurrency", {
                    currency: plan.currency
                });
            if (wallet.amount < data.amount)
                throw new Error400_1.default(options.language, "errors.insufficientBalanceWithAmounts", {
                    currentAmount: wallet.amount,
                    currency: plan.currency,
                    tryingAmount: data.amount
                });
            // Check if user already has active stake for this plan
            const existingStake = yield (0, stacking_1.default)(options.database).findOne({ user: currentUser.id, plan: data.plan, status: "active" });
            // Check if plan is available
            const now = new Date();
            if (plan.startDate && now < plan.startDate)
                throw new Error400_1.default(options.language, "errors.stakingPlanNotAvailable");
            if (plan.endDate && now > plan.endDate)
                throw new Error400_1.default(options.language, "errors.stakingPlanExpired");
            // Calculate end date
            const endDate = new Date(data.startDate);
            endDate.setDate(endDate.getDate() + plan.unstakingPeriod);
            // Create the staking record
            const [record] = yield (0, stacking_1.default)(options.database).create([
                Object.assign(Object.assign({}, data), { endDate, tenant: currentTenant.id, createdBy: currentUser.id, updatedBy: currentUser.id }),
            ], options);
            const item = yield this.findById(record.id, options);
            const TransactionModel = options.database.model("transaction");
            // Deduct staked amount from wallet
            yield WalletModel.updateOne({ _id: wallet.id }, { $inc: { amount: -data.amount }, updatedBy: currentUser.id }, options);
            // Create a transaction log
            yield TransactionModel.create({
                type: "stacking",
                wallet: wallet.id,
                asset: wallet.symbol,
                amount: data.amount,
                referenceId: record.id,
                direction: "out",
                status: "completed",
                user: currentUser.id,
                tenant: currentTenant.id,
                createdBy: currentUser.id,
                updatedBy: currentUser.id,
            });
            // === SCHEDULE AUTO-FINALIZATION JOB ===
            try {
                yield (0, scheduleStackingJob_1.scheduleStackingJob)(record, { id: record.tenant });
                console.log(`📅 Scheduled auto-finalize job for stacking ${record.id}`);
            }
            catch (err) {
                console.error(`Failed to schedule staking job for ${record.id}:`, err);
                // optionally: continue without failing creation
            }
            return record;
        });
    }
    static update(id, data, io, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let record = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, stacking_1.default)(options.database).findById(id), options);
            if (!record || String(record.tenant) !== String(currentTenant.id)) {
                throw new Error404_1.default();
            }
            yield (0, stacking_1.default)(options.database).updateOne({ _id: id }, Object.assign(Object.assign({}, data), { updatedBy: mongooseRepository_1.default.getCurrentUser(options).id }), options);
            yield this._createAuditLog(auditLogRepository_1.default.UPDATE, id, data, options);
            record = yield this.findById(id, options);
            return record;
        });
    }
    static destroy(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let record = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, stacking_1.default)(options.database).findById(id), options);
            if (!record || String(record.tenant) !== String(currentTenant.id)) {
                throw new Error404_1.default();
            }
            yield (0, stacking_1.default)(options.database).deleteOne({ _id: id }, options);
            yield this._createAuditLog(auditLogRepository_1.default.DELETE, id, record, options);
        });
    }
    static count(filter, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            return mongooseRepository_1.default.wrapWithSessionIfExists((0, stacking_1.default)(options.database).countDocuments(Object.assign(Object.assign({}, filter), { tenant: currentTenant.id })), options);
        });
    }
    static findById(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let record = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, stacking_1.default)(options.database).findById(id).populate("plan").populate("user"), options);
            if (!record || String(record.tenant) !== String(currentTenant.id)) {
                throw new Error404_1.default();
            }
            // Process rewards and status on-demand when fetching a stacking
            record = yield this._processStacking(record, options);
            return this._fillFileDownloadUrls(record);
        });
    }
    static findAndCountAll(_a, options_1) {
        return __awaiter(this, arguments, void 0, function* ({ filter, limit = 50, offset = 0, orderBy = "" }, options) {
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
                        user: filter.user,
                    });
                }
                if (filter.plan) {
                    criteriaAnd.push({
                        plan: filter.plan,
                    });
                }
                if (filter.status) {
                    criteriaAnd.push({
                        status: filter.status,
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
            let rows = yield (0, stacking_1.default)(options.database)
                .find(criteria)
                .skip(skip)
                .limit(limitEscaped)
                .sort(sort)
                .populate("plan")
                .populate("user");
            const count = yield (0, stacking_1.default)(options.database).countDocuments(criteria);
            // Process rewards and status for all rows
            rows = yield Promise.all(rows.map((row) => this._processStacking(row, options)));
            rows = yield Promise.all(rows.map(this._fillFileDownloadUrls));
            return { rows, count };
        });
    }
    static findAndCountAllMobile(_a, options_1) {
        return __awaiter(this, arguments, void 0, function* ({ filter, limit = 50, offset = 0, orderBy = "" }, options) {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            let criteriaAnd = [];
            criteriaAnd.push({
                tenant: currentTenant.id,
            });
            criteriaAnd.push({
                user: currentUser.id,
            });
            if (filter) {
                if (filter.id) {
                    criteriaAnd.push({
                        ["_id"]: mongooseQueryUtils_1.default.uuid(filter.id),
                    });
                }
                if (filter.user) {
                    criteriaAnd.push({
                        user: filter.user,
                    });
                }
                if (filter.plan) {
                    criteriaAnd.push({
                        plan: filter.plan,
                    });
                }
                if (filter.status) {
                    criteriaAnd.push({
                        status: filter.status,
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
            let rows = yield (0, stacking_1.default)(options.database)
                .find(criteria)
                .skip(skip)
                .limit(limitEscaped)
                .sort(sort)
                .populate("plan")
                .populate("user");
            const count = yield (0, stacking_1.default)(options.database).countDocuments(criteria);
            // Process rewards and status for all rows
            rows = yield Promise.all(rows.map((row) => this._processStacking(row, options)));
            rows = yield Promise.all(rows.map(this._fillFileDownloadUrls));
            return { rows, count };
        });
    }
    // Process stacking rewards and status
    static _processStacking(record, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (record.status !== 'active') {
                return record;
            }
            const now = new Date();
            const endDate = new Date(record.endDate);
            const startDate = new Date(record.startDate);
            let daysElapsed = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
            if (now >= endDate) {
                daysElapsed = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
            }
            const dailyRate = record.plan.dailyRate;
            const earnedRewards = record.amount * (dailyRate / 100) * daysElapsed;
            // ✅ If completed
            if (now >= endDate) {
                console.log("completed");
            }
            // ✅ If still active (update daily rewards but not wallet yet)
            if (earnedRewards !== record.earnedRewards) {
                yield (0, stacking_1.default)(options.database).updateOne({ _id: record._id }, {
                    earnedRewards,
                    updatedBy: mongooseRepository_1.default.getCurrentUser(options).id,
                }, options);
                record.earnedRewards = earnedRewards;
                yield this._createAuditLog(auditLogRepository_1.default.UPDATE, record._id, { earnedRewards }, options);
            }
            return record;
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
            const records = yield (0, stacking_1.default)(options.database)
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
            //     entityName: Stacking(options.database).modelName,
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
exports.default = StackingRepository;
//# sourceMappingURL=stackingRepository.js.map