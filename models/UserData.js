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
            set(value) {
                this.setDataValue('movies_to_watch', JSON.stringify(value))
            },
            get() {
                const rawValue = this.getDataValue(movies_to_watch)
                return JSON.parse(rawValue)
            }
        },
        watched_movies: {
            type: DataTypes.STRING,
            set(value) {
                this.setDataValue('watched_movies', JSON.stringify(value))
            },
            get() {
                const rawValue = this.getDataValue(watched_movies)
                return JSON.parse(rawValue)
            }
        },
        favorite_movies: {
            type: DataTypes.STRING,
            set(value) {
                this.setDataValue('favorite_movies', JSON.stringify(value))
            },
            get() {
                const rawValue = this.getDataValue(favorite_movies)
                return JSON.parse(rawValue)
            }
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