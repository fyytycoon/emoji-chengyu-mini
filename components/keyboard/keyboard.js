// components/keyboard/keyboard.js
Component({
  properties: {
    keys: {
      type: Array,
      value: []
    }
  },
  
  data: {
    keyboardRows: [],
    keysPerRow: 7
  },
  
  lifetimes: {
    attached() {
      this.arrangeKeyboard();
    }
  },
  
  observers: {
    'keys': function(keys) {
      if (keys && keys.length > 0) {
        this.arrangeKeyboard();
      }
    }
  },
  
  methods: {
    // 重新排列键盘布局
    arrangeKeyboard() {
      const { keys } = this.properties;
      const { keysPerRow } = this.data;
      
      // 确保有键盘数据
      if (!keys || keys.length === 0) return;
      
      // 获取设备信息
      try {
        const systemInfo = wx.getSystemInfoSync();
        const screenWidth = systemInfo.screenWidth;
        
        // 根据屏幕宽度调整每行键数
        let keysPerRow = 7; // 默认每行7个键
        if (screenWidth <= 320) {
          keysPerRow = 5; // 小屏幕每行5个键
        } else if (screenWidth <= 375) {
          keysPerRow = 6; // 中等屏幕每行6个键
        }
        
        // 计算需要几行
        const totalKeys = keys.length;
        const rowCount = Math.ceil(totalKeys / keysPerRow);
        
        // 创建行数组
        const keyboardRows = [];
        for (let i = 0; i < rowCount; i++) {
          const startIndex = i * keysPerRow;
          const endIndex = Math.min(startIndex + keysPerRow, totalKeys);
          const rowKeys = keys.slice(startIndex, endIndex);
          keyboardRows.push(rowKeys);
        }
        
        this.setData({
          keyboardRows,
          keysPerRow
        });
      } catch (e) {
        console.error('计算键盘布局失败', e);
        // 使用默认布局
        const totalKeys = keys.length;
        const rowCount = Math.ceil(totalKeys / 7);
        
        const keyboardRows = [];
        for (let i = 0; i < rowCount; i++) {
          const startIndex = i * 7;
          const endIndex = Math.min(startIndex + 7, totalKeys);
          const rowKeys = keys.slice(startIndex, endIndex);
          keyboardRows.push(rowKeys);
        }
        
        this.setData({
          keyboardRows,
          keysPerRow: 7
        });
      }
    },
    
    onKeyPress(e) {
      const key = e.currentTarget.dataset.key;
      this.triggerEvent('keypress', { key });
    }
  }
}); 