const app = getApp();

Page({
  data: {
    userInfo: {
      avatarUrl: '/assets/images/default-avatar.png',
      nickName: '游客'
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    stats: {
      completedLevels: 0,
      totalScore: 0,
      totalCoins: 0
    }
  },
  
  onLoad() {
    // 尝试获取用户信息
    const userInfo = app.globalData.userInfo;
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      });
    }
    
    // 获取游戏统计信息
    this.updateStats();
  },
  
  onShow() {
    // 刷新游戏统计信息
    this.updateStats();
  },
  
  // 更新游戏统计信息
  updateStats() {
    const game = app.globalData.game;
    
    if (game) {
      this.setData({
        'stats.completedLevels': game.currentLevel - 1,
        'stats.totalScore': game.score,
        'stats.totalCoins': game.coins
      });
    }
  },
  
  // 获取用户信息
  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        app.globalData.userInfo = res.userInfo;
        
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      }
    });
  },
  
  // 重置游戏进度
  resetProgress() {
    wx.showModal({
      title: '确认重置',
      content: '这将清除所有游戏进度，确定继续吗？',
      success: (res) => {
        if (res.confirm) {
          // 重置游戏数据
          app.globalData.game.currentLevel = 1;
          app.globalData.game.score = 0;
          app.globalData.game.coins = 100;
          app.globalData.game.saveGame();
          
          // 更新统计信息
          this.updateStats();
          
          wx.showToast({
            title: '进度已重置',
            icon: 'success',
            duration: 2000
          });
        }
      }
    });
  },
  
  // 返回主页
  navigateToHome() {
    wx.navigateBack();
  }
}); 