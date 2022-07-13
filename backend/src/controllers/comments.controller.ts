import { Request, Response, NextFunction, RequestHandler } from "express";
import logging from "../lib/logging";

const NAMESPACE = 'Comments Controller';

export const addComment: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {};

export const deleteComment: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {};

export const getComments: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {};
