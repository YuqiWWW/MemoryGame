/*
 * Create a list that holds all of your cards
 */
var contents = ["diamond", "diamond", "paper-plane-o", "paper-plane-o", "anchor", "anchor", "bolt",
                "bolt", "cube", "cube", "leaf", "leaf", "bicycle", "bicycle", "bomb", "bomb"];
let count = 0;
let move = 0;

                /*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// contents = shuffle(contents);
 let cards = document.getElementsByClassName("card");
 start(cards);

 document.querySelector(".restart").addEventListener("click", function(){
     start(cards);
 });

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let deck = document.querySelector(".deck");
let first = null;
// let img;
deck.addEventListener("click", function (event) {
    if (event.target.className === "deck" ||event.target.className.includes("fa")) {
        return;
    }
    console.log(isMatched(event.target));
    if (isMatched(event.target)){
        first = null;
        return;
    } else {
        move += 1;
        event.target.setAttribute("class", "card open show");
         if (first ===  null) {
            first = event.target;
        } else {
            if (first.firstElementChild.className === event.target.firstElementChild.className
                && first !== event.target) {   // card is matched
                first.setAttribute("class", "card match"); 
                event.target.setAttribute("class", "card match");
                first = null;
                count += 2;
            } else {
                first.setAttribute("class", "card"); 
                event.target.setAttribute("class", "card");
                first = null;
            }
        }
    }
});

function isMatched (card) {
    return card.className.includes("match");
}

function start (cards) {
    count = 0;
    move = 0;
    contents = shuffle(contents);
    for (let i = 0; i < cards.length; i ++){
        cards.item(i).firstElementChild.setAttribute('class', "fa fa-"+contents[i]);
        cards.item(i).setAttribute("class", "card");
    }
}