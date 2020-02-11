/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, btnHoldDOM, diceDOM;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;
btnHoldDOM = document.querySelector('.btn-hold');
diceDOM = document.querySelector('.dice');

diceDOM.style.display = 'none';
btnHoldDOM.disabled = true;
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';




document.querySelector('.btn-roll').addEventListener('click', function () {
  // 1. Random number
  var dice = Math.floor(Math.random() * 6 + 1);

  // 2. Display the result
  diceDOM.style.display = 'block';
  diceDOM.src = 'dice-' + dice + '.png';

  // 3. Update the round score IF the rolled number was not a 1
  if (dice !== 1) {
    btnHoldDOM.disabled = false;

    // Add score
    roundScore += dice;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {
    switchPlayer();
  }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  // Add roundScore to global score
  scores[activePlayer] += roundScore;

  // Update UI
  document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

  // Check if player won the game
  if (scores[activePlayer] >= 20) {
    document.getElementById('name-' + activePlayer).textContent = 'Winner';
    diceDOM.style.display = 'none';
    btnHoldDOM.disabled = true;
    document.querySelector('.btn-roll').disabled = true;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  } else {
    switchPlayer();
  }
});

function switchPlayer() {
  btnHoldDOM.disabled = true;

  // Reset dice and round score
  roundScore = 0;
  document.getElementById('current-' + activePlayer).textContent = 0;
  diceDOM.style.display = 'none';
  document.querySelector('.player-' +  activePlayer + '-panel').classList.remove('active');

  // Switch player
  activePlayer = activePlayer ? 0 : 1;
  document.querySelector('.player-' +  activePlayer + '-panel').classList.add('active');
}
