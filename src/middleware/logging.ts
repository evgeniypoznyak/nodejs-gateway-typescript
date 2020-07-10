import winston from 'winston';
import config from 'config';
require('winston-mongodb');
const url = process.env.MONGO_LOGGING || config.get('MONGO_LOGGING');

export default winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        // @ts-ignore
        new winston.transports.MongoDB({
            db: url,
            collection: 'log',
        }),
    ],
    exceptionHandlers: [
        new winston.transports.Console(),
    ],
}
);
