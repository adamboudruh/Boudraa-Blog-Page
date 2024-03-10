const sequelize = require('../config/connection'); // Import the connection to the database
const { Comment } = require('../models'); // Import the User model
const { BlogPost } = require('../models'); // Import the Game model
const { User } = require('../models'); // Import the Game model
const blogData = require('./blogPostData.json'); // Import user data from a JSON file
const commentData = require('./commentData.json'); // Import game data from a JSON file
const userData = require('./userData.json'); // Import game data from a JSON file


// Define a function to seed the database with initial data
const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await BlogPost.bulkCreate(blogData, {
            returning: true,
    });

    await Comment.bulkCreate(commentData, {
      returning: true,
    });

    



  process.exit(0);
} catch (err) {console.info(err)};
}

// Call the seedDatabase function to start the seeding process
seedDatabase();
