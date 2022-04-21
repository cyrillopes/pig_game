'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let score, playing, currentScore, activePlayer;
//Starting conditions
const init = function () {
  playing = true;
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //by defalut the active player is zero, if not zero then player 1 plays
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating a random number
    const dice = Math.floor(Math.random() * 6 + 1);
    //2.Display the dice
    diceEl.classList.remove('hidden');
    diceEl.setAttribute('src', 'dice-' + dice + '.png');
    //   diceEl.src = `dice-${dice}.png`;
    //3. CHeck for dice 1
    if (dice !== 1) {
      //Add the dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    //   If Dice==1, Move to next player
    else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to active player score
    score[activePlayer] += currentScore; //active player is 0 the index becomes 0 and when player 1 then index becomes 1
    //the above code meaning: score[0]= sore[0]+currentScore;
    console.log(score[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    //check if player score>=100, finish game
    if (score[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
