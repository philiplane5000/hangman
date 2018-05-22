console.log('CONNECTED');

//HTML LOCATION VARIABLES:
let dinosaursArray = ["Velociraptor", "Spinosaurus", "Stegosaurus", "Avimimus", "Hadrosaurus", "Heptasteornis", "Heterodontosaurus", "Hylaeosaurus", "Kotasaurus", "Othnielia", "Jaxartosaurus", "Kritosaurus", "Chindesaurus", "Citipati", "Chubutisaurus", "Khaan", "Sauropelta", "Styracosaurus", "Supersaurus", "Vulcanodon", "Zuniceratops", "Ultrasauros", "Utahraptor", "Valdosaurus"];
// let dinosaursArray = ["Tyrannosaurus Rex"]; /*WILL NOT WORK UNTIL SPACE KEY ADDED SOMEHOW */
let wordPlaceHolder = document.querySelector(".word-container");
let lettersGuessedStrPlaceHolder = document.querySelector(".letters-guessed-container");
let resetBtn = document.querySelector(".siimple-btn--pink");
let guessPlaceHolder = document.querySelector(".guesses")
let winsPlaceHolder = document.querySelector(".wins");

//NUMBER OR STRING VARIABLES TO AFFECT:
let guessesLeft = 10;
let wins = 0;
let lettersGuessedStr = "";
let currentDinosaur = "";
let currentDinosaurNameAsArray = [];
let unknownDinosaurLetters = 1;

//GAME START:
newGame();

//EVENT LISTENERS:
resetBtn.addEventListener("click", newGame);

//GAME LOGIC:
function newGame() {
    //prepare new gameboard:
    resetWinsTally(0);
    resetGuessTally();
    wipeLetters();
    dinosaurNameGenerator();
    //power game logic:
    gameLogic();
    // updateBoard();
}

function newGameForChampion() {
    lettersGuessedStr = "";
    unknownDinosaurLetters = 0;
    resetGuessTally();
    wipeLetters();
    dinosaurNameGenerator();
    //restart game logic:
    updateBoard();
    gameLogic();
}

function updateBoard() {
    //UPDATE GUESS TALLY ON BOARD:
    guessPlaceHolder.innerHTML = "<h3>" + guessesLeft + "</h3>";
    //EMPTY GAMEBOARD STRINGS, REFILL WITH UPDATED LETTERSGUESSED:
    lettersGuessedStrPlaceHolder.innerHTML = "";
    lettersGuessedStrPlaceHolder.innerHTML = "<h3>" + lettersGuessedStr + "</h3>";
    //UPDATE WINS TALLY: (possibly unneccessary)
    resetWinsTally(wins);
}

function resetGuessTally() {
    guessesLeft = 10;
    guessPlaceHolder.innerHTML = "<h3>" + guessesLeft + "</h3>";
}

function wipeLetters() {
    wordPlaceHolder.innerHTML = "";
    currentDinosaurNameAsArray = [];
    lettersGuessedStr = "";
    lettersGuessedStrPlaceHolder.innerHTML = "<h3>" + lettersGuessedStr + "</h3>";
}

function dinosaurNameGenerator() {
    let randomDino = dinosaursArray[(Math.floor(Math.random() * dinosaursArray.length))].toUpperCase();
    console.log(randomDino);
    currentDinosaur = randomDino; /*for alert*/
    for (let j = 0; j < randomDino.length; j++) {
        currentDinosaurNameAsArray.push(randomDino[j]);
    }
    console.log(currentDinosaurNameAsArray);
    for (let i = 0; i < currentDinosaurNameAsArray.length; i++) {
        wordPlaceHolder.innerHTML += "<div class=\"letter-container\">"
            + "<div class=\"dino-hide letter siimple-box--small " + currentDinosaurNameAsArray[i] + "\"" + ">" + currentDinosaurNameAsArray[i] + "</div>"
            + "</div>";
    }
    // unknownDinosaurLetters = document.querySelectorAll('.dino-hide').length;
    // console.log(unknownDinosaurLetters);
}

function gameLogic() {

        document.onkeyup = function (e) {
            //SET THE LETTER/GUESS UP FOR CHECKING:
            let unknownDinosaurLetters = document.getElementsByClassName('dino-hide').length;
            let currentGuess = e.key.toUpperCase();
            let currentGuessKey = e.keyCode;
            console.log(unknownDinosaurLetters);
            console.log(currentGuess);


            //no.1 - alert if CHAMPION
            //check if dinosaur word is complete:
            if (unknownDinosaurLetters <= 0) {
                alert("CHAMPION!");
                wins++;
                newGameForChampion();
                return;
                //^ same as newGame() minus reset of wins tally:
            } 
            //no.2 - alert if key is not a valid letter
            if (currentGuessKey < 65 || currentGuessKey > 90) {
                alert('LETTERS ONLY!');
                // return;
                }
            //BEGIN CHECKING FOR GUESS ACCURACY:
            //no.3 - check if guess is correct and affect gameboard accordingly:
            else if (currentDinosaurNameAsArray.includes(currentGuess)) {
                let matchingGuess = document.getElementsByClassName(`${currentGuess}`);
                //if there is a matching guess, run a for loop to uncover the HTML:
                if(matchingGuess){
                    console.log(matchingGuess);
                    for(let m = 0; m <= matchingGuess.length; m++) {
                        if(!(matchingGuess[m] === undefined)) {
                        matchingGuess[m].classList.remove('dino-hide');
                        } 
                    }
                    //end uncover of html loop
                }
                // return;
            }
            //no.4 - check if current guesses matches a previously guessed entry:
            else if (lettersGuessedStr.includes(currentGuess)) {
                alert("YOU ALREADY GUESSED:   " + "'" + currentGuess + "'");
                return;
            } 
      
            /*all else if statements here END */
            /*if nothing above applies, append guessed letter to "lettersGuessedStr" && deduct one guess*/
            else {
                lettersGuessedStr += (currentGuess + ",  ");
                console.log(lettersGuessedStr);
                guessesLeft--;
                if (guessesLeft === 0) {
                    alert("GAME OVER!");
                    alert("THE DINO THAT STUMPED YOU WAS:   " + currentDinosaur + " .");
                    alert("PLEASE REVIEW:" + "\n" + "www.DinoDictionary.com");
                    wins = 0;
                    newGame();
                    return;
                }
                updateBoard();
            }
            
            }

        //DO THIS REGARDLESS AFTER EVERY KEY PRESS:
    // updateBoard();
    /*END OF GAMELOGIC*/
}
    //====================================================END OF GAME LOGIC FUNCTION====================================================//

function resetWinsTally(wins) {
    //UPDATE WINS SEPARATELY TO ALLOW FOR CARRYOVER WHEN GAME RESETS:
    totalWinsCount = wins;
    winsPlaceHolder.innerHTML = "<h3>" + totalWinsCount + "</h3>";
}

