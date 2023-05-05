'use strict';

// Selecting DOM
const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const winnerMessage = document.querySelector('.winner-message');
const winnerMessageText = document.querySelector('.winner-message-text');

// [Player 1 current score, player 2 current score]
const score = [0, 0];

let activePlayer = 0,
  randomNum,
  // Player section
  playerSide,
  // Current score and total score selection
  eTotalScore = document.querySelector(`#score--${activePlayer}`),
  eCurrentScore = document.querySelector(`#current--${activePlayer}`),
  playing = true;

reset();

// Button roll
btnRoll.addEventListener('click', () => {
  if (playing) {
    // Selects the current score and the total score based on the dynamic text that changes according to the number of the active player
    eTotalScore = document.querySelector(`#score--${activePlayer}`);
    eCurrentScore = document.querySelector(`#current--${activePlayer}`);

    // Generate random num
    randomNum = Math.trunc(Math.random() * 6) + 1;

    // Add dice
    dice.classList.remove('hidden');

    // Change dice image
    dice.src = `dice-${randomNum}.png`;

    // if the number !== 1
    if (randomNum !== 1) {
      // Adds the score to the active player
      score[activePlayer] += randomNum;
      eCurrentScore.innerHTML = score[activePlayer];
    }

    // if the number is === 1
    else if (randomNum === 1) {
      switchPlayer();
    }
  }
});

// Button hold
btnHold.addEventListener('click', () => {
  if (playing) {
    // Adds the value of the current status to the player total score
    eTotalScore.innerHTML = Number(eTotalScore.innerHTML) + score[activePlayer];

    //Resets the current counter and the data score counter
    score[activePlayer] = 0;
    eCurrentScore.innerHTML = 0;

    // Checks if the player score is > 100
    if (Number(eTotalScore.innerHTML) >= 100) {
      // Finishes the game
      dice.classList.add('hidden');
      playerSide = document.querySelector(`.player--${activePlayer}`);
      playerSide.classList.add('player--winner');

      //Displays a winner message
      winnerMessage.classList.remove('hidden');
      winnerMessageText.innerHTML = `Congrats player ${
        activePlayer + 1
      } won 🏆`;
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

// Button new
btnNew.addEventListener('click', () => {
  reset();
});

// Switches between the two players
function switchPlayer() {
  // Resets the score counter and the current score counter
  score[activePlayer] = 0;
  eCurrentScore.innerHTML = 0;
  // Removes the active player status from the current player
  playerEl0.classList.toggle('player--active');
  playerEl1.classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
}

// Reset the score values
function reset() {
  // Resets the score values
  eCurrentScore.innerHTML = 0;
  document.querySelector('#score--0').innerHTML = 0;
  document.querySelector('#score--1').innerHTML = 0;
  score[0] = 0;
  score[1] = 0;
  dice.classList.add('hidden');

  // Resets the active player
  playerSide = document.querySelector(`.player--${activePlayer}`);
  playerSide.classList.remove('player--active');
  playerSide.classList.remove('player--winner');
  playerEl0.classList.add('player--active');

  // Resets the winner message
  winnerMessage.classList.add('hidden');

  playing = true;
  activePlayer = 0;
}

removeWinnerMessage();

// Removes the winner message when esc is pressed
function removeWinnerMessage() {
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      winnerMessage.classList.add('hidden');
    }
  });
}
