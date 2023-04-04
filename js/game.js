const words = [
        "apple",
        "banana",
        "cherry",
        "date",
        "elderberry",
        "fig",
        "grape",
        "honeydew",
        "orange",
        "pear",
        "quince",
        "raspberry",
        "strawberry",
        "tangelo",
        "ugli fruit",
        "watermelon",
        "yuzu",
        "zucchini",
];

let randomWord = words[Math.floor(Math.random() * words.length)];

let wordArray = randomWord.split("");

let correctlyGuessed = [];

let guessesLeft = 6;

let canvas = document.getElementById("hangman-canvas");

let ctx = canvas.getContext("2d");


function drawGallows() {
        ctx.beginPath();
        ctx.moveTo(20, 380);
        ctx.lineTo(580, 380);
        ctx.stroke();
        ctx.moveTo(70, 380);
        ctx.lineTo(70, 20);
        ctx.stroke();
        ctx.moveTo(70, 20);
        ctx.lineTo(300, 20);
        ctx.stroke();
        ctx.moveTo(300, 20);
        ctx.lineTo(300, 80);
        ctx.stroke();
}

function drawHangman() {
        switch (guessesLeft) {

                case 5:

                        ctx.beginPath();
                        ctx.arc(300, 110, 30, 0, Math.PI * 2, false);
                        ctx.stroke();
                        break;
                case 4:

                        ctx.beginPath();
                        ctx.moveTo(300, 140);
                        ctx.lineTo(300, 250);
                        ctx.stroke();
                        break;
                case 3:

                        ctx.beginPath();
                        ctx.moveTo(300, 170);
                        ctx.lineTo(260, 230);
                        ctx.stroke();
                        break;
                case 2:

                        ctx.beginPath();
                        ctx.moveTo(300, 170);
                        ctx.lineTo(340, 230);
                        ctx.stroke();
                        break;
                case 1:

                        ctx.beginPath();
                        ctx.moveTo(300, 250);
                        ctx.lineTo(265, 320);
                        ctx.stroke();
                        break;
                case 0:

                        ctx.beginPath();
                        ctx.moveTo(300, 250);
                        ctx.lineTo(335, 320);
                        ctx.stroke();
                        break;
        }
}

function updateWordDisplay() {
        let displayText = "";

        for (let i = 0; i < wordArray.length; i++) {
                if (correctlyGuessed.includes(wordArray[i])) {
                        displayText += wordArray[i] + " ";
                } else {
                        displayText += "_ ";
                }
        }
        document.getElementById("word-display").textContent = displayText;
}

function updateGuessesRemaining() {
        document.getElementById("guesses-remaining").textContent = `Guesses remaining: ${guessesLeft}`;
}

function checkForWin() {
        for (let i = 0; i < wordArray.length; i++) {
                if (!correctlyGuessed.includes(wordArray[i])) {
                        return false;
                }
        }
        return true;
}

function isValidGuess(guess) {
        if (
                guess.length === 1 &&
                guess.toUpperCase() !== guess.toLowerCase() &&
                !correctlyGuessed.includes(guess) &&
                !wordArray.includes(guess)
        ) {
                return true;
        } else {
                return false;
        }
}

function handleGuess(event) {
        event.preventDefault();

        let guess = document.getElementById("guess-input").value.toLowerCase();

        if (isValidGuess(guess)) {
                if (wordArray.includes(guess)) {
                        correctlyGuessed.push(guess);
                } else {
                        guessesLeft--;
                }

                updateWordDisplay();
                updateGuessesRemaining();
                drawHangman();

                if (checkForWin()) {
                        alert("You win!");
                } else if (guessesLeft === 0) {
                        alert("You lose!");
                }
        }
        document.getElementById("guess-input").value = "";
}

function newGame() {
        randomWord = words[Math.floor(Math.random() * words.length)];
        wordArray = randomWord.split("");
        correctlyGuessed = [];
        guessesLeft = 6;

        updateWordDisplay();
        updateGuessesRemaining();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGallows();
}
document.getElementById("guess-button").addEventListener("click", handleGuess);
document.getElementById("new-game-button").addEventListener("click", newGame);

drawGallows();