console.log('CONNECTED');

let dinosaursArray = ["Velociraptor", "Spinosaurus", "Stegosaurus", "Avimimus", "Chindesaurus", "Citipati", "Chubutisaurus", "Khaan", "Sauropelta", "Styracosaurus", "Supersaurus", "Vulcanodon", "Zuniceratops"];
let wordPlaceHolder = document.querySelector(".word-container");
let lettersGuessedStrPlaceHolder = document.querySelector(".letters-guessed-container");
let resetBtn = document.querySelector(".new-game");
let guessPlaceHolder = document.querySelector(".guesses")
let winsPlaceHolder = document.querySelector(".wins");

let guessesLeft = 10;
let wins = 0;
let lettersGuessedStr = "";
let currentDinosaur = "";
let currentDinosaurNameAsArray = [];



//GAME START:
newGame();

//EVENT LISTENERS:
resetBtn.addEventListener("click", newGame);
resetBtn.addEventListener("mouseenter", function () {
    this.style.boxShadow = "2px 2px 2px rgba(0,0,0,0.5)";
});



//GAME LOGIC:
function newGame() {
    //PREPARE GAME BOARD:
    resetWinsTally(0);
    resetGuessTally();
    wipeLetters();
    dinosaurNameGenerator();
    //POWER GAME LOGIC:
    checkGuess();
    updateBoard();
}

function wipeLetters() {
    wordPlaceHolder.innerHTML = "";
    currentDinosaurNameAsArray = [];
    lettersGuessedStr = "";
}

function dinosaurNameGenerator() {
    let randomDino = dinosaursArray[(Math.floor(Math.random() * dinosaursArray.length))].toUpperCase();
    console.log(randomDino);
    for (let j = 0; j < randomDino.length; j++) {
        currentDinosaurNameAsArray.push(randomDino[j]);
    }
    console.log(currentDinosaurNameAsArray);
    for (let i = 0; i < currentDinosaurNameAsArray.length; i++) {
        wordPlaceHolder.innerHTML += "<div class=\"letter-container\">"
            + "<div class=\"dino-hide letter siimple-box--small " + currentDinosaurNameAsArray[i] + "\"" + ">" + currentDinosaurNameAsArray[i] + "</div>"
            + "</div>";
    }
}

function checkGuess() {
    document.onkeyup = function (e) {
        let currentGuess = e.key.toUpperCase();
        console.log(currentGuess);
        let currentGuessKey = e.keyCode;
        if (currentGuessKey < 65 || currentGuessKey > 90) {
            alert('LETTERS ONLY!');
            return;
        } else if (currentDinosaurNameAsArray.includes(currentGuess)) {
            if (document.querySelectorAll('.dino-hide').length === 0) {
                wins++;
                resetWinsTally(wins);
                alert("CHAMPION!");
                wipeLetters();
                resetGuessTally();
                dinosaurNameGenerator();
                checkGuess();
                return;
            } else {
                let matchingGuess = document.getElementsByClassName(`${currentGuess}`);
                for (let m = 0; m <= matchingGuess.length; m++) {
                    if (!(matchingGuess[m] === undefined)) {
                        matchingGuess[m].classList.remove('dino-hide');
                    } else {
                        console.log('NO MATCH HERE');
                    }
                }
            }

        } else if (lettersGuessedStr.includes(currentGuess)) {
            alert("PREVIOUSLY GUESSED LETTER!");
            return;
        } else {
            lettersGuessedStr += (currentGuess + ", ");
            console.log(lettersGuessedStr);
            guessesLeft--;
            updateBoard();
        }
    }

}

function updateBoard() {
    if (guessesLeft <= 0) {
        alert("GAME OVER!");
        newGame();
    } else {
        //UPDATE GUESSES:
        guessPlaceHolder.innerHTML = "<h3>" + guessesLeft + "</h3>";
        //RESET STRING(?):
        lettersGuessedStrPlaceHolder.innerHTML = "";
        lettersGuessedStrPlaceHolder.innerHTML = "<h3>" + lettersGuessedStr + "</h3>"
    }
}

function resetWinsTally(wins) {
    totalNumberOfWins = wins;
    winsPlaceHolder.innerHTML = "<h3>" + totalNumberOfWins + "</h3>";
}

function resetGuessTally() {
    guessesLeft = 10;
    guessPlaceHolder.innerHTML = "<h3>" + guessesLeft + "</h3>";
}
