function numberToLetter(number) {
  if (number <= 26) {
    const letter = String.fromCharCode(number + 64);
    return letter;
  } else {
    const firstLetter = String.fromCharCode(Math.floor((number - 1) / 26) + 64);
    const secondLetter = String.fromCharCode(((number - 1) % 26) + 65);
    return firstLetter + secondLetter;
  }
}

function letterToNumber(letter) {
  if (letter.length === 1) {
    const number = letter.charCodeAt(0) - 64;
    return number;
  } else {
    const firstLetter = letter.charCodeAt(0) - 64;
    const secondLetter = letter.charCodeAt(1) - 65;
    const number = firstLetter * 26 + secondLetter + 1;
    return number;
  }
}

module.exports = { letterToNumber, numberToLetter };
