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
const wallet_1 = __importDefault(require("../models/wallet"));
const transaction_1 = __importDefault(require("../models/transaction"));
const notificationServices_1 = require("../../services/notificationServices");
const axios_1 = __importDefault(require("axios"));
const user_1 = __importDefault(require("../models/user"));
const Transfer_1 = __importDefault(require("../models/Transfer"));
const redisConnection_1 = require("../redisConnection");
class WalletRepository {
    static create(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            // 1️⃣ Perform conversion
            const { from: sourceWallet, to: targetWallet } = yield this.convertAsset(data, options);
            const Transaction = options.database.model("transaction");
            // 2️⃣ Log the outgoing conversion (source asset)
            yield Transaction.create({
                type: "convert_out",
                wallet: sourceWallet._id,
                asset: data.fromSymbol,
                relatedAsset: data.toSymbol,
                amount: data.fromAmount,
                direction: "out",
                status: "completed",
                user: data.user,
                tenant: currentTenant.id,
                createdBy: currentUser.id,
                updatedBy: currentUser.id,
            });
            // 3️⃣ Log the incoming conversion (target asset)
            yield Transaction.create({
                type: "convert_in",
                wallet: targetWallet._id,
                asset: data.toSymbol,
                relatedAsset: data.fromSymbol,
                amount: data.toAmount,
                direction: "in",
                status: "completed",
                user: data.user,
                tenant: currentTenant.id,
                createdBy: currentUser.id,
                updatedBy: currentUser.id,
            });
            return {
                sourceWallet,
                targetWallet,
            };
        });
    }
    static convertAsset(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            // Deduct from source wallet
            const sourceWallet = yield (0, wallet_1.default)(options.database).findOneAndUpdate({
                user: data.user,
                symbol: data.fromSymbol,
                amount: { $gte: data.fromAmount }, // ensure enough balance
            }, {
                $inc: { amount: -data.fromAmount },
                $set: { updatedBy: currentUser.id },
            }, { new: true });
            if (!sourceWallet) {
                throw new Error("Insufficient balance in source wallet");
            }
            // Add to target wallet
            const targetWallet = yield (0, wallet_1.default)(options.database).findOneAndUpdate({
                user: data.user,
                symbol: data.toSymbol,
            }, {
                $inc: { amount: data.toAmount },
                $setOnInsert: {
                    coinName: data.toSymbol,
                    status: "available",
                    tenant: currentTenant.id,
                    createdBy: currentUser.id,
                },
            }, {
                upsert: true,
                new: true,
            });
            return {
                from: sourceWallet,
                to: targetWallet,
            };
        });
    }
    //   static async create(data, options: IRepositoryOptions) {
    //   const currentTenant = MongooseRepository.getCurrentTenant(options);
    //   const currentUser = MongooseRepository.getCurrentUser(options);
    //   const [record] = await Wallet(options.database).create(
    //     [
    //       {
    //         ...data,
    //         tenant: currentTenant.id,
    //         createdBy: currentUser.id,
    //         updatedBy: currentUser.id,
    //       },
    //     ],
    //     options
    //   );
    //   await this._createAuditLog(
    //     AuditLogRepository.CREATE,
    //     record.id,
    //     data,
    //     options
    //   );
    //   return this.findById(record.id, options);
    // }
    static updateAmount(id, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            // const record = await Wallet(options.database).find({
            //   user: id,
            //   symbol: data.rechargechannel.toUpperCase(),
            // });
            // const rows = await Wallet(options.database).updateOne(
            //   { user: id, symbol: data.rechargechannel.toUpperCase() }, // filter
            //   {
            //     $inc: { amount: data.amount },
            //   }, // update
            //   options // options
            // );
            yield (0, notificationServices_1.sendNotification)({
                userId: id, // the user to notify
                message: ``,
                type: "deposit", // type of notification
                options, // your repository options
            });
        });
    }
    static createMobile(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const [record] = yield (0, wallet_1.default)(options.database).create([
                Object.assign(Object.assign({}, data), { tenant: data.tenant, createdBy: data.createdBy.id, updatedBy: data.updatedBy.id }),
            ], options);
            yield this._createAuditLog(auditLogRepository_1.default.CREATE, record.id, data, options);
            return this.findByIdMobile(record.id, data.tenant, options);
        });
    }
    static update(id, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let record = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, wallet_1.default)(options.database).findById(id), options);
            if (!record || String(record.tenant) !== String(currentTenant.id)) {
                throw new Error404_1.default();
            }
            yield (0, wallet_1.default)(options.database).updateOne({ _id: id }, Object.assign(Object.assign({}, data), { updatedBy: mongooseRepository_1.default.getCurrentUser(options).id }), options);
            yield this._createAuditLog(auditLogRepository_1.default.UPDATE, id, data, options);
            record = yield this.findById(id, options);
            return record;
        });
    }
    // static async updateAmount(id, data, options: IRepositoryOptions) {
    //   const currentTenant = MongooseRepository.getCurrentTenant(options);
    //   const record = await Wallet(options.database).find({
    //     user: id,
    //     symbol: data.rechargechannel.toUpperCase(),
    //   });
    //   const rows = await Wallet(options.database).updateOne(
    //     { user: id, symbol: data.rechargechannel.toUpperCase()}, // filter
    //     {
    //       $inc: { amount: data.amount },
    //     }, // update
    //     options // options
    //   );
    //   await sendNotification({
    //     userId: id, // the user to notify
    //     message: ` ${data.amount} ${data.rechargechannel.toUpperCase()} `,
    //     type: "deposit", // type of notification
    //     options, // your repository options
    //   });
    //   return record;
    // }
    static processDeposit(userId, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const db = options.database;
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            const coinSymbol = data.rechargechannel.toUpperCase();
            const depositAmount = Number(data.amount);
            // 0️⃣ Fetch user data
            const currentUser = yield (0, user_1.default)(db).findById(userId);
            if (!currentUser)
                throw new Error("User not found");
            // If status is canceled, only send notification and return
            if (data.status === "canceled") {
                (0, notificationServices_1.sendNotification)({
                    userId,
                    message: `${depositAmount} ${coinSymbol}`,
                    type: "cancel_deposit",
                    options,
                }).catch(console.error);
                return {
                    depositedAmount: depositAmount,
                    coin: coinSymbol,
                    usdtEquivalent: 0,
                    status: "canceled",
                };
            }
            // 1️⃣ Update depositor wallet in deposited coin
            yield (0, wallet_1.default)(db).updateOne({ user: userId, symbol: coinSymbol }, { $inc: { amount: depositAmount } }, { upsert: true });
            // Send deposit notification to depositor
            (0, notificationServices_1.sendNotification)({
                userId,
                message: `${depositAmount} ${coinSymbol}`,
                type: "deposit",
                options,
            }).catch(console.error);
            // 2️⃣ Convert deposit to USDT for referral rewards
            let usdtAmount = depositAmount;
            if (coinSymbol !== "USDT") {
                try {
                    const coinMap = {
                        BTC: "bitcoin",
                        ETH: "ethereum",
                        SOL: "solana",
                        XRP: "ripple",
                        USDT: "tether",
                    };
                    const coinId = coinMap[coinSymbol];
                    if (!coinId)
                        throw new Error(`Unsupported coin: ${coinSymbol}`);
                    const resp = yield axios_1.default.get("https://api.coingecko.com/api/v3/simple/price", {
                        params: {
                            ids: coinId,
                            vs_currencies: "usd",
                        },
                    });
                    const price = Number(((_a = resp.data[coinId]) === null || _a === void 0 ? void 0 : _a.usd) || 0);
                    if (!price)
                        throw new Error("Price not found from CoinGecko");
                    usdtAmount = depositAmount * price;
                }
                catch (err) {
                    console.error("Error converting coin to USDT", err);
                    throw new Error("Failed to convert deposit to USDT for referral rewards.");
                }
            }
            // ✅ Check if this is the user's first deposit
            if (!currentUser.firstDepositDone) {
                // 3️⃣ Reward percentages per generation
                const rewardPercentages = [15, 10, 5]; // 1st, 2nd, 3rd generation
                // 4️⃣ Traverse referral chain upward
                let refSourceUser = currentUser;
                for (let level = 1; level <= 3; level++) {
                    if (!refSourceUser.invitationcode)
                        break;
                    const refUser = yield (0, user_1.default)(db).findOne({
                        refcode: refSourceUser.invitationcode,
                    });
                    if (!refUser)
                        break;
                    const reward = (usdtAmount * rewardPercentages[level - 1]) / 100;
                    // 4a️⃣ Update referrer wallet and get the updated document
                    const wallet = yield (0, wallet_1.default)(db).findOneAndUpdate({ user: refUser._id, symbol: "USDT" }, { $inc: { amount: reward } }, { upsert: true, new: true });
                    // 4b️⃣ Log reward transaction
                    yield (0, transaction_1.default)(db).create({
                        user: refUser._id,
                        amount: reward,
                        asset: "USDT",
                        wallet: wallet._id,
                        direction: "in",
                        status: "completed",
                        type: "reward",
                        description: `Referral reward from ${level} generation`,
                        createdBy: userId,
                        tenant: currentTenant.id,
                    });
                    // 4c️⃣ Send notification
                    (0, notificationServices_1.sendNotification)({
                        userId: refUser._id,
                        message: `You earned ${reward.toFixed(2)} USDT as ${level} generation referral reward from ${currentUser.email || "a user"}.`,
                        type: "commission",
                        options,
                    }).catch(console.error);
                    // Move up the chain
                    refSourceUser = refUser;
                }
                // ✅ Mark user as having completed their first deposit
                yield (0, user_1.default)(db).updateOne({ _id: userId }, { firstDepositDone: true });
            }
            return {
                depositedAmount: depositAmount,
                coin: coinSymbol,
                usdtEquivalent: usdtAmount,
                status: "success",
            };
        });
    }
    static destroy(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let record = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, wallet_1.default)(options.database).findById(id), options);
            if (!record || String(record.tenant) !== String(currentTenant.id)) {
                throw new Error404_1.default();
            }
            yield (0, wallet_1.default)(options.database).deleteOne({ _id: id }, options);
            yield this._createAuditLog(auditLogRepository_1.default.DELETE, id, record, options);
        });
    }
    static count(filter, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            return mongooseRepository_1.default.wrapWithSessionIfExists((0, wallet_1.default)(options.database).countDocuments(Object.assign(Object.assign({}, filter), { tenant: currentTenant.id })), options);
        });
    }
    static findById(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let record = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, wallet_1.default)(options.database)
                .findById(id)
                .populate("user")
                .populate("createdBy"), options);
            if (!record || String(record.tenant) !== String(currentTenant.id)) {
                throw new Error404_1.default();
            }
            return this._fillFileDownloadUrls(record);
        });
    }
    static findByUser(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let record = yield (0, wallet_1.default)(options.database)
                .find({ user: id })
                .populate("user");
            if (!record || String(record.tenant) !== String(currentTenant.id)) {
                throw new Error404_1.default();
            }
            return this._fillFileDownloadUrls(record);
        });
    }
    static findByIdMobile(id, tenenant, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let record = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, wallet_1.default)(options.database)
                .findById(id)
                .populate("auditor")
                .populate("createdBy"), options);
            if (!record || String(record.tenant) !== String(tenenant)) {
                throw new Error404_1.default();
            }
            return this._fillFileDownloadUrls(record);
        });
    }
    static findAndCountAll(_a, options_1) {
        return __awaiter(this, arguments, void 0, function* ({ filter, limit = 0, offset = 0, orderBy = "" }, options) {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let criteriaAnd = [];
            criteriaAnd.push({
                tenant: currentTenant.id,
            });
            if (filter) {
                if (filter.accountType) {
                    criteriaAnd.push({
                        accountType: {
                            $regex: mongooseQueryUtils_1.default.escapeRegExp(filter.accountType),
                            $options: "i",
                        },
                    });
                }
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
            let rows = yield (0, wallet_1.default)(options.database)
                .find(criteria)
                .skip(skip)
                .limit(limitEscaped)
                .sort(sort)
                .populate("user")
                .populate("createdBy");
            const count = yield (0, wallet_1.default)(options.database).countDocuments(criteria);
            rows = yield Promise.all(rows.map(this._fillFileDownloadUrls));
            return { rows, count };
        });
    }
    static findAndCountAllMobile(_a, options_1) {
        return __awaiter(this, arguments, void 0, function* ({ filter, fiat = "USD" }, options) {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            let criteriaAnd = [];
            criteriaAnd.push({ tenant: currentTenant.id });
            criteriaAnd.push({ user: currentUser.id });
            if (filter) {
                criteriaAnd.push({
                    accountType: String(filter).toLowerCase(),
                });
            }
            const sort = mongooseQueryUtils_1.default.sort("createdAt_DESC");
            const skip = Number(0) || undefined;
            const limitEscaped = Number(0) || undefined;
            const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;
            // Fetch wallet rows
            let rows = yield (0, wallet_1.default)(options.database)
                .find(criteria)
                .skip(skip)
                .limit(limitEscaped)
                .sort(sort);
            const count = yield (0, wallet_1.default)(options.database).countDocuments(criteria);
            // Apply file URLs
            rows = yield Promise.all(rows.map(this._fillFileDownloadUrls));
            // --------------------------------------------
            // 🔥 CONVERT AMOUNTS TO SELECTED FIAT
            // --------------------------------------------
            // Get conversion USD → FIAT for all coins
            const convertedPrices = yield this.convertCoins(fiat.toUpperCase());
            let totalFiat = 0;
            rows = rows.map((wallet) => {
                var _a;
                const plain = Object.assign({}, wallet);
                const symbol = plain.symbol; // BTC, USDT, DOGE, etc.
                const amount = plain.amount; // user balance
                const coinPriceInFiat = (_a = convertedPrices[symbol]) !== null && _a !== void 0 ? _a : 0;
                const balanceFiat = Number((amount * coinPriceInFiat).toFixed(2));
                plain.balanceFiat = balanceFiat;
                plain.fiat = fiat.toUpperCase();
                totalFiat += balanceFiat;
                return plain;
            });
            return {
                rows,
                count,
                totalFiat: Number(totalFiat.toFixed(2)),
                fiat: fiat.toUpperCase(),
            };
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
            const records = yield (0, wallet_1.default)(options.database)
                .find(criteria)
                .limit(limitEscaped)
                .sort(sort);
            return records.map((record) => ({
                id: record.id,
                label: record.symbol,
            }));
        });
    }
    static _createAuditLog(action, id, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            // await AuditLogRepository.log(
            //   {
            //     entityName: Wallet(options.database).modelName,
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
    static createDefaultAssets(newUser, tenantId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const cryptocurrencies = [
                { symbol: 'USDT', name: 'Tether' },
                { symbol: 'ETH', name: 'Ethereum' },
                { symbol: 'BTC', name: 'Bitcoin' },
                { symbol: 'USDC', name: 'USD Coin' },
                { symbol: 'DAI', name: 'DAI' },
                { symbol: 'SHIB', name: 'Shiba Inu' },
                { symbol: 'XRP', name: 'Ripple' },
                { symbol: 'TRX', name: 'TRON' },
                { symbol: 'SOL', name: 'Solana' },
                { symbol: 'BNB', name: 'Binance Coin' },
                { symbol: 'DOGE', name: 'Dogecoin' }
            ];
            const accountTypes = ["exchange", "trade", "perpetual"];
            const walletsToCreate = [];
            // Generate all combinations
            for (const crypto of cryptocurrencies) {
                for (const type of accountTypes) {
                    walletsToCreate.push({
                        user: newUser.id,
                        symbol: crypto.symbol,
                        coinName: crypto.name,
                        amount: 0,
                        accountType: type, // 👈 IMPORTANT
                        tenant: tenantId,
                        createdBy: newUser,
                        updatedBy: newUser,
                    });
                }
            }
            // Create all wallets
            const createdWallets = [];
            for (const walletData of walletsToCreate) {
                const wallet = yield this.createMobile(walletData, options);
                createdWallets.push(wallet);
            }
            return createdWallets;
        });
    }
    static transferBetweenAccounts(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            // Deduct from source wallet
            const sourceWallet = yield (0, wallet_1.default)(options.database).findOneAndUpdate({
                user: currentUser.id,
                symbol: data.symbol,
                accountType: data.fromAccount,
                tenant: currentTenant.id,
                amount: { $gte: data.amount }, // ensure enough balance
            }, {
                $inc: { amount: -data.amount },
                $set: { updatedBy: currentUser.id },
            }, { new: true });
            if (!sourceWallet) {
                throw new Error("Insufficient balance in source wallet");
            }
            // Add to target wallet
            const targetWallet = yield (0, wallet_1.default)(options.database).findOneAndUpdate({
                user: currentUser.id,
                symbol: data.symbol,
                tenant: currentTenant.id,
                accountType: data.toAccount,
            }, {
                $inc: { amount: data.amount },
                $setOnInsert: {
                    coinName: data.symbol,
                    status: "available",
                    createdBy: currentUser.id,
                },
            }, {
                upsert: true,
                new: true,
            });
            // Log the transfer
            yield (0, Transfer_1.default)(options.database).create({
                fromAccount: data.fromAccount,
                toAccount: data.toAccount,
                symbol: data.symbol,
                amount: data.amount,
                status: "completed",
                user: currentUser.id,
                tenant: currentTenant.id,
                createdBy: currentUser.id,
                updatedBy: currentUser.id,
            });
            return {
                sourceWallet,
                targetWallet,
            };
        });
    }
    static convertCoins(fiat) {
        return __awaiter(this, void 0, void 0, function* () {
            const redis = redisConnection_1.RedisService.getClient();
            const cryptoUSD = JSON.parse((yield redis.get("CRYPTO_USD")) || "{}");
            const fiatRates = JSON.parse((yield redis.get("FIAT_RATES")) || "{}");
            if (!fiatRates[fiat]) {
                throw new Error("Unsupported fiat");
            }
            const rate = fiatRates[fiat];
            const result = {};
            for (const symbol in cryptoUSD) {
                result[symbol] = Number((cryptoUSD[symbol] * rate).toFixed(6));
            }
            return result;
        });
    }
    static findAndCountAllTransfer(_a, options_1) {
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
            let rows = yield (0, Transfer_1.default)(options.database)
                .find(criteria)
                .skip(skip)
                .sort(sort);
            const count = yield (0, Transfer_1.default)(options.database).countDocuments(criteria);
            rows = yield Promise.all(rows.map(this._fillFileDownloadUrls));
            return { rows, count };
        });
    }
    static FreezeAccount(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            const WalletModel = (0, wallet_1.default)(options.database);
            // 1. Fetch wallet
            const wallet = yield WalletModel.findOne({
                _id: id,
                tenant: currentTenant.id,
            });
            if (!wallet) {
                throw new Error('Wallet not found');
            }
            const isActive = wallet.status === 'active';
            // 2. Compute new values in application layer
            const updateData = {
                status: isActive ? 'freezed' : 'active',
                amount: isActive ? 0 : wallet.amount + wallet.amountFreezed,
                amountFreezed: isActive ? wallet.amount + wallet.amountFreezed : 0,
                updatedBy: currentUser.id,
            };
            // 3. Classic update (fully compatible)
            const updatedWallet = yield WalletModel.findOneAndUpdate({ _id: id, tenant: currentTenant.id }, { $set: updateData }, { new: true });
            return updatedWallet;
        });
    }
}
exports.default = WalletRepository;
//# sourceMappingURL=assetsRepository.js.map