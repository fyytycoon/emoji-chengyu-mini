const app = getApp();

Page({
  data: {
    levels: [],
    difficulties: ['全部', '初级', '中级', '高级'],
    currentDifficulty: '全部',
    progressText: '0/0',
    progressPercent: 0
  },
  
  onLoad() {
    this.levelManager = app.globalData.levelManager;
    
    // 设置默认难度
    this.switchDifficulty('全部');
  },
  
  // 切换难度
  switchDifficulty(difficulty) {
    if (!this.levelManager) return;
    
    this.levelManager.switchDifficulty(difficulty);
    
    // 获取当前难度下的关卡
    const levels = this.levelManager.getLevelsList();
    const total = this.levelManager.getLevelCountByDifficulty(difficulty);
    const completed = this.levelManager.getCompletedLevelCount(difficulty);
    const progressPercent = this.levelManager.getDifficultyProgress();
    
    this.setData({
      levels: levels,
      currentDifficulty: difficulty,
      progressText: `${completed}/${total}`,
      progressPercent: progressPercent
    });
  },
  
  // 点击难度标签
  onTabClick(e) {
    const difficulty = e.currentTarget.dataset.difficulty;
    this.switchDifficulty(difficulty);
  },
  
  // 选择关卡
  selectLevel(e) {
    const levelId = e.currentTarget.dataset.level;
    const status = this.levelManager.getLevelStatus(levelId);
    
    // 只允许选择已解锁的关卡
    if (status === 'locked') {
      wx.showToast({
        title: '关卡未解锁',
        icon: 'none',
        duration: 1500
      });
      return;
    }
    
    // 将选择的关卡ID存储到本地
    wx.setStorageSync('selectedLevel', levelId);
    
    // 跳转到游戏页面
    wx.navigateTo({
      url: '/pages/game/game',
    });
  },
  
  // 返回主页
  navigateToHome() {
    wx.navigateBack();
  }
}); 