"use strict";

var _core = require("@vue-mini/core");
var _tools = require("@hankit/tools");
var _storage = require("../../storage");
var _state = require("../../state");
(0, _core.defineComponent)(() => {
  const getSymbolClass = (symbol, key) => {
    const state = (0, _state.getSymbolState)(symbol, key);
    if (!state) return '';
    return {
      exact: 'text-ok',
      misplaced: 'text-mis',
      none: 'op-30'
    }[state];
  };
  const pyInitials = (0, _core.computed)(() => _tools.pinyinInitials.map(s => ({
    s,
    c: getSymbolClass(s)
  })));
  const pyFinals = (0, _core.computed)(() => _tools.pinyinFinals.map(s => ({
    s: s.replace('v', 'ü'),
    c: getSymbolClass(s)
  })));
  const zySymbols = (0, _core.computed)(() => _tools.zhuyinSymbols.map(s => ({
    s,
    c: getSymbolClass(s)
  })));
  const spConstants = (0, _core.computed)(() => {
    const {
      initials,
      finals
    } = (0, _tools.getShuangpinConstants)(_storage.spMode.value);
    return {
      initials: initials.map(s => ({
        s,
        c: getSymbolClass(s, '_1')
      })),
      finals: finals.map(s => ({
        s,
        c: getSymbolClass(s, '_2')
      }))
    };
  });
  return {
    inputMode: _storage.inputMode,
    pyInitials,
    pyFinals,
    zySymbols,
    spConstants
  };
});