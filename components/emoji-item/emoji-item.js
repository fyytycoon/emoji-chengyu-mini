Component({
  properties: {
    emoji: {
      type: String,
      value: ''
    }
  },
  
  data: {
    emojiSize: '36px',
    containerSize: '65px',
    padding: '12px'
  },
  
  lifetimes: {
    attached() {
      // 获取设备信息以适应不同屏幕尺寸
      this.adjustSizeForScreen();
    }
  },
  
  methods: {
    adjustSizeForScreen() {
      const systemInfo = wx.getSystemInfoSync();
      const screenWidth = systemInfo.screenWidth;
      
      // 根据屏幕宽度调整尺寸
      if (screenWidth <= 320) {
        // 小屏幕设备 (iPhone SE等)
        this.setData({
          emojiSize: '32px',
          containerSize: '55px',
          padding: '8px'
        });
      } else if (screenWidth <= 375) {
        // 中等屏幕设备 (iPhone X/11 Pro等)
        this.setData({
          emojiSize: '36px',
          containerSize: '65px',
          padding: '12px'
        });
      } else {
        // 大屏幕设备
        this.setData({
          emojiSize: '40px',
          containerSize: '70px',
          padding: '14px'
        });
      }
    }
  }
}); 