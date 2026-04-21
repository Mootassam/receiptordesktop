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
const product_1 = __importDefault(require("../models/product"));
const recordRepository_1 = __importDefault(require("./recordRepository"));
const axios_1 = __importDefault(require("axios"));
class ProductRepository {
    static create(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            const [record] = yield (0, product_1.default)(options.database).create([
                Object.assign(Object.assign({}, data), { tenant: currentTenant.id, createdBy: currentUser.id, updatedBy: currentUser.id }),
            ], options);
            yield this._createAuditLog(auditLogRepository_1.default.CREATE, record.id, data, options);
            return this.findById(record.id, options);
        });
    }
    static update(id, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let record = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, product_1.default)(options.database).findById(id), options);
            if (!record || String(record.tenant) !== String(currentTenant.id)) {
                throw new Error404_1.default();
            }
            yield (0, product_1.default)(options.database).updateOne({ _id: id }, Object.assign(Object.assign({}, data), { updatedBy: mongooseRepository_1.default.getCurrentUser(options).id }), options);
            yield this._createAuditLog(auditLogRepository_1.default.UPDATE, id, data, options);
            record = yield this.findById(id, options);
            return record;
        });
    }
    static destroy(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let record = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, product_1.default)(options.database).findById(id), options);
            if (!record || String(record.tenant) !== String(currentTenant.id)) {
                throw new Error404_1.default();
            }
            yield (0, product_1.default)(options.database).deleteOne({ _id: id }, options);
            yield this._createAuditLog(auditLogRepository_1.default.DELETE, id, record, options);
        });
    }
    static count(filter, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            return mongooseRepository_1.default.wrapWithSessionIfExists((0, product_1.default)(options.database).countDocuments(Object.assign(Object.assign({}, filter), { tenant: currentTenant.id })), options);
        });
    }
    static findById(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.get(`/coin/${id}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`);
            let rows = response.data.data.coin;
            return rows;
        });
    }
    static findByCoin(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.get(`/search-suggestions?query=${id}&referenceCurrencyUuid=yhjMzLPhuIDl`);
            let rows = response.data.data.coins;
            return rows;
        });
    }
    static findAndCountAll(_a, options_1) {
        return __awaiter(this, arguments, void 0, function* ({ filter, limit = 50, offset = 0 }, // Default limit of 50 items
        options) {
            const response = yield this.apiClient.get(`/coins?offset=${offset}&orderBy=marketCap&limit=${limit}&orderDirection=desc&referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&search=`);
            let rows = response.data.data.coins;
            return rows;
        });
    }
    static findTopCoins(_a, options_1) {
        return __awaiter(this, arguments, void 0, function* ({ filter, limit = 6, offset = 0 }, // Default limit of 50 items
        options) {
            const response = yield this.apiClient.get(`/coins?offset=${offset}&orderBy=marketCap&limit=${limit}&orderDirection=desc&referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&search=`);
            let rows = response.data.data.coins;
            return rows;
        });
    }
    static FindNews(id, page, size, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            if (parseInt(id) === 0) {
                data = {
                    language: "en",
                    mode: "LATEST",
                    newsTypes: ["NEWS", "ALEXANDRIA"],
                    page: page,
                    size: size,
                };
            }
            else {
                data = {
                    coins: [id],
                    language: "en",
                    mode: "LATEST",
                    newsTypes: ["NEWS", "ALEXANDRIA"],
                    page: page,
                    size: size,
                };
            }
            const response = yield axios_1.default.post(`https://api.coinmarketcap.com/aggr/v4/content/user`, data);
            let rows = response.data;
            return rows;
        });
    }
    // News Details
    static NewsDetail(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            const response = yield axios_1.default.get(`https://coinmarketcap.com/academy/_next/data/nD9fmJNJDqGlUB4iXiXJq/en/article/${id}.json?slug=${id}`, data);
            let rows = response.data;
            return rows;
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
            const records = yield (0, product_1.default)(options.database)
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
            //     entityName: Product(options.database).modelName,
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
    static grapOrders(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            const currentVip = mongooseRepository_1.default.getCurrentUser(options).vip.id;
            const Orderdone = (yield recordRepository_1.default.CountOrder(options)).record;
            const mergeDataPosition = currentUser.itemNumber;
            if (currentUser &&
                currentUser.product &&
                currentUser.product.id &&
                Orderdone === mergeDataPosition) {
                let prodcut = currentUser.product;
                prodcut.photo = yield fileRepository_1.default.fillDownloadUrl(prodcut === null || prodcut === void 0 ? void 0 : prodcut.photo);
                return prodcut;
            }
            else {
                let record = yield (0, product_1.default)(options.database)
                    .find({ vip: currentVip, combo: false })
                    .populate("vip");
                const random = Math.floor(Math.random() * record.length);
                record = yield Promise.all(record.map(this._fillFileDownloadUrls));
                return record[random];
            }
        });
    }
}
ProductRepository.apiClient = axios_1.default.create({
    baseURL: "https://api.coinranking.com/v2/", // Base URL for all requests
    headers: {
        "x-access-token": "coinranking0019013025c860964f4f33e1621dd13b42aae05e00f7dc9b", // Add your access token here
    },
});
exports.default = ProductRepository;
//# sourceMappingURL=productRepository.js.map