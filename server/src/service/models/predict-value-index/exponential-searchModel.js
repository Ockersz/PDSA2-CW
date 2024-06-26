function binarySearch(arr, l, r, x) {
  if (r >= l) {
    let mid = Math.floor((r + l) / 2);

    // If the element is present
    // at the middle itself
    if (arr[mid] == x) return mid;

    // If element is smaller than
    // mid, then it can only be
    // present in left subarray
    if (arr[mid] > x) return binarySearch(arr, l, mid - 1, x);

    // Else the element can only
    // be present in right subarray
    return binarySearch(arr, mid + 1, r, x);
  }

  // We reach here when element
  // is not present in array
  return -1;
}

// Returns position of first
// occurrence of x in array
function exponentialSearch(arr, x, n) {
  // If x is present at
  // first location itself
  if (arr[0] == x) return 0;

  // Find range for binary search
  // by repeated doubling
  let i = 1;
  while (i < n && arr[i] <= x) i = i * 2;

  // Call binary search for
  // the found range.
  return binarySearch(arr, i / 2, Math.min(i, n - 1), x);
}

module.exports = { exponentialSearch };
