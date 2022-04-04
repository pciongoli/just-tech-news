const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
// merge dashboard router module into the rest of the app
const dashboardRoutes = require('./dashboard-routes');

router.use('/', homeRoutes);
// merge dashboard router module into the rest of the app
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;

// file will collect the packaged API routes
// and prefix them with the path /api

// use of router
// this is so if we make a request to any endpoint that
// doesnt exist we'll receive a 404 error indicating we
// have request an incorrect resource
// this is another RESTful practice
