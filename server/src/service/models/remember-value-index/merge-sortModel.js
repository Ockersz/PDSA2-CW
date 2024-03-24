function merge(left, right, order = "asc") {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (
      (order === "asc" && left[leftIndex] < right[rightIndex]) ||
      (order === "desc" && left[leftIndex] > right[rightIndex])
    ) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }

  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }

  return result;
}

function mergeSort(array, order = "asc") {
  let arr = array.slice();
  if (arr.length <= 1) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(mergeSort(left, order), mergeSort(right, order), order);
}

module.exports = {
  mergeSort: mergeSort,
};
