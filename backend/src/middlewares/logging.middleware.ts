import { Request, Response, NextFunction, RequestHandler } from "express";
import logging from "../lib/logging";


const loggingMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    logging.info(
        "Server",
        `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
    );

    res.on('finish', () => {
        logging.info(
            "Server",
            `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
        );
    });

    next();
}

export default loggingMiddleware;