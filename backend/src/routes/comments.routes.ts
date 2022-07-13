import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { addComment, deleteComment, getComments } from "../controllers/comments.controller";

const commentsRouter = Router();

commentsRouter.post('/images/:imageId/comments', isAuthenticated, addComment);
commentsRouter.get('/images/:imageId/comments', isAuthenticated, getComments);
commentsRouter.delete('/images/:imageId/comments/:commentId', isAuthenticated, deleteComment);

export default commentsRouter;