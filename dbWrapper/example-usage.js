const db = require('./index.js');

// console.log(db.getAll('projects'));

// const transcripts = db.getAll('transcripts');
// console.log();
// console.log(db.get('transcripts', { _id: transcripts[2]._id }));

console.log(db.get('transcripts', { projectId: '54bae8166afc4b379de5d4e10b77218d' }));

// console.log(db.create('projects', {
//   title: 'Project title One!',
//   description: 'Project one description',
// }));

// console.log(db.create('projects', {
//   title: 'Project title 3!',
//   description: 'Project 3 description',
// }));

// console.log(db.update('projects',
//   { _id: 'a16ca3fbb8e44db19494bdda4ca757ae' },
//   {
//     title: 'Project title One CHANGED!',
//     description: 'Project one description CHANGED2',
//   }));

// console.log(db.delete('projects',
//   { _id: 'a16ca3fbb8e44db19494bdda4ca757ae' }));
