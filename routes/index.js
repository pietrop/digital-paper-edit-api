const url = require('url');

module.exports = (app) => {
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
};
