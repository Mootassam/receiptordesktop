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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseInit = databaseInit;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const models_1 = __importDefault(require("./models"));
function databaseInit() {
    return __awaiter(this, void 0, void 0, function* () {
        if (mongoose_1.default.connection.readyState) {
            return mongoose_1.default;
        }
        const uri = (0, config_1.getConfig)().DATABASE_CONNECTION;
        if (!uri) {
            throw new Error('❌ DATABASE_CONNECTION (Mongo URI) is missing from config/env');
        }
        return mongoose_1.default
            .connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(() => {
            (0, models_1.default)(mongoose_1.default);
            console.log('✅ MongoDB connected');
            return mongoose_1.default;
        })
            .catch((error) => {
            console.error('❌ MongoDB connection error', error);
            throw error;
        });
    });
}
//# sourceMappingURL=databaseConnection.js.map