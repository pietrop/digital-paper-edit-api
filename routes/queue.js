const logger = require('winston');
const messageBroker = require('../lib/messageBroker');

module.exports = (app) => {
  app.get('/queue', (req, res) => {
    messageBroker.publish('Hello from Digital Paper Edit API', (err, data) => {
      if (err) {
        logger.error(`Error from queue.js: ${ err }`);
        res.status(500).json({ err });
      } else {
        logger.info(`Data from queue.js: ${ data }`);
        res.status(200).json({ message: data });
      }
    });
  });
};
