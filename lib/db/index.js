require('../../config');

const fs = require('fs');
const { Pool } = require('pg');

const logger = require('../logger');

const schema = fs.readFileSync('sql/createSchema.sql').toString();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  timeout: 60000,
});

const connectToDb = async () => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    console.log('BEGIN');
  } catch (e) {
    await client.query('ROLLBACK');
    console.log('ROLLBACK');
  } finally {
    client.release();
    pool.end();
    console.log('FINISHED');
  }
};

const runQuery = async (text, values) => {
  const client = await pool.connect();

  const start = Date.now();
  client.query(text, values)
    .then((res) => {
      const duration = Date.now() - start;

      logger.debug(JSON.stringify(res, null, 4));
      logger.info(`QUERY: ${ text } | duration: ${ duration }`);
    })
    .catch(err => logger.error(err.message));
};

const createSchema = async () => runQuery(schema);

module.exports = {
  connectToDb,
  runQuery,
};

// createSchema();

const query = `
  SELECT NOW()
`;

runQuery(query);
