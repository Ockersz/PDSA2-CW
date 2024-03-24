function bubbleSort(array, order = "asc") {
  // Clone the array to avoid modifying the original array
  let arr = array.slice();
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (order === "asc" && arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;
      } else if (order === "desc" && arr[i] < arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);

  return arr;
}

module.exports = {
  bubbleSort: bubbleSort,
};
