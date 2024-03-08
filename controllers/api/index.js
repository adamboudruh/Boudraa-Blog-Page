const router = require('express').Router(); // Import the Router class from Express
const userRoutes = require('./userRoutes'); // Import userRoutes module

// Mount the userRoutes under the '/users' path
router.use('/users', userRoutes);

module.exports = router; // Export the router module for usage in other files
