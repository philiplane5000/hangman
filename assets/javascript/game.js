//HTML TARGETS:
let wordPlaceHolder              = document.querySelector(".word-container");
let lettersGuessedStrPlaceHolder = document.querySelector(".letters-guessed-container");
let restart                      = document.querySelector(".siimple-btn--pink");
let guessPlaceHolder             = document.querySelector(".guesses")
let winsPlaceHolder              = document.querySelector(".wins");

//GLOBAL VARIABLES TO AFFECT:
let guessesLeft                  = 10;
let totalWins                    = 0;
let lettersGuessedStr            = "";
let correctLettersGuessedStr     = "";
let currentDinosaur              = "";
let currentDinosaurNameAsArray   = [];
let unknownDinosaurLetters       = 1;

//DINO OBJECT: (ARRAY, NAME GENERATOR, SET:CURRENT-NAME, SET:CURRENT-DINO-NAME-AS-ARRAY)
let dinosaurGenerator = {
    namesArr: ["Apatosaurus", "Brontosaurus", "Brachiosaurus", "Triceratops", "Diplodocus", "Torvosaurus", "Velociraptor", "Spinosaurus", "Nodosaurus", "Stegosaurus", "Pterodactyls", "Avimimus", "Hadrosaurus", "Heptasteornis", "Heterodontosaurus", "Hylaeosaurus", "Kotasaurus", "Othnielia", "Jaxartosaurus", "Kritosaurus", "Chindesaurus", "Citipati", "Chubutisaurus", "Khaan", "Sauropelta", "Styracosaurus", "Supersaurus", "Vulcanodon", "Zuniceratops", "Ultrasauros", "Utahraptor", "Valdosaurus", "Harpymimus", "Euhelopus", "Alvarezsaurus", "Deinodon", "Baryonyx", "Mononkyus", "Pentaceratops", "Poekilopleuron", "Itemirus", "Wannanosaurus"],
    nameSelector: function () {
        let randomDino = this.namesArr[(Math.floor(Math.random() * this.namesArr.length))].toUpperCase();
        console.log(randomDino);
        currentDinosaur = randomDino; /*for alert*/
        for (let n = 0; n < randomDino.length; n++) {
            currentDinosaurNameAsArray.push(randomDino[n]);
        }
        console.log(currentDinosaurNameAsArray);
        for (let i = 0; i < currentDinosaurNameAsArray.length; i++) {
            wordPlaceHolder.innerHTML += "<div class=\"letter-container\">"
                + "<div class=\"dino-hide letter siimple-box--small " + currentDinosaurNameAsArray[i] + "\"" + ">" + currentDinosaurNameAsArray[i] + "</div>"
                + "</div>";
        }
        unknownDinosaurLetters = document.querySelectorAll('.dino-hide').length;
    }
};

//GAMEBOARD OBJECT: (RESET BOARD OR CARRY-OVER WINS WHEN APPLICABLE)
let gameBoard = {
    wipeLetters: function () {
        wordPlaceHolder.innerHTML = "";
        currentDinosaurNameAsArray = [];
        lettersGuessedStr = "";
        correctLettersGuessedStr = "";
        lettersGuessedStrPlaceHolder.innerHTML = "";
        lettersGuessedStrPlaceHolder.innerHTML = "<h3>" + lettersGuessedStr + "</h3>";
    },
    resetGuessTally: function () {
        guessesLeft = 10;
        guessPlaceHolder.innerHTML = "<h3>" + guessesLeft + "</h3>";
    },
    resetWinsTally: function (totalWins) {
        //UPDATE WINS SEPARATELY TO ALLOW FOR CARRYOVER WHEN GAME RESETS:
        winsPlaceHolder.innerHTML = "<h3>" + totalWins + "</h3>";
    },
    gameReset: function(champ) {
        //UPDATE GUESS TALLY ON BOARD:
        this.resetGuessTally();
        //EMPTY GAMEBOARD STRINGS:
        this.wipeLetters();
        //UPDATE WINS TALLY: (possibly unneccessary)
        (champ === true) ? this.resetWinsTally(totalWins) : this.resetWinsTally(0);
    },
    update: function () {
        //UPDATE GUESS TALLY ON BOARD:
        guessPlaceHolder.innerHTML = "<h3>" + guessesLeft + "</h3>";
        //REFILL GAMEBOARD WITH UPDATED LETTERSGUESSED:
        lettersGuessedStrPlaceHolder.innerHTML = "";
        lettersGuessedStrPlaceHolder.innerHTML = "<h3>" + lettersGuessedStr + "</h3>";
        //UPDATE WINS TALLY: (possibly unneccessary)
        this.resetWinsTally(totalWins);
    }
};

//====================================================BEGIN CHECK GUESS() FUNCTION====================================================//

function checkGuess() {

    document.onkeyup = function(e) {
        let unknownDinosaurLetters = document.getElementsByClassName('dino-hide').length;
        //SET THE LETTER/GUESS UP FOR CHECKING:
        let currentGuess = e.key.toUpperCase();
        let currentGuessKey = e.keyCode;

        //no.1 - alert if CHAMPION
        //check if dinosaur word is complete:
        if (unknownDinosaurLetters <= 0) {
            alert("CHAMPION!");
            totalWins++;
            gameBoard.gameReset(true);
            dinosaurGenerator.nameSelector();
            return;
        }

        //no.2 - alert if key is not a valid letter
        else if (currentGuessKey < 65 || currentGuessKey > 90) {
            alert('LETTERS ONLY!');
            // return;
        }
        //no.3 (a) check if current guesses matches a previously guessed entry:
        else if (lettersGuessedStr.includes(currentGuess) || correctLettersGuessedStr.includes(currentGuess)) {
            (correctLettersGuessedStr.includes(currentGuess)) ? alert("YOU ALREADY CORRECTLY GUESSED:   " + "'" + currentGuess + "'") : alert("YOU SHOULD ALREADY KNOW THAT  " + "'" + currentGuess + "'  IS NOT IN THERE...");            
        }
        //==============================BEGIN CHECKING FOR GUESS ACCURACY:==============================//

        //no.4 - if new guess is correct, affect gameboard accordingly:
        else if (currentDinosaurNameAsArray.includes(currentGuess)) {
            correctLettersGuessedStr += (currentGuess + ", ");
            console.log("CORRECT LETTERS GUESSED STR: " + correctLettersGuessedStr);
            let matchingGuess = document.getElementsByClassName(`${currentGuess}`);
            //if there is a matching guess, run a for loop to uncover the HTML:
            if (matchingGuess) {
                for (let m = 0; m <= matchingGuess.length; m++) {
                    if (!(matchingGuess[m] === undefined)) {
                        matchingGuess[m].classList.remove('dino-hide');
                    }
                }
            }
            // return;
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
                totalWins = 0;
                gameBoard.gameReset();
                dinosaurGenerator.nameSelector();
                return;
            }
            gameBoard.update();
        }

    }
}
//====================================================END CHECK GUESS() FUNCTION========================================================//

function newGame() {
    //prepare new gameboard:
    gameBoard.gameReset()
    dinosaurGenerator.nameSelector();
    //power game logic:
    checkGuess();
}

//GAME START:
newGame();

//BUTTONS:
restart.addEventListener("click", newGame); /*RESTART BUTTON:*/