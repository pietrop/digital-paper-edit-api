const fs = require('fs');

const { knex } = require('./');

const createSchema = fs.readFileSync('sql/createSchema.sql').toString();
const dropSchema = fs.readFileSync('sql/dropSchema.sql').toString();

// Initial table creation
const runCreateSchema = async () => knex.schema.raw(createSchema);

// Careful!
const runDeleteSchema = async () => knex.schema.raw(dropSchema);

// runCreateSchema();
// runDeleteSchema();
