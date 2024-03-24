const { SORTTYPES } = require("../../enums/enums");
const { bubbleSort } = require("./bubble-sortModel");
const { insertionSort } = require("./insertion-sortModel");
const { mergeSort } = require("./merge-sortModel");
const { radixSort } = require("./radix-sortModel");
const { shellSort } = require("./shell-sortModel");
const { quickSort } = require("./quick-sortModel");
const { timSort } = require("./tim-sortModel");

function generateNumberArray(length) {
  let arrayLength = length || 5000;
  let array = [];

  for (let i = 0; i < arrayLength; i++) {
    array.push(Math.floor(Math.random() * 1000000) + 1);
  }
  return array;
}

function getTimeForAlgorithm(algorithmType, array) {
  const startTime = process.hrtime();
  let sortedArray = [];
  if (algorithmType === SORTTYPES.BUBBLE) {
    sortedArray = bubbleSort(array);
  } else if (algorithmType === SORTTYPES.QUICK) {
    sortedArray = quickSort(array);
  } else if (algorithmType === SORTTYPES.INSERTION) {
    sortedArray = insertionSort(array);
  } else if (algorithmType === SORTTYPES.MERGE) {
    sortedArray = mergeSort(array);
  } else if (algorithmType === SORTTYPES.RADIX) {
    sortedArray = radixSort(array);
  } else if (algorithmType === SORTTYPES.SHELL) {
    sortedArray = shellSort(array);
  } else if (algorithmType === SORTTYPES.TIM) {
    sortedArray = timSort(array);
  }
  const endTime = process.hrtime(startTime);
  const timeTaken = endTime[0] * 1000 + endTime[1] / 1000000;
  return timeTaken;
}

function getTimeTakens() {
  let array = generateNumberArray();
  let bubbleSortTime = getTimeForAlgorithm(SORTTYPES.BUBBLE, array);
  let insertionSortTime = getTimeForAlgorithm(SORTTYPES.INSERTION, array);
  let mergeSortTime = getTimeForAlgorithm(SORTTYPES.MERGE, array);
  let radixSortTime = getTimeForAlgorithm(SORTTYPES.RADIX, array);
  let shellSortTime = getTimeForAlgorithm(SORTTYPES.SHELL, array);
  let quickSortTime = getTimeForAlgorithm(SORTTYPES.QUICK, array);
  let timSortTime = getTimeForAlgorithm(SORTTYPES.TIM, array);
  return {
    bubbleSortTime,
    insertionSortTime,
    mergeSortTime,
    radixSortTime,
    shellSortTime,
    quickSortTime,
    timSortTime,
  };
}

module.exports = {
  generateNumberArray: generateNumberArray,
  getTimeForAlgorithm: getTimeTakens,
};
