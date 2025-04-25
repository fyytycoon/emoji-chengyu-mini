"use strict";

var _core = require("@vue-mini/core");
var _storage = require("../../storage");
(0, _core.defineComponent)((_, context) => {
  const onContinue = () => {
    context.triggerEvent('close');
  };
  const onAnswer = () => {
    _storage.meta.value.answer = true;
    context.triggerEvent('close');
  };
  return {
    onContinue,
    onAnswer
  };
});