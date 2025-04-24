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
  
  // Emoji猜成语 - 经典模式
  startEmojiClassic() {
    
    // 进入关卡选择页面
    wx.navigateTo({
      url: '/pages/levels/levels',
    });
  },
  
  // Emoji猜成语 - 每日挑战
  startEmojiDaily() {
    
    // 直接进入每日挑战页面
    wx.navigateTo({
      url: '/pages/game/game?mode=daily&type=emoji',
    });
  },
  
  // 拼音猜成语 - 随机模式
  startPinyinRandom() {
    
    // 进入随机游戏页面
    wx.navigateTo({
      url: '/pages/game/game?mode=random&type=pinyin',
    });
  },
  
  // 拼音猜成语 - 每日挑战
  startPinyinDaily() {
    
    // 直接进入每日挑战页面
    wx.navigateTo({
      url: '/pages/game/game?mode=daily&type=pinyin',
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