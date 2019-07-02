const MessageBroker = require('../components/MessageBroker');
// health check on /status to 200 is needed for cosmos AWS deployment

// TODO: add some server error handling that if it's having issues
// it does not return 200
module.exports = {
  healthCheck: (req, res) => {
    res.sendStatus(200);
  },
  sendMessage: (req, res) => {
    MessageBroker.publish('Hello from Digital Paper Edit API', (err, data) => {
      if (err) {
        res.sendStatus(500).json({ status: 'not ok', message: err });
      } else {
        res.sendStatus(200).json({ status: 'ok', message: data });
      }
    });
  },
};

// module.exports = (app) => {
//   app.get('/status', (req, res) => {
//     res.sendStatus(200);
//   });

//   app.get('/message', (req, res) => {
//     MessageBroker.publish("Hello from Digital Paper Edit API", (err, data) => {
//       if (err) {
//         res.sendStatus(500).json({ status: 'not ok' , message: err});
//       } else {
//         res.sendStatus(200).json({ status: 'ok' , message: data});
//       }
//     });
//   })
// };
// //
