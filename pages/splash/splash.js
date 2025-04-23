// pages/splash/splash.js
Page({
  data: {
    
  },
  
  onLoad() {
    // 2秒后自动跳转到主页
    setTimeout(() => {
      wx.redirectTo({
        url: '/pages/home/home',
      });
    }, 2000);
  }
}); 