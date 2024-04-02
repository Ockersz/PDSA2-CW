const {
  getIndexOfValue,
  saveSolution,
} = require("../models/predict-value-index/predict-value-indexModel");

async function getIndexValue(req, res) {
  const result = getIndexOfValue();
  res.send(result);
}

async function saveSol(req, res) {
  const result = saveSolution(
    req.body.findVal,
    req.body.gameArray,
    req.body.answer,
    req.body.options,
    req.body.player
  );
  res.send(result);
}

module.exports = {
  getIndexValue,
  saveSol,
};
