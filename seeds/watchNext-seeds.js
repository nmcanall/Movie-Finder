const {WatchNext} = require('../models')
const sequelize = require('../config/connection');

const data = [
    {
        user_id: 2,
        movie_id: 2
    },
    {
        user_id: 2,
        movie_id: 3
    },
    {
        user_id: 3,
        movie_id: 5
    },
    {
        user_id: 4,
        movie_id: 1
    },
    {
        user_id: 5,
        movie_id: 5
    },
    {
        user_id: 5,
        movie_id: 2
    },
    
];

const seedWatchNext = () => WatchNext.bulkCreate(data);

module.exports = seedWatchNext;