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

// 获取随机答案
function getRandomAnswer(usedAnswers = []) {
  // 获取未使用过的答案列表
  const unusedAnswers = _list.answers.filter(a => !usedAnswers.includes(a[0]));
  
  // 如果所有答案都已使用过,重置已使用记录
  if (unusedAnswers.length === 0) {
    return {
      answer: _list.answers[Math.floor(Math.random() * _list.answers.length)],
      shouldReset: true
    };
  }
  
  // 从未使用过的答案中随机选择一个
  const randomIndex = Math.floor(Math.random() * unusedAnswers.length);
  return {
    answer: unusedAnswers[randomIndex],
    shouldReset: false
  };
}

exports.getRandomAnswer = getRandomAnswer;