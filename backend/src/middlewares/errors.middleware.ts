import { Request, Response, NextFunction, RequestHandler } from "express";

const errorsMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error("Not Found");
    return res.status(404).json({ message: error.message });
};

export default errorsMiddleware;