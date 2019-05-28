// Dummy data to mock the server
const cuid = require('cuid');
const sampleAnnotations = require('../sample-data/annotations.sample.json');
/**
 * annotations
 */
module.exports = (app, version) => {
  // New
  app.post('/api/projects/:projectId/transcripts/:transcriptId/annotations', (req, res) => {
    // TODO: save to db
    console.log('req ', req.projectId);
    const newAnnotation = req.body;
    newAnnotation.id = cuid();
    sampleAnnotations.annotations.push(newAnnotation);
    // TODO: send project ID?
    res.status(201).json({ status:'ok', annotation: newAnnotation });
    console.log('/api/projects/:projectId/transcripts/:transcriptId/annotations');
  });
  //index - list annotations
  app.get('/api/projects/:projectId/transcripts/:transcriptId/annotations', (req, res) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;
    console.log('labels', 'get', `/api/projects/${ projectId }/transcripts/${ transcriptId }/annotations`);

    const response = {
      // projectTitle: 'Sample Project Title',
      // projectDescription: 'sampleProjectDescription',
      annotations: sampleAnnotations.annotations,
      // TODO: Annotations returns transcript as well?
      // transcript: sampleTranscript,
      // transcriptTitle: 'Ted Talk Kate',
      // url: 'https://download.ted.com/talks/KateDarling_2018S-950k.mp4',
      // labels: sampleLabels
    };
    res.status(200).json(response);
  });

  // show
  // TODO: this route might not be needed not necessary? get individual annotations?
  app.get('/api/projects/:projectId/transcripts/:transcriptId/annotations/:annotationId', (req, res) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;
    const annotationId = req.params.annotationId;
    const annotationIndex =  sampleAnnotations.annotations.findIndex(item => item.id === annotationId);
    const tmpAnnotation = sampleAnnotations.annotations[annotationIndex] 
    console.log('labels', 'get', `/api/projects/${ projectId }}/transcripts/${ transcriptId }/annotations/${ annotationId }`);
    res.status(200).json( { annotation: tmpAnnotation });
  });

  // edit
  app.put('/api/projects/:projectId/transcripts/:transcriptId/annotations/:annotationId', (req, res) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;
    const annotationId = req.params.annotationId;
    const updatedAnnotation = req.body;
    const annotationIndex =  sampleAnnotations.annotations.findIndex(item => item.id === annotationId);
    sampleAnnotations.annotations[annotationIndex] = updatedAnnotation;
    console.log('deleted', projectId, transcriptId, annotationId);
    console.log(`/api/projects/${ projectId }/transcripts/:transcriptId/annotations`);
    res.status(200).json({ status:'ok',  annotation: updatedAnnotation });
  });

  // delete
  app.delete('/api/projects/:projectId/transcripts/:transcriptId/annotations/:annotationId', function (req, res) {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;
    const annotationId = req.params.annotationId;
    // Delete label
    delete sampleAnnotations.annotations[annotationId];
    sampleAnnotations.annotations = sampleAnnotations.annotations.filter((item) => {
      return item.id !== annotationId;
    });

    console.log('deleted', projectId, transcriptId, annotationId);
    res.status(200).json({ status:'ok' });
  });
};