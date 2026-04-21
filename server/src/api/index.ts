
import express from "express";
import cors from "cors";
import { authMiddleware } from "../middlewares/authMiddleware";
import { tenantMiddleware } from "../middlewares/tenantMiddleware";
import { databaseMiddleware } from "../middlewares/databaseMiddleware";
import bodyParser from "body-parser";
import helmet from "helmet";
import { languageMiddleware } from "../middlewares/languageMiddleware";
import setupSwaggerUI from "./apiDocumentation";
import { Server as SocketIOServer } from "socket.io";
import { createServer } from "http";
import { setSocketIO } from "../services/notificationServices";




const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling"],
});

setSocketIO(io);

// Enables CORS
app.use(cors({ origin: true }));

// Initializes and adds the database middleware.
app.use(databaseMiddleware);

// Sets the current language of the request
app.use(languageMiddleware);

// Configures the authentication middleware
// to set the currentUser to the requests
app.use(authMiddleware);

// Setup the Documentation
setupSwaggerUI(app);

// Enables Helmet, a set of tools to
// increase security.
app.use(helmet());

// Parses the body of POST/PUT request
// to JSON
app.use(
  bodyParser.json({
    verify: function (req, res, buf) {
      const url = (<any>req).originalUrl;
      if (url.startsWith("/api/plan/stripe/webhook")) {
        // Stripe Webhook needs the body raw in order
        // to validate the request
        (<any>req).rawBody = buf.toString();
      }
    },
  })
);

// Configure the Entity routes
const routes = express.Router();

require("./auth").default(routes);
require("./single").default(routes);
require("./user").default(routes);
require("./settings").default(routes);
require("./userActivity").default(routes);

// Loads the Tenant if the :tenantId param is passed
routes.param("tenantId", tenantMiddleware);

// Add the routes to the /api endpoint
app.use("/api", routes);

export default server;
