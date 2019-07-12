require('../config');

const winston = require('winston');
const WinstonCloudwatch = require('winston-cloudwatch');

const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV === 'development') {
  winston.loggers.add('info-log', {
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple(),
        ),
        level: 'debug',
      }),
    ],
  });
} else {
  winston.loggers.add('info-log', {
    transports: [
      new WinstonCloudwatch({
        logGroupName: `${ process.env.LOG_NAME }`,
        logStreamName: `${ process.env.LOG_NAME } — ${ NODE_ENV }`,
        awsRegion: `${ process.env.AWS_REGION }`,
        jsonMessage: true,
      }),
      new winston.transports.File({
        filename: process.env.LOG_FILE,
        level: 'info',
        jsonMessage: true,
      }),
    ],
  });
}

const logger = winston.loggers.get('info-log');

module.exports = logger;
