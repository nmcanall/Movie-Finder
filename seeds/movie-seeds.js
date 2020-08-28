const { Movie } = require('../models')
const sequelize = require('../config/connection')

const data = [
    {
        title: 'Movie1',
        description: 'Generic Description',
        average_score: 0
    },
    {
        title: 'Movie2',
        description: 'Generic Description',
        average_score: 5
    },
    {
        title: 'Movie3',
        description: 'Generic Description',
        average_score: 9
    },
    {
        title: 'Movie4',
        description: 'Generic Description',
        average_score: 8
    },
    {
        title: 'Movie5',
        description: 'Generic Description',
        average_score: 4
    }
];

const seedMovies = () => Movie.bulkCreate(data)

module.exports = seedMovies