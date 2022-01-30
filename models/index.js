const User = require('./User');
const Post = require('./Post');
const Movie = require('./Movie')

User.hasMany(Post, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})

User.hasMany(Movie, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})

Post.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'

})

Movie.hasMany(Post, {
    foreignKey: "movieId",
    onDelete: 'CASCADE'

})

Post.belongsTo(Movie, {
    foreignKey: "movieId", 
    onDelete: 'CASCADE'

})

Movie.belongsTo(User,{
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})


module.exports = {
    User,
    Post,
    Movie,
};