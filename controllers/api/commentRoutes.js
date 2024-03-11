const router = require('express').Router(); // Import the Router class from Express
const { User, BlogPost, Comment } = require('../../models'); // Import the User model




router.post('/new', async (req, res) => {
  try {
    if (req.session.idle) {
        res.status(401).json({"error": "Session is idle, log in again"});
    }
    else {
        console.info("POST Route called... Attempting to create comment!");
        console.info(`\nBody: ${req.body.commentBody}\n\nPost ID: ${req.body.postID}`);
        const commentData = await Comment.create({ // Creates a row in the User table with the new data
            post_id: req.body.postID,
            body: req.body.commentBody,
            user_id: req.session.user_data.id,
        });
        if (commentData) {
            console.info(commentData);
            res.status(200).json(commentData);
        }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router; // Export the router module for usage in other files