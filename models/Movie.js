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
            validate: {len:[1,15]}
        },
        description: {
            type: DataTypes.STRING
        },
        average_score: {
            type:DataTypes.INTEGER
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