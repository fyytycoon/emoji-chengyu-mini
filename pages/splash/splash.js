// pages/splash/splash.js
Page({
  data: {
    version: 'v1.0.0',
    loadingProgress: 0
  },
  onLoad: function (options) {
    this.startLoadingAnimation();
    
    // 2秒后跳转到主页
    setTimeout(() => {
      wx.reLaunch({
        url: '/pages/home/home',
      })
    }, 2000)
  },
  
  startLoadingAnimation: function() {
    let progress = 0;
    const timer = setInterval(() => {
      progress += 2;
      if (progress > 100) {
        clearInterval(timer);
        return;
      }
      this.setData({
        loadingProgress: progress
      });
    }, 40);
  }
}) 