const Post = require('./Post');
const User = require('./User');

// create association 
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// reverse association by adding :
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Post };