// Global variables
let opponent = "X";
let player = "O";

// Function to create a new 3x3 board filled with empty cells ('_')
async function createBoard(inputPlayer = "O") {
  let board = Array.from({ length: 3 }, () => Array(3).fill("_"));
  if (inputPlayer === "O") {
    board = await findBestMove(board);
  }
  opponent = inputPlayer === "O" ? "X" : "O";
  player = inputPlayer;
  return board;
}
// Function to check if a move is valid
async function isValidMove(board, row, col) {
  return board[row][col] === "_";
}
// Function to check if the board is full
async function isBoardFull(board) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === "_") {
        return false; // Board is not full
      }
    }
  }
  return true; // Board is full
}
// Function to check if there's a winner
async function checkWinner(board) {
  // Check rows
  for (let row = 0; row < 3; row++) {
    if (
      board[row][0] !== "_" &&
      board[row][0] === board[row][1] &&
      board[row][1] === board[row][2]
    ) {
      return board[row][0]; // Return the winning player
    }
  }
  // Check columns
  for (let col = 0; col < 3; col++) {
    if (
      board[0][col] !== "_" &&
      board[0][col] === board[1][col] &&
      board[1][col] === board[2][col]
    ) {
      return board[0][col]; // Return the winning player
    }
  }
  // Check diagonals
  if (
    board[0][0] !== "_" &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return board[0][0]; // Return the winning player
  }
  if (
    board[0][2] !== "_" &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return board[0][2]; // Return the winning player
  }

  // Check for a tie
  let tie = true;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "_") {
        tie = false;
        break;
      }
    }
    if (!tie) break;
  }

  if (tie) return "tie"; // Return tie if the board is full with no winner

  return null; // No winner yet
}

// Function to make a move on the board
async function makeMove(board, row, col) {
  //Step 1: Check if the move is valid and board is not full
  if (await isBoardFull(board)) {
    const winner = await checkWinner(board);
    return { board, winner: winner, gameOver: true, message: "Game over" };
  }

  if (!(await isValidMove(board, row, col))) {
    return { board, gameOver: false, message: "Invalid move" };
  }

  //Step 2: Make the move
  board[row][col] = player;

  //Step 3: Check if the player wins
  const winner = await checkWinner(board);
  if (winner !== null) {
    return { board, winner: winner, gameOver: true, message: "Player wins" };
  }

  //Step 4: Check if the board is full
  if (await isBoardFull(board)) {
    return { board, winner: null, gameOver: true, message: "Game over" };
  }

  //Step 5: Make the opponent's move
  board = await findBestMove(board);

  //Step 6: Check if the opponent wins
  const opponentWinner = await checkWinner(board);
  if (opponentWinner !== null) {
    return {
      board,
      winner: opponentWinner,
      gameOver: true,
      message: "Opponent wins",
    };
  }

  //Step 7: Check if the board is full
  if (await isBoardFull(board)) {
    return { board, winner: null, gameOver: true, message: "Game over" };
  }

  return { board, winner: null, gameOver: false, message: "Continue playing" };
}

// This will return the best possible move for the player
async function findBestMove(inputBoard) {
  let board = inputBoard;
  let bestScore = -Infinity;
  let move;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      //is the spot available?
      if (board[i][j] === "_") {
        board[i][j] = opponent;
        let score = await minimax(board, 0, false);
        board[i][j] = "_";
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  inputBoard[move.i][move.j] = opponent;
  return inputBoard;
}

let score = {
  X: 10,
  O: -10,
  tie: 0,
};

async function minimax(inputBoard, depth, isMaximizing) {
  let board = inputBoard;
  let result = await checkWinner(board);
  if (result !== null) {
    return score[result] - depth;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "_") {
          board[i][j] = opponent;
          let score = await minimax(board, depth + 1, false);
          board[i][j] = "_";
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "_") {
          board[i][j] = player;
          let score = await minimax(board, depth + 1, true);
          board[i][j] = "_";
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}

module.exports = {
  createBoard: createBoard,
  makeMove: makeMove,
};
