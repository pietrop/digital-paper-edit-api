const path = require('path');
const cuid = require('cuid');
// const formidable = require('formidable');
const logger = require('../lib/logger.js');
const transcriptSTTOriginal = require('../sample-data/transcript-original-stt.sample.json');

module.exports = (app) => {

  app.get('/api/projects/:projectId/transcripts/:transcriptId/transcript-original-stt', (req, res, next) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;

    const transcript = transcriptSTTOriginal.find(t => t.transcriptId === transcriptId);

    if (!transcript) {
      const err = new Error('No transcript found');
      err.statusCode = 404;
      logger.error(`${ err.statusCode }: Transcript ${ transcriptId } not found for project ${ projectId }`);

      return next(err);
    }

    logger.info(`GET — Transcript ${ transcriptId } from project ${ projectId }`);

    return res.status(200).json(transcript);
  });
};
