const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const predictValIndexSchema = new Schema({
  findVal: {
    type: Number,
    required: true,
  },
  answer: {
    type: Number,
    required: true,
  },
  gameArray: {
    type: Array,
    required: true,
  },
  options: {
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

const predictValIndexModel = mongoose.model(
  "predictValIndex",
  predictValIndexSchema
);

module.exports = predictValIndexModel;
