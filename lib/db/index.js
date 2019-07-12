require('../../config');

const fs = require('fs');
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

const schema = fs.readFileSync('sql/createSchema.sql').toString();

const runQuery = async (text, values) => {
  const start = Date.now();

  knex.raw(text, values)
    .then((res) => {
      const duration = Date.now() - start;

      logger.debug(JSON.stringify(res, null, 4));
      logger.info(`QUERY: ${ text } | duration: ${ duration }`);
    })
    .catch(err => logger.error(err.stack));
};

const createSchema = async () => knex.schema.raw(schema);

runQuery(schema);

module.exports = {
  runQuery,
};

const query = `
  SELECT NOW()
`;

runQuery(query);

// createSchema();
