// Importing winston
import winston, { format } from 'winston'
// Importing app-root-path
import appRoot from 'app-root-path'
// Component to create the formate 
const {combine, timestamp, colorize, printf, uncolorize, json } = format;
// Color to log
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'green'
};
winston.addColors(colors);
// Console format
const myFormat = combine(
    colorize ({all: true}),
    timestamp(),
    printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
)

const myFileFormat = combine(
    uncolorize(),
    timestamp(),
    json()
)

const options = {
    infoFile: {
        level: 'info',
        filename: `${appRoot}/server/logs/info.log`,
        handleExceptions: true,
        maxSize: 5242880,
        maxFiles: 5,
        format: myFileFormat
    },
    warnFile: {
        level: 'warn',
        filename: `${appRoot}/server/logs/warns.log`,
        handleExceptions: true,
        maxSize: 5242880,
        maxFiles: 5,
        format: myFileFormat
    },
    errorFile: {
        level: 'error',
        filename: `${appRoot}/server/logs/erros.log`,
        handleExceptions: true,
        maxSize: 5242880,
        maxFiles: 5,
        format: myFileFormat
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        format: myFormat
    }
};

// Crate instance for logger
const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.infoFile),
        new winston.transports.File(options.warnFile),
        new winston.transports.File(options.errorFile),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false
})

logger.stream = {
    write(message){
        logger.info(message);
    }
}

export default logger;
