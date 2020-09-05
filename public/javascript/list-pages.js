function handleTruncate() {
    let cards = document.querySelectorAll(".card-text")
    const textHolder = {}
    for(i=0;i<cards.length;i++) {
        cards[i].setAttribute("data",i)
        textHolder[i] = cards[i].textContent
        cards[i].textContent= truncateText(cards[i].textContent)
    }

    $(".card-text").on("click", function() {
        const data = this.getAttribute("data")
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
handleTruncate()