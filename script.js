let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let currentPlayer = 'X';
let gameEnded = false;
let moveSoundX = new Audio('move-sound-x.mp3');
let moveSoundO = new Audio('move-sound-o.mp3');
let winSoundX = new Audio('win-sound-x.mp3');
let winSoundO = new Audio('win-sound-o.mp3');
let drawSound = new Audio('draw-sound.mp3');
let playAgainSound = new Audio('play-again-sound.mp3');
let delaySound = new Audio('delay-sound.mp3');
let delayTimeout = null;

function makeMove(row, col) {
  if (board[row][col] === '' && !gameEnded) {
    clearTimeout(delayTimeout);
    board[row][col] = currentPlayer;
    document.getElementById('message').textContent = '';
    document.getElementById('play-again').style.display = 'none';

    const cellImage = document.getElementById(`cell-${row}-${col}`);
    cellImage.src = currentPlayer === 'X' ? 'x.jpg' : 'o.jpg';

    if (currentPlayer === 'X') {
      moveSoundX.play();
    } else {
      moveSoundO.play();
    }

    if (checkWin()) {
      document.getElementById('message').textContent = `${currentPlayer} wins!`;
      document.getElementById('play-again').style.display = 'block';
      gameEnded = true;
      if (currentPlayer === 'X') {
        winSoundX.play();
      } else {
        winSoundO.play();
      }
    } else if (checkDraw()) {
      document.getElementById('message').textContent = "It's a draw!";
      document.getElementById('play-again').style.display = 'block';
      gameEnded = true;
      drawSound.play();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      delayTimeout = setTimeout(playDelaySound, 5000); // Adjust the delay duration as needed
    }
  }
}

function playDelaySound() {
  delaySound.play();
}

function checkWin() {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === currentPlayer &&
      board[i][1] === currentPlayer &&
      board[i][2] === currentPlayer
    ) {
      return true;
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] === currentPlayer &&
      board[1][i] === currentPlayer &&
      board[2][i] === currentPlayer
    ) {
      return true;
    }
  }

  // Check diagonals
  if (
    board[0][0] === currentPlayer &&
    board[1][1] === currentPlayer &&
    board[2][2] === currentPlayer
  ) {
    return true;
  }
  if (
    board[0][2] === currentPlayer &&
    board[1][1] === currentPlayer &&
    board[2][0] === currentPlayer
  ) {
    return true;
  }

  return false;
}

function checkDraw() {
  for (let row of board) {
    for (let cell of row) {
      if (cell === '') {
        return false;
      }
    }
  }
  return true;
}

function resetGame() {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  currentPlayer = 'X';
  gameEnded = false;
  document.getElementById('play-again').style.display = 'none';

  const cells = document.querySelectorAll('.cell img');
  for (let cell of cells) {
    cell.src = '';
  }

  document.getElementById('message').textContent = '';

  // Play the "Play Again" sound
  const playAgainSound = document.getElementById('play-again-sound');
  playAgainSound.currentTime = 0; // Reset the sound to the beginning
  playAgainSound.play();
}


// Initial game setup
resetGame();
