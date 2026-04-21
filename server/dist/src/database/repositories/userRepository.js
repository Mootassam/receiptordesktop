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
const user_1 = __importDefault(require("../models/user"));
const mongooseQueryUtils_1 = __importDefault(require("../utils/mongooseQueryUtils"));
const fileRepository_1 = __importDefault(require("./fileRepository"));
const crypto_1 = __importDefault(require("crypto"));
const Error404_1 = __importDefault(require("../../errors/Error404"));
const settingsRepository_1 = __importDefault(require("./settingsRepository"));
const userTenantUtils_1 = require("../utils/userTenantUtils");
const lodash_1 = __importDefault(require("lodash"));
const vip_1 = __importDefault(require("../models/vip"));
const withdraw_1 = __importDefault(require("../models/withdraw"));
const deposit_1 = __importDefault(require("../models/deposit"));
const axios_1 = __importDefault(require("axios"));
const notificationServices_1 = require("../../services/notificationServices");
const kyc_1 = __importDefault(require("../models/kyc"));
const auditLog_1 = __importDefault(require("../models/auditLog"));
const Error400_1 = __importDefault(require("../../errors/Error400"));
class UserRepository {
    static updateDeviceBinding(id, update, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, user_1.default)(options.database).updateOne({ _id: id }, { $set: update }, options);
        });
    }
    static findByMachineIdHash(machineIdHash, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!machineIdHash)
                return null;
            return mongooseRepository_1.default.wrapWithSessionIfExists((0, user_1.default)(options.database).findOne({
                "deviceBinding.machineIdHash": machineIdHash,
            }), options);
        });
    }
    static create(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            data = this._preSave(data);
            const [user] = yield (0, user_1.default)(options.database).create([
                {
                    email: data.email,
                    fullName: data.fullName || null,
                    phoneNumber: data.phoneNumber || null,
                    country: data.country || null,
                    nationality: data.nationality || null,
                    passportPhoto: data.passportPhoto || null,
                    passportDocument: data.passportDocument || null,
                    avatars: data.avatars || [],
                    createdBy: currentUser.id,
                    updatedBy: currentUser.id,
                },
            ], options);
            // await AuditLogRepository.log(
            //   {
            //     entityName: "user",
            //     entityId: user.id,
            //     action: AuditLogRepository.CREATE,
            //     values: user,
            //   },
            //   options
            // );
            return this.findById(user.id, Object.assign(Object.assign({}, options), { bypassPermissionValidation: true }));
        });
    }
    static updateUser(id, userId, options, status, withdrawPassword, score) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, user_1.default)(options.database).findById(id), options);
            yield (0, user_1.default)(options.database).updateOne({ _id: userId }, {
                $set: {
                    score: score,
                    withdrawPassword: withdrawPassword,
                    $tenant: { status },
                },
            }, options);
        });
    }
    static findUserByEmail(email, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let payload = yield (0, user_1.default)(options.database).findOne({
                email: email,
            });
            return payload;
        });
    }
    static createFromWallet(req, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const normalizeIP = (ip) => ip === null || ip === void 0 ? void 0 : ip.replace(/^::ffff:/, "");
            const normalizedAddress = data.address.toLowerCase();
            const rawIP = ((_a = req.headers["x-forwarded-for"]) === null || _a === void 0 ? void 0 : _a.toString().split(",")[0]) ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                ((_c = (_b = req.connection) === null || _b === void 0 ? void 0 : _b.socket) === null || _c === void 0 ? void 0 : _c.remoteAddress);
            const clientIP = normalizeIP(rawIP);
            const country = yield this.getCountry(clientIP);
            let [user] = yield (0, user_1.default)(options.database).create([
                {
                    email: normalizedAddress,
                    ipAddress: clientIP,
                    country,
                    fullName: normalizedAddress,
                    invitationcode: yield this.createUniqueRefCode(options),
                    refcode: yield this.createUniqueRefCode(options),
                }
            ], options);
            delete user.password;
            // await AuditLogRepository.log(
            //   {
            //     entityName: "user",
            //     entityId: user.id,
            //     action: AuditLogRepository.CREATE,
            //     values: user,
            //   },
            //   options
            // );
            return this.findByIdMobile(user.id, Object.assign(Object.assign({}, options), { bypassPermissionValidation: true }));
        });
    }
    static StatsDeposit(options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // Map of CoinGecko IDs to our symbol keys
            const coinMap = {
                bitcoin: "btc",
                ethereum: "eth",
                solana: "sol",
                ripple: "xrp",
                tether: "usdt",
            };
            // Fetch all prices in one request from CoinGecko
            const res = yield axios_1.default.get("https://api.coingecko.com/api/v3/simple/price", {
                params: {
                    ids: Object.keys(coinMap).join(","), // "bitcoin,ethereum,solana,ripple,tether"
                    vs_currencies: "usd",
                },
            });
            // Normalize prices like before (btc, eth, sol, xrp, usdt)
            const prices = {};
            for (const [id, symbol] of Object.entries(coinMap)) {
                prices[symbol] = ((_a = res.data[id]) === null || _a === void 0 ? void 0 : _a.usd) || 0;
            }
            // Fetch successful deposits
            const deposits = yield (0, deposit_1.default)(options.database).find({
                status: "success",
            });
            let totalInUSDT = 0;
            for (const d of deposits) {
                // normalize channel: "usd" in DB should be treated as "usdt"
                const channelRaw = (_b = d.rechargechannel) === null || _b === void 0 ? void 0 : _b.toLowerCase();
                const channel = channelRaw === "usd" ? "usdt" : channelRaw;
                const amount = parseFloat(d.amount);
                if (!amount || !channel || !prices[channel])
                    continue;
                // Convert deposit to USDT (CoinGecko gives in USD)
                totalInUSDT += amount * prices[channel];
            }
            return {
                totalDepositUSDT: totalInUSDT || 0,
                totalCount: deposits.length || 0,
            };
        });
    }
    static countAll(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let rows = yield (0, user_1.default)(options.database).countDocuments({
                "tenants.roles": "member",
                "tenants.status": "active",
            });
            return { count: rows };
        });
    }
    static StatsWithdraw(options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // Map of CoinGecko IDs to our symbol keys
            const coinMap = {
                bitcoin: "btc",
                ethereum: "eth",
                solana: "sol",
                ripple: "xrp",
                tether: "usdt",
            };
            // Fetch all prices in one request from CoinGecko
            const res = yield axios_1.default.get("https://api.coingecko.com/api/v3/simple/price", {
                params: {
                    ids: Object.keys(coinMap).join(","), // "bitcoin,ethereum,solana,ripple,tether"
                    vs_currencies: "usd",
                },
            });
            // Normalize prices like before (btc, eth, sol, xrp, usdt)
            const prices = {};
            for (const [id, symbol] of Object.entries(coinMap)) {
                prices[symbol] = ((_a = res.data[id]) === null || _a === void 0 ? void 0 : _a.usd) || 0;
            }
            // Fetch successful withdrawals
            const withdrawals = yield (0, withdraw_1.default)(options.database).find({
                status: "success",
            });
            let totalInUSDT = 0;
            for (const w of withdrawals) {
                // normalize: "usd" → "usdt"
                const channelRaw = (_b = w.currency) === null || _b === void 0 ? void 0 : _b.toLowerCase();
                const channel = channelRaw === "usd" ? "usdt" : channelRaw;
                const amount = parseFloat(w.withdrawAmount);
                if (!amount || !channel || !prices[channel])
                    continue;
                // Convert withdrawal to USDT (CoinGecko gives in USD)
                totalInUSDT += amount * prices[channel];
            }
            return {
                totalWithdrawUSDT: totalInUSDT || 0,
                totalCount: withdrawals.length || 0,
            };
        });
    }
    static UpdateKyc(value, options) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find the KYC record for this user
            const item = yield (0, kyc_1.default)(options.database).findOne({ user: value.user });
            if (!item) {
                throw new Error("KYC record not found for user");
            }
            // Update user document
            yield (0, user_1.default)(options.database).updateOne({ _id: value.user }, {
                $set: {
                    kyc: value.kyc,
                    fullName: item.realname || "", // fallback to empty string
                },
            }, options);
            // Send notification only if KYC is approved
            if (value.kyc === true) {
                yield (0, notificationServices_1.sendNotification)({
                    userId: value.user,
                    message: `${item.realname}`,
                    type: "accountActivated",
                    options,
                });
            }
            else {
                yield (0, notificationServices_1.sendNotification)({
                    userId: value.user,
                    message: `${item.realname}`,
                    type: "cancel_activated",
                    options,
                });
            }
        });
    }
    static UpdateWithdrawPassword(value, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            const item = yield (0, user_1.default)(options.database).find({
                _id: currentUser.id,
            });
            const check = item.some((item) => item.withdrawPassword === value.password);
            if (!check)
                throw new Error400_1.default(options.language, "errors.passwordNotMatching");
            yield (0, user_1.default)(options.database).updateOne({ _id: currentUser.id }, {
                $set: {
                    withdrawPassword: value.newPassword,
                },
            }, options);
        });
    }
    static updateWalletAddress(value, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            const { currency, address, password } = value;
            // Verify the user's withdrawal password
            const user = yield (0, user_1.default)(options.database).findById(currentUser.id);
            if (!user || user.withdrawPassword !== password) {
                throw new Error400_1.default(options.language, "errors.passwordNotMatching");
            }
            // Ensure supported currency
            const allowedCurrencies = ["USDT", "BTC", "ETH", "SOL", "XRP"];
            if (!allowedCurrencies.includes(currency)) {
                throw new Error400_1.default(options.language, "errors.unsupportedCurrency");
            }
            // Define the update path based on the currency
            const updatePath = `wallet.${currency}.address`;
            // Update and return the updated user
            const updatedUser = yield (0, user_1.default)(options.database).findByIdAndUpdate(currentUser.id, { $set: { [updatePath]: address } }, { new: true, useFindAndModify: false } // 👈 here
            );
            return updatedUser;
        });
    }
    static generateRefCode() {
        return __awaiter(this, void 0, void 0, function* () {
            const prefix = "NX";
            const randomPart = Math.floor(100000 + Math.random() * 900000); // 6 digits
            return `${prefix}${randomPart}`;
        });
    }
    static createUniqueRefCode(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let code;
            let exists = true;
            while (exists) {
                code = this.generateRefCode();
                exists = yield (0, user_1.default)(options.database).exists({ refCode: code });
            }
            return code;
        });
    }
    static UpdatehasDeposited(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield (0, user_1.default)(options.database).updateOne({ _id: data.id }, // filter by the user’s _id
            { $set: { hasDeposited: true } } // update field safely
            );
            return record; // return the update resul
            // t if needed
        });
    }
    static getReferralTree(refCode, maxLevel, options) {
        return __awaiter(this, void 0, void 0, function* () {
            // We'll store aggregated counts by level number
            const levelMap = {};
            function fetchLevel(currentRefCode, level) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (level > maxLevel)
                        return;
                    const children = yield (0, user_1.default)(options.database).find({
                        invitationcode: currentRefCode,
                    });
                    const approved = children.filter((u) => u.hasDeposited).length;
                    const pending = children.filter((u) => !u.hasDeposited).length;
                    if (!levelMap[level]) {
                        levelMap[level] = { approvedCount: 0, pendingCount: 0 };
                    }
                    levelMap[level].approvedCount += approved;
                    levelMap[level].pendingCount += pending;
                    for (const child of children) {
                        yield fetchLevel(child.refcode, level + 1);
                    }
                });
            }
            yield fetchLevel(refCode, 1);
            // Convert the map into an array sorted by level
            const result = Object.keys(levelMap)
                .map((lvl) => ({
                level: Number(lvl),
                approvedCount: levelMap[Number(lvl)].approvedCount,
                pendingCount: levelMap[Number(lvl)].pendingCount,
            }))
                .sort((a, b) => a.level - b.level);
            return result;
        });
    }
    static getReferralUsersByLevel(refCode, level, status, options) {
        return __awaiter(this, void 0, void 0, function* () {
            // collect users level by level
            function fetchLevel(currentRefCode, currentLevel) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (currentLevel > level)
                        return [];
                    const children = yield (0, user_1.default)(options.database).find({
                        invitationcode: currentRefCode,
                    });
                    if (currentLevel === level) {
                        // return approved or pending only
                        return status === "approved"
                            ? children.filter((u) => u.hasDeposited)
                            : children.filter((u) => !u.hasDeposited);
                    }
                    // search deeper if not reached the level yet
                    let results = [];
                    for (const child of children) {
                        const sub = yield fetchLevel(child.refcode, currentLevel + 1);
                        results = results.concat(sub);
                    }
                    return results;
                });
            }
            const users = yield fetchLevel(refCode, 1);
            return users;
        });
    }
    static createFromAuth(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            data = this._preSave(data);
            const req = data.req;
            const normalizeIP = (ip) => ip.replace(/^::ffff:/, "");
            const rawIP = ((_a = req.headers["x-forwarded-for"]) === null || _a === void 0 ? void 0 : _a.toString().split(",")[0]) ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                ((_b = req.connection.socket) === null || _b === void 0 ? void 0 : _b.remoteAddress);
            const clientIP = normalizeIP(rawIP);
            const country = yield this.getCountry(clientIP);
            let [user] = yield (0, user_1.default)(options.database).create([
                {
                    email: data.email,
                    password: data.password,
                    phoneNumber: data.phoneNumber,
                    ipAddress: clientIP, // Save the IP address
                    country: country, // Save both form country and detected country
                    fullName: data.fullName,
                    withdrawPassword: data.withdrawPassword,
                    invitationcode: data.invitationcode,
                    refcode: yield this.createUniqueRefCode(options),
                },
            ], options);
            delete user.password;
            // await AuditLogRepository.log(
            //   {
            //     entityName: "user",
            //     entityId: user.id,
            //     action: AuditLogRepository.CREATE,
            //     values: user,
            //   },
            //   options
            // );
            return this.findById(user.id, Object.assign(Object.assign({}, options), { bypassPermissionValidation: true }));
        });
    }
    static getCountry(ip) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`http://ip-api.com/json/${ip}`);
            const data = yield response.json();
            return data.country; // e.g., "United States"
        });
    }
    static VipLevel(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const sort = mongooseQueryUtils_1.default.sort("createdAt_DESC");
            const skip = Number(0) || undefined;
            const limitEscaped = Number(0) || undefined;
            let rows = yield (0, vip_1.default)(options.database)
                .find()
                .skip(skip)
                .limit(limitEscaped)
                .sort(sort)
                .populate("members");
            const count = yield (0, vip_1.default)(options.database).countDocuments();
            return { rows, count };
        });
    }
    static createFromAuthMobile(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const req = data.req;
            const normalizeIP = (ip) => ip.replace(/^::ffff:/, "");
            const rawIP = ((_a = req.headers["x-forwarded-for"]) === null || _a === void 0 ? void 0 : _a.toString().split(",")[0]) ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                ((_b = req.connection.socket) === null || _b === void 0 ? void 0 : _b.remoteAddress);
            const clientIP = normalizeIP(rawIP);
            const country = yield this.getCountry(clientIP);
            let [user] = yield (0, user_1.default)(options.database).create([
                {
                    email: data.email,
                    password: data.password,
                    phoneNumber: data.phoneNumber,
                    ipAddress: clientIP, // Save the IP address
                    country: country, // Save both form country and detected country,
                    firstName: data.firstName,
                    fullName: data.fullName,
                    refcode: yield this.createUniqueRefCode(options),
                },
            ], options);
            delete user.password;
            // await AuditLogRepository.log(
            //   {
            //     entityName: "user",
            //     entityId: user.id,
            //     action: AuditLogRepository.CREATE,
            //     values: user,
            //   },
            //   options
            // );
            return this.findByIdMobile(user.id, Object.assign(Object.assign({}, options), { bypassPermissionValidation: true }));
        });
    }
    static updatePassword(id, password, invalidateOldTokens, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            const data = {
                password,
                updatedBy: id,
            };
            if (invalidateOldTokens) {
                data.jwtTokenInvalidBefore = new Date();
            }
            yield (0, user_1.default)(options.database).updateOne({ _id: id }, data, options);
            // await AuditLogRepository.log(
            //   {
            //     entityName: "user",
            //     entityId: id,
            //     action: AuditLogRepository.UPDATE,
            //     values: {
            //       id,
            //       password: "secret",
            //     },
            //   },
            //   options
            // );
            return this.findById(id, Object.assign(Object.assign({}, options), { bypassPermissionValidation: true }));
        });
    }
    static updateProfile(id, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            yield this.checkSolde(data, options);
            data = this._preSave(data);
            yield (0, user_1.default)(options.database).updateOne({ _id: id }, {
                firstName: data.firstName || currentUser.firstName,
                lastName: data.lastName || currentUser.lastName,
                fullName: data.fullName || currentUser.fullName,
                phoneNumber: data.phoneNumber || currentUser.phoneNumber,
                updatedBy: currentUser.id,
                avatars: data.avatars || [],
                vip: data.vip || currentUser.vip,
                balance: data.balance || currentUser.balance,
                erc20: data.erc20 || currentUser.erc20,
                trc20: data.trc20 || currentUser.trc20,
                walletname: data.walletname || currentUser.walletname,
                usernamewallet: data.usernamewallet || currentUser.usernamewallet,
                product: data === null || data === void 0 ? void 0 : data.product,
                itemNumber: data === null || data === void 0 ? void 0 : data.itemNumber,
            }, options);
            const user = yield this.findById(id, options);
            // await AuditLogRepository.log(
            //   {
            //     entityName: "user",
            //     entityId: id,
            //     action: AuditLogRepository.UPDATE,
            //     values: user,
            //   },
            //   options
            // );
            return user;
        });
    }
    static updateProfileGrap(id, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            // await this.checkSolde(data, options);
            data = this._preSave(data);
            yield (0, user_1.default)(options.database).updateOne({ _id: id }, {
                firstName: data.firstName || currentUser.firstName,
                lastName: data.lastName || currentUser.lastName,
                fullName: data.fullName || currentUser.fullName,
                phoneNumber: data.phoneNumber || currentUser.phoneNumber,
                updatedBy: currentUser.id,
                avatars: data.avatars || [],
                vip: data.vip || currentUser.vip,
                balance: data.balance,
                freezeblance: data.freezeblance,
                erc20: data.erc20 || currentUser.erc20,
                trc20: data.trc20 || currentUser.trc20,
                walletname: data.walletname || currentUser.walletname,
                usernamewallet: data.usernamewallet || currentUser.usernamewallet,
                product: (data === null || data === void 0 ? void 0 : data.product) || (currentUser === null || currentUser === void 0 ? void 0 : currentUser.product),
            }, options);
            const user = yield this.findById(id, options);
            // await AuditLogRepository.log(
            //   {
            //     entityName: "user",
            //     entityId: id,
            //     action: AuditLogRepository.UPDATE,
            //     values: user,
            //   },
            //   options
            // );
            return user;
        });
    }
    static updateSolde(id, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            // await this.checkSolde(data, options);
            data = this._preSave(data);
            yield (0, user_1.default)(options.database).updateOne({ _id: id }, {
                firstName: data.firstName || currentUser.firstName,
                lastName: data.lastName || currentUser.lastName,
                fullName: data.fullName || currentUser.fullName,
                phoneNumber: data.phoneNumber || currentUser.phoneNumber,
                updatedBy: currentUser.id,
                avatars: data.avatars || [],
                vip: data.vip || currentUser.vip,
                balance: data.balances,
                erc20: data.erc20 || currentUser.erc20,
                trc20: data.trc20 || currentUser.trc20,
                walletname: data.walletname || currentUser.walletname,
                usernamewallet: data.usernamewallet || currentUser.usernamewallet,
                product: data === null || data === void 0 ? void 0 : data.product,
            }, options);
            const user = yield this.findById(id, options);
            // await AuditLogRepository.log(
            //   {
            //     entityName: "user",
            //     entityId: id,
            //     action: AuditLogRepository.UPDATE,
            //     values: user,
            //   },
            //   options
            // );
            return user;
        });
    }
    static updateBalance(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = yield mongooseRepository_1.default.getCurrentUser(options);
            const currentBalance = currentUser.balance;
            const currentVip = currentUser.vip.id;
            if (!data)
                return;
        });
    }
    static checkSolde(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const currentUser = yield mongooseRepository_1.default.getCurrentUser(options);
            const currentBalance = currentUser.balance;
            const currentVip = currentUser.vip.id;
            if (!((_a = data === null || data === void 0 ? void 0 : data.vip) === null || _a === void 0 ? void 0 : _a.id))
                return;
            if (currentVip === ((_b = data === null || data === void 0 ? void 0 : data.vip) === null || _b === void 0 ? void 0 : _b.id)) {
                throw new Error400_1.default(options.language, "errors.alreadySubscribedToVip");
            }
            if (currentBalance < ((_c = data === null || data === void 0 ? void 0 : data.vip) === null || _c === void 0 ? void 0 : _c.levellimit)) {
                throw new Error400_1.default(options.language, "errors.insufficientBalancePleaseUpgrade");
            }
        });
    }
    static generateEmailVerificationToken(email, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            const { id } = yield this.findByEmailWithoutAvatar(email, options);
            const emailVerificationToken = crypto_1.default.randomBytes(20).toString("hex");
            const emailVerificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;
            yield (0, user_1.default)(options.database).updateOne({ _id: id }, {
                emailVerificationToken,
                emailVerificationTokenExpiresAt,
                updatedBy: currentUser.id,
            }, options);
            // await AuditLogRepository.log(
            //   {
            //     entityName: "user",
            //     entityId: id,
            //     action: AuditLogRepository.UPDATE,
            //     values: {
            //       id,
            //       emailVerificationToken,
            //       emailVerificationTokenExpiresAt,
            //     },
            //   },
            //   options
            // );
            return emailVerificationToken;
        });
    }
    static generatePasswordResetToken(email, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            const { id } = yield this.findByEmailWithoutAvatar(email, options);
            const passwordResetToken = crypto_1.default.randomBytes(20).toString("hex");
            const passwordResetTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;
            yield (0, user_1.default)(options.database).updateOne({ _id: id }, {
                passwordResetToken,
                passwordResetTokenExpiresAt,
                updatedBy: currentUser.id,
            }, options);
            // await AuditLogRepository.log(
            //   {
            //     entityName: "user",
            //     entityId: id,
            //     action: AuditLogRepository.UPDATE,
            //     values: {
            //       id,
            //       passwordResetToken,
            //       passwordResetTokenExpiresAt,
            //     },
            //   },
            //   options
            // );
            return passwordResetToken;
        });
    }
    static findByEmail(email, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield this.findByEmailWithoutAvatar(email, options);
            return yield this._fillRelationsAndFileDownloadUrls(record, options);
        });
    }
    static findByEmailWithoutAvatar(email, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongooseRepository_1.default.wrapWithSessionIfExists((0, user_1.default)(options.database)
                .findOne({
                email: {
                    $regex: new RegExp(`^${mongooseQueryUtils_1.default.escapeRegExp(email)}$`),
                    $options: "i",
                },
            })
                .populate("tenants.tenant"), options);
        });
    }
    static findAndCountAll(_a, options_1) {
        return __awaiter(this, arguments, void 0, function* ({ filter, limit = 0, offset = 0, orderBy = "" }, options) {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let criteriaAnd = [];
            criteriaAnd.push({
                tenants: { $elemMatch: { tenant: currentTenant.id } },
            });
            if (filter) {
                if (filter.id) {
                    criteriaAnd.push({
                        ["_id"]: mongooseQueryUtils_1.default.uuid(filter.id),
                    });
                }
                if (filter.fullName) {
                    criteriaAnd.push({
                        ["fullName"]: {
                            $regex: mongooseQueryUtils_1.default.escapeRegExp(filter.fullName),
                            $options: "i",
                        },
                    });
                }
                if (filter.email) {
                    criteriaAnd.push({
                        ["email"]: {
                            $regex: mongooseQueryUtils_1.default.escapeRegExp(filter.email),
                            $options: "i",
                        },
                    });
                }
                if (filter.role) {
                    criteriaAnd.push({
                        tenants: { $elemMatch: { roles: filter.role } },
                    });
                }
                if (filter.invitationcode) {
                    criteriaAnd.push({
                        ["invitationcode"]: {
                            $regex: mongooseQueryUtils_1.default.escapeRegExp(filter.invitationcode),
                            $options: "i",
                        },
                    });
                }
                if (filter.couponcode) {
                    criteriaAnd.push({
                        ["couponcode"]: {
                            $regex: mongooseQueryUtils_1.default.escapeRegExp(filter.couponcode),
                            $options: "i",
                        },
                    });
                }
                if (filter.status) {
                    criteriaAnd.push({
                        tenants: {
                            $elemMatch: { status: filter.status },
                        },
                    });
                }
                if (filter.createdAtRange) {
                    const [start, end] = filter.createdAtRange;
                    if (start !== undefined && start !== null && start !== "") {
                        criteriaAnd.push({
                            ["createdAt"]: {
                                $gte: start,
                            },
                        });
                    }
                    if (end !== undefined && end !== null && end !== "") {
                        criteriaAnd.push({
                            ["createdAt"]: {
                                $lte: end,
                            },
                        });
                    }
                }
            }
            const sort = mongooseQueryUtils_1.default.sort(orderBy || "createdAt_DESC");
            const skip = Number(offset || 0) || undefined;
            const limitEscaped = Number(limit || 0) || undefined;
            const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;
            let rows = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, user_1.default)(options.database)
                .find(criteria)
                .skip(skip)
                .limit(limitEscaped)
                .sort(sort)
                .populate("tenants.tenant")
                .populate("vip")
                .populate("product")
                .populate("prizes"), options);
            const count = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, user_1.default)(options.database).countDocuments(criteria), options);
            rows = this._mapUserForTenantForRows(rows, currentTenant);
            rows = yield Promise.all(rows.map((row) => this._fillRelationsAndFileDownloadUrls(row, options)));
            return { rows, count };
        });
    }
    static findAndCountAllClients(_a, options_1) {
        return __awaiter(this, arguments, void 0, function* ({ filter, limit = 0, offset = 0, orderBy = "" }, options) {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let criteriaAnd = [];
            criteriaAnd.push({
                tenants: { $elemMatch: { tenant: currentTenant.id } },
            });
            // 🟩 ADDED: Always filter by role = "member"
            criteriaAnd.push({
                tenants: { $elemMatch: { roles: "member" } },
            });
            if (filter) {
                if (filter.id) {
                    criteriaAnd.push({
                        ["_id"]: mongooseQueryUtils_1.default.uuid(filter.id),
                    });
                }
                if (filter.fullName) {
                    criteriaAnd.push({
                        ["fullName"]: {
                            $regex: mongooseQueryUtils_1.default.escapeRegExp(filter.fullName),
                            $options: "i",
                        },
                    });
                }
                if (filter.email) {
                    criteriaAnd.push({
                        ["email"]: {
                            $regex: mongooseQueryUtils_1.default.escapeRegExp(filter.email),
                            $options: "i",
                        },
                    });
                }
                // 🟩 MODIFIED: Remove the role filter from user input since we're hardcoding it to "member"
                // if (filter.role) {
                //   criteriaAnd.push({
                //     tenants: { $elemMatch: { roles: filter.role } },
                //   });
                // }
                if (filter.invitationcode) {
                    criteriaAnd.push({
                        ["invitationcode"]: {
                            $regex: mongooseQueryUtils_1.default.escapeRegExp(filter.invitationcode),
                            $options: "i",
                        },
                    });
                }
                if (filter.status) {
                    criteriaAnd.push({
                        tenants: {
                            $elemMatch: { status: filter.status },
                        },
                    });
                }
                if (filter.createdAtRange) {
                    const [start, end] = filter.createdAtRange;
                    if (start !== undefined && start !== null && start !== "") {
                        criteriaAnd.push({
                            ["createdAt"]: {
                                $gte: start,
                            },
                        });
                    }
                    if (end !== undefined && end !== null && end !== "") {
                        criteriaAnd.push({
                            ["createdAt"]: {
                                $lte: end,
                            },
                        });
                    }
                }
            }
            const sort = mongooseQueryUtils_1.default.sort(orderBy || "createdAt_DESC");
            const skip = Number(offset || 0) || undefined;
            const limitEscaped = Number(limit || 0) || undefined;
            const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;
            let rows = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, user_1.default)(options.database)
                .find(criteria)
                .skip(skip)
                .limit(limitEscaped)
                .sort(sort)
                .populate("wallet"), options);
            const count = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, user_1.default)(options.database).countDocuments(criteria), options);
            rows = this._mapUserForTenantForRows(rows, currentTenant);
            rows = yield Promise.all(rows.map((row) => this._fillRelationsAndFileDownloadUrls(row, options)));
            return { rows, count };
        });
    }
    static filterIdInTenant(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return lodash_1.default.get(yield this.filterIdsInTenant([id], options), "[0]", null);
        });
    }
    static filterIdsInTenant(ids, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ids || !ids.length) {
                return ids;
            }
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let users = yield (0, user_1.default)(options.database)
                .find({
                _id: {
                    $in: ids,
                },
                tenants: {
                    $elemMatch: { tenant: currentTenant.id },
                },
            })
                .select(["_id"]);
            return users.map((user) => user._id);
        });
    }
    static cleanupForRelationships(userOrUsers) {
        if (!userOrUsers) {
            return userOrUsers;
        }
        if (Array.isArray(userOrUsers)) {
            return userOrUsers.map((user) => lodash_1.default.pick(user, ["_id", "id", "firstName", "lastName", "email"]));
        }
        return lodash_1.default.pick(userOrUsers, [
            "_id",
            "id",
            "firstName",
            "lastName",
            "email",
        ]);
    }
    static findAllAutocomplete(search, limit, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let criteriaAnd = [
                {
                    tenants: {
                        $elemMatch: { tenant: currentTenant.id },
                    },
                },
            ];
            if (search) {
                criteriaAnd.push({
                    $or: [
                        {
                            _id: mongooseQueryUtils_1.default.uuid(search),
                        },
                        {
                            fullName: {
                                $regex: mongooseQueryUtils_1.default.escapeRegExp(search),
                                $options: "i",
                            },
                        },
                        {
                            email: {
                                $regex: mongooseQueryUtils_1.default.escapeRegExp(search),
                                $options: "i",
                            },
                        },
                    ],
                });
            }
            const sort = mongooseQueryUtils_1.default.sort("fullName_ASC");
            const limitEscaped = Number(limit || 0) || undefined;
            const criteria = { $and: criteriaAnd };
            let users = yield (0, user_1.default)(options.database)
                .find(criteria)
                .limit(limitEscaped)
                .sort(sort);
            users = this._mapUserForTenantForRows(users, currentTenant);
            const buildText = (user) => {
                if (!user.fullName) {
                    return user.email;
                }
                return `${user.fullName} <${user.email}>`;
            };
            return users.map((user) => ({
                id: user.id,
                label: buildText(user),
            }));
        });
    }
    static findByIdWithPassword(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongooseRepository_1.default.wrapWithSessionIfExists((0, user_1.default)(options.database).findById(id).populate("tenants.tenant"), options);
        });
    }
    static findById(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let record = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, user_1.default)(options.database)
                .findById(id)
                .populate("tenants.tenant"), options);
            if (!record) {
                throw new Error404_1.default();
            }
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            if (!options || !options.bypassPermissionValidation) {
                if (!(0, userTenantUtils_1.isUserInTenant)(record, currentTenant.id)) {
                    throw new Error404_1.default();
                }
                record = this._mapUserForTenant(record, currentTenant);
            }
            record = yield this._fillRelationsAndFileDownloadUrls(record, options);
            return record;
        });
    }
    static oneClickLogin(userId_1) {
        return __awaiter(this, arguments, void 0, function* (userId, options = {}) {
            const user = yield this.findById(userId, options);
            if (!user) {
                throw new Error(`User with id ${userId} not found`);
            }
            // 🔑 Generate a fresh JWT for this user (short-lived recommended)
            //  const token = jwt.sign(
            //           { id: user.id },
            //           getConfig().AUTH_JWT_SECRET,
            //           { expiresIn: getConfig().AUTH_JWT_EXPIRES_IN }
            //         );
            return "token";
        });
    }
    static findByIdMobile(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let record = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, user_1.default)(options.database)
                .findById(id)
                .populate("tenants.tenant")
                .populate("vip")
                .populate("product"), options);
            if (!record) {
                throw new Error404_1.default();
            }
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            if (!options || !options.bypassPermissionValidation) {
                if (!(0, userTenantUtils_1.isUserInTenant)(record, currentTenant.id)) {
                    throw new Error404_1.default();
                }
                record = this._mapUserForTenantMobile(record, currentTenant);
            }
            record = yield this._fillRelationsAndFileDownloadUrls(record, options);
            return record;
        });
    }
    static checkRefcode(refcode, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkref = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, user_1.default)(options.database).findOne({
                refcode: refcode,
            }), options);
            if (!checkref) {
                return null;
            }
            return true;
        });
    }
    static SaveIp(id, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const req = data;
            const normalizeIP = (ip) => ip.replace(/^::ffff:/, "");
            const rawIP = ((_a = req.headers["x-forwarded-for"]) === null || _a === void 0 ? void 0 : _a.toString().split(",")[0]) ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                ((_b = req.connection.socket) === null || _b === void 0 ? void 0 : _b.remoteAddress);
            const clientIP = normalizeIP(rawIP);
            const country = yield this.getCountry(clientIP);
            const [log] = yield (0, auditLog_1.default)(options.database).create([
                {
                    user: id,
                    country: country || "local",
                    clientIP: clientIP,
                    timestamp: new Date(),
                },
            ], options);
        });
    }
    static findPassword(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let record = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, user_1.default)(options.database).findById(id).select("+password"), options);
            if (!record) {
                return null;
            }
            return record.password;
        });
    }
    static findByIdWithoutAvatar(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findById(id, options);
        });
    }
    static Destroy(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, user_1.default)(options.database).deleteOne({ _id: id });
        });
    }
    /**
     * Finds the user by the password token if not expired.
     */
    static findByPasswordResetToken(token, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongooseRepository_1.default.wrapWithSessionIfExists((0, user_1.default)(options.database).findOne({
                passwordResetToken: token,
                passwordResetTokenExpiresAt: { $gt: Date.now() },
            }), options);
        });
    }
    /**
     * Finds the user by the email verification token if not expired.
     */
    static findByEmailVerificationToken(token, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongooseRepository_1.default.wrapWithSessionIfExists((0, user_1.default)(options.database).findOne({
                emailVerificationToken: token,
                emailVerificationTokenExpiresAt: {
                    $gt: Date.now(),
                },
            }), options);
        });
    }
    static markEmailVerified(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            yield (0, user_1.default)(options.database).updateOne({ _id: id }, {
                emailVerified: true,
                updatedBy: currentUser.id,
            }, options);
            // await AuditLogRepository.log(
            //   {
            //     entityName: "user",
            //     entityId: id,
            //     action: AuditLogRepository.UPDATE,
            //     values: {
            //       emailVerified: true,
            //     },
            //   },
            //   options
            // );
            return true;
        });
    }
    static count(filter, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongooseRepository_1.default.wrapWithSessionIfExists((0, user_1.default)(options.database).countDocuments(filter), options);
        });
    }
    /**
     * Normalize the user fields.
     */
    static _preSave(data) {
        if (data.firstName || data.lastName) {
            data.fullName = `${(data.firstName || "").trim()} ${(data.lastName || "").trim()}`.trim();
        }
        data.email = data.email ? data.email.trim() : null;
        data.firstName = data.firstName ? data.firstName.trim() : null;
        data.lastName = data.lastName ? data.lastName.trim() : null;
        return data;
    }
    /**
     * Maps the users data to show only the current tenant related info
     */
    static _mapUserForTenantForRows(rows, tenant) {
        if (!rows) {
            return rows;
        }
        return rows.map((record) => this._mapUserForTenant(record, tenant));
    }
    /**
     * Maps the user data to show only the current tenant related info
     */
    static _mapUserForTenant(user, tenant) {
        if (!user || !user.tenants) {
            return user;
        }
        const tenantUser = user.tenants.find((tenantUser) => tenantUser &&
            tenantUser.tenant &&
            String(tenantUser.tenant.id) === String(tenant.id));
        delete user.tenants;
        const status = tenantUser ? tenantUser.status : "active";
        const roles = tenantUser ? tenantUser.roles : ["member"];
        // If the user is only invited,
        // tenant members can only see its email
        const otherData = status === "active" ? user.toObject() : {};
        return Object.assign(Object.assign({}, otherData), { id: user.id, email: user.email, phoneNumber: user.phoneNumber, firstName: user.firstName, lastName: user.lastName, fullName: user.fullName, passportNumber: user.passportNumber, country: user.country, withdrawPassword: user.withdrawPassword, balance: user.balance, invitationcode: user.invitationcode, nationality: user.nationality, refcode: user.refcode, roles,
            status });
    }
    static _mapUserForTenantMobile(user, tenant) {
        if (!user || !user.tenants) {
            return user;
        }
        const tenantUser = user.tenants.find((tenantUser) => tenantUser &&
            tenantUser.tenant &&
            String(tenantUser.tenant.id) === String(tenant.id));
        // delete user.tenants;
        const status = "active";
        const roles = ["member"];
        // If the user is only invited,
        // tenant members can only see its email
        const otherData = status === "active" ? user.toObject() : {};
        return Object.assign(Object.assign({}, otherData), { id: user.id, email: user.email, phoneNumber: user.phoneNumber, firstName: user.firstName, lastName: user.lastName, fullName: user.fullName, passportNumber: user.passportNumber, country: user.country, withdrawPassword: user.withdrawPassword, balance: user.balance, invitationcode: user.invitationcode, nationality: user.nationality, refcode: user.refcode, roles,
            status });
    }
    static findByRoleAutocomplete(search, limit, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant1 = mongooseRepository_1.default.getCurrentTenant(options);
            let criteriaAnd = [
                {
                    tenants: {
                        $elemMatch: { tenant: currentTenant1.id },
                    },
                },
            ];
            if (search) {
                criteriaAnd.push({
                    $or: [
                        {
                            _id: mongooseQueryUtils_1.default.uuid(search),
                        },
                        {
                            fullName: {
                                $regex: mongooseQueryUtils_1.default.escapeRegExp(search),
                                $options: "i",
                            },
                        },
                        {
                            email: {
                                $regex: mongooseQueryUtils_1.default.escapeRegExp(search),
                                $options: "i",
                            },
                        },
                    ],
                });
            }
            const sort = mongooseQueryUtils_1.default.sort("fullName_ASC");
            const limitEscaped = Number(limit || 0) || undefined;
            const criteria = { $and: criteriaAnd };
            let users = yield (0, user_1.default)(options.database)
                .find(criteria)
                .limit(limitEscaped)
                .sort(sort);
            users = this._mapUserForTenantForRows(users, currentTenant1);
            const buildText = (user) => {
                if (!user.fullName) {
                    return user.email;
                }
                return `${user.fullName} <${user.email}>`;
            };
            return users.map((user) => ({
                id: user.id,
                label: buildText(user),
            }));
        });
    }
    static _fillRelationsAndFileDownloadUrls(record, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!record) {
                return null;
            }
            const output = record.toObject ? record.toObject() : record;
            if (output.tenants && output.tenants.length) {
                yield Promise.all(output.tenants.map((userTenant) => __awaiter(this, void 0, void 0, function* () {
                    userTenant.tenant.settings = yield settingsRepository_1.default.find(Object.assign({ currentTenant: userTenant.tenant }, options));
                })));
            }
            output.avatars = yield fileRepository_1.default.fillDownloadUrl(output.avatars);
            output.passportPhoto = yield fileRepository_1.default.fillDownloadUrl(output.passportPhoto);
            output.passportDocument = yield fileRepository_1.default.fillDownloadUrl(output.passportDocument);
            return output;
        });
    }
    static createFromSocial(provider, providerId, email, emailVerified, firstName, lastName, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {
                email,
                emailVerified,
                providerId,
                provider,
                firstName,
                lastName,
            };
            data = this._preSave(data);
            let [user] = yield (0, user_1.default)(options.database).create([data], options);
            return this.findById(user.id, Object.assign(Object.assign({}, options), { bypassPermissionValidation: true }));
        });
    }
    static CountUser(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let rows = yield (0, user_1.default)(options.database).aggregate([
                { $group: { _id: null, count: { $sum: 1 } } },
            ]);
            return rows;
        });
    }
    static CountUsers(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield mongooseRepository_1.default.wrapWithSessionIfExists((0, user_1.default)(options.database).countDocuments(), options);
            return count;
        });
    }
}
exports.default = UserRepository;
//# sourceMappingURL=userRepository.js.map