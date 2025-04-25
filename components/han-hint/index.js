"use strict";

var _core = require("@vue-mini/core");
var _state = require("../../state");
var _storage = require("../../storage");
(0, _core.defineComponent)({
  data: {
    // Suppress property type warning
    masked: null
  },
  setup() {
    // 定义激励视频广告实例
    let videoAd = null;

    // 在组件加载时创建激励视频广告实例
    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-3a43e9e8740bfb56'
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
          _storage.meta.value.hintLevel = 2;
        } else {
          // 播放中途退出，不下发游戏奖励
          console.log('激励视频广告播放中途退出，不执行原来的逻辑');
        }
      });
    }

    const level2 = (0, _core.computed)(() => _storage.meta.value.hintLevel === 2);
    const parsed = (0, _core.computed)(() => (0, _state.parseWord)(_state.hint.value, _state.answer.value.word)[0]);
    const masked = (0, _core.computed)(() => ({
      ...parsed.value,
      char: '?'
    }));
    
    // 修改原来的函数，添加激励广告逻辑
    const goFurther = () => {
      // 用户触发广告后，显示激励视频广告
      if (videoAd) {
        videoAd.show().catch(() => {
          // 失败重试
          videoAd.load()
            .then(() => videoAd.show())
            .catch(err => {
              console.error('激励视频广告显示失败', err);
              // 广告显示失败时，直接执行原来的逻辑
              _storage.meta.value.hintLevel = 2;
            });
        });
      } else {
        // 如果广告实例不存在，直接执行原来的逻辑
        console.log('广告实例不存在，直接执行原来的逻辑');
        _storage.meta.value.hintLevel = 2;
      }
    };
    
    return {
      dayNoHanzi: _state.dayNoHanzi,
      level2,
      parsed,
      masked,
      goFurther
    };
  }
});