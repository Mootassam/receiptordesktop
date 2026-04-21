"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.default = (database) => {
    try {
        return database.model("Transfer");
    }
    catch (error) {
        // continue, because model doesn’t exist
    }
    const TransferSchema = new Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        symbol: {
            type: String,
            required: true, // e.g. "USDT" / "BTC"
        },
        fromAccount: {
            type: String,
            enum: ["exchange", "trade", "perpetual"],
            required: true,
        },
        toAccount: {
            type: String,
            enum: ["exchange", "trade", "perpetual"],
            required: true,
        },
        amount: {
            type: String,
            required: true,
            min: 0,
            default: 0,
        },
        status: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "completed",
        },
        tenant: {
            type: Schema.Types.ObjectId,
            ref: "tenant",
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
    }, { timestamps: true });
    TransferSchema.index({ user: 1, symbol: 1, accountType: 1, tenant: 1 }, {
        unique: true,
        partialFilterExpression: {
            importHash: { $type: "string" },
        },
    });
    TransferSchema.virtual("id").get(function () {
        // @ts-ignore
        return this._id.toHexString();
    });
    TransferSchema.set("toJSON", {
        getters: true,
    });
    TransferSchema.set("toObject", {
        getters: true,
    });
    return database.model("Transfer", TransferSchema);
};
//# sourceMappingURL=Transfer.js.map