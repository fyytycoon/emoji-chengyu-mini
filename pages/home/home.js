// pages/home/home.js
const app = getApp();

// 分享给好友的话术列表
const shareFriendTitles = [
  '快来挑战Emoji猜成语，看看你能闯到第几关！',
  '这个Emoji猜成语游戏太有趣了，一起来玩吧！',
  '脑洞大开！用Emoji猜成语，你能猜对几个？',
  '挑战你的成语储备量，Emoji猜成语等你来战！'
];

// 分享到朋友圈的话术列表
const shareTimelineTitles = [
  'Emoji猜成语太好玩了，你也来试试！ #Emoji猜成语',
  '最近沉迷这个Emoji猜成语游戏，根本停不下来！',
  '分享一个有趣的Emoji猜成语小游戏！',
  '用表情包猜成语，挑战一下你的脑洞！'
];

// 获取随机话术的辅助函数
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

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
      url: '/pages/pygame-random/index',
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
  },

  // 用户点击右上角分享给好友
  onShareAppMessage: function () {
    const randomTitle = getRandomElement(shareFriendTitles);
    return {
      title: randomTitle,
      path: '/pages/home/home' // 分享路径，通常是首页
    }
  },

  // 用户点击右上角分享到朋友圈
  onShareTimeline: function () {
    const randomTitle = getRandomElement(shareTimelineTitles);
    return {
      title: randomTitle,
      // query: '', // 可选：自定义页面路径中携带的参数，如 'a=1&b=2'
      // imageUrl: '' // 可选：自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4
    }
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