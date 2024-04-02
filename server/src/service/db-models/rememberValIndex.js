const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rememberValIndexSchema = new Schema({
  answer1: {
    type: Number,
    required: true,
  },
  answer2: {
    type: Number,
    required: true,
  },
  gameArray: {
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

const rememberValIndexModel = mongoose.model(
  "rememberValIndex",
  rememberValIndexSchema
);

module.exports = rememberValIndexModel;
