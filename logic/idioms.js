"use strict";

exports.__esModule = true;
exports.getIdiom = getIdiom;
exports.getPinyin = getPinyin;
var _tools = require("@hankit/tools");
var _polyphones = require("../data/polyphones");
var _idioms = require("../data/idioms");
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
const getPinyinRawWithTypes = _tools.getPinyinRaw;
function getIdiom(word) {
  const simplified = (0, _tools.toSimplified)(word);
  if (_polyphones.polyphones[word]) return [word, _polyphones.polyphones[word]];
  if (_polyphones.polyphones[simplified]) return [word, _polyphones.polyphones[simplified]];
  if (_idioms.idioms.includes(word)) return [word, undefined];
  if (_idioms.idioms.includes(simplified)) return [simplified, undefined];
  return undefined;
}
function getPinyin(word) {
  var _data$;
  const data = getIdiom(word);
  const parts = data != null && data[1] ? data[1].split(/\s+/g) : getPinyinRawWithTypes((_data$ = data == null ? void 0 : data[0]) != null ? _data$ : (0, _tools.toSimplified)(word), {
    style: getPinyinRawWithTypes.STYLE_TONE2
  }).map(i => i[0]);
  // https://baike.baidu.com/item/%E6%B1%89%E8%AF%AD%E6%8B%BC%E9%9F%B3%E6%96%B9%E6%A1%88/1884432
  return parts.map(i => i.replaceAll(/^([jqxy])u([a-z]*\d?)$/g, '$1v$2'));
}