"use strict";

var _core = require("@vue-mini/core");
(0, _core.defineComponent)({
  properties: {
    show: Boolean,
    showClose: Boolean
  },
  setup(_, context) {
    const close = () => {
      context.triggerEvent('close');
    };
    (0, _core.onReady)(() => {
      context.triggerEvent('show');
    });
    return {
      close
    };
  }
});