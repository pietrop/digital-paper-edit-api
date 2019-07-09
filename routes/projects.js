const cuid = require('cuid');

const data = require('../sample-data/projects.sample.json');

module.exports = (app) => {
  app.post('/api/projects', (req, res) => {
    const project = {
      title: req.body.title,
      description: req.body.description,
      id: cuid(),
      created: Date(),
    };

    data.projects.push(project);

    console.log('projects', 'post', '/api/projects ');
    res.status(201).json({ status: 'ok', project });
  });

  app.get('/api/projects', (req, res) => {
    console.log('projects', 'get', '/api/projects');
    res.status(200).json(data);
  });

  app.get('/api/projects/:projectId', (req, res) => {
    const projectId = req.params.projectId;

    const project = data.projects.find(p => p.id === projectId);

    console.log('projects', 'get', `/api/projects/${ req.params.projectId }`);
    res.status(200).json({ project });
  });

  app.put('/api/projects/:projectId', (req, res) => {
    const projectId = req.params.projectId;

    const newProject = {
      id: projectId,
      title: req.body.title,
      description: req.body.description,
    };

    const projectIndex = data.projects.findIndex(item => item.id === projectId);
    data.projects[projectIndex] = newProject;

    console.log('projects', 'put', `/api/projects/${ req.params.projectId }/edit`, req.body);
    res.status(200).json({ status: 'ok', project: newProject });
  });

  app.delete('/api/projects/:projectId/', (req, res) => {
    const projectId = req.params.projectId;

    const projectToDelete = data.projects.find(p => p.id === projectId);
    data.projects = data.projects.filter(p => p.id !== projectToDelete.id);

    console.log('projects', 'deleted', `/api/projects/${ projectToDelete }`);
    res.status(204).json({ status: 'ok' });
  });
};
