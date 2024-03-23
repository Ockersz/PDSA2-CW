async function generateBoard(bordsize = 8) {
  const board = Array(bordsize)
    .fill(null)
    .map(() => Array(bordsize).fill(0));
  return board;
}

async function placeQueen(board, row, col) {
  const data = {};
  const respond = await isSafe(board, row, col);
  board[row][col] = 1;
  if (respond.isvalid) {
    data.message = "Queen placed successfully";
    data.board = board;
    return data;
  } else {
    data.message = respond.message;
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
    if (board[row][i] === 1 || board[i][col] === 1) {
      return { message: "Queen in the same row or column", isvalid: false };
    }
  }

  // Check diagonals
  for (let i = 0; i < size; i++) {
    if ((board[row - i] && board[row - i][col - i] === 1) ||
        (board[row - i] && board[row - i][col + i] === 1) ||
        (board[row + i] && board[row + i][col - i] === 1) ||
        (board[row + i] && board[row + i][col + i] === 1)) {
      return { message: "Queen in the same diagonal", isvalid: false };
    }
  }

  return { message: "Good one!", isvalid: true };
}

module.exports = { isSafe, placeQueen, generateBoard };
