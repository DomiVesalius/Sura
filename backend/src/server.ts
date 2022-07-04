import express from 'express';
import bodyParser from "body-parser";
import loggingMiddleware from "./middlewares/logging.middleware";
import rulesMiddleware from "./middlewares/rules.middleware";
import sessionMiddleware from "./middlewares/session.middleware";
import config from "./config/general.config";
import authRouter from "./routes/auth.route";
import logging from "./lib/logging";

const NAMESPACE = 'Server';
const server = express();

// Logging requests
server.use(loggingMiddleware);

// Parsing requests
server.use(bodyParser.urlencoded( { extended: false }));
server.use(bodyParser.json());
server.use(sessionMiddleware);

// API Rules
server.use(rulesMiddleware);

// Routes
server.use('/api', authRouter);

// Error Handling
server.use((req, res, next) => {
    const error = new Error("Not Found");
    return res.status(404).json({ message: error.message });
})

server.listen(config.server.port, () => {
    logging.info(
        NAMESPACE,
        `Server running on http://${config.server.hostname}:${config.server.port}`
    );
});