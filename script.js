'use strict';

// Selecting elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const playerScore0Element = document.querySelector('#player-score--0');
const playerScore1Element = document.getElementById('player-score--1');
const playerCurrentScore0Element = document.getElementById(
  'player-current-score--0'
);
const playerCurrentScore1Element = document.getElementById(
  'player-current-score--1'
);

const diceElement = document.querySelector('.dice');
const newGameButton = document.querySelector('.btn--new-game');
const rollDiceButton = document.querySelector('.btn--roll-dice');
const holdScoreButton = document.querySelector('.btn--hold-score');
const gameWinnerAnnouncement = document.getElementById('game-winner');

let scores, currentScore, activePlayer, isPlaying;

// Starting conditions
const initializeGame = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  playerScore0Element.textContent = 0;
  playerScore1Element.textContent = 0;
  playerCurrentScore0Element.textContent = 0;
  playerCurrentScore1Element.textContent = 0;

  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
  gameWinnerAnnouncement.classList.add('hidden');
  gameWinnerAnnouncement.textContent = '';
};

initializeGame();

const switchPlayer = function () {
  document.getElementById(
    `player-current-score--${activePlayer}`
  ).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// Rolling dice functionality
rollDiceButton.addEventListener('click', function () {
  if (isPlaying) {
    // 1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;
    // 3. Checked for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(
        `player-current-score--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

holdScoreButton.addEventListener('click', function () {
  if (isPlaying) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`player-score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      isPlaying = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      gameWinnerAnnouncement.textContent = `Player ${activePlayer + 1} Wins!🐷`;
      gameWinnerAnnouncement.classList.remove('hidden');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

newGameButton.addEventListener('click', initializeGame);
