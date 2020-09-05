const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class Movie extends Model {}

Movie.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {len:[1,50]}
        },
        date: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        average_score: {
            type:DataTypes.INTEGER
        },
        image_url: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'movie'
    }
);

module.exports = Movie;