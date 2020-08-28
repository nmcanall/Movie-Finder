const { UserData } = require('../models')
const sequelize = require('../config/connection')

const data = [
    {
        user_id: 1,
        movies_to_watch: [1,2],
        watched_movies: [3,4],
        favorite_movies: null
    },
    {
        user_id: 2,
        movies_to_watch: [2],
        watched_movies: [1],
        favorite_movies: [1]
    },
    {
        user_id: 3,
        movies_to_watch: [3,4],
        watched_movies: [5],
        favorite_movies: [1]
    },
    {
        user_id: 4,
        movies_to_watch: [1],
        watched_movies: [2],
        favorite_movies: null
    },
    {
        user_id: 5,
        movies_to_watch: null,
        watched_movies: null,
        favorite_movies: null
    },
]

const seedUserData = () => UserData.bulkCreate(data)

module.exports = seedUserData