const {
  createBoard,
  makeMove,
} = require("../models/tic-tac-toe/tic-tac-toeModel");

async function createGame(req, res) {
  res.send(await createBoard(req.body.player));
}

async function makemove(req, res) {
  res.send(await makeMove(req.body.board, req.body.row, req.body.col));
}

module.exports = {
  createGame,
  makemove,
};
