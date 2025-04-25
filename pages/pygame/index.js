"use strict";

var _core = require("@vue-mini/core");
(0, _core.defineComponent)(() => {
  (0, _core.onShareAppMessage)(() => ({
    title: '每日成语挑战'
  }));
  (0, _core.onShareTimeline)(() => ({
    title: '每日成语挑战'
  }));
}, {
  canShareToOthers: true,
  canShareToTimeline: true
});

