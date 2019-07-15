exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_projects').del()
    .then(() =>
    // Inserts seed entries
      knex('user_projects').insert([
        {
          id: 1,
          user_id: 'nigel@email.com',
          project_id: 10,
          created_at: '2004 - 10 - 19 10: 23: 54+02',
          updated_at: '2004 - 10 - 19 13: 23: 54+02',
        },
        {
          id: 2,
          user_id: 'nakaz@email.com',
          project_id: 11,
          created_at: '2004 - 10 - 19 10: 23: 54+02',
          updated_at: '2004 - 10 - 19 13: 23: 54+02',
        },
        {
          id: 3,
          user_id: 'jaywon@email.com',
          project_id: 12,
          created_at: '2004 - 10 - 19 10: 23: 54+02',
          updated_at: '2004 - 10 - 19 13: 23: 54+02',
        },

      ]));
};
