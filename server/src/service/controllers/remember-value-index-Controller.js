const {
  generateNumberArray,
  getTimeForAlgorithm,
} = require("../models/remember-value-index/remember-value-indexModel");

async function generateArray(req, res) {
  const result = generateNumberArray();
  res.send(result);
}

async function getTimeTaken(req, res) {
  const result = getTimeForAlgorithm();
  res.send(result);
}

module.exports = {
  generateArray,
  getTimeTaken,
};
