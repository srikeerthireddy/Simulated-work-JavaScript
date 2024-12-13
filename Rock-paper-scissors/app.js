const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');
const scoresDisplay = document.getElementById('scores');
const possibleChoices = document.querySelectorAll('button');
const resetButton = document.getElementById('reset');

let userChoice;
let computerChoice;
let result;
let playerScore = 0;
let computerScore = 0;

// Event listener for player's choice
possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    if (e.target.id !== 'reset') { // Skip the reset button
        userChoice = e.target.id;
        userChoiceDisplay.innerHTML = userChoice;
        generateComputerChoice();
        getResult();
    }
}));

// Generate computer's choice
function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3) + 1; // Random number between 1 and 3
    if (randomNumber === 1) {
        computerChoice = 'rock';
    } else if (randomNumber === 2) {
        computerChoice = 'scissors';
    } else if (randomNumber === 3) {
        computerChoice = 'paper';
    }
    computerChoiceDisplay.innerHTML = computerChoice;
}

// Determine the result of the round
function getResult() {
    if (computerChoice === userChoice) {
        result = "It's a draw";
    } else if (
        (computerChoice === 'rock' && userChoice === 'paper') ||
        (computerChoice === 'scissors' && userChoice === 'rock') ||
        (computerChoice === 'paper' && userChoice === 'scissors')
    ) {
        result = "You win!";
        playerScore++;
    } else {
        result = "You lose!";
        computerScore++;
    }
    resultDisplay.innerHTML = result;
    updateScores();
}

// Update scores on the screen
function updateScores() {
    scoresDisplay.innerHTML = `Player: ${playerScore} | Computer: ${computerScore}`;
}

// Reset the game
resetButton.addEventListener('click', () => {
    userChoice = '';
    computerChoice = '';
    result = '';
    playerScore = 0;
    computerScore = 0;

    userChoiceDisplay.innerHTML = '';
    computerChoiceDisplay.innerHTML = '';
    resultDisplay.innerHTML = '';
    updateScores();
});
