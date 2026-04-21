"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const tenantMiddleware_1 = require("../middlewares/tenantMiddleware");
const databaseMiddleware_1 = require("../middlewares/databaseMiddleware");
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const apiRateLimiter_1 = require("./apiRateLimiter");
const languageMiddleware_1 = require("../middlewares/languageMiddleware");
const authSocial_1 = __importDefault(require("./auth/authSocial"));
const apiDocumentation_1 = __importDefault(require("./apiDocumentation"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const notificationServices_1 = require("../services/notificationServices");
const rates_cron_1 = require("../database/utils/rates.cron");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
    transports: ["websocket", "polling"],
});
(0, notificationServices_1.setSocketIO)(io);
(0, rates_cron_1.startRatesCron)();
// Enables CORS
app.use((0, cors_1.default)({ origin: true }));
// Initializes and adds the database middleware.
app.use(databaseMiddleware_1.databaseMiddleware);
// Sets the current language of the request
app.use(languageMiddleware_1.languageMiddleware);
// Configures the authentication middleware
// to set the currentUser to the requests
app.use(authMiddleware_1.authMiddleware);
// Setup the Documentation
(0, apiDocumentation_1.default)(app);
// Default rate limiter
const defaultRateLimiter = (0, apiRateLimiter_1.createRateLimiter)({
    max: 50000,
    windowMs: 1 * 60 * 1000,
    message: "errors.429",
});
app.use(defaultRateLimiter);
// Enables Helmet, a set of tools to
// increase security.
app.use((0, helmet_1.default)());
// Parses the body of POST/PUT request
// to JSON
app.use(body_parser_1.default.json({
    verify: function (req, res, buf) {
        const url = req.originalUrl;
        if (url.startsWith("/api/plan/stripe/webhook")) {
            // Stripe Webhook needs the body raw in order
            // to validate the request
            req.rawBody = buf.toString();
        }
    },
}));
// Configure the Entity routes
const routes = express_1.default.Router();
// Enable Passport for Social Sign-in
(0, authSocial_1.default)(app, routes);
require("./auditLog").default(routes);
require("./auth").default(routes);
require("./plan").default(routes);
require("./tenant").default(routes);
require("./single").default(routes);
require("./file").default(routes);
require("./user").default(routes);
require("./settings").default(routes);
// Loads the Tenant if the :tenantId param is passed
routes.param("tenantId", tenantMiddleware_1.tenantMiddleware);
// Add the routes to the /api endpoint
app.use("/api", routes);
exports.default = server;
//# sourceMappingURL=index.js.map