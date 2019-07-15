exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('annotations').del()
    .then(() =>
    // Inserts seed entries
      knex('annotations').insert([
        {
          id: 1,
          user_id: 'nigel@email.com',
          transcript_id: 1,
          label_id: 1,
          time_start: 14.38,
          time_end: 18.14,
          description: 'A test label for Nigel',
          created_at: '2004 - 10 - 19 10: 23: 54+02',
          updated_at: '2004 - 10 - 19 13: 23: 54+02',
        },
        {
          id: 2,
          user_id: 'nakaz@email.com',
          transcript_id: 1,
          label_id: 1,
          time_start: 24.38,
          time_end: 28.14,
          description: 'A test label for Nazak',
          created_at: '2004 - 10 - 19 10: 23: 54+02',
          updated_at: '2004 - 10 - 19 13: 23: 54+02',
        },
        {
          id: 3,
          user_id: 'jaywon@email.com',
          transcript_id: 1,
          label_id: 1,
          time_start: 44.38,
          time_end: 58.14,
          description: 'A test label for Jay',
          created_at: '2004 - 10 - 19 10: 23: 54+02',
          updated_at: '2004 - 10 - 19 13: 23: 54+02',
        },
      ]));
};
