const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');


class Post extends Model {}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
   
    ranking: {
        type: DataTypes.STRING,
        validate: {
            len: [1,5]
        }
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    movie_id:{
        type: DataTypes.INTEGER,
        references: {
            model: 'movie',
            key: 'movie_id'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
})


module.exports = Post;