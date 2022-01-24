const User = require('./User');
const Post = require('./Post');
const Movie = require('./Movie')

User.hasMany(Post, {
    foreignKey: 'user_id'
})

Post.belongsTo(User, {
    foreignKey: 'user_id'
})

Movie.hasMany(Post, {
    foreignKey: "movie_id"
})

Post.belongsTo(Movie, {
    foreignKey: "movie_id"
})


module.exports = {
    User,
    Post,
    Movie,
};