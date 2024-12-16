const squares = document.querySelectorAll('.square');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;
let moleTimerId = null;

// Function to generate a random square and assign a type of mole
function randomSquare() {
  squares.forEach(square => {
    square.classList.remove('mole', 'bonus-mole');
  });

  let randomSquare = squares[Math.floor(Math.random() * 9)];
  
  // Randomly decide whether to make this a "bonus" mole
  if (Math.random() > 0.8) {
    randomSquare.classList.add('bonus-mole'); // Bonus mole for extra points
    randomSquare.dataset.points = 5; // Assign higher points to the bonus mole
  } else {
    randomSquare.classList.add('mole'); // Regular mole
    randomSquare.dataset.points = 1; // Regular points
  }

  hitPosition = randomSquare.id;
}

// Function to dynamically adjust mole speed based on score
function moveMole() {
  clearInterval(moleTimerId); // Clear existing mole timer

  let speed = Math.max(300, 1000 - result * 50); // Reduce interval as score increases
  moleTimerId = setInterval(randomSquare, Math.random() * speed + 300); // Vary timing
}

// Event listener to track hits on moles
squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (square.id == hitPosition) {
      result += parseInt(square.dataset.points); // Add points based on mole type
      score.textContent = result;
      hitPosition = null; // Reset hit position
      moveMole(); // Adjust speed based on score
    }
  });
});

// Countdown timer
function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime === 0) {
    clearInterval(countDownTimerId);
    clearInterval(moleTimerId);
    alert('GAME OVER! Your final score is ' + result);
  }
}

let countDownTimerId = setInterval(countDown, 1000);

// Start the mole movement
moveMole();
