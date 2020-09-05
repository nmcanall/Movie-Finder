function searchHandler(event) {
    event.preventDefault()
    const query = $('.search-field').val().trim()
    console.log('Submitted!')
    if (query) {
        window.location.href = `./search?query=${query}`
    }
    else {
        window.location.href = './search'
    }
}

async function addWatchHandler(event) {
    const result = $(this).closest(".result-holder")
    const data = parseMovieData(result)
    const movieResponse = await postMovie(data)
    const watchResponseStream = await fetch('/api/users/watch-next', {
        method: 'PUT',
        body: JSON.stringify({movie_id: movieResponse.movie_id}),
        headers: { 'Content-Type': 'application/json' }
    })
    const watchResponse = await watchResponseStream.json()
    console.log(movieResponse)
    console.log(watchResponse)
}
async function addFavoriteHandler(event) {
    const result = $(this).closest(".result-holder")
    const data = parseMovieData(result)
    const movieResponse = await postMovie(data)
    const favoriteResponseStream = await fetch('/api/users/favorite', {
        method: 'PUT',
        body: JSON.stringify({movie_id: movieResponse.movie_id}),
        headers: { 'Content-Type': 'application/json' }
    })
    const favoriteResponse = await favoriteResponseStream.json()
    console.log(movieResponse)
    console.log(favoriteResponse)
}
function parseMovieData(result) {
    const title = result.find(".movie-title").text()
    const date = result.find(".movie-date").text()
    const description = result.find(".movie-overview").text()
    const image_url = result.find(".movie-poster").attr("src")
    return {title,date,description,image_url}
}
async function postMovie(data) {
    const movieResponseStream = await fetch('/api/movies', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    });
    const movieResponse = await movieResponseStream.json()
    if (movieResponse.id) {
        movieResponse.movie_id = movieResponse.id
    }
    return movieResponse
}
$('.search-form').on('submit', searchHandler)

$('.add-watch').on('click',addWatchHandler)
$('.add-favorites').on('click',addFavoriteHandler)