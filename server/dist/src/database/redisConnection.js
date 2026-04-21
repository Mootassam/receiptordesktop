"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
// const REDIS_URL = process.env.REDIS_URL || 'redis://:91l3C92VHX9OytcgcV@redis:6379';
const REDIS_URL = 'redis://localhost:6379';
class RedisService {
    static getClient() {
        if (!this.client) {
            this.client = new ioredis_1.default(REDIS_URL);
            this.client.on("connect", () => {
                console.log("✅ Redis connected");
            });
            this.client.on("error", (err) => {
                console.error("❌ Redis connection error:", err);
            });
        }
        return this.client;
    }
}
exports.RedisService = RedisService;
//# sourceMappingURL=redisConnection.js.map