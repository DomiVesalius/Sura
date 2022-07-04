import { Session } from "express-session";

declare module 'express' {
    export interface Request {
        username?: string;
        password?: string;
        session?: Session;
    }
}

declare module 'express-session' {
    export interface Session {
        username?: string;
    }
}