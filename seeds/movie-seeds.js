const { Movie } = require('../models')
const sequelize = require('../config/connection')

const data = [
    {
        title: "Anchorman",
        description: "funny movie"
    },
    {
        title: "Batman",
        description: "DC movie"
    },
    {
        title: "Candyman",
        description: "old movie"
    },
    {
        title: "Dead Man",
        description: "western movie"
    },
    {
        title: 'Enchantman',
        description: 'I made this up to fit the movie name pattern',
        average_score: 4
    }
];

const seedMovies = () => Movie.bulkCreate(data)

module.exports = seedMovies