"use strict";

var _core = require("@vue-mini/core");
var _storage = require("../../storage");
var _state = require("../../state");
(0, _core.defineComponent)({
  properties: {
    lite: Boolean
  },
  setup() {
    const started = (0, _core.computed)(() => {
      var _meta$value$tries;
      return Boolean((_meta$value$tries = _storage.meta.value.tries) == null ? void 0 : _meta$value$tries.length);
    });
    const setLocale = event => {
      _storage.locale.value = event.target.dataset.lang;
    };
    const setColorblind = () => {
      _storage.colorblind.value = !_storage.colorblind.value;
    };
    const setInputMode = event => {
      _storage.inputMode.value = event.target.dataset.mode;
    };
    const setNumberTone = event => {
      if (_storage.inputMode.value !== 'py') return;
      _storage.useNumberTone.value = event.target.dataset.mode === 'number';
    };
    const setSpMode = event => {
      _storage.spMode.value = event.target.dataset.mode;
    };
    const setNoHint = () => {
      _storage.useNoHint.value = !_storage.useNoHint.value;
    };
    const setCheckAssist = () => {
      _storage.useCheckAssist.value = !_storage.useCheckAssist.value;
    };
    const setStrictMode = () => {
      if (started.value) return;
      _storage.useStrictMode.value = !_storage.useStrictMode.value;
    };
    return {
      locale: _storage.locale,
      colorblind: _storage.colorblind,
      inputMode: _storage.inputMode,
      useNumberTone: _state.useNumberTone,
      spMode: _storage.spMode,
      useNoHint: _storage.useNoHint,
      useCheckAssist: _storage.useCheckAssist,
      useStrictMode: _storage.useStrictMode,
      started,
      setLocale,
      setColorblind,
      setInputMode,
      setNumberTone,
      setSpMode,
      setNoHint,
      setCheckAssist,
      setStrictMode
    };
  }
});