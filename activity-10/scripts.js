const STORAGE_KEY = "tictactoe-game-state";

let gameState = {
  board: ["", "", "", "", "", "", "", "", ""],
  currentPlayer: "X",
  gameActive: true,
  winner: null,
  winningCombo: null,
};

const WINNING_COMBOS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal top-left to bottom-right
  [2, 4, 6], // Diagonal top-right to bottom-left
];

function initGame() {
  gameState = {
    board: ["", "", "", "", "", "", "", "", ""],
    currentPlayer: "X",
    gameActive: true,
    winner: null,
    winningCombo: null,
  };

  updateBoard();
  updateStatus();
  saveGameState();
  console.log("New game initialized.");
}

function makeMove(index) {
  if (!gameState.gameActive || gameState.board[index] !== "") {
    return;
  }

  gameState.board[index] = gameState.currentPlayer;
  const result = checkWinner();

  if (result.winner) {
    gameState.gameActive = false;
    gameState.winner = result.winner;
    gameState.winningCombo = result.combo;
    console.log(`Game over! Winner: ${result.winner}`);
  } else if (gameState.board.every((cell) => cell !== "")) {
    console.log("Game over! It's a draw.");
  } else {
    gameState.currentPlayer = gameState.currentPlayer === "X" ? "O" : "X";
  }

  updateBoard();
  updateStatus();
  saveGameState();
}

function checkWinner() {
  for (let combo of WINNING_COMBOS) {
    const [a, b, c] = combo;
    const board = gameState.board;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], combo: combo };
    }
  }

  return { winner: null, combo: null };
}

function saveGameState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  console.log("Game state saved to localStorage");
}

function loadGameState() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    gameState = JSON.parse(saved);
    console.log("Game state loaded from localStorage");
    return true;
  }
  return false;
}

function updateBoard() {
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell, index) => {
    const value = gameState.board[index];
    cell.textContent = value;
    cell.classList.remove("taken", "x", "o", "winning");

    if (value) {
      cell.classList.add("taken");
      cell.classList.add(value.toLowerCase());
    }

    if (gameState.winningCombo && gameState.winningCombo.includes(index)) {
      cell.classList.add("winning");
    }
  });
}

function updateStatus() {
  const statusElement = document.getElementById("statusMessage");

  statusElement.classList.remove("winner", "draw");

  if (gameState.winner) {
    statusElement.textContent = `Player ${gameState.winner} wins! \uD83C\uDFC6`;
    statusElement.classList.add("winner");
  } else if (!gameState.gameActive) {
    statusElement.textContent = "It's a draw! \uD83E\uDD1D";
    statusElement.classList.add("draw");
  } else {
    statusElement.textContent = `Player ${gameState.currentPlayer}'s turn`;
  }
}

function handleCellClick(e) {
  const cell = e.target;
  if (!cell.classList.contains("cell")) return;

  const index = parseInt(cell.getAttribute("data-index"));
  makeMove(index);
}

function initApp() {
  const hasGameState = loadGameState();

  if (!hasGameState) {
    initGame();
  } else {
    updateBoard();
    updateStatus();
  }

  document
    .getElementById("gameBoard")
    .addEventListener("click", handleCellClick);
  document.getElementById("newGameBtn").addEventListener("click", initGame);

  console.log("Tic-Tac-Toe application initialized successfully!");
}

initApp();
