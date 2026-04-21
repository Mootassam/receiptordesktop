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
const withdraw_1 = __importDefault(require("../models/withdraw"));
const wallet_1 = __importDefault(require("../models/wallet"));
const transaction_1 = __importDefault(require("../models/transaction"));
const notificationServices_1 = require("../../services/notificationServices");
const Error400_1 = __importDefault(require("../../errors/Error400"));
class WithdrawRepository {
    static create(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            const WalletModel = (0, wallet_1.default)(options.database);
            // Find the user's exchange wallet for the specified currency
            let wallet = yield WalletModel.findOne({
                user: currentUser.id,
                symbol: data.currency,
                accountType: 'exchange'
            });
            if (!wallet) {
                throw new Error400_1.default(options.language, "wallet.errors.notFounds", { currency: data.currency });
            }
            // Comprehensive freeze status check
            if (wallet.status === 'freezed') {
                let errorMessage;
                let errorKey;
                if (wallet.amountFreezed > 0) {
                    // Wallet is frozen and has frozen funds
                    errorKey = "wallet.errors.frozenWithFunds";
                    errorMessage = {
                        currency: data.currency,
                        frozenAmount: wallet.amountFreezed,
                        availableAmount: wallet.amount
                    };
                }
                else {
                    // Wallet is frozen but no frozen funds
                    errorKey = "wallet.errors.frozen";
                    errorMessage = { currency: data.currency };
                }
                throw new Error400_1.default(options.language, errorKey, errorMessage);
            }
            // Check sufficient balance (considering available amount only)
            if (wallet.amount < data.totalAmount) {
                const availableBalance = wallet.amount;
                const frozenBalance = wallet.amountFreezed;
                const totalBalance = availableBalance + frozenBalance;
                if (frozenBalance > 0) {
                    // User has some funds, but they're frozen
                    throw new Error400_1.default(options.language, "wallet.errors.insufficientWithFrozen", {
                        currency: data.currency,
                        requested: data.totalAmount,
                        available: availableBalance,
                        frozen: frozenBalance,
                        total: totalBalance
                    });
                }
                else {
                    // User simply doesn't have enough funds
                    throw new Error400_1.default(options.language, "wallet.errors.insufficientBalance", {
                        currency: data.currency,
                        requested: data.totalAmount,
                        available: availableBalance
                    });
                }
            }
            // Validate withdrawal password
            // const user = await User(options.database).findById(currentUser.id);
            // if (!user || user.withdrawPassword !== data.withdrawPassword) {
            //   throw new Error400(
            //     options.language, 
            //     "auth.errors.invalidWithdrawPassword"
            //   );
            // }
            // Create withdrawal record
            const [record] = yield (0, withdraw_1.default)(options.database).create([
                Object.assign(Object.assign({}, data), { tenant: currentTenant.id, createdBy: currentUser.id, updatedBy: currentUser.id }),
            ], options);
            const TransactionModel = options.database.model("transaction");
            // Reduce balance immediately (hold funds while withdrawal is pending)
            yield WalletModel.updateOne({ _id: wallet.id, accountType: 'exchange' }, {
                $inc: { amount: -data.totalAmount },
                updatedBy: currentUser.id,
            }, options);
            // Create a transaction log
            yield TransactionModel.create({
                type: "withdraw",
                wallet: wallet.id,
                asset: wallet.symbol,
                amount: data.totalAmount,
                referenceId: record.id,
                direction: "out",
                status: "pending",
                user: currentUser.id,
                tenant: currentTenant.id,
                createdBy: currentUser.id,
                updatedBy: currentUser.id,
            });
            // Send notification
            yield (0, notificationServices_1.sendNotification)({
                userId: data.createdBy,
                message: ` ${data.totalAmount}`,
                type: "withdraw",
                forAdmin: true,
                options,
            });
            return wallet;
        });
    }
    static update(id, data, io, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let record = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, withdraw_1.default)(options.database).findById(id), options);
            if (!record || String(record.tenant) !== String(currentTenant.id)) {
                throw new Error404_1.default();
            }
            yield (0, withdraw_1.default)(options.database).updateOne({ _id: id }, Object.assign(Object.assign({}, data), { updatedBy: mongooseRepository_1.default.getCurrentUser(options).id }), options);
            yield this._createAuditLog(auditLogRepository_1.default.UPDATE, id, data, options);
            record = yield this.findById(id, options);
            return record;
        });
    }
    static updateStatus(id, data, io, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            // ✅ Update withdrawal status
            yield (0, withdraw_1.default)(options.database).updateOne({ _id: id }, {
                $set: {
                    status: data.status,
                    acceptime: new Date(),
                    auditor: currentUser.id,
                    updatedBy: currentUser.id,
                },
            }, options);
            // ✅ Sync transaction status
            yield (0, transaction_1.default)(options.database).updateOne({ referenceId: id }, {
                $set: {
                    status: data.status,
                    updatedBy: currentUser.id,
                },
            }, options);
            console.log(data.status);
            if (data.status === "success") {
                yield (0, notificationServices_1.sendNotification)({
                    userId: data.createdBy.id, // the user to notify
                    message: ` ${data.withdrawAmount} ${data.currency.toUpperCase()} `,
                    type: "withdraw", // type of notification
                    options, // your repository options
                });
            }
            // ❌ If rejected → refund user balance
            if (data.status === "canceled") {
                yield (0, notificationServices_1.sendNotification)({
                    userId: data.createdBy.id, // the user to notify
                    message: ` ${data.withdrawAmount} ${data.currency.toUpperCase()} `,
                    type: "cancel_withdraw", // type of notification
                    options, // your repository options
                });
                const withdrawRecord = yield (0, withdraw_1.default)(options.database).findById(id);
                const WalletModel = (0, wallet_1.default)(options.database);
                if (!withdrawRecord) {
                    throw new Error("Withdraw record not found");
                }
                yield WalletModel.updateOne({ user: withdrawRecord.createdBy, symbol: withdrawRecord.currency }, { $inc: { amount: withdrawRecord.totalAmount } }, // refund balance
                options);
            }
        });
    }
    static destroy(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let record = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, withdraw_1.default)(options.database).findById(id), options);
            if (!record || String(record.tenant) !== String(currentTenant.id)) {
                throw new Error404_1.default();
            }
            yield (0, withdraw_1.default)(options.database).deleteOne({ _id: id }, options);
            yield this._createAuditLog(auditLogRepository_1.default.DELETE, id, record, options);
        });
    }
    static count(filter, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            return mongooseRepository_1.default.wrapWithSessionIfExists((0, withdraw_1.default)(options.database).countDocuments(Object.assign(Object.assign({}, filter), { tenant: currentTenant.id })), options);
        });
    }
    static findById(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let record = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, withdraw_1.default)(options.database)
                .findById(id)
                .populate("auditor")
                .populate("createdBy"), options);
            if (!record || String(record.tenant) !== String(currentTenant.id)) {
                throw new Error404_1.default();
            }
            return this._fillFileDownloadUrls(record);
        });
    }
    static findAndCountAll(_a, options_1) {
        return __awaiter(this, arguments, void 0, function* ({ filter, limit = 0, offset = 0, orderBy = "" }, options) {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            console.log("I am here");
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
            let rows = yield (0, withdraw_1.default)(options.database)
                .find(criteria)
                .skip(skip)
                .limit(limitEscaped)
                .sort(sort)
                .populate("auditor")
                .populate("createdBy");
            const count = yield (0, withdraw_1.default)(options.database).countDocuments(criteria);
            rows = yield Promise.all(rows.map(this._fillFileDownloadUrls));
            return { rows, count };
        });
    }
    static findAndCountAllMobile(_a, options_1) {
        return __awaiter(this, arguments, void 0, function* ({ filter, limit = 0, offset = 0, orderBy = "" }, options) {
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
            let rows = yield (0, withdraw_1.default)(options.database)
                .find(criteria)
                .skip(skip)
                .limit(limitEscaped)
                .sort(sort)
                .populate("auditor")
                .populate("createdBy");
            const count = yield (0, withdraw_1.default)(options.database).countDocuments(criteria);
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
            const records = yield (0, withdraw_1.default)(options.database)
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
            //     entityName: Withdraw(options.database).modelName,
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
exports.default = WithdrawRepository;
//# sourceMappingURL=rechargeRepository.js.map