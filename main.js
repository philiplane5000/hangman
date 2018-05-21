console.log('CONNECTED');

let dinosaursArray = ["Velociraptor", "Spinosaurus", "Stegosaurus", "Avimimus", "Chindesaurus", "Citipati", "Chubutisaurus", "Khaan", "Sauropelta", "Styracosaurus", "Supersaurus", "Vulcanodon", "Zuniceratops"];   
let wordPlaceHolder = document.querySelector(".word-container");
let lettersGuessedPlaceHolder = document.querySelector(".letters-guessed-container");
let resetBtn = document.querySelector(".new-game");
let guessPlaceHolder = document.querySelector(".guesses")
let winsPlaceHolder = document.querySelector(".wins");

let guessesLeft = 10;
let totalNumberOfWins = 0;
let lettersGuessed = [];
let currentDinosaur = "";
let currentDinosaurNameAsArray = [];

//GAME START:
newGame();

//EVENT LISTENERS:
resetBtn.addEventListener("click", newGame);
resetBtn.addEventListener("mouseenter", function(){
    this.style.boxShadow = "2px 2px 2px rgba(0,0,0,0.5)";
});



//GAME LOGIC:
function newGame() {

    cleanGameBoard();
    dinosaurNameGenerator();
    checkGuess();
    updateBoard();

}

function cleanGameBoard() {
    wordPlaceHolder.innerHTML = "";
    guessesLeft = 10;
    guessPlaceHolder.innerHTML = "<h3>" + guessesLeft + "</h3>";
    totalNumberOfWins = 0;
    winsPlaceHolder.innerHTML = "<h3>" + totalNumberOfWins + "</h3>";
    currentDinosaurNameAsArray = [];
}

function dinosaurNameGenerator() {
    let dino = dinosaursArray[(Math.floor(Math.random() * dinosaursArray.length))].toUpperCase();
    console.log(dino);
    currentDinosaur = dino;
    for(let j = 0; j < dino.length; j++){
        currentDinosaurNameAsArray.push(dino[j])
    }
    console.log(currentDinosaurNameAsArray);
    for(let i = 0; i < currentDinosaurNameAsArray.length; i++){
        wordPlaceHolder.innerHTML += "<div class=\"letter-container\">"
        + "<div class=\"hide letter siimple-box--small " + currentDinosaurNameAsArray[i] + "\"" + ">" + currentDinosaurNameAsArray[i] + "</div>" 
        + "</div>";
    }
}

function checkGuess() {
    document.onkeyup = function(e) { 
        let currentGuess = e.key;
        if(lettersGuessed.includes(currentGuess)){alert("PREVIOUSLY GUESSED LETTER!"); return;}
        lettersGuessed.push(currentGuess);
        // lettersGuessed.push(currentGuess);
        if(currentDinosaurNameAsArray.includes(currentGuess)) {
            let matchingGuess = document.getElementsByClassName(`${currentGuess}`);
            for(let m = 0; m <= matchingGuess.length; m++){
                matchingGuess[m].classList.remove('hide');
            }
            updateBoard(); 
            } else {
            guessesLeft--;
            updateBoard();
            }
    }
}

function updateBoard() {
    if(guessesLeft <= 0){
        alert("GAME OVER!");
        newGame();
    } else {
        guessPlaceHolder.innerHTML = "<h3>" + guessesLeft + "</h3>";
        winsPlaceHolder.innerHTML = "<h3>" + totalNumberOfWins + "</h3>";
        lettersGuessedPlaceHolder.innerHTML = "";
        for(let q = 0; q < lettersGuessed.length; q++){
            lettersGuessedPlaceHolder.innerHTML += "<div class=\"letter-container\">"
            + "<div class=\"letter siimple-box--small\">" + lettersGuessed[q].toUpperCase() + "</div>"
            + "</div>" 
            };
    }
}
