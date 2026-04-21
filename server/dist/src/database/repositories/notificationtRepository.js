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
const notification_1 = __importDefault(require("../models/notification"));
const transaction_1 = __importDefault(require("../models/transaction"));
const notificationServices_1 = require("../../services/notificationServices");
const notification_2 = __importDefault(require("../models/notification"));
const deposit_1 = __importDefault(require("../models/deposit"));
const withdraw_1 = __importDefault(require("../models/withdraw"));
const kyc_1 = __importDefault(require("../models/kyc"));
const futures_1 = __importDefault(require("../models/futures"));
class NotificationRepository {
    static create(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            const [record] = yield (0, notification_2.default)(options.database).create([
                Object.assign(Object.assign({}, data), { tenant: currentTenant.id, createdBy: currentUser.id, updatedBy: currentUser.id }),
            ], options);
            return record;
        });
    }
    static createNotification(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("🚀 ~ NotificationRepository ~ createNotification ~ data:", data);
            yield (0, notificationServices_1.sendNotification)({
                userId: data.userId,
                message: `${data.message}`,
                type: data.type,
                options,
            });
        });
    }
    static update(id, io, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let record = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, notification_1.default)(options.database).findById(id), options);
            if (!record || String(record.tenant) !== String(currentTenant.id)) {
                throw new Error404_1.default();
            }
            yield (0, notification_1.default)(options.database).updateOne({ _id: id }, {
                auditor: mongooseRepository_1.default.getCurrentUser(options).id,
                updatedBy: mongooseRepository_1.default.getCurrentUser(options).id,
                status: "read",
            }, options);
            // await this._createAuditLog(AuditLogRepository.UPDATE, id, options);
            record = yield this.findById(id, options);
            return record;
        });
    }
    static updateStatus(id, data, io, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            // ✅ Update the Notification status
            yield (0, notification_1.default)(options.database).updateOne({ _id: id }, {
                $set: {
                    status: data.status,
                    acceptime: new Date(), // store current time
                    auditor: currentUser.id,
                    updatedBy: currentUser.id,
                },
            }, options);
            // ✅ Update the related transaction using referenceId + referenceModel
            yield (0, transaction_1.default)(options.database).updateOne({
                referenceId: id,
            }, {
                $set: {
                    status: data.status,
                    updatedBy: currentUser.id,
                },
            }, options);
        });
    }
    static destroy(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let record = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, notification_1.default)(options.database).findById(id), options);
            if (!record || String(record.tenant) !== String(currentTenant.id)) {
                throw new Error404_1.default();
            }
            yield (0, notification_1.default)(options.database).deleteOne({ _id: id }, options);
            yield this._createAuditLog(auditLogRepository_1.default.DELETE, id, record, options);
        });
    }
    static count(filter, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            return mongooseRepository_1.default.wrapWithSessionIfExists((0, notification_1.default)(options.database).countDocuments(Object.assign(Object.assign({}, filter), { tenant: currentTenant.id })), options);
        });
    }
    static unread(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            return mongooseRepository_1.default.wrapWithSessionIfExists((0, notification_1.default)(options.database).countDocuments({
                tenant: currentTenant.id,
                status: "unread",
            }), options);
        });
    }
    static unreadSummary(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            // Build queries for each type
            const depositQuery = (0, deposit_1.default)(options.database).countDocuments({
                tenant: currentTenant.id,
                status: "pending",
            });
            const withdrawQuery = (0, withdraw_1.default)(options.database).countDocuments({
                tenant: currentTenant.id,
                status: "pending",
            });
            const kycQuery = (0, kyc_1.default)(options.database).countDocuments({
                tenant: currentTenant.id,
                status: "pending",
            });
            const futuresQuery = (0, futures_1.default)(options.database).countDocuments({
                tenant: currentTenant.id,
                finalized: false,
            });
            // Run them in parallel for performance
            const [depositCount, withdrawCount, kycCount, futuresCount] = yield Promise.all([
                mongooseRepository_1.default.wrapWithSessionIfExists(depositQuery, options),
                mongooseRepository_1.default.wrapWithSessionIfExists(withdrawQuery, options),
                mongooseRepository_1.default.wrapWithSessionIfExists(kycQuery, options),
                mongooseRepository_1.default.wrapWithSessionIfExists(futuresQuery, options),
            ]);
            // Return result as an object
            return {
                deposit: depositCount,
                withdraw: withdrawCount,
                kyc: kycCount,
                futures: futuresCount,
            };
        });
    }
    static findById(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let record = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, notification_1.default)(options.database).findById(id).populate("userId"), options);
            if (!record || String(record.tenant) !== String(currentTenant.id)) {
                throw new Error404_1.default();
            }
            return this._fillFileDownloadUrls(record);
        });
    }
    static findAndCountAll(_a, options_1) {
        return __awaiter(this, arguments, void 0, function* ({ filter, limit = 0, offset = 0, orderBy = "" }, options) {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            let criteriaAnd = [];
            criteriaAnd.push({
                tenant: currentTenant.id,
            });
            if (filter) {
                criteriaAnd.push({
                    status: filter,
                });
            }
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
                if (filter.user) {
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
            let rows = yield (0, notification_1.default)(options.database)
                .find(criteria)
                .skip(skip)
                .sort(sort)
                .populate("userId");
            const count = yield (0, notification_1.default)(options.database).countDocuments({
                userId: currentUser.id,
                status: "unread",
            });
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
                userId: currentUser.id,
            });
            if (filter) {
                criteriaAnd.push({
                    status: filter,
                });
            }
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
                if (filter.user) {
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
            let rows = yield (0, notification_1.default)(options.database)
                .find(criteria)
                .skip(skip)
                .sort(sort)
                .populate("userId");
            const count = yield (0, notification_1.default)(options.database).countDocuments({
                userId: currentUser.id,
                status: "unread",
            });
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
            const records = yield (0, notification_1.default)(options.database)
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
            //     entityName: Notification(options.database).modelName,
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
exports.default = NotificationRepository;
//# sourceMappingURL=notificationtRepository.js.map