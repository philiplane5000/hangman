console.log('CONNECTED');

let guessesLeft = 10;
let totalNumberOfWins = 0;
let dinosaursArray = ["Velociraptor", "Spinosaurus", "Stegosaurus", "Avimimus", "Chindesaurus", "Citipati", "Chubutisaurus", "Khaan", "Sauropelta", "Styracosaurus", "Supersaurus", "Vulcanodon", "Zuniceratops"];   

let boardGuessPlaceHolder = document.querySelector(".guess");
let boardWinsPlaceHolder = document.querySelector(".wins");
let wordPlaceHolder = document.querySelector(".word-container");

console.log(boardGuessPlaceHolder);
console.log(boardWinsPlaceHolder);
console.log(wordPlaceHolder);

boardGuessPlaceHolder.innerHTML = "<h3>" + guessesLeft + "</h3>";
boardWinsPlaceHolder.innerHTML = "<h3>" + totalNumberOfWins + "</h3>";

let dinosaurNameGenerator = function() {
let dino = dinosaursArray[(Math.floor(Math.random() * dinosaursArray.length))];
console.log(dino);
console.log(dino.length);
return dino;
}

let newDino = dinosaurNameGenerator();
for(let i = 0; i < newDino.length; i++){
    wordPlaceHolder.innerHTML += "<div class=\"letter-container\">"
    + "<div class=\"hide letter siimple-box--small\">" + newDino.charAt(i) + "</div>" 
    + "</div>";
}
