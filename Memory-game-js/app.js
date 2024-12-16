document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('grid-container');
  const resultDisplay = document.getElementById('result');
  const timerDisplay = document.getElementById('timer');

  // Difficulty settings
  const difficultyLevels = {
      easy: { pairs: 8, flipDelay: 1000, time: 60 },
      medium: { pairs: 16, flipDelay: 800, time: 45 },
      hard: { pairs: 24, flipDelay: 600, time: 30 }
  };

  let currentDifficulty = difficultyLevels.medium;

  const baseCardArray = [
      { name: 'fries', img: 'images/fries.png' },
      { name: 'cheeseburger', img: 'images/cheeseburger.png' },
      { name: 'ice-cream', img: 'images/ice-cream.png' },
      { name: 'pizza', img: 'images/pizza.png' },
      { name: 'milkshake', img: 'images/milkshake.png' },
      { name: 'hotdog', img: 'images/hotdog.png' },
      { name: 'taco', img: 'images/taco.png' },
      { name: 'donut', img: 'images/donut.png' }
  ];

  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];
  let timer;

  function startTimer() {
      let timeLeft = currentDifficulty.time;
      timerDisplay.textContent = timeLeft;

      timer = setInterval(() => {
          timeLeft--;
          timerDisplay.textContent = timeLeft;
          if (timeLeft <= 0) {
              clearInterval(timer);
              alert('Time is up! Game Over');
          }
      }, 1000);
  }

  function createBoard() {
      grid.innerHTML = '';
      let cardArray = baseCardArray.slice(0, currentDifficulty.pairs / 2);
      cardArray = [...cardArray, ...cardArray];
      cardArray.sort(() => 0.5 - Math.random());

      cardArray.forEach((card, i) => {
          const img = document.createElement('img');
          img.setAttribute('src', 'images/blank.png');
          img.setAttribute('data-id', i);
          img.addEventListener('click', flipCard);
          grid.appendChild(img);
      });

      cardsChosen = [];
      cardsChosenId = [];
      cardsWon = [];
      resultDisplay.textContent = 'Matches: 0';
  }

  function checkForMatch() {
      const cards = document.querySelectorAll('#grid-container img');
      const [optionOneId, optionTwoId] = cardsChosenId;

      if (optionOneId === optionTwoId) {
          alert('You clicked the same card!');
          cards[optionOneId].setAttribute('src', 'images/blank.png');
          cards[optionTwoId].setAttribute('src', 'images/blank.png');
      } else if (cardsChosen[0] === cardsChosen[1]) {
          cards[optionOneId].setAttribute('src', 'images/white.png');
          cards[optionTwoId].setAttribute('src', 'images/white.png');
          cards[optionOneId].removeEventListener('click', flipCard);
          cards[optionTwoId].removeEventListener('click', flipCard);
          cardsWon.push(cardsChosen);
      } else {
          setTimeout(() => {
              cards[optionOneId].setAttribute('src', 'images/blank.png');
              cards[optionTwoId].setAttribute('src', 'images/blank.png');
          }, currentDifficulty.flipDelay);
      }

      cardsChosen = [];
      cardsChosenId = [];
      resultDisplay.textContent = `Matches: ${cardsWon.length}`;

      if (cardsWon.length === currentDifficulty.pairs / 2) {
          resultDisplay.textContent = 'Congratulations! You found them all!';
          clearInterval(timer);
      }
  }

  function flipCard() {
      const cardId = this.getAttribute('data-id');
      const cardArray = baseCardArray.slice(0, currentDifficulty.pairs / 2);
      cardsChosen.push(cardArray[cardId % cardArray.length].name);
      cardsChosenId.push(cardId);
      this.setAttribute('src', cardArray[cardId % cardArray.length].img);

      if (cardsChosen.length === 2) {
          setTimeout(checkForMatch, 500);
      }
  }

  function resetGame() {
      clearInterval(timer);
      startTimer();
      createBoard();
  }

  const difficultySelect = document.getElementById('difficulty');
  difficultySelect.addEventListener('change', (e) => {
      currentDifficulty = difficultyLevels[e.target.value];
      resetGame();
  });

  resetGame();
});
