const {
  createBoard,
  makeMove,
  saveSolution,
} = require("../models/tic-tac-toe/tic-tac-toeModel");

async function createGame(req, res) {
  res.send(await createBoard(req.body.player));
}

async function makemove(req, res) {
  res.send(await makeMove(req.body.board, req.body.row, req.body.col));
}

async function saveSol(req, res) {
  res.send(await saveSolution(req.body.board, req.body.player));
}

module.exports = {
  createGame,
  makemove,
  saveSol,
};
