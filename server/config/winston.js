// Importando a winston
import winston, { formar } from 'winston';
import appRoot from 'app-root-path' ;

// Componentes para crear el formato personalizado
const { combine, timestamp, printf, uncolorize, json, colorize } = format;
//
// Creando el Perfil de color para el log
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'green',
};
// Agregando el perfil a winston
winston.addColors(colors);

// Formato de consola
const myFormat = combine(
    colorize({ all: true }),
    timestamp(),
    printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

// Formato para la salida de los archivos de log
const myFileFormat = combine(uncolorize(), timestamp(), json());

// Creando objetos de configuracion
const options = {
    infoFile: {
        level: 'info',
        filename: `${appRoot}/server/logs/infos.log`,
        handleExceptions: true,
        maxsize: 5242880, //5MB
        maxFiles: 5,
        format: myFilesFormat,
    },
    warnFile: {
        level: 'warn',
        filename: `${appRoot}/server/logs/warns.log`,
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        format: myFileFormat,
    },
    errorFile: {
        level: 'error',
        filename: `${appRoot}/server/logs/errors.log`,
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        format: myFileFormat,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        format: myFormat,
    },
};

// Creando la instancia del logger
const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.infoFile),
        new winston.transports.File(options.warnFile),
        new winston.transports.File(options.errorFile),
        new winston.transports.Console(options.console),
    ],
    exitOnError: false, //No finaliza en excepciones manejadas
});

// Manejo de un stream de entrada
logger.stream = {
    write(message) {
        logger.info(message);
    },
};

export default logger;
