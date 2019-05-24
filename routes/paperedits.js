// Dummy data to mock the server
const cuid = require('cuid');
const sampleProjects = require('../sample-data/projects.sample.json');
const sampleTranscripts = require('../sample-data/transcripts.sample.json');
const samplePaperEdits = require('../sample-data/paper-edits.sample.json');

/**
 * Paper-edits
 */
module.exports = (app) => {
  // New - Create a new project
  app.post('/api/projects/:projectId/paperedits', (req, res) => {
    // TODO: save to db
    console.log('req', req.body);
    // Just  a mock for testing purposes, when connecting to DB, ids are unique and immutable
    const paperedit = {
      title: req.body.title,
      description: req.body.description,
      id: cuid(),
      created: Date()
    }
    samplePaperEdits.paperedits.push(paperedit);

    // TODO: send project ID?
    console.log('paperedits', 'post', '/api/projects/:projectId/paperedits', samplePaperEdits);
    res.status(201).json({ status:'ok',  paperedit: paperedit });
  });

  app.get('/api/projects/:projectId/paperedits', (req, res) => {

    console.log('Sent list of Paperedits');
    res.status(201).json({ status:'ok', paperedits: samplePaperEdits.paperedits });
  });

  // TODO: id of project and paper edit
  app.get('/api/projects/:projectId/paperedits/:paperEditId', (req, res) => {
   
    const paperEditId = req.params.paperEditId;
    // TODO: db
    // tmpProject.project = sampleProjects.projects[parseInt(req.params.projectId)];
    const tmpPaperEdit = samplePaperEdits.paperedits.filter((p) => {
      return p.id === paperEditId;
    });
    console.log('tmpProject', tmpPaperEdit[0]);
    console.log('projects', 'get', `/api/projects/${ req.params.projectId }/paperedits/${paperEditId}`);
    res.status(200).json({ paperedit: tmpPaperEdit[0] });
  });

  // edit
  app.put('/api/projects/:projectId/paperedits/:paperEditId', (req, res) => {
    const paperEditId = req.params.paperEditId;
    const paperEdit = {
      "id":paperEditId,
      "title": req.body.title,
      "description":req.body.description
    }
    const paperEditIndex = samplePaperEdits.paperedits.findIndex(item => item.id === paperEditId);
    sampleProjects.projects[paperEditIndex] = paperEdit;

    // TODO: db
    // to access data
    // req.body.title
    // req.body.id || req.params.projectId
    // req.body.description
    console.log('projects', 'put', `/api/projects/${ req.params.paperEditId }/edit`, paperEdit);
    res.status(200).json({ status: 'ok' , paperedit: paperEdit});
  });

  // delete
  app.delete('/api/projects/:projectId/paperedits/:paperEditId', function (req, res) {
    const paperEditId = req.params.paperEditId;
    console.log('paperEditId::', paperEditId);
    const paperEditToDelete = samplePaperEdits.paperedits.filter((p) => {
      return p.id === paperEditId;
    })[0];
    samplePaperEdits.paperedits = sampleProjects.projects.filter((p) => {
      return p.id !== paperEditId;
    });
     // Tmp to testing UI
     delete paperEditToDelete;
    // TODO: db
    // TODO: filter sampleProjects for those that don't match ?
    console.log('projects', 'deleted', `/api/projects/${ paperEditId }`);
    res.status(200).json({ status: 'ok' });
  });
};