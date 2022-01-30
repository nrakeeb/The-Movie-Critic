const { Model, DataTypes } = require('sequelize');
 
const sequelize = require('../config/connection.js');

class Movie extends Model {}

Movie.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
         len: [5]
        }
    },
    poster_path: {
        type: DataTypes.STRING

    },

    release_date: {
        type:DataTypes.DATEONLY,
        allowNull: false,
    },

    original_language: {
        type:DataTypes.STRING,
        allowNull:true
    },

    // overview:{
    //     type: DataTypes.STRING,
    //     allowNull: false,
    // },
},{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'movie'
})

module.exports = Movie;