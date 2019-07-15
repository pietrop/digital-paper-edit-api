const { knex, runQuery } = require('./');

const sampleProjects = require('../../sample-data/projects.sample.json');

const projects = () => knex('Users')
  .insert({
    name: 'Louis Theroux',
    email: 'test.email@bbc.co.uk',
  });

const query = `
  SELECT * FROM information_schema.columns
`;

// projects();
runQuery(query);
