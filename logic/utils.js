"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.checkPass = checkPass;
exports.getHint = getHint;
exports.isDstObserved = isDstObserved;
exports.numberToHanzi = numberToHanzi;
exports.parseChar = parseChar;
exports.parsePinyin = parsePinyin;
exports.parseWord = parseWord;
exports.testAnswer = testAnswer;
var _seedrandom = _interopRequireDefault(require("seedrandom"));
var _tools = require("@hankit/tools");
var _idioms = require("./idioms");
function parsePinyin(pinyin, mode = 'py', spMode = 'sougou') {
  let parts = [];
  if (pinyin) {
    if (mode === 'zy') {
      parts = [...(pinyin.trim() ? (0, _tools.toZhuyin)(pinyin) : '')];
    } else if (mode === 'sp') {
      parts = [...(0, _tools.toShuangpin)(pinyin, spMode)];
    } else {
      let rest = pinyin;
      const one = _tools.pinyinInitials.find(i => rest.startsWith(i));
      if (one) rest = rest.slice(one.length);
      parts = [one, rest].filter(Boolean);
    }
  }
  return parts;
}
function parseChar(char, pinyin, mode, spMode) {
  var _exec$, _exec;
  pinyin || (pinyin = (0, _idioms.getPinyin)(char)[0]);
  const tone = (_exec$ = (_exec = /\d$/.exec(pinyin)) == null ? void 0 : _exec[0]) != null ? _exec$ : '';
  if (tone) pinyin = pinyin.slice(0, -tone.length).trim();
  const parts = parsePinyin(pinyin, mode, spMode);
  // If there is no final, actually it's no intital
  if (parts[0] && !parts[1]) {
    parts[1] = parts[0];
    parts[0] = '';
  }
  const [one, two, three] = parts;
  return {
    char,
    _1: one,
    _2: two,
    _3: three,
    parts,
    yin: pinyin,
    tone: Number(tone) || 0
  };
}
function parseWord(word, answer, mode, spMode) {
  const pinyins = (0, _idioms.getPinyin)(word);
  const chars = [...word];
  const answerPinyin = answer ? (0, _idioms.getPinyin)(answer) : undefined;
  return chars.map((char, i) => {
    let pinyin = pinyins[i] || '';
    // Try match the pinyin from the answer word
    if (answerPinyin && answer != null && answer.includes(char)) pinyin = answerPinyin[answer.indexOf(char)] || pinyin;
    return parseChar(char, pinyin, mode, spMode);
  });
}
function testAnswer(input, answer) {
  const unmatched = {
    char: answer.map((a, i) => (0, _tools.toSimplified)(input[i].char) === (0, _tools.toSimplified)(a.char) ? undefined : (0, _tools.toSimplified)(a.char))
    // eslint-disable-next-line eqeqeq, no-eq-null
    .filter(i => i != null),
    tone: answer.map((a, i) => input[i].tone === a.tone ? undefined : a.tone)
    // eslint-disable-next-line eqeqeq, no-eq-null
    .filter(i => i != null),
    parts: answer.flatMap((a, i) => a.parts.filter(p => !input[i].parts.includes(p)))
    // eslint-disable-next-line eqeqeq, no-eq-null
    .filter(i => i != null)
  };
  function includesAndRemove(array, v) {
    if (array.includes(v)) {
      array.splice(array.indexOf(v), 1);
      return true;
    }
    return false;
  }
  return input.map((a, i) => {
    const char = (0, _tools.toSimplified)(a.char);
    return {
      char: answer[i].char === char || answer[i].char === a.char ? 'exact' : includesAndRemove(unmatched.char, char) ? 'misplaced' : 'none',
      tone: answer[i].tone === a.tone ? 'exact' : includesAndRemove(unmatched.tone, a.tone) ? 'misplaced' : 'none',
      _1: !a._1 || answer[i].parts.includes(a._1) ? 'exact' : includesAndRemove(unmatched.parts, a._1) ? 'misplaced' : 'none',
      _2: !a._2 || answer[i].parts.includes(a._2) ? 'exact' : includesAndRemove(unmatched.parts, a._2) ? 'misplaced' : 'none',
      _3: !a._3 || answer[i].parts.includes(a._3) ? 'exact' : includesAndRemove(unmatched.parts, a._3) ? 'misplaced' : 'none'
    };
  });
}
function checkPass(result) {
  return result.every(r => r.char === 'exact');
}
function getHint(word) {
  return word[Math.floor((0, _seedrandom.default)(word)() * word.length)];
}
const numberChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const tens = ['', '十', '百', '千'];
function numberToHanzi(number) {
  const digits = [...number.toString()].map(Number);
  const chars = digits.map((i, idx) => {
    const unit = i === 0 ? '' : tens[digits.length - 1 - idx];
    return numberChar[i] + unit;
  });
  return chars.join('').replace('一十', '十').replace('一百', '百').replace('二十', '廿').replace(/零+/, '零').replace(/(.)零$/, '$1');
}

/**
 * Checks whether a given date is in daylight saving time.
 * @param date the date object to be checked.
 * @returns true if the date is in daylight saving time, false if it's not.
 */
function isDstObserved(date) {
  const jan = new Date(date.getFullYear(), 0, 1);
  const jul = new Date(date.getFullYear(), 6, 1);
  const standardTimezoneOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  return date.getTimezoneOffset() < standardTimezoneOffset;
}