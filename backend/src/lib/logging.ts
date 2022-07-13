import chalk from 'chalk';

function getTimeStamp(): string {
    return new Date().toISOString();
}

function info(namespace: string, message: string, object?: any): void {
    if (object) {
        console.info(chalk.blue(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`), object);
    } else {
        console.info(chalk.blue(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`));
    }
}

function warn(namespace: string, message: string, object?: any): void {
    if (object) {
        console.warn(chalk.yellow(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`), object);
    } else {
        console.warn(chalk.yellow(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`));
    }
}

function error(namespace: string, message: string, object?: any): void {
    if (object) {
        console.error(chalk.red(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`), object);
    } else {
        console.error(chalk.red(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`));
    }
}

function debug(namespace: string, message: string, object?: any): void {
    if (object) {
        console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, object);
    } else {
        console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
    }
}

const logging = {
    info,
    error,
    debug,
    warn
};

export default logging;
