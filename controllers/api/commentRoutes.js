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
        const commentData = await Comment.create({
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

router.delete('/delete-comment/:id', async (req, res) => {
    try {
      if (req.session.idle) {
          res.status(401).json({"error": "Session is idle, log in again"});
      }
      else {
          console.info("DELETE Route called... Attempting to delete comment!");
          console.info(`Deleting comment of id: ${req.params.id}`);
          const deletedData = await Comment.destroy({
            where: { id: req.params.id }
          })
          if (deletedData) {
              console.info(deletedData);
              res.status(200).json(deletedData);
          }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


module.exports = router; // Export the router module for usage in other files