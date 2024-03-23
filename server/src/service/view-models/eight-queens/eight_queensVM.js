async function generateBoard(bordsize = 8) {
  const board = Array(bordsize)
    .fill(null)
    .map(() => Array(bordsize).fill(0));
  return board;
}

async function placeQueen(board, row, col) {
  board[row][col] = 1;
  const data = {};
  const respond = await isSafe(board, row, col);
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
  let respond = {};
  board.map((boardrow, rowindex) => {
    //check if the queen is placed in the same row
    if (rowindex === row) {
      respond = { message: "Queen is placed in the same row", isvalid: false };
      return respond;
    } else {
      boardrow.map((boardcol, colindex) => {
        //check if the queen is placed in the same column
        if (colindex === col) {
          respond = {
            message: "Queen is placed in the same column",
            isvalid: false,
          };
          return respond;
          // } else {
          //   //check if the queen is placed in the same diagonal
          //   if (Math.abs(rowindex - row) === Math.abs(colindex - col)) {
          //     console.log("Queen is placed in the same diagonal");
          //     return false;
          //   }
        }
      });
    }
  });

  return { message: "Good one!", isvalid: true };
}

module.exports = { isSafe, placeQueen, generateBoard };
