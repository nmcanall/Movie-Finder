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
    const movie_id = $(this).closest(".movie-card").attr("data-movie-id")
    const deleteRequest = await fetch('/api/users/watch-next', {
        method: 'DELETE',
        body: JSON.stringify({movie_id}),
        headers: { 'Content-Type': 'application/json' }
    })
    location.reload()
};

async function removeFavoriteHandler(event) {
    const movie_id = $(this).closest(".movie-card").attr("data-movie-id")
    const deleteRequest = await fetch('/api/users/favorite', {
        method: 'DELETE',
        body: JSON.stringify({movie_id}),
        headers: { 'Content-Type': 'application/json' }
    })
    location.reload()
};

async function addFavoriteHanlder(event) {
    const movie_id = $(this).closest(".movie-card").attr("data-movie-id")
    const addFavoriteStream = await fetch('./api/users/favorite', {
        method: 'PUT',
        body: JSON.stringify({movie_id}),
        headers: { 'Content-Type': 'application/json' }
    })
    const addFavoriteResponse = await addFavoriteStream.json()
    console.log(addFavoriteResponse)
};


handleTruncate()

$('.mark-watched').on('click', markWatchedHandler)
$('.add-favorites').on('click', addFavoriteHanlder)
$('.remove-favorites').on('click', removeFavoriteHandler)