// pages/result/result.js
const app = getApp();

Page({
  data: {
    idiom: '',
    levelId: 1,
    time: 0,
    timeString: '00:00',
    score: 0,
    baseScore: 0,
    timeBonus: 0,
    nextLevel: 1,
    hint: '',
    coins: 0
  },
  
  onLoad() {
    // 获取游戏结果
    const gameResult = wx.getStorageSync('gameResult');
    
    if (!gameResult) {
      wx.showToast({
        title: '未找到游戏结果',
        icon: 'none',
        duration: 2000
      });
      
      setTimeout(() => {
        wx.navigateBack();
      }, 2000);
      
      return;
    }
    
    // 格式化时间
    const minutes = Math.floor(gameResult.time / 60);
    const seconds = gameResult.time % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    this.setData({
      idiom: gameResult.idiom,
      levelId: gameResult.levelId,
      time: gameResult.time,
      timeString: timeString,
      score: gameResult.score,
      baseScore: gameResult.baseScore,
      timeBonus: gameResult.timeBonus,
      nextLevel: gameResult.nextLevel,
      hint: gameResult.hint,
      coins: app.globalData.game.coins
    });
  },
  
  // 继续下一关
  continueGame() {
    // 将下一关的关卡ID存储到本地
    wx.setStorageSync('selectedLevel', this.data.nextLevel);
    
    // 跳转到游戏页面
    wx.redirectTo({
      url: '/pages/game/game',
    });
  },
  
  // 返回关卡选择页面
  backToLevels() {
    wx.navigateBack({
      delta: 2
    });
  },
  
  // 分享结果
  shareResult() {
    // 小程序中的分享通常通过 Page.onShareAppMessage() 实现
    // 这里仅作为按钮点击事件
    wx.showToast({
      title: '分享功能待实现',
      icon: 'none',
      duration: 1500
    });
  },
  
  // 用于小程序的分享功能
  onShareAppMessage() {
    return {
      title: `我在Emoji猜成语中猜出了"${this.data.idiom}"，太棒了！`,
      path: '/pages/index/index',
      imageUrl: ''  // 可以添加分享图片
    };
  }
}); 