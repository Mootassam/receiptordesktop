"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Dates_1 = __importDefault(require("../utils/Dates"));
const Schema = mongoose_1.default.Schema;
exports.default = (database) => {
    try {
        return database.model("records");
    }
    catch (error) {
        // continue, because model doesnt exist
    }
    const RecordSchema = new Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        date: {
            type: Date,
            default: Dates_1.default.getDate(),
        },
        datecreation: {
            type: Date,
        },
        number: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        profit: {
            type: Number,
            required: true,
        },
        coin: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        commission: {
            type: Number,
        },
        time: {
            type: Number,
            // required: true,
        },
        tenant: {
            type: Schema.Types.ObjectId,
            ref: "tenant",
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
    RecordSchema.index({ importHash: 1, tenant: 1 }, {
        unique: true,
        partialFilterExpression: {
            importHash: { $type: "string" },
        },
    });
    RecordSchema.virtual("id").get(function () {
        // @ts-ignore
        return this._id.toHexString();
    });
    RecordSchema.set("toJSON", {
        getters: true,
    });
    RecordSchema.set("toObject", {
        getters: true,
    });
    return database.model("records", RecordSchema);
};
//# sourceMappingURL=records.js.map