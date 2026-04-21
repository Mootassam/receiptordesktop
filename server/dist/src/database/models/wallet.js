"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.default = (database) => {
    try {
        return database.model("wallet");
    }
    catch (error) {
        // continue, because model doesn’t exist
    }
    const WalletSchema = new Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        symbol: {
            type: String,
            required: true,
        },
        accountType: {
            type: String,
            enum: ["exchange", "trade", "perpetual"],
            required: true,
            default: "exchange",
        },
        coinName: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            default: 0,
        },
        amountFreezed: {
            type: Number,
            required: true,
            default: 0,
        },
        status: {
            type: String,
            enum: ["active", "freezed"],
            default: "active",
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
        importHash: { type: String },
    }, { timestamps: true });
    WalletSchema.index({ user: 1, symbol: 1, accountType: 1, tenant: 1 }, {
        unique: true,
        partialFilterExpression: {
            importHash: { $type: "string" },
        },
    });
    WalletSchema.virtual("id").get(function () {
        // @ts-ignore
        return this._id.toHexString();
    });
    WalletSchema.set("toJSON", {
        getters: true,
    });
    WalletSchema.set("toObject", {
        getters: true,
    });
    return database.model("wallet", WalletSchema);
};
//# sourceMappingURL=wallet.js.map