
import { Queue } from "bullmq";
import { RedisService } from "../redisConnection";

export const STACKING_QUEUE_NAME = "stacking";

// Queue used to schedule stacking auto-finalization
export const stackingQueue = new Queue(STACKING_QUEUE_NAME, {
  connection: RedisService.getClient(),
});
