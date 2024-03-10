const router = require('express').Router(); // Import the Router class from Express
const { User, BlogPost } = require('../../models'); // Import the User model


router.post('/create-post', async (req, res) => {
  try {
    if (req.session.idle) {
        res.status(401).json({"error": "Session is idle, log in again"});
    }
    else {
        console.info("POST Route called... Attempting to create blog post!");
        console.info(`Title: ${req.body.title}\nBody: ${req.body.content}`);
        res.status(200).json("yeah");
        // const postData = await BlogPost.create({ // Creates a row in the User table with the new data
        //     title: req.body.title,
        //     body: req.body.content,
        //     user_id: req.session.user_data.id,
        // });
        // if (postData) {
        //     console.info(postData);
        //     res.status(200).json(postData);
        // }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router; // Export the router module for usage in other files