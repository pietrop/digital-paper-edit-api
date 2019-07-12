const fs = require('fs');
const dotenv = require('dotenv');

const logger = require('../lib/logger');

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

if (process.env.NODE_ENV !== 'development') {
  try {
    const envConfig = dotenv.parse(fs.readFileSync('.env.override'));
    envConfig.forEach((k) => {
      process.env[k] = envConfig[k];
    });
  } catch (err) {
    logger.info('No override file found');
  }
}
