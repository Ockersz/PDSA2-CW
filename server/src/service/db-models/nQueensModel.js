const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nQueensSchema = new Schema({
  n: {
    type: Number,
    required: true,
  },
  solution: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  player: {
    type: String,
    required: true,
  },
});

const nQueensModel = mongoose.model("nQueens", nQueensSchema);

module.exports = nQueensModel;
