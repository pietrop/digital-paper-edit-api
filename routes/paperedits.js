const cuid = require('cuid');
const samplePaperEdits = require('../sample-data/paper-edits.sample.json');
const sampleProgrammeScript = require('../sample-data/programme-script.sample.json');
const logger = require('../lib/logger.js');

module.exports = (app) => {

  app.post('/api/projects/:projectId/paperedits', (req, res) => {

    const paperedit = {
      title: req.body.title,
      description: req.body.description,
      id: cuid(),
      created: Date()
    }
    samplePaperEdits.paperedits.push(paperedit);

    logger.info(`POST: Paper edits for project ${req.params.projectId}`);
    res.status(201).json({ status:'ok',  paperedit: paperedit });
  });

  app.get('/api/projects/:projectId/paperedits', (req, res) => {

    logger.info(`GET: Paper edits for project ${req.params.projectId}`);
    res.status(201).json({ status:'ok', paperedits: samplePaperEdits.paperedits });
  });

  app.get('/api/projects/:projectId/paperedits/:paperEditId', (req, res) => {
    const paperEditId = req.params.paperEditId;
    const tmpPaperEdit = samplePaperEdits.paperedits.filter((p) => {
      return p.id === paperEditId;
    });

    logger.info(`GET: Paper edit ${paperEditId} for project ${req.params.projectId}`);

    res.status(200).json({ programmeScript: sampleProgrammeScript.programmeScript});
  });

  app.put('/api/projects/:projectId/paperedits/:paperEditId', (req, res) => {
    const paperEditId = req.params.paperEditId;
    const paperEdit = {
      "id": paperEditId,
      "title": req.body.title,
      "description":req.body.description
    }
    // const updatedProgramScript = req.body;
    const paperEditIndex = samplePaperEdits.paperedits.findIndex(item => item.id === paperEditId);
    samplePaperEdits.paperedits[paperEditIndex] = paperEdit;

    // TODO: db
    // to access data
    // req.body.title
    // req.body.id || req.params.projectId
    // req.body.description
    logger.info(`PUT: Modify paper edit ${req.params.paperEditId} for project ${ req.params.projectId}`);
    res.status(200).json({ status: 'ok' , paperedit: paperEdit});
  });

  app.delete('/api/projects/:projectId/paperedits/:paperEditId', function (req, res) {
    const paperEditId = req.params.paperEditId;
    const paperEditToDelete = samplePaperEdits.paperedits.filter((p) => {
      return p.id === paperEditId;
    })[0];
    samplePaperEdits.paperedits = samplePaperEdits.paperedits.filter((p) => {
      return p.id !== paperEditId;
    });

     delete paperEditToDelete;

    logger.info(`DELETE: Paper edit ${paperEditId} for project ${req.params.projectId}`);
    res.status(200).json({ status: 'ok' });
  });
};