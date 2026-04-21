
import { Queue } from "bullmq";

export const STACKING_QUEUE_NAME = "stacking";

// Queue used to schedule stacking auto-finalization
export const stackingQueue = new Queue(STACKING_QUEUE_NAME, {
  // Default BullMQ connection config
});
