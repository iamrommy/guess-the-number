const hint = document.getElementById("hint");
const noOfGuessesRef = document.getElementById("no-of-guesses");
const guessedNumsRef = document.getElementById("guessed-nums");

const restartButton = document.getElementById("restart");
const game = document.getElementById("game");
const guessInput = document.getElementById("guess");
const checkButton = document.getElementById("check-btn");

let answer, noOfGuesses, guessedNumsArr;

const play = () => {
    const userGuess = guessInput.value;
    guessInput.value = "";
    if (userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
        alert("Please enter a valid number between 1 and 100.");
        return;
    }
    guessedNumsArr.push(userGuess);
    noOfGuesses += 1;

    if (userGuess != answer) {
        if (userGuess < answer) {
            hint.innerHTML = "Too low, Try Again!";
        } else {
            hint.innerHTML = "Too high, Try Again";
        }

        noOfGuessesRef.innerHTML = `<span>Number of Guesses:</span> ${noOfGuesses}`;
        guessedNumsRef.innerHTML = `<span>Guessed Number are: </span> ${guessedNumsArr.join(",")}`;

        hint.classList.remove("error");
        setTimeout(() => {
            hint.classList.add("error");
        }, 10);
    }

    else {
        if (noOfGuesses === 1) {
            hint.innerHTML = `Congratulations!<br>The number was <span>${answer}</span>.
            <br>You guessed the number in 1 try.<br> Impressive Luck!`;
        } else {
            hint.innerHTML = `Congratulations!<br>The number was <span>${answer}</span>.
            <br>You guessed the number in <span>${noOfGuesses}</span> tries.`;
        }
        
        hint.classList.add("success");
        game.style.display = "none";
        restartButton.style.display = "block";
    }
};

const init = () => {
    console.log("Game started");
    answer = Math.floor(Math.random() * 100) + 1;
    console.log(answer);
    noOfGuesses = 0;
    guessedNumsArr = [];
    noOfGuessesRef.innerHTML = "Number of Guessed: 0";
    guessedNumsRef.innerHTML = "Guessed Numbers are: None"
    guessInput.value = "";
    hint.classList.remove("success", "error");
};

guessInput.addEventListener("keydown", (event) => {
    if (event.code == "Enter") {
        event.preventDefault();
        play();
    }
});

restartButton.addEventListener("click", () => {
    game.style.display = "grid";
    restartButton.style.display = "none";
    hint.innerHTML = "";
    hint.classList.remove("success");
    init();
});

checkButton.addEventListener("click", play);

window.addEventListener("load", init);