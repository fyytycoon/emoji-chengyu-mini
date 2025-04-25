"use strict";

var _core = require("@vue-mini/core");
var _tools = require("@hankit/tools");
var _state = require("../../state");
var _storage = require("../../storage");
var _index = require("../../logic/index");
(0, _core.defineComponent)(() => {
  // 定义激励视频广告实例
  let videoAd = null;

  // 在组件加载时创建激励视频广告实例
  if (wx.createRewardedVideoAd) {
    videoAd = wx.createRewardedVideoAd({
      adUnitId: 'adunit-50b424c1dea5ddf6'
    });
    videoAd.onLoad(() => {
      console.log('激励视频广告加载成功');
    });
    videoAd.onError((err) => {
      console.error('激励视频广告加载失败', err);
    });
    videoAd.onClose((res) => {
      // 用户点击了【关闭广告】按钮
      // res.isEnded 可以判断是否播放完成
      if (res && res.isEnded) {
        // 正常播放结束，可以下发游戏奖励
        console.log('激励视频广告播放完成，执行原来的逻辑');
        // 执行原来的提示逻辑
        var _meta$value;
        _storage.meta.value.hint = true;
        (_meta$value = _storage.meta.value).hintLevel || (_meta$value.hintLevel = 1);
        _state.showHint.value = true;
      } else {
        // 播放中途退出，不下发游戏奖励
        console.log('激励视频广告播放中途退出，不执行原来的逻辑');
      }
    });
  }
  const input = (0, _core.ref)('');
  const invalidIdiom = (0, _core.ref)(false);
  const disabled = (0, _core.computed)(() => input.value.length < _index.WORD_LENGTH);
  const rest = (0, _core.computed)(() => _index.TRIES_LIMIT - _storage.tries.value.length);
  const hintText = (0, _core.computed)(() => _storage.meta.value.hint ? _storage.meta.value.hintLevel === 1 ? '字音提示' : '汉字提示' : '无提示');
  const strict = (0, _core.computed)(() => Boolean(_storage.meta.value.strict));
  const duration = (0, _core.computed)(() => {
    var _meta$value$duration;
    return (0, _storage.formatDuration)((_meta$value$duration = _storage.meta.value.duration) != null ? _meta$value$duration : 0);
  });
  const countDown = (0, _core.computed)(() => {
    const ms = 86400000 - (((0, _index.isDstObserved)(_state.now.value) ? Number(_state.now.value) + 3600000 : Number(_state.now.value)) - Number(_index.START_DATE)) % 86400000;
    const h = String(Math.floor(ms % 86400000 / 3600000)).padStart(2, '0');
    const m = String(Math.floor(ms % 3600000 / 60000)).padStart(2, '0');
    const s = String(Math.floor(ms % 60000 / 1000)).padStart(2, '0');
    return `${h} 时 ${m} 分 ${s} 秒`;
  });
  const showAnswer = (0, _core.computed)(() => Boolean(_storage.meta.value.answer));
  const onInput = event => {
    input.value = (0, _tools.filterNonChineseChars)(event.detail.value).slice(0, 4);
    (0, _storage.markStart)();
  };
  const onConfirm = () => {
    if (disabled.value) return;
    if (!(0, _index.checkValidIdiom)(input.value, _storage.useStrictMode.value)) {
      invalidIdiom.value = true;
      setTimeout(() => {
        invalidIdiom.value = false;
      }, 1000);
      return;
    }
    if (_storage.meta.value.strict === undefined) {
      _storage.meta.value.strict = _storage.useStrictMode.value;
    }
    _storage.tries.value.push(input.value);
    input.value = '';
  };
  const openAnswer = () => {
    _state.showFailed.value = true;
  };
  const openHint = () => {
    // 用户触发广告后，显示激励视频广告
    if (videoAd) {
      videoAd.show().catch(() => {
        // 失败重试
        videoAd.load()
          .then(() => videoAd.show())
          .catch(err => {
            console.error('激励视频广告显示失败', err);
            // 广告显示失败时，直接执行原来的逻辑
            var _meta$value;
            _storage.meta.value.hint = true;
            (_meta$value = _storage.meta.value).hintLevel || (_meta$value.hintLevel = 1);
            _state.showHint.value = true;
          });
      });
    } else {
      // 如果广告实例不存在，直接执行原来的逻辑
      console.log('广告实例不存在，直接执行原来的逻辑');
      var _meta$value;
      _storage.meta.value.hint = true;
      (_meta$value = _storage.meta.value).hintLevel || (_meta$value.hintLevel = 1);
      _state.showHint.value = true;
    }
    // _state.showHint.value = true;
  };
  const openSheet = () => {
    _state.showCheatSheet.value = true;
  };
  const toggleMask = () => {
    _state.useMask.value = !_state.useMask.value;
  };

  // 重置游戏函数，清空已经填入的成语，重新开始游戏
  const resetGame = () => {
    // 清空已输入的成语
    _storage.tries.value = [];
    // 重置提示状态
    _storage.meta.value.hint = false;
    _storage.meta.value.hintLevel = 0;
    // 重置失败状态
    // _storage.meta.value.failed = false;
    // 重置通过状态（影响 isFinished）
    // _storage.meta.value.passed = false;
    // 重置答案显示状态
    _storage.meta.value.answer = false;
    // 清空输入框
    input.value = '';
    // 重置游戏时间
    _storage.meta.value.start = null;
    _storage.meta.value.end = null;
    _storage.meta.value.duration = null;
    // 重置界面状态
    _state.showFailed.value = false;
    _state.showHint.value = false;
  };
  (0, _core.watchEffect)(() => {
    if (_state.isFailed.value && !_storage.meta.value.failed) {
      _storage.meta.value.failed = true;
      setTimeout(() => {
        _state.showFailed.value = true;
      }, 1500);
    }
  });
  return {
    answer: _state.answer,
    isFinished: _state.isFinished,
    isFailed: _state.isFailed,
    tries: _storage.tries,
    useNoHint: _storage.useNoHint,
    input,
    invalidIdiom,
    disabled,
    rest,
    hintText,
    strict,
    duration,
    countDown,
    showAnswer,
    useMask: _state.useMask,
    onInput,
    onConfirm,
    openAnswer,
    openHint,
    openSheet,
    toggleMask,
    resetGame
  };
});