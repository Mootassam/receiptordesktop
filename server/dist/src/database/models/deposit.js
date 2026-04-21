"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.default = (database) => {
    try {
        return database.model("deposit");
    }
    catch (error) {
        // continue, because model doesnt exist
    }
    const DepositSchema = new Schema({
        orderno: {
            type: String,
            required: true,
        },
        amount: {
            type: String,
            required: true,
        },
        txid: {
            type: String,
            required: true,
        },
        network: {
            type: String,
            ref: "depositNetwork",
            required: true,
        },
        rechargechannel: {
            type: String,
            required: true,
        },
        rechargetime: {
            type: String,
            required: true,
        },
        auditor: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        acceptime: {
            type: Date,
        },
        status: {
            type: String,
            enum: ["pending", "canceled", "success"],
            default: "pending",
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
    DepositSchema.index({ importHash: 1, tenant: 1 }, {
        unique: true,
        partialFilterExpression: {
            importHash: { $type: "string" },
        },
    });
    DepositSchema.virtual("id").get(function () {
        // @ts-ignore
        return this._id.toHexString();
    });
    DepositSchema.set("toJSON", {
        getters: true,
    });
    DepositSchema.set("toObject", {
        getters: true,
    });
    return database.model("deposit", DepositSchema);
};
//# sourceMappingURL=deposit.js.map