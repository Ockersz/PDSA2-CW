function radixSort(array, order = "asc") {
  let arr = array.slice();
  let max = Math.max(...arr);
  let exp = 1;
  while (Math.floor(max / exp) > 0) {
    arr = countingSort(arr, exp, order);
    exp *= 10;
  }
  return arr;
}

function countingSort(array, exp, order = "asc") {
  const n = array.length;
  const output = new Array(n);
  const count = new Array(10).fill(0);

  for (let i = 0; i < n; i++) {
    const index = Math.floor(array[i] / exp) % 10;
    count[index]++;
  }

  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  for (let i = n - 1; i >= 0; i--) {
    const index = Math.floor(array[i] / exp) % 10;
    output[count[index] - 1] = array[i];
    count[index]--;
  }

  for (let i = 0; i < n; i++) {
    array[i] = output[i];
  }

  if (order === "desc") {
    array.reverse();
  }

  return array;
}

module.exports = {
  radixSort: radixSort,
};
