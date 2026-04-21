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
exports.setSocketIO = void 0;
exports.sendNotification = sendNotification;
const notificationtRepository_1 = __importDefault(require("../database/repositories/notificationtRepository"));
let io;
// Initialize io instance
const setSocketIO = (socketIOInstance) => {
    io = socketIOInstance;
    // initialize maps
    io.users = io.users || {};
    io.admins = io.admins || {};
    io.on("connection", (socket) => {
        // Send immediate success message (optional)
        socket.emit("success", "Connected successfully!");
        // Register user/admin
        socket.on("register", ({ userId, isAdmin }) => {
            if (!userId)
                return;
            if (isAdmin) {
                io.admins[userId] = socket.id;
            }
            else {
                io.users[userId] = socket.id;
            }
        });
        // Handle disconnect
        socket.on("disconnect", () => {
            for (const [id, sid] of Object.entries(io.users)) {
                if (sid === socket.id)
                    delete io.users[id];
            }
            for (const [id, sid] of Object.entries(io.admins)) {
                if (sid === socket.id)
                    delete io.admins[id];
            }
        });
    });
};
exports.setSocketIO = setSocketIO;
function sendNotification(_a) {
    return __awaiter(this, arguments, void 0, function* ({ userId, message, type, forAdmin = false, options, }) {
        // Save notification to DB
        const data = {
            userId,
            message,
            type,
            forAdmin,
        };
        let notif;
        // Emit real-time
        if (forAdmin) {
            io.emit("admin", type);
        }
        else if (userId) {
            const notif = yield notificationtRepository_1.default.create(data, options);
            const unread = yield notificationtRepository_1.default.unread(options);
            const socketId = io.users[userId];
            if (socketId) {
                io.to(socketId).emit("newNotification", unread);
            }
            else {
            }
        }
        return notif;
    });
}
//# sourceMappingURL=notificationServices.js.map