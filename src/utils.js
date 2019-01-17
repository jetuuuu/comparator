import "babel-polyfill";

function isIframe() {
  return window.location !== window.parent.location;
}

function randomNumner(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function median(numbers) {
  var median = 0,
    numsLen = numbers.length;
  numbers.sort();

  if (numsLen % 2 === 0) {
    median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
  } else {
    median = numbers[(numsLen - 1) / 2];
  }

  return median;
}

module.exports = {
  isIframe,
  randomNumner,
  median
};
