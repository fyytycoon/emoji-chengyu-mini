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
      url: '/pages/pinyin-random/index',
    });
  },
  
  // 拼音猜成语 - 每日挑战
  startPinyinDaily() {
    // 直接进入每日挑战页面
    wx.navigateTo({
      url: '/pages/pygame/index',
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

// 若在开发者工具中无法预览广告，请切换开发者工具中的基础库版本
// 在页面中定义插屏广告
let interstitialAd = null

// 在页面onLoad回调事件中创建插屏广告实例
if (wx.createInterstitialAd) {
  interstitialAd = wx.createInterstitialAd({
    adUnitId: 'adunit-7f4750de2a742ce4'
  })
  interstitialAd.onLoad(() => {})
  interstitialAd.onError((err) => {
    console.error('插屏广告加载失败', err)
  })
  interstitialAd.onClose(() => {})
}

// 在适合的场景显示插屏广告
if (interstitialAd) {
  interstitialAd.show().catch((err) => {
    console.error('插屏广告显示失败', err)
  })
}