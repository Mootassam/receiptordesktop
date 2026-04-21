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
const records_1 = __importDefault(require("../models/records"));
const Dates_1 = __importDefault(require("../utils/Dates"));
const product_1 = __importDefault(require("../models/product"));
const userRepository_1 = __importDefault(require("./userRepository"));
const user_1 = __importDefault(require("../models/user"));
const Error400_1 = __importDefault(require("../../errors/Error400"));
class RecordRepository {
    static create(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            yield this.checkOrder(data, options);
            const profitAmount = (parseFloat(data.profit) / 100) * parseFloat(data.amount);
            const updatedBalance = parseFloat(currentUser === null || currentUser === void 0 ? void 0 : currentUser.balance) + profitAmount;
            yield (0, user_1.default)(options.database).updateOne({ _id: currentUser.id }, { $set: { balance: updatedBalance } });
            const [record] = yield (0, records_1.default)(options.database).create([
                Object.assign(Object.assign({ commission: profitAmount }, data), { tenant: currentTenant.id, createdBy: currentUser.id, updatedBy: currentUser.id, date: Dates_1.default.getDate(), datecreation: Dates_1.default.getTimeZoneDate() }),
            ], options);
            yield this._createAuditLog(auditLogRepository_1.default.CREATE, record.id, data, options);
            return this.findById(record.id, options);
        });
    }
    static calculeGrap(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find the current product based on the provided data
            const currentProduct = yield (0, product_1.default)(options.database).findOne({
                _id: data.product,
            });
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            const currentUserBalance = (currentUser === null || currentUser === void 0 ? void 0 : currentUser.balance) ? currentUser === null || currentUser === void 0 ? void 0 : currentUser.balance : 0;
            const productBalance = currentProduct.amount;
            const currentCommission = currentProduct.commission; // Corrected typo in 'commission'
            const Orderdone = (yield RecordRepository.CountOrder(options)).record;
            const mergeDataPosition = currentUser.itemNumber;
            let total;
            let frozen;
            if (currentUser && currentUser.product && currentUser.product.id && currentUser.tasksDone === mergeDataPosition) {
                // Subtract total amount including commission from current user's balance
                total =
                    parseFloat(currentUserBalance) -
                        parseFloat(productBalance);
                frozen = parseFloat(currentUserBalance);
            }
            else {
                // Add total amount including commission to current user's balance
                total =
                    parseFloat(currentUserBalance) +
                        this.calculeTotal(productBalance, currentCommission);
                frozen = 0;
            }
            const updatedValues = {
                balance: total,
                freezeblance: frozen,
            };
            // Update user's profile with the new balance and product
            yield userRepository_1.default.updateProfileGrap(currentUser.id, // Use currentUser.id instead of currentUserid
            updatedValues, options);
        });
    }
    // Removed the static keyword to define a regular function
    static calculeTotal(price, commission) {
        const total = (parseFloat(price) * parseFloat(commission)) / 100;
        return total;
    }
    // Prodcut Minus // 
    static calculeTotalMerge(price, commission) {
        const total = (parseFloat(price)) +
            (parseFloat(price) * parseFloat(commission)) / 100;
        return total;
    }
    static CountOrder(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            const currentDate = this.getTimeZoneDate(); // Get current date
            const record = yield (0, records_1.default)(options.database)
                .find({
                user: currentUser.id,
                // Compare dates in the same format
                datecreation: { $in: Dates_1.default.getTimeZoneDate() }, // Convert current date to Date object
            })
                .countDocuments();
            const data = {
                record: record,
            };
            return data;
        });
    }
    static tasksDone(currentUser, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentDate = this.getTimeZoneDate(); // Get current date
            const record = yield (0, records_1.default)(options.database)
                .find({
                user: currentUser,
                // Compare dates in the same format
                datecreation: { $in: Dates_1.default.getTimeZoneDate() }, // Convert current date to Date object
            })
                .countDocuments();
            const data = {
                record: record,
            };
            return data;
        });
    }
    static checkOrder(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            if (currentUser.balance <= 0 || currentUser.balance < data.amount) {
                throw new Error400_1.default(options.language, "errors.insufficientBalanceUpgrade");
            }
            // Additional logic for processing the order can be added here
        });
    }
    static getTimeZoneDate() {
        const estTimezone = "America/New_York";
        // const options = {
        //   timeZone: estTimezone,
        //   month: "2-digit",
        //   day: "2-digit",
        //   year: "numeric",
        //   hour: "2-digit",
        //   minute: "2-digit",
        //   second: "2-digit",
        // };
        const currentDateTime = new Date().toLocaleString("en-US");
        return currentDateTime;
    }
    static update(id, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let record = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, records_1.default)(options.database).findById(id), options);
            if (!record || String(record.tenant) !== String(currentTenant.id)) {
                throw new Error404_1.default();
            }
            yield (0, records_1.default)(options.database).updateOne({ _id: id }, Object.assign(Object.assign({}, data), { updatedBy: mongooseRepository_1.default.getCurrentUser(options).id }), options);
            yield this._createAuditLog(auditLogRepository_1.default.UPDATE, id, data, options);
            record = yield this.findById(id, options);
            return record;
        });
    }
    static destroy(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let record = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, records_1.default)(options.database).findById(id), options);
            if (!record || String(record.tenant) !== String(currentTenant.id)) {
                throw new Error404_1.default();
            }
            yield (0, records_1.default)(options.database).deleteOne({ _id: id }, options);
            yield this._createAuditLog(auditLogRepository_1.default.DELETE, id, record, options);
        });
    }
    static count(filter, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            return mongooseRepository_1.default.wrapWithSessionIfExists((0, records_1.default)(options.database).countDocuments(Object.assign(Object.assign({}, filter), { tenant: currentTenant.id })), options);
        });
    }
    static findById(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let record = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, records_1.default)(options.database)
                .findById(id)
                .populate("user"), options);
            if (!record || String(record.tenant) !== String(currentTenant.id)) {
                throw new Error404_1.default();
            }
            // return this._fillFileDownloadUrls(record);
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
                if (filter.product) {
                    criteriaAnd.push({
                        product: filter.product,
                    });
                }
                if (filter.number) {
                    criteriaAnd.push({
                        number: {
                            $regex: mongooseQueryUtils_1.default.escapeRegExp(filter.number),
                            $options: "i",
                        },
                    });
                }
                if (filter.status) {
                    criteriaAnd.push({
                        status: {
                            $regex: mongooseQueryUtils_1.default.escapeRegExp(filter.status),
                            $options: "i",
                        },
                    });
                }
            }
            const sort = mongooseQueryUtils_1.default.sort(orderBy || "createdAt_DESC");
            const skip = Number(offset || 0) || undefined;
            const limitEscaped = Number(limit || 0) || undefined;
            const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;
            let rows = yield (0, records_1.default)(options.database)
                .find(criteria)
                .skip(skip)
                .limit(limitEscaped)
                .sort(sort)
                .populate("user")
                .populate("product");
            const count = yield (0, records_1.default)(options.database).countDocuments(criteria);
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
                user: currentUser.id,
            });
            if (filter) {
                filter = JSON.parse(filter);
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
                if (filter.product) {
                    criteriaAnd.push({
                        product: filter.product,
                    });
                }
                if (filter.number) {
                    criteriaAnd.push({
                        number: {
                            $regex: mongooseQueryUtils_1.default.escapeRegExp(filter.number),
                            $options: "i",
                        },
                    });
                }
                if (filter.status) {
                    criteriaAnd.push({
                        status: {
                            $regex: mongooseQueryUtils_1.default.escapeRegExp(filter.status),
                            $options: "i",
                        },
                    });
                }
            }
            const sort = mongooseQueryUtils_1.default.sort(orderBy || "createdAt_DESC");
            const skip = Number(offset || 0) || undefined;
            const limitEscaped = Number(limit || 0) || undefined;
            const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;
            let listitems = yield (0, records_1.default)(options.database)
                .find(criteria)
                .skip(skip)
                .sort(sort)
                .populate("user")
                .populate("product");
            let rows = yield (0, records_1.default)(options.database)
                .find(criteria)
                .limit(limitEscaped)
                .sort(sort)
                .populate("user")
                .populate("product");
            const count = yield (0, records_1.default)(options.database).countDocuments(criteria);
            return { rows, count };
        });
    }
    static findAndCountPerDay(_a, options_1) {
        return __awaiter(this, arguments, void 0, function* ({ filter, limit = 0, offset = 0, orderBy = "" }, options) {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            let criteriaAnd = [];
            criteriaAnd.push({
                tenant: currentTenant.id,
                user: currentUser.id,
            });
            criteriaAnd.push({
                status: {
                    $regex: mongooseQueryUtils_1.default.escapeRegExp("completed"),
                    $options: "i",
                },
            });
            const start = new Date();
            start.setHours(0, 0, 0, 0); // Set to the start of the current day
            const end = new Date();
            end.setHours(23, 59, 59, 999); // Set to the end of the current day
            criteriaAnd.push({
                createdAt: {
                    $gte: start,
                    $lte: end,
                },
            });
            const sort = mongooseQueryUtils_1.default.sort(orderBy || "createdAt_DESC");
            const skip = Number(offset || 0) || undefined;
            const limitEscaped = Number(limit || 0) || undefined;
            const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;
            let listitems = yield (0, records_1.default)(options.database)
                .find(criteria)
                .skip(skip)
                .sort(sort)
                .populate("user")
                .populate("product");
            // let rows = await Records(options.database)
            //   .find(criteria)
            //   .limit(limitEscaped)
            //   .sort(sort)
            //   .populate("user")
            //   .populate("product");
            // const count = await Records(options.database).countDocuments(criteria);
            // rows = await Promise.all(rows.map(this._fillFileDownloadUrls));
            let total = 0;
            listitems.map((item) => {
                let data = item.product;
                let itemTotal = (parseFloat(data.commission) * parseFloat(data.amount)) / 100;
                total += itemTotal;
            });
            total = parseFloat(total.toFixed(3));
            return { total };
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
            const records = yield (0, records_1.default)(options.database)
                .find(criteria)
                .limit(limitEscaped)
                .sort(sort);
            return records.map((record) => ({
                id: record.id,
                label: record.titre,
            }));
        });
    }
    static _createAuditLog(action, id, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            // await AuditLogRepository.log(
            //   {
            //     entityName: Records(options.database).modelName,
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
            output.product.photo = yield fileRepository_1.default.fillDownloadUrl(output.product.photo);
            return output;
        });
    }
}
exports.default = RecordRepository;
//# sourceMappingURL=recordRepository.js.map