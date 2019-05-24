// 'use strict';
// HTTP Verbs https://www.restapitutorial.com/lessons/httpmethods.html
// Error codes https://codeburst.io/know-your-http-status-a-cheat-sheet-for-http-status-codes-5fb43863e589

// Dummy data to mock the server
const sampleProjects = require('../sample-data/projects.sample.json');
const cuid = require('cuid');
// TODO: add date created, and date updated to records ?
/**
 * Projects
 */
module.exports = (app) => {
  // New - Create a new project
  app.post('/api/projects', (req, res) => {
    // TODO: save to db
    console.log('req', req.body);
    // Just  a mock for testing purposes, when connecting to DB, ids are unique and immutable
    // const lasProjectPositionIndex = sampleProjects.projects.length === 0 ? 0 : sampleProjects.projects.length - 1;
    // const lastProjectId = sampleProjects.projects.length === 0 ? 0 : sampleProjects.projects[lasProjectPositionIndex].id;
    // const newProjectId = lastProjectId + 1;
    const project = {
      title: req.body.title,
      description: req.body.description,
      id: cuid(),
      created: Date()
    }
    sampleProjects.projects.push(project);

    // TODO: send project ID?
    console.log('projects', 'post', '/api/projects ');
    res.status(201).json({ status:'ok', project: project });

  });

  // index - get projects
  app.get('/api/projects', (req, res) => {
    // TODO: db
    console.log('projects', 'get', '/api/projects');
    res.status(200).json(sampleProjects);
  });

  // show - get individual project
  // https://expressjs.com/en/api.html#req
  app.get('/api/projects/:projectId', (req, res) => {
    const projectId = req.params.projectId;
    // TODO: db
    // tmpProject.project = sampleProjects.projects[parseInt(req.params.projectId)];
    const tmpProject = sampleProjects.projects.filter((p) => {
      return p.id === projectId;
    });
    console.log('tmpProject', tmpProject[0]);
    console.log('projects', 'get', `/api/projects/${ req.params.projectId }`);
    res.status(200).json({ project: tmpProject[0] });
  });

  // edit
  app.put('/api/projects/:projectId', (req, res) => {
    const projectId = req.params.projectId;
    const newProject = {
      "id": projectId,
        "title": req.body.title,
        "description":req.body.description
    }
    const projectIndex = sampleProjects.projects.findIndex(item => item.id === projectId);
    sampleProjects.projects[projectId] = newProject;

    // TODO: db
    // to access data
    // req.body.title
    // req.body.id || req.params.projectId
    // req.body.description
    console.log('projects', 'put', `/api/projects/${ req.params.projectId }/edit`, req.body);
    res.status(200).json({ status: 'ok' , project: newProject});
  });

  // delete
  app.delete('/api/projects/:projectId/', function (req, res) {
    const projectId = req.params.projectId;
    console.log(projectId);
    const projectToDelete = sampleProjects.projects.filter((p) => {
      return p.id === projectId;
    })[0];
    const projectToDeleteId = projectToDelete.id;
    sampleProjects.projects = sampleProjects.projects.filter((p) => {
      return p.id !== projectToDeleteId;
    });
     // Tmp to testing UI
     delete projectToDelete;
    // TODO: db
    // TODO: filter sampleProjects for those that don't match ?
    console.log('projects', 'deleted', `/api/projects/${ projectToDelete }`);
    res.status(200).json({ status: 'ok' });
  });
};