const winston = require('winston');
const WinstonCloudwatch = require('winston-cloudwatch');
require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV === 'development') {
  winston.loggers.add('info-log', {
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true,
        level: 'info',
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
        filename: process.env.LOG_NAME,
        level: 'info',
        jsonMessage: true,
      }),
    ],
  });
}

const logger = winston.loggers.get('info-log');

module.exports = logger;
