"use strict";

var _core = require("@vue-mini/core");
var _state = require("../../state");
var _storage = require("../../storage");
(0, _core.defineComponent)((_, context) => {
  const final = (0, _core.computed)(() => ({
    py: 'u',
    zy: 'ㄨㄛ',
    sp: 'o'
  })[_storage.inputMode.value]);
  const onStart = () => {
    _state.useMask.value = false;
    _storage.initialized.value = true;
    context.triggerEvent('close');
  };
  return {
    final,
    onStart
  };
});