function handleTruncate() {
    let descriptions = document.querySelectorAll(".card-text")
    const textHolder = {}
    for(i=0;i<descriptions.length;i++) {
        descriptions[i].setAttribute("data-truncate",i)
        textHolder[i] = descriptions[i].textContent
        descriptions[i].textContent= truncateText(descriptions[i].textContent)
    }

    $(".card-text").on("click", function() {
        const data = this.getAttribute("data-truncate")
        if(this.textContent === textHolder[data]) {
            this.textContent = truncateText(this.textContent)
        }
        else{
            this.textContent = textHolder[data] 
        }
        
    })
};
function truncateText(text) {
    if (text.length > 200) {
        text = text.substring(0,200) + "..."
    }
    return text
};
async function markWatchedHandler(event) {
    const movie = $(this).closest(".movie-card")
    const movie_id = movie.attr("data-movie-id")
    const title = movie.find(".card-title").text()
    const deleteRequest = await fetch('/api/users/watch-next', {
        method: 'DELETE',
        body: JSON.stringify({movie_id}),
        headers: { 'Content-Type': 'application/json' }
    })
    await modalHandler({title,watched:true})
};

async function removeFavoriteHandler(event) {
    const movie = $(this).closest(".movie-card")
    const movie_id = movie.attr("data-movie-id")
    const title = movie.find(".card-title").text()
    const deleteRequest = await fetch('/api/users/favorite', {
        method: 'DELETE',
        body: JSON.stringify({movie_id}),
        headers: { 'Content-Type': 'application/json' }
    })
    await modalHandler({title,removeFavorite:true})
};

async function addFavoriteHanlder(event) {
    const movie = $(this).closest(".movie-card")
    const movie_id = movie.attr("data-movie-id")
    const title = movie.find(".card-title").text()
    const addFavoriteStream = await fetch('./api/users/favorite', {
        method: 'PUT',
        body: JSON.stringify({movie_id}),
        headers: { 'Content-Type': 'application/json' }
    })
    const addFavoriteResponse = await addFavoriteStream.json()
    const data = {title,addFavorite:true}
    if (addFavoriteResponse.message) {
        data.alreadyAdded = true
    }
    console.log(addFavoriteResponse)
    await modalHandler(data)
};

async function modalHandler(data) {
    let text
    if (data.watched) {
        text = `${data.title} has been marked as watched!`
    }
    if (data.removeFavorite) {
        text = `${data.title} has been removed from your favorites list!`
    }
    if (data.addFavorite) {
        if (data.alreadyAdded) {
            text = `${data.title} is already on your favorites list!`
        }
        else {
            text = `${data.title} has been added to your favorites list!`
        }
    }
    $('.modal-title').text(data.title)
    $('.modal-text').text(text)
    $('.modal').modal()
}
function randomMovie() {
    const movies = document.querySelectorAll(".movie-card")
    const randomInt = Math.floor(Math.random() * Math.floor(movies.length))
    const movie = $(movies[randomInt])
    const modalBody = $('.modal-body')
    const modalTitle = $('.modal-title')
    modalBody.addClass('d-flex justify-content-center')
    modalTitle.addClass('text-center col-12')
    movie.find(".poster").clone().appendTo(modalBody)
    modalTitle.text(
        movie.find('.card-title').text()
    )
    $('.modal').modal()
}
function refresh(){
    location.reload()
}

handleTruncate()

$('.mark-watched').on('click', markWatchedHandler)
$('.add-favorites').on('click', addFavoriteHanlder)
$('.remove-favorites').on('click', removeFavoriteHandler)
$('.random').on('click',randomMovie)
$('#modal').on('hidden.bs.modal',refresh)