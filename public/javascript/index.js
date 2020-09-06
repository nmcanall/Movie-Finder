function searchHandler(event) {
    event.preventDefault()
    const query = $('.search-field').val().trim()
    console.log(query)
    if (query) {
        window.location.href = `./search?query=${query}`
    }
    else {
        window.location.href = './search'
    }
}


$('.search-form').on('submit', searchHandler)

