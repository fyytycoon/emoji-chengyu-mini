"use strict";

exports.__esModule = true;
exports.colorblind = exports.averageDurations = void 0;
exports.formatDuration = formatDuration;
exports.locale = exports.inputMode = exports.initialized = exports.historyTriesCount = exports.gamesCount = void 0;
exports.markEnd = markEnd;
exports.markStart = markStart;
exports.useStrictMode = exports.useNumberTone = exports.useNoHint = exports.useCheckAssist = exports.tries = exports.spMode = exports.records = exports.passedTries = exports.passedCount = exports.noHintPassedCount = exports.meta = void 0;
var _core = require("@vue-mini/core");
var _storage = require("./composables/storage");
var _state = require("./state");
// eslint-disable-next-line import/no-cycle

let language = '';
try {
  language = wx.getSystemInfoSync().language.toLowerCase();
} catch (_unused) {}
const preferTraditional = language.includes('zh') && (language.includes('hk') || language.includes('mo') || language.includes('tw') || language.includes('hant'));
const preferZhuyin = language.includes('zh') && language.includes('tw');

// `history` is a reserved word in miniprogram
const records = exports.records = (0, _storage.useStorage)('handle-tries-meta', {});
const initialized = exports.initialized = (0, _storage.useStorage)('handle-initialized', false);
const locale = exports.locale = (0, _storage.useStorage)('handle-locale', preferTraditional ? 'hant' : 'hans');
const inputMode = exports.inputMode = (0, _storage.useStorage)('handle-mode', preferZhuyin ? 'zy' : 'py');
const spMode = exports.spMode = (0, _storage.useStorage)('handle-sp-mode', 'sougou');
const colorblind = exports.colorblind = (0, _storage.useStorage)('handle-colorblind', false);
const useNoHint = exports.useNoHint = (0, _storage.useStorage)('handle-hard-mode', false);
const useNumberTone = exports.useNumberTone = (0, _storage.useStorage)('handle-number-tone', false);
const useCheckAssist = exports.useCheckAssist = (0, _storage.useStorage)('handle-check-assist', false);
const useStrictMode = exports.useStrictMode = (0, _storage.useStorage)('handle-strict', false);
const meta = exports.meta = (0, _core.computed)({
  get() {
    if (!(_state.dayNo.value in records.value)) records.value[_state.dayNo.value] = {};
    return records.value[_state.dayNo.value];
  },
  set(v) {
    records.value[_state.dayNo.value] = v;
  }
});
const tries = exports.tries = (0, _core.computed)({
  get() {
    var _meta$value;
    (_meta$value = meta.value).tries || (_meta$value.tries = []);
    return meta.value.tries;
  },
  set(v) {
    meta.value.tries = v;
  }
});
function markStart() {
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  if (meta.value.start || meta.value.end) return;
  meta.value.start = Date.now();
}
function markEnd() {
  if (!meta.value.start || meta.value.end) return;
  meta.value.end = Date.now();
  meta.value.duration = meta.value.end - meta.value.start;
}
const gamesCount = exports.gamesCount = (0, _core.computed)(() => Object.values(records.value).filter(m => {
  var _ref, _m$passed;
  return Boolean((_ref = (_m$passed = m.passed) != null ? _m$passed : m.answer) != null ? _ref : m.failed);
}).length);
const passedTries = exports.passedTries = (0, _core.computed)(() => Object.values(records.value).filter(m => Boolean(m.passed)));
const passedCount = exports.passedCount = (0, _core.computed)(() => passedTries.value.length);
const noHintPassedCount = exports.noHintPassedCount = (0, _core.computed)(() => Object.values(records.value).filter(m => Boolean(m.passed && !m.hint)).length);
const historyTriesCount = exports.historyTriesCount = (0, _core.computed)(() => Object.values(records.value).filter(m => {
  var _ref2, _m$passed2;
  return (_ref2 = (_m$passed2 = m.passed) != null ? _m$passed2 : m.answer) != null ? _ref2 : m.failed;
}).map(m => {
  var _m$tries$length, _m$tries;
  return (_m$tries$length = (_m$tries = m.tries) == null ? void 0 : _m$tries.length) != null ? _m$tries$length : 0;
}).reduce((a, b) => a + b, 0));
const averageDurations = exports.averageDurations = (0, _core.computed)(() => {
  const items = Object.values(records.value).filter(m => m.passed && m.duration);
  if (items.length === 0) return 0;
  const durations = items.map(m => m.duration).reduce((a, b) => a + b, 0);
  return formatDuration(durations / items.length);
});
function formatDuration(duration) {
  const ts = duration / 1000;
  const m = Math.floor(ts / 60);
  const s = Math.floor(ts % 60);
  return m ? `${m}分${s}秒` : `${s}秒`;
}