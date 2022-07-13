import express from 'express';
import bodyParser from "body-parser";
import loggingMiddleware from "./middlewares/logging.middleware";
import rulesMiddleware from "./middlewares/rules.middleware";
import sessionMiddleware from "./middlewares/session.middleware";
import config from "./config/general.config";
import authRouter from "./routes/auth.routes";
import logging from "./lib/logging";
import errorsMiddleware from "./middlewares/errors.middleware";
import imagesRouter from "./routes/images.routes";
import commentsRouter from "./routes/comments.routes";

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
server.use('/api', imagesRouter);
server.use('/api', commentsRouter);

// Error Handling
server.use(errorsMiddleware)

server.listen(config.server.port, () => {
    logging.info(
        NAMESPACE,
        `Server running on http://${config.server.hostname}:${config.server.port}`
    );
});