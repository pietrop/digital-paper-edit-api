const MessageBroker = require('../components/MessageBroker');

module.exports = {
  healthCheck: (req, res) => {
    res.sendStatus(200);
  },
  sendMessage: (req, res) => {
    MessageBroker.publish('Hello from Digital Paper Edit API')
      .then((data) => {
        res.sendStatus(200).json({ status: 'ok', message: data });
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500).json({ status: 'not ok', message: err });
      });
  },
};
