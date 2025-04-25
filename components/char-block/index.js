"use strict";

var _core = require("@vue-mini/core");
var _storage = require("../../storage");
var _state = require("../../state");
(0, _core.defineComponent)({
  properties: {
    char: Object,
    answer: Object,
    active: Boolean
  },
  setup(props) {
    const exact = (0, _core.computed)(() => Boolean(props.answer) && Object.values(props.answer).every(i => i === 'exact'));
    const parsed = (0, _core.computed)(() => {
      let result;
      if (props.answer) {
        result = props.answer;
      } else if (!props.char || !_storage.useCheckAssist.value || !props.active) {
        result = {};
      } else {
        result = {
          _1: (0, _state.getSymbolState)(props.char._1, _storage.inputMode.value === 'sp' ? '_1' : undefined) === 'none' ? 'deleted' : undefined,
          _2: (0, _state.getSymbolState)(props.char._2, _storage.inputMode.value === 'sp' ? '_2' : undefined) === 'none' ? 'deleted' : undefined,
          _3: (0, _state.getSymbolState)(props.char._3) === 'none' ? 'deleted' : undefined,
          tone: (0, _state.getSymbolState)(props.char.tone, 'tone') === 'none' ? 'deleted' : undefined
        };
      }
      return result;
    });
    const getColor = (result, isChar = false) => {
      const pre = _state.useMask.value ? isChar ? 'char-mask' : 'tone-mask' : '';
      if (!result || exact.value) return pre;
      const colors = {
        exact: 'text-ok',
        misplaced: 'text-mis',
        none: isChar ? 'op80' : 'op35',
        deleted: _storage.inputMode.value === 'zy' ? 'op30' : 'line-through op30'
      };
      return `${pre} ${colors[result]}`;
    };
    const color = (0, _core.computed)(() => ({
      char: getColor(parsed.value.char, true),
      _1: getColor(parsed.value._1),
      _2: getColor(parsed.value._2),
      _3: getColor(parsed.value._3),
      tone: getColor(parsed.value.tone)
    }));
    const blockClass = (0, _core.computed)(() => {
      if (!props.answer) return 'base';
      if (exact.value) return 'base ok';
      return 'base normal';
    });
    const toneCharLocation = (0, _core.computed)(() => {
      var _props$char$_, _props$char, _find;
      const part = (_props$char$_ = (_props$char = props.char) == null ? void 0 : _props$char._2) != null ? _props$char$_ : '';
      return (_find = [
      // eslint-disable-next-line unicorn/prefer-includes
      part.lastIndexOf('iu') > -1 ? part.lastIndexOf('iu') + 1 : -1, part.lastIndexOf('a'), part.lastIndexOf('e'), part.lastIndexOf('o'), part.lastIndexOf('i'), part.lastIndexOf('u'), part.lastIndexOf('v')].find(i => i !== null && i >= 0)) != null ? _find : 0;
    });
    const partTwo = (0, _core.computed)(() => {
      var _props$char$_2, _props$char2;
      let two = (_props$char$_2 = (_props$char2 = props.char) == null ? void 0 : _props$char2._2) != null ? _props$char$_2 : '';
      if (_storage.inputMode.value === 'py') two = two.replace('v', 'ü');
      const index = toneCharLocation.value;
      // Replace i with dot less for tone symbol
      if (!_state.useNumberTone.value && two[index] === 'i') {
        two = `${two.slice(0, index)}ı${two.slice(index + 1)}`;
      }
      return [...two];
    });
    const show = (0, _core.computed)(() => {
      var _props$char3;
      return Boolean((_props$char3 = props.char) == null || (_props$char3 = _props$char3.char) == null ? void 0 : _props$char3.trim());
    });
    console.log(props.char);
    console.log(partTwo);
    console.log(_state.useNumberTone.value);
    return {
      inputMode: _storage.inputMode,
      useMask: _state.useMask,
      useNumberTone: _state.useNumberTone,
      color,
      blockClass,
      toneCharLocation,
      partTwo,
      show
    };
  }
});