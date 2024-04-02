const { SORTTYPES } = require("../../enums/enums");
const { bubbleSort } = require("./bubble-sortModel");
const { insertionSort } = require("./insertion-sortModel");
const { mergeSort } = require("./merge-sortModel");
const { radixSort } = require("./radix-sortModel");
const { shellSort } = require("./shell-sortModel");
const { quickSort } = require("./quick-sortModel");
const { timSort } = require("./tim-sortModel");
const rememberValIndexModel = require("../../db-models/rememberValIndex");
const sortedArrAlgoTimesModel = require("../../db-models/sortedArrAlgoTimes");

function generateNumberArray(length) {
  let arrayLength = length || 5000;
  let array = [];

  for (let i = 0; i < arrayLength; i++) {
    array.push(Math.floor(Math.random() * 1000000) + 1);
  }
  return array;
}

function sortWithAlgorithm(algorithmType, array) {
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
  } else if (algorithmType === SORTTYPES.TIM) {
    sortedArray = timSort(array);
  } else if (algorithmType === SORTTYPES.SHELL) {
    sortedArray = shellSort(array);
  }
  return sortedArray;
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

async function getTimeTakens(array) {
  let bubbleSortTime = getTimeForAlgorithm(SORTTYPES.BUBBLE, array);
  let insertionSortTime = getTimeForAlgorithm(SORTTYPES.INSERTION, array);
  let mergeSortTime = getTimeForAlgorithm(SORTTYPES.MERGE, array);
  let radixSortTime = getTimeForAlgorithm(SORTTYPES.RADIX, array);
  let shellSortTime = getTimeForAlgorithm(SORTTYPES.SHELL, array);
  let quickSortTime = getTimeForAlgorithm(SORTTYPES.QUICK, array);
  let timSortTime = getTimeForAlgorithm(SORTTYPES.TIM, array);

  await sortedArrAlgoTimesModel.create({
    bubbleSortTime: bubbleSortTime,
    insertionSortTime: insertionSortTime,
    mergeSortTime: mergeSortTime,
    quickSortTime: quickSortTime,
    radixSortTime: radixSortTime,
    shellSortTime: shellSortTime,
    timSortTime: timSortTime,
  });

  return [
    { type: SORTTYPES.BUBBLE, timeFunction: bubbleSortTime },
    { type: SORTTYPES.INSERTION, timeFunction: insertionSortTime },
    { type: SORTTYPES.MERGE, timeFunction: mergeSortTime },
    { type: SORTTYPES.RADIX, timeFunction: radixSortTime },
    { type: SORTTYPES.SHELL, timeFunction: shellSortTime },
    { type: SORTTYPES.QUICK, timeFunction: quickSortTime },
    { type: SORTTYPES.TIM, timeFunction: timSortTime },
  ];
}

async function startGame() {
  let array = generateNumberArray();
  let sortedTimes = await getTimeTakens(array);

  let fastestAlgorithm = sortedTimes.reduce((prev, current) =>
    prev.timeFunction < current.timeFunction ? prev : current
  ).type;
  //sort the array with the fastest algorithm
  let sortedArray = sortWithAlgorithm(parseInt(fastestAlgorithm), array);

  return {
    sortedTimes,
    fastestAlgorithm,
    sortedArray,
  };
}

async function saveSolution(answer1, answer2, gameArray, player) {
  const newGame = new rememberValIndexModel({
    answer1,
    answer2,
    gameArray,
    player,
  });
  return await newGame.save();
}

module.exports = {
  generateNumberArray: generateNumberArray,
  getTimeForAlgorithm: getTimeTakens,
  startGame: startGame,
  saveSolution: saveSolution,
};
