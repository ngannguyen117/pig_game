/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice1DOM, dice2DOM, gamePlaying;

dice1DOM = document.getElementById('dice-1');
dice2DOM = document.getElementById('dice-2');

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    // 1. Random number
    var dice1 = Math.floor(Math.random() * 6 + 1);
    var dice2 = Math.floor(Math.random() * 6 + 1);

    // 2. Display the result
    dice1DOM.style.display = 'block';
    dice1DOM.src = 'dice-' + dice1 + '.png';
    dice2DOM.style.display = 'block';
    dice2DOM.src = 'dice-' + dice2 + '.png';

    // 3. Update the round score IF the rolled number was not a 1
    if (dice1 !== 1 && dice2 !== 1) {
      // Add score
      roundScore += dice1 + dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      switchPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    // Add roundScore to global score
    scores[activePlayer] += roundScore;

    // Update UI
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    var winningScore;

    var input = document.querySelector('.final-score').value;
    if(input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.getElementById('name-' + activePlayer).textContent = 'Winner';
      dice1DOM.style.display = 'none';
      dice2DOM.style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      switchPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  dice1DOM.style.display = 'none';
  dice2DOM.style.display = 'none';

  for (var i = 0; i < 2; i++){
    document.getElementById('score-' + i).textContent = '0';
    document.getElementById('current-' + i).textContent = '0';

    document.getElementById('name-' + i).textContent = 'Player ' + (i + 1);
    document.querySelector('.player-' + i + '-panel').classList.remove('winner');
    document.querySelector('.player-' + i + '-panel').classList.remove('active');
  }

  document.querySelector('.player-0-panel').classList.add('active');
}

function switchPlayer() {
  // Reset dice and round score
  roundScore = 0;
  document.getElementById('current-' + activePlayer).textContent = 0;
  dice1DOM.style.display = 'none';
  dice2DOM.style.display = 'none';
  document.querySelector('.player-' +  activePlayer + '-panel').classList.remove('active');

  // Switch player
  activePlayer = activePlayer ? 0 : 1;
  document.querySelector('.player-' +  activePlayer + '-panel').classList.add('active');
}
