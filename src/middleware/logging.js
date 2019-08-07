const winston = require('winston');
require('winston-mongodb');
const config = require('config');

const url = process.env.MONGO_LOGGING || config.get('MONGO_LOGGING');

module.exports = winston.createLogger({
        // error
        // warn
        // info
        // verbose
        // debug
        // silly
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.MongoDB({
                db: url,
                collection: 'log'})
        ],
        exceptionHandlers: [
            new winston.transports.Console(),
        ]
    }
);
