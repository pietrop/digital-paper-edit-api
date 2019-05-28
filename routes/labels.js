// Dummy data to mock the server
const cuid = require('cuid');
const sampleLabels = require('../sample-data/labels.sample.json');
/**
 * annotations
 */
module.exports = (app) => {
  // New
  app.post('/api/projects/:projectId/labels', (req, res) => {
    const newLabel = req.body;
    newLabel.id = cuid()
    // console.log('POSTPOST - req.body ',req);
    // TODO: save to db
    const projectId = req.params.projectId;
    console.log('labels', 'post', `/api/projects/${ projectId }/labels`);
    // TODO: send project ID?
    sampleLabels.labels.push(newLabel)
    res.status(201).json({ status:'ok', labels: sampleLabels.labels });
  });
  //index - list labels
  app.get('/api/projects/:projectId/labels', (req, res) => {
    // TODO: read from db
    const projectId = req.params.projectId;
    console.log('labels', 'get', `/api/projects/${ projectId }/labels`);
    res.status(200).json({ status:'ok' ,labels: sampleLabels.labels });
  });

  // show
  // TODO: this route might not be needed not necessary? get individual label?
  app.get('/api/projects/:projectId/labels/:labelId', (req, res) => {
    // TODO: read from db
    const projectId = req.params.projectId;
    const labelId = req.params.labelId;
    const annotationIndex =  sampleLabels.labels.findIndex(item => item.id === labelId);
    const tmpLabel = sampleLabels.labels[annotationIndex] 
    console.log('labels', 'get', `/api/projects/${ projectId }/labels/${ labelId }`);
    // TODO: send project ID?
 
    res.status(200).json({ label: tmpLabel });
  });

  // edit - one
  app.put('/api/projects/:projectId/labels/:labelId', (req, res) => {
    const projectId = req.params.projectId;
    const labelId = req.params.labelId;
    const updatedLabel = req.body
    console.log('updatedLabel', updatedLabel);
    // updated label
    const labelIndex =  sampleLabels.labels.findIndex(item => item.id === labelId);
    sampleLabels.labels[labelIndex] = updatedLabel;

    console.log('labels', 'put', `/api/projects/${ projectId }/labels/${ labelId }`);
    res.status(200).json({ status:'ok', labels: sampleLabels.labels });
  });

  // delete
  app.delete('/api/projects/:projectId/labels/:labelId', function (req, res) {
    const projectId = req.params.projectId;
    const labelId = req.params.labelId;
    // Delete label
    delete sampleLabels.labels[labelId];
    sampleLabels.labels = sampleLabels.labels.filter((item) => {
      return item.id !== labelId;
    });

    console.log('labels', 'delete', `/api/projects/${ projectId }/labels/${ labelId }`);
    res.status(200).json({ status:'ok', labels: sampleLabels.labels  });
  });
};