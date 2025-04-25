// pages/game/game.js
const app = getApp();

Page({
  data: {
    levelTitle: '第1关',
    difficulty: '初级',
    emojis: [],
    coins: 0,
    timeLeft: 120,
    timeString: '03:00',
    answerChars: [],
    keyboardKeys: [],
    currentIdiom: null,
    levelId: 1
  },
  
  onLoad() {
    // 获取选择的关卡ID 
    const selectedLevel = wx.getStorageSync('selectedLevel') || app.globalData.game.currentLevel;
    this.setData({
      levelId: selectedLevel
    });
    this.startLevel(selectedLevel);

    
  },
  
  onShow() {
    // 页面显示时，重新开始计时器
    if (this.data.currentIdiom) {
      this.startTimer();
    }
  },
  
  onHide() {
    // 页面隐藏时，暂停计时器
    this.stopTimer();
  },
  
  onUnload() {
    // 页面卸载时，停止计时器
    this.stopTimer();
  },
  
  // 开始关卡
  startLevel(levelId) {
    const game = app.globalData.game;
    const currentIdiom = game.startLevel(levelId);
    
    if (!currentIdiom) {
      wx.showToast({
        title: '找不到关卡数据',
        icon: 'none',
        duration: 2000
      });
      
      setTimeout(() => {
        wx.navigateBack();
      }, 2000);
      
      return;
    }
    
    // 准备答案区域
    const answerChars = Array(currentIdiom.idiom.length).fill('').map(() => ({
      char: '',
      filled: false
    }));
    
    // 创建键盘按键
    const keyboardKeys = this.generateKeyboardKeys(currentIdiom.idiom);
    
    this.setData({
      currentIdiom: currentIdiom,
      levelTitle: `第 ${levelId} 关`,
      difficulty: app.globalData.levelManager.difficultyMapping[currentIdiom.difficulty] || currentIdiom.difficulty,
      emojis: currentIdiom.emojis,
      coins: game.coins,
      answerChars: answerChars,
      keyboardKeys: keyboardKeys
    });
    
    // 开始计时
    this.startTimer();
  },
  
  // 生成键盘按键
  generateKeyboardKeys(idiom) {
    // 成语中的字符
    const idiomChars = idiom.split('');
    
    // 常用汉字，这里只是示例，可以替换为更好的候选字集
    const commonChars = '的一是了我不人在他有这个上们来到时大地为子中你说生国年着就那和要她出也得里后自以会家可下而过天去能对小多然于心学么之都好看起发当没成只如事把还用第样道想作种开美总从无情己面最女但现前些所同日手又行意动方期它头经长儿回位分爱老因很给名法间斯知世什两次使身者被高己百';
    
    // 获取设备信息
    try {
      const systemInfo = wx.getSystemInfoSync();
      const screenWidth = systemInfo.screenWidth;
      
      // 根据屏幕宽度确定键盘大小
      let keyboardSize = 20; // 默认值
      if (screenWidth <= 320) {
        keyboardSize = 15; // 小屏幕
      } else if (screenWidth <= 375) {
        keyboardSize = 18; // 中等屏幕
      }
      
      // 随机选择一些常用字，加上成语中的字，然后打乱顺序
      let allChars = [...idiomChars];
      while (allChars.length < keyboardSize) {
        const randomChar = commonChars.charAt(Math.floor(Math.random() * commonChars.length));
        if (!allChars.includes(randomChar)) {
          allChars.push(randomChar);
        }
      }
      
      // 打乱字符顺序
      allChars = this.shuffleArray(allChars);
      
      // 添加退格键
      allChars.push('backspace');
      
      return allChars;
    } catch (e) {
      console.error('生成键盘失败', e);
      
      // 如果出错，使用默认值
      let allChars = [...idiomChars];
      while (allChars.length < 20) {
        const randomChar = commonChars.charAt(Math.floor(Math.random() * commonChars.length));
        if (!allChars.includes(randomChar)) {
          allChars.push(randomChar);
        }
      }
      
      // 打乱字符顺序
      allChars = this.shuffleArray(allChars);
      
      // 添加退格键
      allChars.push('backspace');
      
      return allChars;
    }
  },
  
  // 打乱数组
  shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  },
  
  // 开始计时
  startTimer() {
    // 停止现有计时器
    this.stopTimer();
    
    this.timer = setInterval(() => {
      const newTime = this.data.timeLeft - 1;
      const minutes = Math.floor(newTime / 60);
      const seconds = newTime % 60;
      const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
      this.setData({
        timeLeft: newTime,
        timeString: timeString
      });
      
      if (newTime <= 0) {
        this.stopTimer();
        this.handleTimeUp();
      }
    }, 1000);
  },
  
  // 停止计时
  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  
  // 处理时间用完
  handleTimeUp() {
    wx.showModal({
      title: '时间到',
      content: '很遗憾，挑战失败！',
      showCancel: false,
      success: () => {
        wx.navigateBack();
      }
    });
  },
  
  // 键盘按键点击事件
  onKeyPress(e) {
    const key = e.detail.key;
    const answerChars = [...this.data.answerChars];
    
    if (key === 'backspace') {
      // 删除最后一个字符
      for (let i = answerChars.length - 1; i >= 0; i--) {
        if (answerChars[i].char) {
          answerChars[i] = {
            char: '',
            filled: false
          };
          break;
        }
      }
    } else {
      // 添加字符
      for (let i = 0; i < answerChars.length; i++) {
        if (!answerChars[i].char) {
          answerChars[i] = {
            char: key,
            filled: true
          };
          break;
        }
      }
    }
    
    this.setData({
      answerChars: answerChars
    });
  },
  
  // 提交答案
  checkAnswer() {
    // 拼接答案字符串
    let answer = '';
    const answerChars = this.data.answerChars;
    
    for (let i = 0; i < answerChars.length; i++) {
      answer += answerChars[i].char;
    }
    
    // 检查是否填写完整
    if (answer.length < this.data.currentIdiom.idiom.length) {
      wx.showToast({
        title: '请填完所有汉字',
        icon: 'none',
        duration: 1500
      });
      return;
    }
    
    // 检查答案
    const result = app.globalData.game.checkAnswer(answer, this.data.levelId);
    
    if (result.status === 'success') {
      // 答案正确，保存游戏结果
      const gameResult = {
        idiom: this.data.currentIdiom.idiom,
        levelId: this.data.levelId,
        time: 120 - this.data.timeLeft,
        score: result.score,
        baseScore: result.baseScore,
        timeBonus: result.timeBonus,
        nextLevel: result.nextLevel,
        hint: this.data.currentIdiom.hint
      };
      
      wx.setStorageSync('gameResult', gameResult);
      
      // 跳转到结果页面
      wx.redirectTo({
        url: '/pages/result/result',
      });
    } else {
      // 答案错误
      wx.showToast({
        title: '答案不正确',
        icon: 'none',
        duration: 1500
      });
    }
  },
  
  // 使用提示
  useHint() {
    if (app.globalData.game.useHint()) {
      // 查找一个未填写的字符
      const answerChars = [...this.data.answerChars];
      let answer = answerChars.map(item => item.char);
      const idiom = this.data.currentIdiom.idiom;
      
      const hint = app.globalData.game.getHint(answer, idiom);
      
      if (hint) {
        answerChars[hint.position] = {
          char: hint.character,
          filled: true
        };
        
        // 更新界面
        this.setData({
          answerChars: answerChars,
          coins: app.globalData.game.coins
        });
      }
    } else {
      wx.showToast({
        title: '金币不足',
        icon: 'none',
        duration: 1500
      });
    }
  },
  
  // 返回关卡选择页面
  navigateToLevels() {
    // 进入关卡选择页面
    wx.redirectTo({
      url: '/pages/levels/levels',
    });
  }
}); 