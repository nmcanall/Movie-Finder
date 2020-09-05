const fetch = require('node-fetch')
require('dotenv').config()

async function queryMovieAPI(query) {
    if (!query) {
        return {results: []}
    }
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
    const stream = await fetch(url)
    const data = await stream.json()
    return data
};
function formatDate(date) {
    const dateArr = date.split('-')
    return `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`
};

module.exports = {queryMovieAPI,formatDate}