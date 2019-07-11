const { Client } = require('pg');
require('../../config');

const connectToDb = async () => {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    timeout: 60000,
  });

  await client.query('SELECT NOW()', (err, res) => {
    console.log(err, res);
    client.end();
  });

  const createTableText = `
    CREATE TEMP TABLE dates(
    date_col DATE,
    timestamp_col TIMESTAMP
    );
    `;

  const res = await client.query(createTableText);
  console.log(res);
};

module.exports = {
  connectToDb,
};

connectToDb();
