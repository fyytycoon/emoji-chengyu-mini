"use strict";

var _core = require("@vue-mini/core");
var _state = require("../../state");
var _storage = require("../../storage");
(0, _core.defineComponent)(() => {
  const openHelp = () => {
    _state.showHelp.value = true;
    _state.useMask.value = false;
  };
  const openDashboard = () => {
    _state.showDashboard.value = true;
  };
  const openSettings = () => {
    _state.showSettings.value = true;
  };
  return {
    gamesCount: _storage.gamesCount,
    openHelp,
    openDashboard,
    openSettings
  };
});