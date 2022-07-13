import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { addComment, deleteComment, getComments } from "../controllers/comments.controller";

const commentsRouter = Router();

commentsRouter.post('/images/comments', isAuthenticated, addComment);
commentsRouter.get('/images/:imageId/comments/', isAuthenticated, getComments);
commentsRouter.delete('/images/comments/:commentId', isAuthenticated, deleteComment);

export default commentsRouter;