const {
  generateBoard,
  placeQueen,
  getSolutions,
  checkSolutionWithBoard,
} = require("../view-models/eight-queens/eight_queensVM");
require("dotenv").config();

async function placequeen(req, res) {
  res.send(
    await placeQueen(req.body.hints, req.body.board, req.body.row, req.body.col)
  );
}

async function createGame(req, res) {
  res.send(await generateBoard(req.body.size));
}

async function getsolutions(req, res) {
  let solutions = [];
  solutions = await getSolutions(req.body.size);
  res.send(solutions);
}

async function checksolutionWithBoard(req, res) {
  res.send(await checkSolutionWithBoard(req.body.board));
}

module.exports = {
  getsolutions: getsolutions,
  placequeen: placequeen,
  createGame: createGame,
  checksolutionWithBoard: checksolutionWithBoard,
};
