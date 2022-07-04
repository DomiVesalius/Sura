import dotenv from 'dotenv';

dotenv.config();

const HOST_NAME = process.env.HOST_NAME || 'localhost';
const PORT = parseInt(process.env.PORT || '8080');
const SESSION_SECRET = process.env.SESSION_SECRET || 'Change this Secret';

const SERVER = {
    hostname: HOST_NAME,
    port: PORT,
    sessionSecret: SESSION_SECRET
};

export default SERVER;