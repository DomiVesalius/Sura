import session from "express-session";
import config from "../config/general.config";

const sessionMiddleware = session({
    secret: config.server.sessionSecret,
    store: config.mongo.sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
});

export default sessionMiddleware;