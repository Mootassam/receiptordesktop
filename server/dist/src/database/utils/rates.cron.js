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
exports.startRatesCron = startRatesCron;
const axios_1 = __importDefault(require("axios"));
const node_cron_1 = __importDefault(require("node-cron"));
const redisConnection_1 = require("../redisConnection");
const currencies_1 = require("./currencies");
function startRatesCron() {
    const redis = redisConnection_1.RedisService.getClient();
    node_cron_1.default.schedule("* * * * *", () => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        console.log("I am here bro");
        try {
            // 1) Fetch crypto → USD prices
            const cryptoRes = yield axios_1.default.get("https://min-api.cryptocompare.com/data/pricemulti", {
                params: {
                    fsyms: currencies_1.COINS.join(","),
                    tsyms: "USD",
                },
            });
            const cryptoUSD = {};
            for (const symbol of currencies_1.COINS) {
                cryptoUSD[symbol] = (_b = (_a = cryptoRes.data[symbol]) === null || _a === void 0 ? void 0 : _a.USD) !== null && _b !== void 0 ? _b : 0;
            }
            // 2) Fetch USD → FIAT conversion rates  
            const fiatRes = yield axios_1.default.get("https://open.er-api.com/v6/latest/USD");
            const fiatRates = {};
            for (const fiat of currencies_1.FIATS) {
                fiatRates[fiat] = (_c = fiatRes.data.rates[fiat]) !== null && _c !== void 0 ? _c : 1;
            }
            // Save to redis
            redis.set("CRYPTO_USD", JSON.stringify(cryptoUSD));
            redis.set("FIAT_RATES", JSON.stringify(fiatRates));
            console.log("✔ Rates updated");
        }
        catch (err) {
            console.error("Cron error:", err);
        }
    }));
}
//# sourceMappingURL=rates.cron.js.map