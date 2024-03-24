function shellSort(array, order = "asc") {
  const n = array.length;
  let gap = Math.floor(n / 2); // Initial gap value

  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      const temp = array[i];
      let j = i;

      // Compare elements that are 'gap' apart
      while (
        j >= gap &&
        (order === "asc" ? array[j - gap] > temp : array[j - gap] < temp)
      ) {
        array[j] = array[j - gap];
        j -= gap;
      }
      array[j] = temp;
    }
    gap = Math.floor(gap / 2); // Reduce the gap
  }

  if (order === "desc") {
    array.reverse();
  }

  return array;
}

module.exports = {
  shellSort: shellSort,
};
