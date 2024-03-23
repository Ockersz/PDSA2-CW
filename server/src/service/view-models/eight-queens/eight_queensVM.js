const { ANSWERSTATUS } = require("../../enums/enums");

async function generateBoard(bordsize = 8) {
  const board = Array(bordsize)
    .fill(null)
    .map(() => Array(bordsize).fill(0));
  return board;
}

async function getSolutions(bordsize = 8) {
  const board = Array.from({ length: bordsize }, () => Array(bordsize).fill(0));
  const solutions = [];

  function isSafe(board, row, col) {
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 1) {
        return false;
      }
    }
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 1) {
        return false;
      }
    }
    for (let i = row, j = col; i >= 0 && j < board.length; i--, j++) {
      if (board[i][j] === 1) {
        return false;
      }
    }
    return true;
  }

  function backtrack(row) {
    if (row === board.length) {
      solutions.push(board.map((row) => row.slice()));
      return;
    }

    for (let col = 0; col < board.length; col++) {
      if (isSafe(board, row, col)) {
        board[row][col] = 1;
        backtrack(row + 1);
        board[row][col] = 0;
      }
    }
  }
  backtrack(0);
  return solutions;
}

async function placeQueen(board, row, col) {
  const data = {};
  const respond = await isSafe(board, row, col);
  board[row][col] = 1;
  if (respond.isvalid) {
    data.message = "Queen placed successfully";
    data.board = board;
    data.answerstatus = ANSWERSTATUS.CORRECT;
    return data;
  } else {
    data.message = respond.message;
    data.cord = respond.cord;
    data.answerstatus = ANSWERSTATUS.INCORRECT;
    data.board = board;

    return data;
  }
}

async function isSafe(board, row, col) {
  const size = board.length;

  // Check if the position is valid
  if (row < 0 || row >= size || col < 0 || col >= size) {
    return { message: "Invalid position", isvalid: false };
  }

  // Check if queen is already placed in the position
  if (board[row][col] === 1) {
    console.log(board);
    return { message: "Queen already placed", isvalid: false };
  }

  // Check if there's a queen in the same row or column
  for (let i = 0; i < size; i++) {
    if (board[row][i] === 1) {
      return {
        message: "Queen in the same row",
        isvalid: false,
        cord: { row: row, col: i },
      };
    }
    if (board[i][col] === 1) {
      return {
        message: "Queen in the same column",
        isvalid: false,
        cord: { row: i, col: col },
      };
    }
  }

  // Check diagonals
  for (let i = 0; i < size; i++) {
    if (board[row - i] && board[row - i][col - i] === 1) {
      return {
        message: "Queen in the same diagonal",
        isvalid: false,
        cord: { row: row - i, col: col - i },
      };
    }
    if (board[row - i] && board[row - i][col + i] === 1) {
      return {
        message: "Queen in the same diagonal",
        isvalid: false,
        cord: { row: row - i, col: col + i },
      };
    }
    if (board[row + i] && board[row + i][col - i] === 1) {
      return {
        message: "Queen in the same diagonal",
        isvalid: false,
        cord: { row: row + i, col: col - i },
      };
    }
    if (board[row + i] && board[row + i][col + i] === 1) {
      return {
        message: "Queen in the same diagonal",
        isvalid: false,
        cord: { row: row + i, col: col + i },
      };
    }
  }

  return { message: "Good one!", isvalid: true };
}

module.exports = { isSafe, placeQueen, generateBoard, getSolutions };
