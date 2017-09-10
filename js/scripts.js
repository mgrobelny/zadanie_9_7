// scripts.js

// Przycisk rozpoczynający nową grę

var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

// Ustawienie tego, co będzie się działo po kliknięciu na przyciski "papier", "nożyce", "kamień" (listenery ustawione na odpowiednie funkcje uruchamiane z przycisków)

var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('rock') }); // wywołanie funkcji playerPick z parametrem reprezentującym wybór gracza
pickPaper.addEventListener('click', function() { playerPick('paper') }); // jw
pickScissors.addEventListener('click', function() { playerPick('scissors') }); // jw

// wartości początkowe gry

var gameState = 'notStarted',  //started // ended
    player = { // obiekt player będzie trzymał nazwę gracza oraz aktualny wynik
        name: '',
        score: 0
    },
    computer = { // obiekt computer będzie trzymał tylko wynik, bo nazwa jest stała
        score: 0
    };

// zmienne wskazujące na elementy gry, a konkretnie jej poszczególne części

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

// funkcja wskazująca, jakie elementy wyświetlają się w zależności od stanu gry

function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
      break;
    case 'ended':
        newGameBtn.innerText = 'Play again';
    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}
setGameElements(); // wszystko działa i bez tego - dlaczego?


// zdefiniowanie zmiennych odnoszących się do tych elementów na stronie, 
// które będą analizowane przed rozpoczęciem gry: punktacja gracza, imię gracza i punktacja komputera

var playerPointsElem = document.getElementById('js-playerPoints'), // punktacja gracza
    playerNameElem = document.getElementById('js-playerName'), // imię gracza
    computerPointsElem = document.getElementById('js-computerPoints'); // punktacja komputera

// definicja funkcji, która będzie uruchamiona po wciśnięciu przycisku "New Game" / "Play Again"

function newGame() {
  player.name = prompt('Please enter your name', 'your name');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;
    setGamePoints();
  }

}

// funkcja odpowiadająca za pobranie wyboru gracza

function playerPick(playerPick) {
    console.log(playerPick);
}

// funkcja losująca wybór komputera

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    checkRoundWinner(playerPick, computerPick);
    checkGameWinner();
}

// umieszczenie wyboru gracza i komputera na stronie

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

// logika gry i przyznawanie punktów

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'both'; // remis
        player.score++; // dodana opcja +1 pkt. dla każdego w przypadku remisu
        computer.score++; // jw.
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
    }
    setGamePoints();

}

function playerPick(playerPick) {
    var computerPick = getComputerPick();
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    checkRoundWinner(playerPick, computerPick);
    checkGameWinner();
}

// wyświetlanie wyniku

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

// zakończenie gry w wyniku osiągnięcia 10 punktów

function checkGameWinner () {
    if(player.score == 10) {
        alert('Congratulations, ' + player.name +'! You win!');
        gameState = 'ended';
        setGameElements();
    }
    if(computer.score == 10) {
        alert('You lose!');
        gameState = 'ended';
        setGameElements();
    }
}