const { Favorite } = require('../models')
const sequelize = require('../config/connection');

const data = [
    {
        user_id: 1,
        movie_id: 3
    },
    {
        user_id: 1,
        movie_id: 4
    },
    {
        user_id: 2,
        movie_id: 5
    },
    {
        user_id: 4,
        movie_id: 4
    },
    {
        user_id: 4,
        movie_id: 5
    },
    {
        user_id: 4,
        movie_id: 1
    },
    
];

const seedFavorites = () => Favorite.bulkCreate(data);

module.exports = seedFavorites;