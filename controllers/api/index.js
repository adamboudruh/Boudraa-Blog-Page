const router = require('express').Router(); // Import the Router class from Express
const userRoutes = require('./userRoutes'); // Import userRoutes module
const blogRoutes = require('./blogRoutes'); // Import blogRoutes module
const commentRoutes = require('./commentRoutes'); // Import userRoutes module



// Mount the userRoutes under the '/users' path
router.use('/users', userRoutes);
router.use('/blog', blogRoutes);
router.use('/comment', commentRoutes);


module.exports = router; // Export the router module for usage in other files
