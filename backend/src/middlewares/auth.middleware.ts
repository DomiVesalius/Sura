import { Request, Response, NextFunction, RequestHandler } from 'express';

export const isAuthenticated: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.username) return res.status(401).json({ message: 'Access Denied' });
    next();
};
