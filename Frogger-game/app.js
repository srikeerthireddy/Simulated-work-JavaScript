const timeLeftDisplay = document.querySelector('#time-left');
const resultDisplay = document.querySelector('#result');
const startPauseButton = document.querySelector('#start-pause-button');
const squares = document.querySelectorAll('.grid div');
const logsLeft = document.querySelectorAll('.log-left');
const logsRight = document.querySelectorAll('.log-right');
const carsLeft = document.querySelectorAll('.car-left');
const carsRight = document.querySelectorAll('.car-right');

let currentIndex = 76;
const width = 9;
let timerId;
let outcomeTimerId;
let currentTime = 20;
let powerUpSound = new Audio('sounds/powerup.mp3'); // Power-up sound effect
let hitSound = new Audio('sounds/hit.mp3'); // Ball hit sound effect
let winSound = new Audio('sounds/win.mp3'); // Win sound effect

let ballCount = 1;
let balls = [];

function moveFrog(e) {
    squares[currentIndex].classList.remove('frog');

    switch(e.key) {
        case 'ArrowLeft' :
            if (currentIndex % width !== 0) currentIndex -= 1;
            break;
        case 'ArrowRight' :
            if (currentIndex % width < width - 1) currentIndex += 1;
            break;
        case 'ArrowUp' :
            if (currentIndex - width >= 0) currentIndex -= width;
            break;
        case 'ArrowDown' :
            if (currentIndex + width < width * width) currentIndex += width;
            break;
    }
    squares[currentIndex].classList.add('frog');
}

function spawnPowerUp() {
    const powerUpIndex = Math.floor(Math.random() * squares.length);
    if (!squares[powerUpIndex].classList.contains('frog')) {
        const powerUp = document.createElement('div');
        powerUp.classList.add('power-up');
        squares[powerUpIndex].appendChild(powerUp);
    }
}

function autoMoveElements() {
    currentTime--;
    timeLeftDisplay.textContent = currentTime;
    logsLeft.forEach(logLeft => moveLogLeft(logLeft));
    logsRight.forEach(logRight => moveLogRight(logRight));
    carsLeft.forEach(carLeft => moveCarLeft(carLeft));
    carsRight.forEach(carRight => moveCarRight(carRight));

    // Increase difficulty
    if (currentTime % 10 === 0 && currentTime > 0) {
        // Speed up the ball or add more bricks
        spawnPowerUp();
    }
}

function checkOutComes() {
    lose();
    win();
}

function moveLogLeft(logLeft) {
    logLeft.classList.toggle('l1', logLeft.classList.contains('l5'));
    logLeft.classList.toggle('l2', logLeft.classList.contains('l1'));
    logLeft.classList.toggle('l3', logLeft.classList.contains('l2'));
    logLeft.classList.toggle('l4', logLeft.classList.contains('l3'));
    logLeft.classList.toggle('l5', logLeft.classList.contains('l4'));
}

function moveLogRight(logRight) {
    logRight.classList.toggle('l1', logRight.classList.contains('l2'));
    logRight.classList.toggle('l2', logRight.classList.contains('l3'));
    logRight.classList.toggle('l3', logRight.classList.contains('l4'));
    logRight.classList.toggle('l4', logRight.classList.contains('l5'));
    logRight.classList.toggle('l5', logRight.classList.contains('l1'));
}

function moveCarLeft(carLeft) {
    carLeft.classList.toggle('c1', carLeft.classList.contains('c2'));
    carLeft.classList.toggle('c2', carLeft.classList.contains('c3'));
    carLeft.classList.toggle('c3', carLeft.classList.contains('c1'));
}

function moveCarRight(carRight) {
    carRight.classList.toggle('c1', carRight.classList.contains('c2'));
    carRight.classList.toggle('c2', carRight.classList.contains('c3'));
    carRight.classList.toggle('c3', carRight.classList.contains('c1'));
}

function lose() {
    if (
        squares[currentIndex].classList.contains('c1') ||
        squares[currentIndex].classList.contains('l4') ||
        squares[currentIndex].classList.contains('l5') ||
        currentTime <= 0
    ) {
        resultDisplay.textContent = 'You lose!';
        hitSound.play(); // Play sound on losing
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
        squares[currentIndex].classList.remove('frog');
        document.removeEventListener('keyup', moveFrog);
    }
}

function win() {
    if (squares[currentIndex].classList.contains('ending-block')) {
        resultDisplay.textContent = 'You Win!';
        winSound.play(); // Play sound on win
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
        document.removeEventListener('keyup', moveFrog);
    }
}

startPauseButton.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
        outcomeTimerId = null;
        timerId = null;
        document.removeEventListener('keyup', moveFrog);
    } else {
        timerId = setInterval(autoMoveElements, 1000);
        outcomeTimerId = setInterval(checkOutComes, 50);
        document.addEventListener('keyup', moveFrog);
    }
});
