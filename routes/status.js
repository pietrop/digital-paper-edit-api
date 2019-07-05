const messageBroker = require('../lib/messageBroker');

module.exports = {
  healthCheck: (req, res) => {
    res.sendStatus(200);
  },
  sendMessage: (req, res) => {
    messageBroker.publish('Hello from Digital Paper Edit API')
      .then((data) => {
        res.status(200).json({ message: data });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
};
