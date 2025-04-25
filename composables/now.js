"use strict";

exports.__esModule = true;
exports.useNow = useNow;
var _core = require("@vue-mini/core");
function useNow() {
  const now = (0, _core.ref)(new Date());
  setInterval(() => {
    now.value = new Date();
  }, 1000);
  return now;
}