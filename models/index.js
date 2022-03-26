const Post = require('./Post');
const User = require('./User');
const Vote = require('./Vote');
const Comment = require('./Comments');


// create association 
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// reverse association by adding :
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// connecting Post and User models together through the Vote model
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

// creating one to many relationships between these models so w e can perform aggregated SQL functions between Models
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
  });

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Vote, Comment };