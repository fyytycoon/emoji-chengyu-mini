"use strict";

exports.__esModule = true;
exports.useStorage = useStorage;
var _core = require("@vue-mini/core");
function useStorage(key, value) {
  try {
    const {
      keys
    } = wx.getStorageInfoSync();
    if (keys.includes(key)) {
      value = wx.getStorageSync(key);
    } else {
      wx.setStorageSync(key, value);
    }
  } catch (_unused) {}
  const data = (0, _core.ref)(value);
  (0, _core.watch)(data, () => {
    try {
      wx.setStorageSync(key, data.value);
    } catch (_unused2) {}
  }, {
    deep: true
  });
  return data;
}