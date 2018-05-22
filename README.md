# Hangman


* **REMEMBER:**  Don't forget to place your global variables and functions above your object.


# BUGS:

* only notifies of previously guessed letter if in "LETTERS GUESSED" -- does nothing if letter is in DINO ARRAY
    - fix: create another LETTERS GUESSED string/array "CORRECTLY GUESSED" and check these for correlations in same if statement as above(?)

* does not alert of CHAMPION! until (after word filled out) && a correctly guessed letter/key is pressed again(?)
    - fix: checkGuess() needs to first identify for unhidden === 0; if so, alert('CHAMPION') and update gameboard (excluding wins tally);