import { Router } from 'express';
import config from '../config/general.config';
import { addImage, deleteImage, getImageWithId } from '../controllers/images.controller';
import { isAuthenticated } from '../middlewares/auth.middleware';

const imagesRouter = Router();

imagesRouter.post('/images', isAuthenticated, config.mongo.upload.single('uploadedImage'), addImage);

imagesRouter.get('/images/:imageId', isAuthenticated, getImageWithId);

imagesRouter.delete('/images/:imageId', isAuthenticated, deleteImage);

export default imagesRouter;
