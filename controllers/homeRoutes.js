const express = require('express'); // Import the Express framework
const router = express.Router(); // Create a new router instance
const { User } = require('../models'); // Import the User model
const { BlogPost } = require('../models'); // Import the BlogPost model
const { Comment } = require('../models'); // Import the Comment model


// Route to render the homepage view
router.get('/', async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({
      order: [['created_at', 'DESC']], 
      include: [
        { model: User, attributes: ['id', 'name'] },
        { model: Comment, //Each BlogPost object will have its own array object of all the comments that it has
            include: [
              {
                model: User,
                attributes: ['id', 'name']
              }
            ]
        }
      ]
    });

    // Serialize the user data into plain objects
    const blogPosts = blogData.map((project) => project.get({ plain: true }));
    console.log("Passing blogs: \n" +blogPosts);
    
    blogPosts.forEach(blogPost => {
        console.log(blogPost);
        blogPost.comments.forEach(comment => console.log(comment));
      console.log('------------------');
    });

    res.render('homepage', {
      idle: req.session.idle,
      blogPosts, // Pass the serialized blog data to the view
      logged_in: req.session.logged_in, // Pass the logged_in variable to the view
      user_data: req.session.user_data
    });
  } catch (err) {
    // If an error occurs during data retrieval or rendering, send a 500 (Internal Server Error) response
    res.status(500).json(err);
  }
});

// Route to render the dashboard
router.get('/dashboard', async (req, res) => {
  let userID;
  if (req.session.user_data){
    userID = req.session.user_data.id;
    const userBlogData = await BlogPost.findAll({
      where: { user_id: userID },
      order: [['created_at', 'DESC']]
    });
    const blogPosts = userBlogData.map((project) => project.get({ plain: true }));
    res.render('dashboard', {  // If user is logged in, render the dashboard with an array of all the blog posts belonging to them
      idle: req.session.idle,
      blogPosts,
      logged_in: req.session.logged_in,
      user_data: req.session.user_data
    })
  } else { 
    res.render('login', { // If not logged in, redirect to login page
      idle: req.session.idle,
      logged_in: req.session.logged_in,
      user_data: req.session.user_data
    }) 
}
});

// Route to render the login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect them to the homepage
  if (req.session.logged_in && !req.session.idle) {
    res.redirect('/');
    return;
  }

  // If the user is not logged in, render the 'login' view
  res.render('login', { 
    idle: req.session.idle,
    logged_in: req.session.logged_in,
    user_data: req.session.user_data
  })
});

// Route to render the signup page
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect them to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  // If the user is not logged in, render the 'signup' view
  res.render('signup', { 
    idle: req.session.idle,
    logged_in: req.session.logged_in,
    user_data: req.session.user_data
  })
});

//home and dashboard

module.exports = router; // Export the router module for usage in other files