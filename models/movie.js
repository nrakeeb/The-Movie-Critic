const { Model, DataTypes } = require('sequelize');
 
const sequelize = require('../config/connection.js');

class movie extends Model {

}

movie.init({
    movie_id:
    {   type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    imdb_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
       
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

    release_date: {
        type:DataTypes.DATEONLY,
        allowNull: false,
    },

    language: {
        type:DataTypes.STRING,
        allowNull:false


    },
    overview:{
        type: DataTypes.STRING,
        allowNull: false,

    }
},{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'movie'
})

module.exports = movie;