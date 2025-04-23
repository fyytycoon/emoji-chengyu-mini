// app.js
const { EmojiIdiomGame } = require('./utils/game.js');
const { LevelManager } = require('./utils/levels.js');

App({
  onLaunch() {
    // 初始化游戏
    this.globalData.game = new EmojiIdiomGame();
    this.globalData.levelManager = new LevelManager(this.globalData.game);
    
    // 记录启动日志
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  
  onShow() {
    // 从后台进入前台时，检查游戏状态
    if (this.globalData.game) {
      this.globalData.game.loadGame();
    }
  },
  
  onHide() {
    // 进入后台时，保存游戏进度
    if (this.globalData.game) {
      this.globalData.game.saveGame();
    }
  },
  
  globalData: {
    game: null,
    levelManager: null,
    userInfo: null
  }
})
