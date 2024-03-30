const { timSort } = require("../remember-value-index/tim-sortModel");
const { binarySearch } = require("./binary-searchModel");
const { jumpSearch } = require("./jump-searchModel");
const { exponentialSearch } = require("./exponential-searchModel");
const { fibMonaccianSearch } = require("./fibonacci-searchModel");

function generateNumberArray(length) {
  let arrayLength = length || 5000;
  let array = [];

  for (let i = 0; i < arrayLength; i++) {
    array.push(Math.floor(Math.random() * 1000000) + 1);
  }
  return array;
}

function getIndexOfValue() {
  // Step 1: Generate random number array
  const array = generateNumberArray();
  const length = array.length;

  // Step 2: Sort the array
  const sortedArray = timSort(array);

  // Step 3: Choose a random value from the array
  const findVal = array[Math.floor(Math.random() * length)];

  // Step 4: Perform searches with different algorithms
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

  // Step 5: Record time taken and index found for each search algorithm
  // Step 6: Return results
  return { findVal, array, searchResults };
}

module.exports = { getIndexOfValue };
