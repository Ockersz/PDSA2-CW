const {
  generateBoard,
  placeQueen,
  getSolutions,
} = require("../view-models/eight-queens/eight_queensVM");
require("dotenv").config();

async function placequeen(req, res) {
  res.send(await placeQueen(req.body.board, req.body.row, req.body.col));
}

async function createGame(req, res) {
  res.send(await generateBoard(req.body.size));
}

async function getsolutions(req, res) {
  let solutions = [];
  solutions = await getSolutions(req.body.size);
  res.send(solutions.length.toString());
}

module.exports = {
  getsolutions: getsolutions,
  placequeen: placequeen,
  createGame: createGame,
};
