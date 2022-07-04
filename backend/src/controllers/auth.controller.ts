import { Request, Response, NextFunction, RequestHandler } from 'express';

const NAMESPACE = "Auth Controller";

export const register: RequestHandler = (req: Request, res: Response, next: NextFunction) => {};

export const login: RequestHandler = (req: Request, res: Response, next: NextFunction) => {};

export const logout: RequestHandler = (req: Request, res: Response, next: NextFunction) => {};
