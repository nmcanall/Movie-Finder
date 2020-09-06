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
    if (watchResponse.message) {
        data.alreadyAdded = true
    }
    data.list = 'watch'
    await modalHandler(data)
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
    if (favoriteResponse.message) {
        data.alreadyAdded = true
    }
    data.list = 'favorite'
    await modalHandler(data)
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
async function modalHandler(data) {
    let text
    if (data.alreadyAdded) {
        text = `${data.title} is already on your ${data.list} list!` 
    }
    else {
        text = `${data.title} has been added to your ${data.list} list!`
    }
    $('.modal-title').text(data.title)
    $('.modal-text').text(text)
    $('.modal').modal()
}

$('.add-watch').on('click',addWatchHandler)
$('.add-favorites').on('click',addFavoriteHandler)

