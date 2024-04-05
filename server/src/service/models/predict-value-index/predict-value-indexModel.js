const { timSort } = require("../remember-value-index/tim-sortModel");
const { binarySearch } = require("./binary-searchModel");
const { jumpSearch } = require("./jump-searchModel");
const { exponentialSearch } = require("./exponential-searchModel");
const { fibMonaccianSearch } = require("./fibonacci-searchModel");
const predictValIndexModel = require("../../db-models/predictValIndex");
const predictValueAlgoTimes = require("../../db-models/predictValueAlgoTimes");

function generateNumberArray(length) {
  let arrayLength = length || 5000;
  let array = [];

  for (let i = 0; i < arrayLength; i++) {
    array.push(Math.floor(Math.random() * 1000000) + 1);
  }
  return array;
}

function getIndexOfValue() {
  const array = generateNumberArray();
  const length = array.length;

  const sortedArray = timSort(array);

  const findVal = array[Math.floor(Math.random() * length)];

  const searchAlgorithms = [
    { name: "Binary Search", func: binarySearch },
    { name: "Jump Search", func: jumpSearch },
    { name: "Exponential Search", func: exponentialSearch },
    { name: "Fibonacci Search", func: fibMonaccianSearch },
  ];

  const searchResults = [];
  searchAlgorithms.forEach((algorithm) => {
    const startTime = process.hrtime();
    const index = algorithm.func(sortedArray, findVal, length);
    const endTime = process.hrtime(startTime);
    const timeTaken = endTime[0] * 1000 + endTime[1] / 1000000;
    searchResults.push({ algorithm: algorithm.name, index, timeTaken });
  });

  predictValueAlgoTimes.create({
    binarySearch: searchResults[0].timeTaken,
    jumpSearch: searchResults[1].timeTaken,
    exponentialSearch: searchResults[2].timeTaken,
    fibonacciSearch: searchResults[3].timeTaken,
  });

  return { findVal, array, searchResults };
}

async function getTimes() {
  const lastDbTime = await predictValueAlgoTimes.findOne().sort({ _id: -1 });
  return lastDbTime;
}

async function saveSolution(findVal, gameArray, answer, options, player) {
  const result = await predictValIndexModel.create({
    findVal,
    gameArray,
    answer,
    options,
    player,
  });
  return result;
}

module.exports = { getIndexOfValue, saveSolution, getTimes };
