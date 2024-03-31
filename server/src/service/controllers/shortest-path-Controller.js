const { startGame } = require("../models/shortest-path/shortest-pathModel");

async function generateRandomDistancesController(req, res) {
  const result = startGame();
  res.send(result);
}

module.exports = {
  generateRandomDistancesController,
};
