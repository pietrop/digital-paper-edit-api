const cuid = require('cuid');
const logger = require('winston');
const sampleLabels = require('../sample-data/labels.sample.json');

module.exports = (app) => {
  app.post('/api/projects/:projectId/labels', (req, res) => {
    const newLabel = req.body;
    newLabel.id = cuid();
    const projectId = req.params.projectId;

    sampleLabels.labels.push(newLabel);
    logger.info(`POST: Label ${ newLabel.id } for project ${ projectId }`);
    res.status(201).json({ status: 'ok', labels: sampleLabels.labels });
  });

  app.get('/api/projects/:projectId/labels', (req, res) => {
    const projectId = req.params.projectId;

    logger.info(`GET: Labels for project ${ projectId }`);
    res.status(200).json({ status: 'ok', labels: sampleLabels.labels });
  });

  app.get('/api/projects/:projectId/labels/:labelId', (req, res) => {
    const projectId = req.params.projectId;
    const labelId = req.params.labelId;
    const annotationIndex = sampleLabels.labels.findIndex(item => item.id === labelId);
    const tmpLabel = sampleLabels.labels[annotationIndex];

    logger.info(`GET: Label ${ labelId } for project ${ projectId }`);
    res.status(200).json({ label: tmpLabel });
  });

  app.put('/api/projects/:projectId/labels/:labelId', (req, res) => {
    const projectId = req.params.projectId;
    const labelId = req.params.labelId;
    const updatedLabel = req.body;
    const labelIndex = sampleLabels.labels.findIndex(item => item.id === labelId);

    sampleLabels.labels[labelIndex] = updatedLabel;
    logger.info(`PUT: Edit label ${ labelId } for project ${ projectId }`);
    res.status(200).json({ status: 'ok', labels: sampleLabels.labels });
  });

  app.delete('/api/projects/:projectId/labels/:labelId', (req, res) => {
    const projectId = req.params.projectId;
    const labelId = req.params.labelId;

    delete sampleLabels.labels[labelId];
    sampleLabels.labels = sampleLabels.labels.filter(item => item.id !== labelId);

    logger.info(`DELETE: Label ${ labelId } for project ${ projectId }`);
    res.status(200).json({ status: 'ok', labels: sampleLabels.labels });
  });
};
