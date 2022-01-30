const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const MovieRoutes = require('./movie-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/movies', MovieRoutes)

module.exports = router;