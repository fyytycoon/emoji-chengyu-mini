"use strict";

var _core = require("@vue-mini/core");
var _state = require("../../state");
var _storage = require("../../storage");
(0, _core.defineComponent)(() => {
  const show = (0, _core.ref)(false);
  const onShow = () => {
    show.value = true;
  };
  const onClose = close => {
    show.value = false;
    setTimeout(() => {
      close();
    }, 200);
  };
  const closeHelp = () => {
    onClose(() => {
      _state.showHelp.value = false;
    });
  };
  const closeDashboard = () => {
    onClose(() => {
      _state.showDashboard.value = false;
    });
  };
  const closeSettings = () => {
    onClose(() => {
      _state.showSettings.value = false;
    });
  };
  const closeHint = () => {
    onClose(() => {
      _state.showHint.value = false;
    });
  };
  const closeCheatSheet = () => {
    onClose(() => {
      _state.showCheatSheet.value = false;
    });
  };
  const closeFailed = () => {
    onClose(() => {
      _state.showFailed.value = false;
    });
  };
  return {
    showHelp: _state.showHelp,
    showDashboard: _state.showDashboard,
    showSettings: _state.showSettings,
    showHint: _state.showHint,
    showCheatSheet: _state.showCheatSheet,
    showFailed: _state.showFailed,
    initialized: _storage.initialized,
    show,
    onShow,
    closeHint,
    closeDashboard,
    closeSettings,
    closeCheatSheet,
    closeHelp,
    closeFailed
  };
});