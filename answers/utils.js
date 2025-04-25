"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.seedShuffle = seedShuffle;
var _seedrandom = _interopRequireDefault(require("seedrandom"));
var _constants = require("../logic/constants");
function seedShuffle(array, seed = _constants.RANDOM_SEED) {
  const rng = (0, _seedrandom.default)(seed);
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(rng() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}