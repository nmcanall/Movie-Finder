const { UserRating } = require('../models')
const sequelize = require('../config/connection');

const data = [
    {
        user_id: 1,
        movie_id: 2,
        score: 7
    },
    {
        user_id: 3,
        movie_id: 2,
        score: 4
    },
    {
        user_id: 5,
        movie_id: 4,
        score: 9
    },
    {
        user_id: 5,
        movie_id: 2,
        score: 5
    },
    {
        user_id: 3,
        movie_id: 4,
        score: 7
    },
    {
        user_id: 1,
        movie_id: 4,
        score: 3
    },
    
];

const seedUserRatings = () => UserRating.bulkCreate(data)

module.exports = seedUserRatings