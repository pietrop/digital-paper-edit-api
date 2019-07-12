const diskdb = require('diskdb');

/* eslint-disable class-methods-use-this */
class DWrapper {
  constructor() {
    this.diskdb = diskdb.connect(`${ process.cwd() }/dbWrapper/db`, [ 'projects', 'transcripts', 'annotations', 'labels', 'paperedits' ]);
  }

  getAll(model, id) {
    if (id) {
      return this.diskdb[model].find({ ...id });
    }

    return this.diskdb[model].find();
  }

  get(model, id) {
    return this.diskdb[model].findOne({ ...id });
  }

  create(model, data) {
    return this.diskdb[model].save(data);
  }

  update(model, id, data) {
    return this.diskdb[model].update({ ...id }, { ...data }, {
      multi: false, // update multiple - default false
      upsert: false, // if object is not found, add it (update-insert) - default false
    });
  }

  delete(model, id) {
    return this.diskdb[model].remove({ ...id });
  }

  // /**
  //  * Transcripts
  //  */
  // getTranscripts(projectId) {
  //   return 'TBC';
  // }

  // createTranscript(projectId, data) {
  //   return 'TBC';
  // }

  // getTranscript(projectId, transcriptId, queryParamsOptions) {
  //   return 'TBC';
  // }

  // updateTranscript(projectId, transcriptId, queryParamsOptions, data) {
  //   return 'TBC';
  // }

  // deleteTranscript(projectId, transcriptId) {
  //   return 'TBC';
  // }

  // /**
  //  * Annotations
  //  */
  // getAllAnnotations(projectId, transcriptId) {
  //   return 'TBC';
  // }

  // // not used
  // getAnnotation(projectId, transcriptId, annotationId) {
  //   return 'TBC';
  // }

  // createAnnotation(projectId, transcriptId, data) {
  //   return 'TBC';
  // }

  // updateAnnotation(projectId, transcriptId, annotationId, data) {
  //   return 'TBC';
  // }

  // deleteAnnotation(projectId, transcriptId, annotationId) {
  //   return 'TBC';
  // }

  // /**
  //  * Labels
  //  */

  // // Get All Labels
  // getAllLabels(projectId) {
  //   return 'TBC';
  // }

  // // Get Label - not used
  // getLabel(projectId, labelId) {
  //   return 'TBC';
  // }

  // // Create Label
  // createLabel(projectId, data) {
  //   return 'TBC';
  // }

  // // Update Label
  // updateLabel(projectId, labelId, data) {
  //   return 'TBC';
  // }

  // // Delete Label
  // deleteLabel(projectId, labelId) {
  //   return 'TBC';
  // }

  // /**
  //  * PaperEdits
  //  */
  // getAllPaperEdits(projectId) {
  //   return 'TBC';
  // }

  // getPaperEdit(projectId, id) {
  //   return 'TBC';
  // }

  // createPaperEdit(projectId, data) {
  //   return 'TBC';
  // }

  // updatePaperEdit(projectId, id, data) {
  //   return 'TBC';
  // }

  // deletePaperEdit(projectId, id) {
  //   return 'TBC';
  // }
}
const db = new DWrapper();
Object.freeze(db);
module.exports = db;
