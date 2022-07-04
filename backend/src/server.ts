import express from 'express';
import bodyParser from "body-parser";
import loggingMiddleware from "./middlewares/logging.middleware";
import config from "./config/general.config";
import authRouter from "./routes/auth.route";

const NAMESPACE = 'Server';
const server = express();

// Logging requests
server.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    loggingMiddleware.info(
        NAMESPACE,
        `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
    );

    res.on('finish', () => {
        loggingMiddleware.info(
            NAMESPACE,
            `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
        );
    });

    next();
});

// Parsing requests
server.use(bodyParser.urlencoded( { extended: false }));
server.use(bodyParser.json());

// API Rules
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json();
    }

    next();
});

// Routes
server.use('/api', authRouter);

// Error Handling
server.use((req, res, next) => {
    const error = new Error("Not Found");
    return res.status(404).json({ message: error.message });
})

server.listen(config.server.port, () => {
    loggingMiddleware.info(
        NAMESPACE,
        `Server running on http://${config.server.hostname}:${config.server.port}`
    );
});