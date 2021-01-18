
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

document.querySelector('.btn-new').addEventListener('click', startGame);

activeGame = false;

function startGame() {
    
    globalScores = [0, 0];
    currentScore = 0;
    currentPlayer = 0;
    activeGame = true;
    
    // hide the dice
    document.querySelector('.dice').style.display = 'none';
    
    // reset all Scores and current
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    // change player names back
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    // remove winner class to active player panel
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    // remove active class to active player panel
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
}


document.querySelector('.btn-roll').addEventListener('click', function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    if (activeGame) {
        var dice = Math.floor(Math.random() * 6 + 1);

        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        if(dice !== 1 ){
        // get the round score from dice rolls
            currentScore += dice;
            document.querySelector('#current-' + currentPlayer).textContent = currentScore;
        }else{
            nextPlayer();
        }

    }else{
        alert("Please click the new game button to start");
    }
    
});
document.querySelector('.btn-hold').addEventListener('click', function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    if (activeGame) {
        globalScores[currentPlayer] += currentScore;

        document.querySelector('#score-' + currentPlayer).textContent = globalScores[currentPlayer];

        // If player global score is past 100, player is the winner
        if (globalScores[currentPlayer] >= 100) {
            document.querySelector('#name-' + currentPlayer).textContent = 'Winner!';
            // hide dice
            document.querySelector('.dice').style.display = 'none';
            // adding winner class to active player panel
            document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');
            // remove the active class from active player panel
            document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
            alert("Player "+(currentPlayer+1)+" won!");
            activeGame = false;
        } else {
            nextPlayer();
        }
    }else{
        alert("Please click the new game button to start");
    }

});

function nextPlayer() {
    if(currentPlayer===0){
        currentPlayer=1;
    }else{
        currentPlayer=0;
    }
    currentScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

}


