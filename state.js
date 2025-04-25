"use strict";

exports.__esModule = true;
exports.daySince = exports.dayNoHanzi = exports.dayNo = exports.answer = void 0;
exports.getSymbolState = getSymbolState;
exports.now = exports.isPassed = exports.isFinished = exports.isFailed = exports.hint = void 0;
exports.parseWord = parseWord;
exports.showSettings = exports.showHint = exports.showHelp = exports.showFailed = exports.showDashboard = exports.showCheatSheet = exports.parsedTries = exports.parsedAnswer = void 0;
exports.testAnswer = testAnswer;
exports.useNumberTone = exports.useMask = void 0;
var _core = require("@vue-mini/core");
var _now = require("./composables/now");
var _index = require("./logic/index");
var _storage = require("./storage");
var _index2 = require("./answers/index");
// eslint-disable-next-line import/no-cycle

const now = exports.now = (0, _now.useNow)();
const showHint = exports.showHint = (0, _core.ref)(false);
const showSettings = exports.showSettings = (0, _core.ref)(false);
const showHelp = exports.showHelp = (0, _core.ref)(false);
const showFailed = exports.showFailed = (0, _core.ref)(false);
const showDashboard = exports.showDashboard = (0, _core.ref)(false);
const showCheatSheet = exports.showCheatSheet = (0, _core.ref)(false);
const useMask = exports.useMask = (0, _core.ref)(false);
const useNumberTone = exports.useNumberTone = (0, _core.computed)(() => {
  if (_storage.inputMode.value === 'sp') return true;
  if (_storage.inputMode.value === 'zy') return false;
  return _storage.useNumberTone.value;
});
const daySince = exports.daySince = (0, _core.computed)(() => {
  // Adjust date for daylight saving time, assuming START_DATE is not in DST
  const adjustedNow = (0, _index.isDstObserved)(now.value) ? new Date(Number(now.value) + 3600000) : now.value;
  return Math.floor((Number(adjustedNow) - Number(_index.START_DATE)) / 86400000);
});
const dayNo = exports.dayNo = (0, _core.ref)(daySince.value);
const dayNoHanzi = exports.dayNoHanzi = (0, _core.computed)(() => `${(0, _index.numberToHanzi)(dayNo.value)}日`);
const answer = exports.answer = (0, _core.computed)(() => (0, _index2.getAnswerOfDay)(dayNo.value));
console.log('每日拼音猜成语=>',answer.value);
const hint = exports.hint = (0, _core.computed)(() => answer.value.hint);
const parsedAnswer = exports.parsedAnswer = (0, _core.computed)(() => parseWord(answer.value.word));
const isPassed = exports.isPassed = (0, _core.computed)(() => {
  var _meta$value$passed;
  return (_meta$value$passed = _storage.meta.value.passed) != null ? _meta$value$passed : _storage.tries.value.length > 0 &&
  // eslint-disable-next-line unicorn/prefer-at -- not sure if android wechat supports it.
  (0, _index.checkPass)(testAnswer(parseWord(_storage.tries.value[_storage.tries.value.length - 1])));
});
const isFailed = exports.isFailed = (0, _core.computed)(() => !isPassed.value && _storage.tries.value.length >= _index.TRIES_LIMIT);
const isFinished = exports.isFinished = (0, _core.computed)(() => isPassed.value || Boolean(_storage.meta.value.answer));
function parseWord(word, _ans = answer.value.word, mode = _storage.inputMode.value, spM = _storage.spMode.value) {
  return (0, _index.parseWord)(word, _ans, mode, spM);
}
function testAnswer(word, ans = parsedAnswer.value) {
  return (0, _index.testAnswer)(word, ans);
}
const parsedTries = exports.parsedTries = (0, _core.computed)(() => _storage.tries.value.map(i => {
  const word = parseWord(i);
  const result = testAnswer(word);
  return {
    word,
    result
  };
}));
function getSymbolState(symbol, key) {
  const results = [];
  for (const t of parsedTries.value) {
    for (let i = 0; i < _index.WORD_LENGTH; i++) {
      const w = t.word[i];
      const r = t.result[i];
      if (key) {
        if (w[key] === symbol) results.push(r[key]);
      } else {
        if (w._1 === symbol) results.push(r._1);
        if (w._2 === symbol) results.push(r._2);
        if (w._3 === symbol) results.push(r._3);
      }
    }
  }
  if (results.includes('exact')) return 'exact';
  if (results.includes('misplaced')) return 'misplaced';
  if (results.includes('none')) return 'none';
  return null;
}