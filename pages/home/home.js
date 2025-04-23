// pages/home/home.js
const app = getApp();

Page({
  data: {
    game: null,
    currentLevel: 1,
    score: 0,
    coins: 0
  },
  
  onLoad() {
    // 获取游戏数据
    const game = app.globalData.game;
    
    this.setData({
      game: game,
      currentLevel: game.currentLevel,
      score: game.score,
      coins: game.coins
    });
  },
  
  onShow() {
    // 页面显示时刷新数据
    if (this.data.game) {
      this.setData({
        currentLevel: app.globalData.game.currentLevel,
        score: app.globalData.game.score,
        coins: app.globalData.game.coins
      });
    }
  },
  
  // 开始游戏 - 进入关卡选择页面
  startGame() {
    wx.navigateTo({
      url: '/pages/levels/levels',
    });
  },
  
  // 继续游戏 - 直接进入当前关卡
  continueGame() {
    // 将当前关卡ID存储到本地
    wx.setStorageSync('selectedLevel', this.data.currentLevel);
    
    wx.navigateTo({
      url: '/pages/game/game',
    });
  },
  
  // 进入个人资料页面
  goToProfile() {
    wx.navigateTo({
      url: '/pages/profile/profile',
    });
  },
  
  // 进入设置页面
  goToSettings() {
    wx.navigateTo({
      url: '/pages/settings/settings',
    });
  }
}); 