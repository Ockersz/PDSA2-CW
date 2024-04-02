const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sortedArrAlgoTimesSchema = new Schema({
  bubbleSortTime: {
    type: Number,
    required: true,
  },
  insertionSortTime: {
    type: Number,
    required: true,
  },
  mergeSortTime: {
    type: Number,
    required: true,
  },
  quickSortTime: {
    type: Number,
    required: true,
  },
  radixSortTime: {
    type: Number,
    required: true,
  },
  shellSortTime: {
    type: Number,
    required: true,
  },
  timSortTime: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const sortedArrAlgoTimesModel = mongoose.model(
  "sortedArrAlgoTimes",
  sortedArrAlgoTimesSchema
);

module.exports = sortedArrAlgoTimesModel;
