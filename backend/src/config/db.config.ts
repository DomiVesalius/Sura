import dotenv from 'dotenv';
import mongoose from "mongoose";
import MongoStore from 'connect-mongo';
import multer from 'multer';
import logging from "../lib/logging";
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

const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'database';
const MONGO_URL = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`
const SESSION_STORE = MongoStore.create({
    mongoUrl: MONGO_URL,
    collectionName: 'sessions'
});

const MONGO = {
    host: MONGO_HOST,
    options: MONGO_OPTIONS,
    url: MONGO_URL,
    upload: UPLOADS,
    sessionStore: SESSION_STORE
};

mongoose.connect(MONGO.url, MONGO.options)
    .then(result => logging.info(NAMESPACE, `Connected to Database @ ${MONGO_HOST}:${MONGO_PORT}`))
    .catch(error => logging.error(NAMESPACE, error.message, error));

export default MONGO;
