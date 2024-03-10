const User = require('./User'); // Import the User model
const Comment = require('./Comment'); // Import the Comments model
const BlogPost = require('./BlogPost');


// User and Blog Posts association
User.hasMany(BlogPost, {
    foreignKey: 'user_id' });
BlogPost.belongsTo(User, {
    foreignKey: 'user_id' });

// Comments and BlogPost association
Comment.belongsTo(BlogPost, { 
    foreignKey: 'post_id' }); // Each comment belongs to one game
BlogPost.hasMany(Comment, { 
    foreignKey: 'post_id' }); // Each game can have multiple comments

// User and Comments association
User.hasMany(Comment, { 
    foreignKey: 'user_id' }); // Each user can have multiple comments
Comment.belongsTo(User, { 
    foreignKey: 'user_id' }); // Each comment belongs to one user

// Export the models for usage in other files
module.exports = { 
    User,
    Comment,
    BlogPost
};
