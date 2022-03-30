const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

router.use('/', homeRoutes);

router.use('/api', apiRoutes);
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;

// file will collect the packaged API routes
// and prefix them with the path /api

// use of router
// this is so if we make a request to any endpoint that
// doesnt exist we'll receive a 404 error indicating we
// have request an incorrect resource
// this is another RESTful practice
