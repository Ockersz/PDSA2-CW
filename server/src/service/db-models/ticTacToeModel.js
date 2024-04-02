const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticTacToeSchema = new Schema({
  board: {
    type: Array,
    required: true,
  },
  player: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const ticTacToeModel = mongoose.model("ticTacToe", ticTacToeSchema);

module.exports = ticTacToeModel;
