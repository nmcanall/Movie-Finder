const { Movie } = require('../models')
const sequelize = require('../config/connection')

const data = [
    {
        title: "Anchorman",
        description: "funny movie",
        date:"()",
        image_url: "./images/placeholder.jpg"
    },
    {
        title: "Batman",
        description: "DC movie",
        date:"()",
        image_url: "./images/placeholder.jpg"
    },
    {
        title: "Candyman",
        description: "old movie",
        date:"()",
        image_url: "./images/placeholder.jpg"
    },
    {
        title: "Dead Man",
        description: "western movie",
        date:"()",
        image_url: "./images/placeholder.jpg"
    },
    {
        title: 'Enchantman',
        description: 'I made this up to fit the movie name pattern',
        date:"()",
        image_url: "./images/placeholder.jpg"
    }
];

const seedMovies = () => Movie.bulkCreate(data)

module.exports = seedMovies