console.log('CONNECTED');

let dinosaursArray = ["Velociraptor", "Spinosaurus", "Stegosaurus", "Avimimus", "Chindesaurus", "Citipati", "Chubutisaurus", "Khaan", "Sauropelta", "Styracosaurus", "Supersaurus", "Vulcanodon", "Zuniceratops"];   
let wordPlaceHolder = document.querySelector(".word-container");
let resetBtn = document.querySelector(".new-game");
let guessesLeft = 10;
let totalNumberOfWins = 0;
let lettersGuessed = [];

//GAME START:

newGame();
resetBtn.addEventListener("click", newGame);

// document.onkeyup = function(e) {
//     lettersGuessed.push(e.key);
//     console.log(lettersGuessed);
// }
//OTHER EVENT LISTENERS:

// document.onkeyup = function(e){
//     console.log(e.key);
// }



function newGame() {
    cleanGameBoard();
    document.querySelector(".guess").innerHTML = "<h3>" + guessesLeft + "</h3>";
    document.querySelector(".wins").innerHTML = "<h3>" + totalNumberOfWins + "</h3>";
    dinosaurNameGenerator();
    letterTracker();
}

function cleanGameBoard() {
    wordPlaceHolder.innerHTML = "";
    guessesLeft = 10;
    totalNumberOfWins = 0;
    lettersGuessed = [];
}

function dinosaurNameGenerator() {
    let dino = dinosaursArray[(Math.floor(Math.random() * dinosaursArray.length))];
    // console.log(dino);
    for(let i = 0; i < dino.length; i++){
        wordPlaceHolder.innerHTML += "<div class=\"letter-container\">"
        + "<div class=\"hide letter siimple-box--small\">" + dino.charAt(i) + "</div>" 
        + "</div>";
    }
}

function letterTracker() {
    document.onkeyup = function(e) {
        lettersGuessed.push(e.key);
        console.log(lettersGuessed);
    }
}




