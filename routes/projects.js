// 'use strict';
// HTTP Verbs https://www.restapitutorial.com/lessons/httpmethods.html
// Error codes https://codeburst.io/know-your-http-status-a-cheat-sheet-for-http-status-codes-5fb43863e589
const cuid = require('cuid');
// Dummy data to mock the server
const sampleProjects = require('../sample-data/projects.sample.json');

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
    const project = {
      title: req.body.title,
      description: req.body.description,
      id: cuid(),
      created: Date(),
    };
    sampleProjects.projects.push(project);

    // TODO: send project ID?
    console.log('projects', 'post', '/api/projects ');
    res.status(201).json({ status: 'ok', project });
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
    const tmpProject = sampleProjects.projects.filter(p => p.id === projectId);
    console.log('tmpProject', tmpProject[0]);
    console.log('projects', 'get', `/api/projects/${ req.params.projectId }`);
    res.status(200).json({ project: tmpProject[0] });
  });

  // edit
  app.put('/api/projects/:projectId', (req, res) => {
    const projectId = req.params.projectId;
    const newProject = {
      id: projectId,
      title: req.body.title,
      description: req.body.description,
    };
    const projectIndex = sampleProjects.projects.findIndex(item => item.id === projectId);
    sampleProjects.projects[projectIndex] = newProject;

    // TODO: db
    // to access data
    // req.body.title
    // req.body.id || req.params.projectId
    // req.body.description
    console.log('projects', 'put', `/api/projects/${ req.params.projectId }/edit`, req.body);
    console.log(newProject);
    res.status(200).json({ status: 'ok', project: newProject });
  });

  app.delete('/api/projects/:projectId/', (req, res) => {
    const projectId = req.params.projectId;
    const projectToDelete = sampleProjects.projects.find(p => p.id === projectId);
    sampleProjects.projects = sampleProjects.projects.filter(p => p.id !== projectToDelete.id);

    console.log('projects', 'deleted', `/api/projects/${ projectToDelete }`);
    res.status(204).json({ status: 'ok' });
  });
};
