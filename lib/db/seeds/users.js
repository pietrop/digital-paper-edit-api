exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() =>
    // Inserts seed entries
      knex('users').insert([
        {
          email: 'nigel@email.com',
          name: 'Nigel One',
        },
        {
          email: 'nakaz@email.com',
          name: 'Nakaz Two',
        },
        {
          email: 'jaywon@email.com',
          name: 'Jaywon Three',
        },
      ]));
};
