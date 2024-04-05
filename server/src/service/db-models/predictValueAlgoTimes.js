const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const predictValueAlgoTimesSchema = new Schema({
  binarySearch: {
    type: Number,
    required: true,
  },
  jumpSearch: {
    type: Number,
    required: true,
  },
  exponentialSearch: {
    type: Number,
    required: true,
  },
  fibonacciSearch: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const predictValueAlgoTimesModel = mongoose.model(
  "predictValueAlgoTimes",
  predictValueAlgoTimesSchema
);

module.exports = predictValueAlgoTimesModel;
