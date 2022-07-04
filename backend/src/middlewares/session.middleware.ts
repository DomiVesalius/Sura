import { Request, Response, NextFunction, RequestHandler } from 'express';
import session from "express-session";
import config from "../config/general.config";

const sessionMiddleware = session({
    secret: config.server.sessionSecret,
    resave: false,
    saveUninitialized: true
});

export default sessionMiddleware;