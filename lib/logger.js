const logger = require('winston');
const CloudWatchTransport = require('winston-cloudwatch');

const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  logGroupName: process.env.LOG_NAME,
  logStreamName: NODE_ENV,
  createLogGroup: false,
  createLogStream: true,
  awsConfig: {
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
  },
  formatLog(item) {
    return `${ item.level }: ${ item.message }`;
  },
};

if (process.env.NODE_ENV === 'production') {
  logger.add(CloudWatchTransport, config);
  logger.level = process.env.LOG_LEVEL;
  logger.stream = {
    write(message) {
      logger.info(message);
    },
  };
} else {
  logger.add(new
  logger.transports.Console({
    format: logger.format.combine(
      logger.format.colorize(),
      logger.format.simple(),
    ),
  }));
}

module.exports = logger;
