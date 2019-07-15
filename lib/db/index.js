require('../../config');

const knex = require('knex')({
  client: 'postgres',
  connection: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  },
  pool: { min: 0, max: 10 },
});

const logger = require('../logger');

const runQuery = async (text, values) => {
  const start = Date.now();

  knex.raw(text, values)
    .then((res) => {
      const duration = Date.now() - start;

      logger.debug(JSON.stringify(res, null, 2));
      logger.info(`QUERY: ${ text } | duration: ${ duration }ms`);
    })
    .catch(err => logger.error(err.stack));
};

module.exports = {
  knex,
  runQuery,
};
