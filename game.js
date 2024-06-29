const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

const redB = document.getElementById('red');
const greenB = document.getElementById('green');
const blueB = document.getElementById('blue');
const yellowB = document.getElementById('yellow');

redB.addEventListener('click', () => handleButtonClick("red"));
greenB.addEventListener('click', () => handleButtonClick("green"));
blueB.addEventListener('click', () => handleButtonClick("blue"));
yellowB.addEventListener('click', () => handleButtonClick("yellow"));

document.addEventListener('keypress', () => {
    if (!started) {
        document.querySelector("#level-title").textContent = `Level ${level}`;
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.querySelector("#level-title").textContent = `Level ${level}`;
    const randomColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomColor);
    console.log(gamePattern);
    styleButton(randomColor);
    playSound(randomColor);
}

function handleButtonClick(color) {
    userClickedPattern.push(color);
    styleButton(color);
    playSound(color);
    checkAnswer(userClickedPattern.length - 1);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        gameOver();
    }
}

function styleButton(color) {
    const button = document.getElementById(color);
    button.classList.add("pressed");
    setTimeout(() => {
        button.classList.remove("pressed");
    }, 100);
}

function playSound(color) {
    const audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

function gameOver() {
    document.querySelector('body').classList.add('game-over')
    setTimeout(() => {
        document.querySelector('body').classList.remove('game-over')
    }, 100);
    document.querySelector("#level-title").textContent = "Game Over, Press Any Key to Restart";
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    level = 0;
}
