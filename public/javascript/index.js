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

function addWatchHandler(event) {
    target = $(this)
    console.log(target)

}
function addFavoriteHandler(event) {

}
$('.search-form').on('submit', searchHandler)

$('.add-watch').on('click',addWatchHandler)
$('.add-favorite').on('click',addFavoriteHandler)