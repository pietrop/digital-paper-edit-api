const cuid = require('cuid');
const logger = require('../lib/logger.js');
const sampleAnnotations = require('../sample-data/annotations.sample.json');

module.exports = (app) => {
  app.post('/api/projects/:projectId/transcripts/:transcriptId/annotations', (req, res) => {
    const newAnnotation = req.body;
    newAnnotation.id = cuid();
    sampleAnnotations.annotations.push(newAnnotation);
    const resStatus = 201;
    res.status(resStatus).json({ status: 'ok', annotation: newAnnotation });
    logger.info({ status: resStatus, request: 'POST', message: `New annotation ${ newAnnotation.id } created for transcript ${ req.params.transcriptId } in project ${ req.params.projectId }` });
  });

  app.get('/api/projects/:projectId/transcripts/:transcriptId/annotations', (req, res) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;

    const response = {
      // projectTitle: 'Sample Project Title',
      // projectDescription: 'sampleProjectDescription',
      ...sampleAnnotations,
      // TODO: Annotations returns transcript as well?
      // transcript: sampleTranscript,
      // transcriptTitle: 'Ted Talk Kate',
      // url: 'https://download.ted.com/talks/KateDarling_2018S-950k.mp4',
      // labels: sampleLabels
    };
    logger.info(`GET: Annotations for transcript ${ transcriptId } in project ${ projectId }`);
    res.status(200).json(response);
  });

  app.get('/api/projects/:projectId/transcripts/:transcriptId/annotations/:annotationId', (req, res) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;
    const annotationId = req.params.annotationId;
    const annotationIndex = sampleAnnotations.annotations.findIndex(item => item.id === annotationId);
    const tmpAnnotation = sampleAnnotations.annotations[annotationIndex];

    logger.info(`GET: Annotation ${ annotationId } for transcript ${ transcriptId } in project ${ projectId }`);
    res.status(200).json( { annotation: tmpAnnotation });
  });

  app.put('/api/projects/:projectId/transcripts/:transcriptId/annotations/:annotationId', (req, res) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;
    const annotationId = req.params.annotationId;
    const updatedAnnotation = req.body;

    const annotationIndex = sampleAnnotations.annotations.findIndex(item => item.id === annotationId);
    sampleAnnotations.annotations[annotationIndex] = updatedAnnotation;

    logger.info(`PUT: Edit annotation ${ annotationId } for transcript ${ transcriptId } in project ${ projectId }`);
    res.status(200).json({ status: 'ok', annotation: updatedAnnotation });
  });

  // delete
  app.delete('/api/projects/:projectId/transcripts/:transcriptId/annotations/:annotationId', (req, res) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;
    const annotationId = req.params.annotationId;
    delete sampleAnnotations.annotations[annotationId];
    sampleAnnotations.annotations = sampleAnnotations.annotations.filter(item => item.id !== annotationId);

    logger.info(`DELETE: Annotation ${ annotationId } for transcript ${ transcriptId } in project ${ projectId }`);
    res.status(200).json({ status: 'ok' });
  });
};
