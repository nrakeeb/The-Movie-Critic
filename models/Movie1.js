const { Model, DataTypes } = require('sequelize');
 
const sequelize = require('../config/connection.js');

class Movie extends Model {

}

Movie.init({
    movie_id:
    {   type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    imdb_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique:true

    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
         len: [5]
        }
    },
    image_url: {
        type: DataTypes.STRING

    },


},{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'movie'
})

module.exports = Movie;