// this file will serve as a means to collect all of the API routes and package them up for us
const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;


// this file is keeping the API endpoints organized while allowing 
// the API routes to be scalable 

