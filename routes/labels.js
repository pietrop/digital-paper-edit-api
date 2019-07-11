const cuid = require('cuid');

const logger = require('../lib/logger.js');

const data = require('../sample-data/labels.sample.json');

module.exports = (app) => {
  app.post('/api/projects/:projectId/labels', (req, res) => {
    const newLabel = req.body;
    newLabel.id = cuid();

    const projectId = req.params.projectId;
    data.labels.push(newLabel);

    logger.info(`POST: Label ${ newLabel.id } for project ${ projectId }`);
    res.status(201).json({ status: 'ok', labels: data.labels });
  });

  app.get('/api/projects/:projectId/labels', (req, res) => {
    const projectId = req.params.projectId;

    logger.info(`GET: Labels for project ${ projectId }`);
    res.status(200).json({ status: 'ok', labels: data.labels });
  });

  app.get('/api/projects/:projectId/labels/:labelId', (req, res) => {
    const projectId = req.params.projectId;
    const labelId = req.params.labelId;

    const annotationIndex = data.labels.findIndex(item => item.id === labelId);
    const tmpLabel = data.labels[annotationIndex];

    logger.info(`GET: Label ${ labelId } for project ${ projectId }`);
    res.status(200).json({ label: tmpLabel });
  });

  app.put('/api/projects/:projectId/labels/:labelId', (req, res) => {
    const projectId = req.params.projectId;
    const labelId = req.params.labelId;

    const updatedLabel = req.body;
    console.log('updatedLabel', updatedLabel);

    const labelIndex = data.labels.findIndex(item => item.id === labelId);
    data.labels[labelIndex] = updatedLabel;

    logger.info(`PUT: Edit label ${ labelId } for project ${ projectId }`);
    res.status(200).json({ status: 'ok', labels: data.labels });
  });

  app.delete('/api/projects/:projectId/labels/:labelId', (req, res) => {
    const projectId = req.params.projectId;
    const labelId = req.params.labelId;

    data.labels = data.labels.filter(l => l.id !== labelId);

    logger.info(`DELETE: Label ${ labelId } for project ${ projectId }`);
    res.status(200).json({ status: 'ok', labels: data.labels });
  });
};
