const cuid = require('cuid');

const data = require('../sample-data/paper-edits.sample.json');
const samplePaperEdit = require('../sample-data/programme-script.sample.json');

module.exports = (app) => {
  app.post('/api/projects/:projectId/paperedits', (req, res) => {
    const paperedit = {
      title: req.body.title,
      description: req.body.description,
      id: cuid(),
      created: Date(),
    };

    data.paperedits.push(paperedit);

    console.log('paperedits', 'post', '/api/projects/:projectId/paperedits');
    res.status(201).json({
      status: 'ok',
      paperedit,
    });
  });

  app.get('/api/projects/:projectId/paperedits', (req, res) => {
    res.status(200).json({
      status: 'ok',
      paperedits: data.paperedits,
    });
  });

  app.get('/api/projects/:projectId/paperedits/:paperEditId', (req, res, next) => {
    const paperEditId = req.params.paperEditId;

    const paperEdit = data.paperedits.find(p => p.id === paperEditId);

    if (!paperEdit) {
      const err = new Error('No paper edit found');
      err.statusCode = 404;

      return next(err);
    }

    console.log('projects', 'get', `/api/projects/${ req.params.projectId }/paperedits/${ paperEditId }`);

    return res.status(200).json({
      status: 'ok',
      programmeScript: samplePaperEdit.programmeScript,
    });
  });

  app.put('/api/projects/:projectId/paperedits/:paperEditId', (req, res) => {
    const paperEditId = req.params.paperEditId;

    const paperEdit = {
      id: paperEditId,
      title: req.body.title,
      description: req.body.description,
    };

    const paperEditIndex = data.paperedits.findIndex(item => item.id === paperEditId);
    data.paperedits[paperEditIndex] = paperEdit;

    console.log('projects', 'put', `/api/projects/${ req.params.paperEditId }/edit`, paperEdit);
    res.status(200).json({
      status: 'ok',
      paperedit: paperEdit,
    });
  });

  app.delete('/api/projects/:projectId/paperedits/:paperEditId', (req, res) => {
    const paperEditId = req.params.paperEditId;

    console.log('paperEditId::', paperEditId);

    const paperEditToDelete = data.paperedits.find(p => p.id === paperEditId);
    data.paperedits = data.paperedits.filter(p => p.id !== paperEditToDelete.id);

    console.log('projects', 'deleted', `/api/projects/${ paperEditId }`);
    res.status(204).json({ status: 'ok' });
  });
};
