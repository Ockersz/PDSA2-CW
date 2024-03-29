function generateNumberArray(length) {
  let arrayLength = length || 5000;
  let array = [];

  for (let i = 0; i < arrayLength; i++) {
    array.push(Math.floor(Math.random() * 1000000) + 1);
  }
  return array;
}
