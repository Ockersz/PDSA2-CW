const {
  generateNumberArray,
  getTimeForAlgorithm,
  startGame,
  saveSolution,
  getLastTimeDb,
} = require("../models/remember-value-index/remember-value-indexModel");

async function generateArray(req, res) {
  const result = generateNumberArray();
  res.send(result);
}

async function getTimeTaken(req, res) {
  const result = getTimeForAlgorithm();
  res.send(result);
}

async function startgame(req, res) {
  const result = await startGame();
  res.send(result);
}

async function saveSol(req, res) {
  const result = saveSolution(
    req.body.answer1,
    req.body.answer2,
    req.body.gameArray,
    req.body.player
  );
  res.send(result);
}

async function getlasttime(req, res) {
  const result = await getLastTimeDb();
  res.send(result);
}

module.exports = {
  generateArray,
  getTimeTaken,
  startgame,
  saveSol,
  getlasttime,
};
