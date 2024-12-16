document.addEventListener('DOMContentLoaded', () => {
    // Get references to the HTML elements
    const rockButton = document.querySelector("button:nth-child(1)");
    const paperButton = document.querySelector("button:nth-child(2)");
    const scissorsButton = document.querySelector("button:nth-child(3)");
    const resultDisplay = document.querySelector('.result span');
    const playerChoiceDisplay = document.querySelector('#player-choice span');
    const computerChoiceDisplay = document.querySelector('#computer-choice span');
    const scoreDisplay = document.getElementById('score');
    
    let userScore = 0;
    let computerScore = 0;

    // Load the sounds
    const winSound = new Audio('sounds/win.mp3');
    const loseSound = new Audio('sounds/lose.mp3');
    const drawSound = new Audio('sounds/draw.mp3');

    // Event listeners for the buttons
    rockButton.addEventListener('click', () => playGame('rock'));
    paperButton.addEventListener('click', () => playGame('paper'));
    scissorsButton.addEventListener('click', () => playGame('scissors'));

    // Function to start the game
    function playGame(userChoice) {
        // Computer randomly chooses rock, paper, or scissors
        const choices = ['rock', 'paper', 'scissors'];
        const computerChoice = choices[Math.floor(Math.random() * 3)];

        // Display the user's and computer's choices
        playerChoiceDisplay.innerHTML = userChoice.charAt(0).toUpperCase() + userChoice.slice(1);
        computerChoiceDisplay.innerHTML = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);

        // Determine the winner
        const winner = determineWinner(userChoice, computerChoice);
        resultDisplay.innerHTML = winner;

        // Play the appropriate sound based on the result
        if (winner === 'Player wins!') {
            winSound.play();
            userScore++;
        } else if (winner === 'Computer wins!') {
            loseSound.play();
            computerScore++;
        } else {
            drawSound.play();
        }

        // Update the score display
        scoreDisplay.innerHTML = userScore;
    }

    // Function to determine the winner
    function determineWinner(userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            return "It's a tie!";
        } else if (
            (userChoice === 'rock' && computerChoice === 'scissors') ||
            (userChoice === 'paper' && computerChoice === 'rock') ||
            (userChoice === 'scissors' && computerChoice === 'paper')
        ) {
            return 'Player wins!';
        } else {
            return 'Computer wins!';
        }
    }

    // Reset the game when the reset button is clicked
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', () => {
        userScore = 0;
        computerScore = 0;
        scoreDisplay.innerHTML = userScore;
        resultDisplay.innerHTML = '';
        playerChoiceDisplay.innerHTML = '';
        computerChoiceDisplay.innerHTML = '';
    });
});
