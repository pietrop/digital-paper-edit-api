const logger = require('winston');

if (process.env.NODE_ENV === 'production') {
  logger.add(logger.transports.File({
    filename: process.env.LOG_FILE,
    level: process.env.LOG_LEVEL,
    format: logger.format.combine(
      logger.format.timestamp(),
      logger.format.json(),
    ),
  }));
  logger.add(logger.transports.File({
    filename: process.env.LOG_ERROR,
    level: 'error',
    format: logger.format.combine(
      logger.format.timestamp(),
      logger.format.json(),
    ),
  }));
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
