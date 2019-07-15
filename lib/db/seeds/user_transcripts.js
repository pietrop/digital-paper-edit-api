exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_transcripts').del()
    .then(() =>
    // Inserts seed entries
      knex('user_transcripts').insert([
        {
          id: 1,
          user_id: 'nigel@email.com',
          transcript_id: 1,
          created_at: '2004 - 10 - 19 10: 23: 54+02',
          updated_at: '2004 - 10 - 19 13: 23: 54+02',
        },
        {
          id: 2,
          user_id: 'nakaz@email.com',
          transcript_id: 1,
          created_at: '2004 - 10 - 19 10: 23: 54+02',
          updated_at: '2004 - 10 - 19 13: 23: 54+02',
        },
        {
          id: 3,
          user_id: 'jaywon@email.com',
          transcript_id: 1,
          created_at: '2004 - 10 - 19 10: 23: 54+02',
          updated_at: '2004 - 10 - 19 13: 23: 54+02',
        },

      ]));
};
