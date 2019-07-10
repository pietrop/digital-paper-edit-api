const winston = require('winston');
const WinstonCloudwatch = require('winston-cloudwatch');
require('dotenv').config();

const NODE_ENV = 'production';

winston.loggers.add('access-log', {
  transports: [
    new WinstonCloudwatch({
      logGroupName: `${ process.env.LOG_NAME }`,
      logStreamName: `${ process.env.LOG_NAME } — ${ NODE_ENV }`,
      awsRegion: `${ process.env.AWS_REGION }`,
      jsonMessage: true,
    }),
  ],
});

if (NODE_ENV === 'development') {
  winston.loggers.add('dev-log', {
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true,
        level: 'info',
      }),
    ],
  });
}

const logg = winston.loggers.get('access-log');

module.exports = logg;
