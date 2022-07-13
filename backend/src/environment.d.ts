declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            HOST_NAME: string;
            SESSION_SECRET: string;
            MONGO_PORT: number;
            MONGO_HOST: string;
            MONGO_DB_NAME: string;
        }
    }
}

export {};
