const fs = require('fs');

const { knex } = require('./');

const createSchema = fs.readFileSync('sql/createSchema.sql').toString();
const dropSchema = fs.readFileSync('sql/dropSchema.sql').toString();

// Initial table creation
const runCreateSchema = async () => knex.schema.raw(createSchema)
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Careful!
const runDropSchema = async () => knex.schema.raw(dropSchema)
  .then(res => console.log(res))
  .catch(err => console.error(err));

runCreateSchema();
// runDropSchema();
