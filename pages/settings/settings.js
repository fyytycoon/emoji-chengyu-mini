// pages/settings/settings.js
const app = getApp();

Page({
  data: {
    // 设置选项
    soundEnabled: true,
    vibrationEnabled: true,
    notificationEnabled: true,
    darkMode: false,
    version: '1.0.0'  // 游戏版本号
  },
  
  onLoad: function() {
    // 从本地存储或全局状态加载设置
    this.loadSettings();
    // 获取系统信息以检查当前的主题设置
    this.checkSystemTheme();
    // 设置版本号
    this.setData({
      version: app.globalData.version || '1.0.0'
    });
  },
  
  onShow: function() {
    // 页面显示时刷新设置
    this.loadSettings();
  },
  
  // 加载所有设置项
  loadSettings: function() {
    try {
      const soundEnabled = wx.getStorageSync('soundEnabled');
      const vibrationEnabled = wx.getStorageSync('vibrationEnabled');
      const notificationEnabled = wx.getStorageSync('notificationEnabled');
      const darkMode = wx.getStorageSync('darkMode');
      
      this.setData({
        soundEnabled: soundEnabled === '' ? true : soundEnabled,
        vibrationEnabled: vibrationEnabled === '' ? true : vibrationEnabled,
        notificationEnabled: notificationEnabled === '' ? true : notificationEnabled,
        darkMode: darkMode === '' ? false : darkMode
      });
      
      // 更新全局状态
      if (app.globalData) {
        app.globalData.soundEnabled = this.data.soundEnabled;
        app.globalData.vibrationEnabled = this.data.vibrationEnabled;
        app.globalData.notificationEnabled = this.data.notificationEnabled;
        app.globalData.darkMode = this.data.darkMode;
      }
    } catch (e) {
      console.error('读取设置失败', e);
    }
  },
  
  // 检查系统主题
  checkSystemTheme: function() {
    wx.getSystemInfo({
      success: (res) => {
        if (res.theme === 'dark' && this.data.darkMode === false) {
          // 如果系统是暗黑模式但应用未设置，询问用户是否跟随系统
          this.showThemeSyncDialog();
        }
      }
    });
  },
  
  // 显示主题同步询问
  showThemeSyncDialog: function() {
    wx.showModal({
      title: '主题设置',
      content: '检测到您的系统正在使用暗黑模式，是否将游戏也设置为暗黑模式？',
      confirmText: '是',
      cancelText: '否',
      success: (res) => {
        if (res.confirm) {
          this.toggleDarkMode({ detail: { value: true } });
        }
      }
    });
  },
  
  // 切换声音设置
  toggleSound: function(e) {
    const value = e.detail.value;
    this.setData({ soundEnabled: value });
    wx.setStorageSync('soundEnabled', value);
    if (app.globalData) {
      app.globalData.soundEnabled = value;
    }
    // 可选：播放一个声音提示效果已更改
    if (value) {
      this.playFeedbackSound();
    }
  },
  
  // 切换振动设置
  toggleVibration: function(e) {
    const value = e.detail.value;
    this.setData({ vibrationEnabled: value });
    wx.setStorageSync('vibrationEnabled', value);
    if (app.globalData) {
      app.globalData.vibrationEnabled = value;
    }
    // 可选：提供振动反馈
    if (value) {
      wx.vibrateShort({ type: 'light' });
    }
  },
  
  // 切换通知设置
  toggleNotification: function(e) {
    const value = e.detail.value;
    this.setData({ notificationEnabled: value });
    wx.setStorageSync('notificationEnabled', value);
    if (app.globalData) {
      app.globalData.notificationEnabled = value;
    }
    
    // 更新订阅消息权限
    if (value) {
      this.requestNotificationPermission();
    }
  },
  
  // 请求通知权限
  requestNotificationPermission: function() {
    wx.requestSubscribeMessage({
      tmplIds: ['your-template-id'], // 替换为实际的消息模板ID
      success: (res) => {
        // 处理订阅结果
        console.log('订阅消息结果', res);
      },
      fail: (err) => {
        console.error('订阅消息失败', err);
        // 如果失败则重置设置
        this.setData({ notificationEnabled: false });
        wx.setStorageSync('notificationEnabled', false);
        if (app.globalData) {
          app.globalData.notificationEnabled = false;
        }
      }
    });
  },
  
  // 切换暗黑模式
  toggleDarkMode: function(e) {
    const value = e.detail.value;
    this.setData({ darkMode: value });
    wx.setStorageSync('darkMode', value);
    if (app.globalData) {
      app.globalData.darkMode = value;
    }
    
    // 应用暗黑模式
    if (value) {
      // 设置导航栏为暗色
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#1a1a1a'
      });
    } else {
      // 设置导航栏为亮色
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ffffff'
      });
    }
  },
  
  // 播放反馈音效
  playFeedbackSound: function() {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.src = '/assets/audio/click.mp3'; // 替换为实际音效路径
    innerAudioContext.play();
  },
  
  // 跳转到关于页面
  navigateToAbout: function() {
    wx.navigateTo({
      url: '/pages/about/about'
    });
  },
  
  // 跳转到反馈页面
  navigateToFeedback: function() {
    wx.navigateTo({
      url: '/pages/feedback/feedback'
    });
  },
  
  // 返回上一页
  navigateBack: function() {
    wx.navigateBack({
      delta: 1
    });
  }
}); 