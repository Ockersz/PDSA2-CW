const {
  generateNumberArray,
  getTimeForAlgorithm,
  startGame,
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
  const result = startGame();
  res.send(result);
}

module.exports = {
  generateArray,
  getTimeTaken,
  startgame,
};
