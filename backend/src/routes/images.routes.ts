import { Router } from "express";
import config from "../config/general.config";
import { addImage, deleteImage } from "../controllers/images.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const imagesRouter = Router();

imagesRouter.post('/images', isAuthenticated, config.mongo.upload.single("uploadedImage"), addImage);
imagesRouter.delete('/images/:imageId', isAuthenticated, deleteImage);

export default imagesRouter;