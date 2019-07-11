const cuid = require('cuid');

const data = require('../sample-data/annotations.sample.json');

module.exports = (app) => {
  app.post('/api/projects/:projectId/transcripts/:transcriptId/annotations', (req, res) => {
    const newAnnotation = req.body;
    newAnnotation.id = cuid();

    data.annotations.push(newAnnotation);

    res.status(201).json({ status: 'ok', annotation: newAnnotation });
    console.log('/api/projects/:projectId/transcripts/:transcriptId/annotations');
  });

  app.get('/api/projects/:projectId/transcripts/:transcriptId/annotations', (req, res) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;

    console.log('labels', 'get', `/api/projects/${ projectId }/transcripts/${ transcriptId }/annotations`);
    res.status(200).json({
      ...data,
    });
  });

  app.get('/api/projects/:projectId/transcripts/:transcriptId/annotations/:annotationId', (req, res) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;
    const annotationId = req.params.annotationId;

    const annotationIndex = data.annotations.findIndex(item => item.id === annotationId);
    const tmpAnnotation = data.annotations[annotationIndex];

    console.log('labels', 'get', `/api/projects/${ projectId }}/transcripts/${ transcriptId }/annotations/${ annotationId }`);
    res.status(200).json( { annotation: tmpAnnotation });
  });

  app.put('/api/projects/:projectId/transcripts/:transcriptId/annotations/:annotationId', (req, res) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;
    const annotationId = req.params.annotationId;
    const updatedAnnotation = req.body;

    const annotationIndex = data.annotations.findIndex(item => item.id === annotationId);
    data.annotations[annotationIndex] = updatedAnnotation;

    console.log('deleted', projectId, transcriptId, annotationId);
    console.log(`/api/projects/${ projectId }/transcripts/:transcriptId/annotations`);
    res.status(200).json({ status: 'ok', annotation: updatedAnnotation });
  });

  app.delete('/api/projects/:projectId/transcripts/:transcriptId/annotations/:annotationId', (req, res) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;
    const annotationId = req.params.annotationId;

    data.annotations = data.annotations.filter(item => item.id !== annotationId);

    console.log('deleted', projectId, transcriptId, annotationId);
    res.status(200).json({ status: 'ok' });
  });
};
