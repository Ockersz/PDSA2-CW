const {
  getIndexOfValue,
} = require("../models/predict-value-index/predict-value-indexModel");

async function getIndexValue(req, res) {
  const result = getIndexOfValue();
  res.send(result);
}

module.exports = {
  getIndexValue,
};
