import dotenv from 'dotenv';
import mongoose from "mongoose";
import multer from 'multer';
import loggingMiddleware from "../middlewares/logging.middleware";
dotenv.config();

const NAMESPACE = "DatabaseConfig"

const UPLOADS = multer({ dest: 'uploads' });

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 10000,
    keepAlive: true,
    autoIndex: false,
    retryWrites: false
};

const MONGO_PORT = parseInt(`${process.env.MONGO_PORT}` || '27017');
const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'database';

const MONGO = {
    host: MONGO_HOST,
    options: MONGO_OPTIONS,
    url: `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`,
    upload: UPLOADS
};

mongoose.connect(MONGO.url, MONGO.options)
    .then(result => loggingMiddleware.info(NAMESPACE, `Connected to Database @ ${MONGO_HOST}:${MONGO_PORT}`))
    .catch(error => loggingMiddleware.error(NAMESPACE, error.message, error));

export default MONGO;