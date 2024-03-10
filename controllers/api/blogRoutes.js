const router = require('express').Router(); // Import the Router class from Express
const { User, BlogPost } = require('../../models'); // Import the User model


router.get('/:id', async (req, res) => {
  try {
    if (req.session.idle) {
      res.status(401).json({"error": "Session is idle, log in again"});
    }
    else {
      const postData = await BlogPost.findOne({ where: { id: req.params.id }});
      // console.info(postData);
      const post = postData.get({ plain: true });
      console.info(post);
      res.status(200).json(post);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/create-post', async (req, res) => {
  try {
    if (req.session.idle) {
        res.status(401).json({"error": "Session is idle, log in again"});
    }
    else {
        console.info("POST Route called... Attempting to create blog post!");
        console.info(`Title: ${req.body.title}\nBody: ${req.body.content}`);
        const postData = await BlogPost.create({ // Creates a row in the User table with the new data
            title: req.body.title,
            body: req.body.content,
            user_id: req.session.user_data.id,
        });
        if (postData) {
            console.info(postData);
            res.status(200).json(postData);
        }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/update-post/:id', async (req, res) => {
  try {
    if (req.session.idle) {
        res.status(401).json({"error": "Session is idle, log in again"});
    }
    else {
        console.info("PUT Route called... Attempting to update blog post!");
        console.info(`New title: ${req.body.newTitle}\nBody: ${req.body.newContent}`);
        const newData = await BlogPost.update(
          { 
            title: req.body.newTitle,
            body: req.body.newContent
          },
          { where: {id:req.params.id} , returning:true, plain:true }
        );
        if (newData) {
            console.info(newData);
            res.status(200).json(newData);
        }
        
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router; // Export the router module for usage in other files