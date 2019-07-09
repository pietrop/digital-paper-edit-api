// 'use strict';
const url = require('url');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

const port = process.env.PORT || 8080;

require('./config');

app.use(bodyParser.json( { limit: '50MB' } ));

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.get('/', (req, res) => {
  const fullUrl = `${ req.protocol }://${ req.get('host') }${ req.originalUrl }`;
  const results = [];
  // https://stackoverflow.com/questions/14934452/how-to-get-all-registered-routes-in-express/14934933
  app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
      results.push({
        path: r.route.path,
        url: url.resolve(fullUrl, r.route.path),
        methods: r.route.methods,
      });
    }
  });
  res.json({ response: results });
});

// Routes
require('./routes/projects')(app);
require('./routes/paperedits')(app);
require('./routes/transcripts')(app);
require('./routes/labels')(app);
require('./routes/annotations')(app);
require('./routes/status')(app);
require('./routes/queue')(app);

app.use((err, req, res, next) => {
  console.log('err');
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || 'Something went wrong!';

  res.status(statusCode)
    .json({
      status: statusCode,
      message: errorMessage,
    });
});

app.listen(port, () => console.log(`App listening on port ${ port }!`));

module.exports = app;
