"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.getAnswerOfDay = getAnswerOfDay;
var _seedrandom = _interopRequireDefault(require("seedrandom"));
var _index = require("../logic/index");
var _list = require("./list");
function getAnswerOfDay(day) {
  let answer;
  // console.log(day);
  // console.log(_list.answers);
  // When the day is out of range, pick a random answer from the list.
  if (day >= _list.answers.length) {
    const seed = (0, _seedrandom.default)(`day-${day}`)();
    answer = _list.answers[Math.floor(seed * _list.answers.length)];
  } else {
    answer = _list.answers[day];
  }
  const [word = '', hint = ''] = answer;
  return {
    word,
    hint: hint || (0, _index.getHint)(word)
  };
}