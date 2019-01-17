import "babel-polyfill";

function isIframe() {
  return window.location !== window.parent.location;
}

function randomNumner(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = {
  isIframe,
  randomNumner
};
