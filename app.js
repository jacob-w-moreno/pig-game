/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

// ROLL functionality
document.querySelector('.btn-roll').addEventListener('click', function() {
  if(gamePlaying) {
    // 1. Get a random number.
    var dice = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    var diceDOM = document.querySelector('.dice');
    // This was set to hidden so it's invisible.
    diceDOM.style.display = 'block';
    // Changes the image src to display the dice picture of the number rolled.
    diceDOM.src = 'dice-' + dice + '.png';

    //3. Update the round score IF the rolled number was NOT a 1.
    if (dice !== 1) {
      //Add score
      roundScore += dice;
      // Displays the current round score in the active player's round score box.
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      //Next player.
      nextPlayer();
    }
  }    
});

// HOLD functionality.
document.querySelector('.btn-hold').addEventListener('click', function() {
  // Can't click this button when the game is over.
  if (gamePlaying) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI to show the person's new score.
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check if player won the game. If they won...
    if (scores[activePlayer] >= 100) {
      // ...set their name to 'Winner!'
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      // ...hide the die.
      document.querySelector('.dice').style.display = 'none';
      // ...add the 'winner' class to their panel.
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      // ...remove the 'active' class from their panel.
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      // ...end the game.
      gamePlaying = false;
    // If they didn't win...
    } else {
      //...it's the next player's turn.
      nextPlayer();
    }
  }
});


function nextPlayer() {
  //Change the active player to the other player.
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  // Set the round score = 0.
  roundScore = 0;

  // Set both current scores to 0.
  //   This could be done by saying ['current-' + activePlayer].
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // Toggle the 'active' classList for both players.
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');

  // Hides the die (when the next player rolls, it will be visible again).
  document.querySelector('.dice').style.display = 'none';
}

// Starts a new game.
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//var x = document.querySelector('#score-0').textContent;








/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player loses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
