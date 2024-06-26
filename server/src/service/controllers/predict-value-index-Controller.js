const {
  getIndexOfValue,
  saveSolution,
  getTimes,
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

async function getTimesController(req, res) {
  const result = await getTimes();
  res.send(result);
}

module.exports = {
  getIndexValue,
  saveSol,
  getTimesController,
};
