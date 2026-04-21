"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stackingQueue = exports.STACKING_QUEUE_NAME = void 0;
const bullmq_1 = require("bullmq");
const redisConnection_1 = require("../redisConnection");
exports.STACKING_QUEUE_NAME = "stacking";
// Queue used to schedule stacking auto-finalization
exports.stackingQueue = new bullmq_1.Queue(exports.STACKING_QUEUE_NAME, {
    connection: redisConnection_1.RedisService.getClient(),
});
//# sourceMappingURL=stackingQueue.js.map