const User = require('./User');
const Post = require('./Post');
const Movie = require('./movie')

User.hasMany(Post, {
    foreignKey: 'user_id'
})

Post.belongsTo(User, {
    foreignKey: 'user_id'
})

Movie.hasMany(Post, {

})

Post.belongsTo(Movie, {

})


module.exports = {
    User,
    Post,
    Movie,
};