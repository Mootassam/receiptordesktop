"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const fileSchema_1 = __importDefault(require("./schemas/fileSchema"));
const tenantUserSchema_1 = __importDefault(require("./schemas/tenantUserSchema"));
const Schema = mongoose_1.default.Schema;
exports.default = (database) => {
    try {
        return database.model("user");
    }
    catch (error) {
        // continue, because model doesnt exist
    }
    const UserSchema = new Schema({
        fullName: { type: String, maxlength: 255 },
        username: { type: String },
        refcode: { type: String, unique: true },
        invitationcode: {
            type: String,
            default: "NX25306510",
        },
        hasDeposited: { type: Boolean, default: false },
        // 🟩 New field to track if user completed their first deposit
        firstDepositDone: { type: Boolean, default: false },
        firstStackingDone: { type: Boolean, default: false },
        phoneNumber: { type: String, maxlength: 24 },
        gender: { type: String, maxlength: 24 },
        ipAddress: { type: String },
        country: { type: String },
        withdrawPassword: { type: String },
        walletname: { type: String },
        usernamewallet: { type: String },
        wallet: {
            USDT: { address: "" },
            BTC: { address: "" },
            ETH: { address: "" },
            SOL: { address: "" },
            XRP: { address: "" },
        },
        // grab: { type: Boolean, default: false },
        // withdraw: { type: Boolean, default: false },
        // tasksDone: { type: Number, default: 0 },
        // balance: { type: Number, default: 0 },
        // freezeblance: { type: Number, default: 0 },
        score: { type: Number, default: 100 },
        email: { type: String, maxlength: 255, index: { unique: true } },
        password: { type: String, maxlength: 255, select: false },
        kyc: { type: Boolean, default: false },
        emailVerified: { type: Boolean, default: false },
        emailVerificationToken: { type: String, maxlength: 255, select: false },
        emailVerificationTokenExpiresAt: { type: Date },
        passwordResetToken: { type: String, maxlength: 255, select: false },
        passwordResetTokenExpiresAt: { type: Date },
        avatars: [fileSchema_1.default],
        tenants: [tenantUserSchema_1.default],
        jwtTokenInvalidBefore: { type: Date },
        createdBy: { type: Schema.Types.ObjectId, ref: "user" },
        updatedBy: { type: Schema.Types.ObjectId, ref: "user" },
        importHash: { type: String, maxlength: 255 },
        // Device binding (prevents credential sharing between PCs)
        deviceBinding: {
            machineIdHash: { type: String, maxlength: 128 },
            fingerprintHash: { type: String, maxlength: 128 },
            cpu: { type: String, maxlength: 255 },
            ramGB: { type: Number },
            osPlatform: { type: String, maxlength: 64 },
            osRelease: { type: String, maxlength: 128 },
            winVersion: { type: String, maxlength: 255 },
            manufacturer: { type: String, maxlength: 255 },
            model: { type: String, maxlength: 255 },
            firstBoundAt: { type: Date },
            lastSeenAt: { type: Date },
        },
    }, {
        timestamps: true,
    });
    UserSchema.index({ importHash: 1 }, {
        unique: true,
        partialFilterExpression: {
            importHash: { $type: "string" },
        },
    });
    UserSchema.virtual("id").get(function () {
        // @ts-ignore
        return this._id.toHexString();
    });
    UserSchema.set("toJSON", {
        getters: true,
    });
    UserSchema.set("toObject", {
        getters: true,
    });
    return database.model("user", UserSchema);
};
//# sourceMappingURL=user.js.map