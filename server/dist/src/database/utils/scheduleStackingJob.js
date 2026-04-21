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
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleStackingJob = scheduleStackingJob;
const stackingQueue_1 = require("./stackingQueue");
function scheduleStackingJob(record, tenant) {
    return __awaiter(this, void 0, void 0, function* () {
        // Calculate delay based on when the stacking period ends
        const now = new Date();
        const endDate = new Date(record.endDate); // Use the actual endDate from the stacking record
        // Calculate delay in milliseconds until the end date
        const delayMs = endDate.getTime() - now.getTime();
        // If the end date is in the past, process immediately (delay = 0)
        const finalDelay = Math.max(0, delayMs);
        console.log("🚀 ~ scheduleStackingJob ~ finalDelay:", finalDelay);
        yield stackingQueue_1.stackingQueue.add(`auto-finalize-${record.id}-${Date.now()}`, { stackingId: record.id, tenantId: tenant.id }, {
            delay: finalDelay,
            attempts: 3,
            backoff: { type: "exponential", delay: 1000 },
        });
        console.log(`⏰ Job scheduled for ${new Date(now.getTime() + finalDelay)} (in ${Math.round(finalDelay / 1000)} seconds)`);
    });
}
//# sourceMappingURL=scheduleStackingJob.js.map