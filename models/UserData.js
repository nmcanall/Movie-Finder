const {Model,DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class UserData extends Model {}

UserData.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        movies_to_watch: {
            type: DataTypes.STRING,
        },
        watched_movies: {
            type: DataTypes.STRING,
        },
        favorite_movies: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user_data'
    }
);

module.exports = UserData;