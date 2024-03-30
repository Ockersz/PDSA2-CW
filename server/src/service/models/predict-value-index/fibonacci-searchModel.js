function fibMonaccianSearch(arr, x, n) {
  let fibMMm2 = 0; // (m-2)'th Fibonacci No.
  let fibMMm1 = 1; // (m-1)'th Fibonacci No.
  let fibM = fibMMm2 + fibMMm1; // m'th Fibonacci

  while (fibM < n) {
    fibMMm2 = fibMMm1;
    fibMMm1 = fibM;
    fibM = fibMMm2 + fibMMm1;
  }

  let offset = -1;

  while (fibM > 1) {
    let i = Math.min(offset + fibMMm2, n - 1);

    if (arr[i] < x) {
      fibM = fibMMm1;
      fibMMm1 = fibMMm2;
      fibMMm2 = fibM - fibMMm1;
      offset = i;
    } else if (arr[i] > x) {
      fibM = fibMMm2;
      fibMMm1 = fibMMm1 - fibMMm2;
      fibMMm2 = fibM - fibMMm1;
    } else return i;
  }

  if (fibMMm1 && arr[n - 1] == x) {
    return n - 1;
  }

  return -1;
}

module.exports = { fibMonaccianSearch };

//Usage :
// let arr = [10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100];
// let n = arr.length;
// let x = 85;
// console.log(fibMonaccianSearch(arr, x, n)); // 8
