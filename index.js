const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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

// Routes
require('./routes/index')(app);
require('./routes/status')(app);
require('./routes/projects')(app);
require('./routes/transcripts')(app);
require('./routes/paperedits')(app);
require('./routes/annotations')(app);
require('./routes/labels')(app);
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
