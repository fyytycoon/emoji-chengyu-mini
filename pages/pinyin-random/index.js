const app = getApp();

Page({
  data: {
    idiom: null,      // 当前成语
    pinyinHint: [],   // 拼音提示
    answerChars: [],  // 答案字符
    keyboardKeys: [], // 键盘按键
    timeLeft: 60,     // 默认60秒
    timeString: '01:00',
    coins: 0,
    score: 0,
    isCorrect: false,
    showResult: false
  },
  
  onLoad() {
    // 加载随机成语
    this.loadRandomIdiom();
    
    // 获取用户金币数
    const game = app.globalData.game;
    if (game) {
      this.setData({
        coins: game.coins,
        score: game.score
      });
    }
    
    // 开始计时
    this.startTimer();
  },
  
  onShow() {
    // 页面显示时，重新开始计时器
    if (this.data.idiom && !this.data.showResult) {
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
  
  // 加载随机成语
  loadRandomIdiom() {
    try {
      // 从utils/idioms.js获取成语数据
      const idioms = require('../../utils/idioms.js').idioms;
      if (!idioms || idioms.length === 0) {
        wx.showToast({
          title: '找不到成语数据',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      
      // 随机选择一个成语
      const randomIndex = Math.floor(Math.random() * idioms.length);
      const randomIdiom = idioms[randomIndex];
      
      if (!randomIdiom) {
        wx.showToast({
          title: '找不到成语数据',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      
      // 生成拼音提示
      const pinyinHint = this.generatePinyinHint(randomIdiom.idiom);
      
      // 准备答案区域
      const answerChars = Array(randomIdiom.idiom.length).fill('').map(() => ({
        char: '',
        filled: false
      }));
      
      // 创建键盘按键
      const keyboardKeys = this.generateKeyboardKeys(randomIdiom.idiom);
      
      this.setData({
        idiom: randomIdiom,
        pinyinHint: pinyinHint,
        answerChars: answerChars,
        keyboardKeys: keyboardKeys,
        isCorrect: false,
        showResult: false
      });
    } catch (error) {
      console.error('加载随机成语失败', error);
      wx.showToast({
        title: '加载成语失败',
        icon: 'none',
        duration: 2000
      });
    }
  },
  
  // 生成拼音提示（简单模拟，实际中需要调用专门的汉字转拼音库）
  generatePinyinHint(idiom) {
    // 这里简单示例，实际应使用专门的拼音转换库
    // 模拟一些常见汉字拼音，供示例使用
    const pinyinMap = {
      '一': 'yī', '二': 'èr', '三': 'sān', '四': 'sì', '五': 'wǔ', 
      '六': 'liù', '七': 'qī', '八': 'bā', '九': 'jiǔ', '十': 'shí',
      '人': 'rén', '口': 'kǒu', '目': 'mù', '日': 'rì', '月': 'yuè',
      '山': 'shān', '水': 'shuǐ', '木': 'mù', '火': 'huǒ', '土': 'tǔ',
      '风': 'fēng', '云': 'yún', '天': 'tiān', '地': 'dì', '动': 'dòng',
      '心': 'xīn', '手': 'shǒu', '足': 'zú', '眼': 'yǎn', '耳': 'ěr',
      '口': 'kǒu', '鼻': 'bí', '头': 'tóu', '发': 'fà', '毛': 'máo',
      '衣': 'yī', '食': 'shí', '住': 'zhù', '行': 'xíng', '生': 'shēng',
      '死': 'sǐ', '好': 'hǎo', '坏': 'huài', '大': 'dà', '小': 'xiǎo',
      '多': 'duō', '少': 'shǎo', '长': 'cháng', '短': 'duǎn', '高': 'gāo',
      '低': 'dī', '前': 'qián', '后': 'hòu', '左': 'zuǒ', '右': 'yòu',
      '上': 'shàng', '下': 'xià', '中': 'zhōng', '外': 'wài', '内': 'nèi',
      '春': 'chūn', '夏': 'xià', '秋': 'qiū', '冬': 'dōng', '江': 'jiāng',
      '河': 'hé', '湖': 'hú', '海': 'hǎi', '山': 'shān', '石': 'shí',
      '花': 'huā', '草': 'cǎo', '树': 'shù', '木': 'mù', '林': 'lín',
      '鸟': 'niǎo', '鱼': 'yú', '虫': 'chóng', '鸡': 'jī', '狗': 'gǒu'
    };
    
    // 为每个字生成拼音
    return idiom.split('').map(char => {
      return pinyinMap[char] || '?';
    });
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
    if (this.data.showResult) return;
    
    this.setData({
      showResult: true,
      isCorrect: false
    });
    
    wx.showModal({
      title: '时间到',
      content: '很遗憾，挑战失败！正确答案是：' + this.data.idiom.idiom,
      showCancel: false,
      confirmText: '再来一次',
      success: (res) => {
        if (res.confirm) {
          this.resetGame();
        }
      }
    });
  },
  
  // 键盘按键点击事件
  onKeyPress(e) {
    const keyIndex = e.currentTarget.dataset.index;
    const key = this.data.keyboardKeys[keyIndex];
    const answerChars = [...this.data.answerChars];
    
    if (key === 'backspace') {
      // 删除最后一个字符
      for (let i = answerChars.length - 1; i >= 0; i--) {
        if (answerChars[i].filled) {
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
        if (!answerChars[i].filled) {
          answerChars[i] = {
            char: key,
            filled: true
          };
          break;
        }
      }
      
      // 检查是否填满，如果填满自动检查答案
      const isFull = answerChars.every(item => item.filled);
      if (isFull) {
        this.setData({ answerChars }, () => {
          setTimeout(() => {
            this.checkAnswer();
          }, 300);
          return;
        });
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
    if (answer.length < this.data.idiom.idiom.length) {
      wx.showToast({
        title: '请填完所有汉字',
        icon: 'none',
        duration: 1500
      });
      return;
    }
    
    // 停止计时
    this.stopTimer();
    
    // 检查答案是否正确
    const isCorrect = answer === this.data.idiom.idiom;
    
    // 更新游戏状态
    this.setData({
      showResult: true,
      isCorrect: isCorrect
    });
    
    if (isCorrect) {
      // 计算奖励
      const timeBonus = Math.floor(this.data.timeLeft / 5);
      const reward = this.data.idiom.reward + timeBonus;
      const points = this.data.idiom.points;
      
      // 更新游戏数据
      const game = app.globalData.game;
      if (game) {
        game.addCoins(reward);
        game.addScore(points);
        game.saveGame();
        
        this.setData({
          coins: game.coins,
          score: game.score
        });
      }
      
      // 显示成功提示
      wx.showModal({
        title: '挑战成功',
        content: `恭喜你答对了！\n获得积分：+${points}\n获得金币：+${reward}`,
        confirmText: '再来一次',
        cancelText: '返回主页',
        success: (res) => {
          if (res.confirm) {
            this.resetGame();
          } else {
            wx.navigateBack();
          }
        }
      });
    } else {
      // 显示失败提示
      wx.showModal({
        title: '挑战失败',
        content: `正确答案是：${this.data.idiom.idiom}`,
        confirmText: '再来一次',
        cancelText: '返回主页',
        success: (res) => {
          if (res.confirm) {
            this.resetGame();
          } else {
            wx.navigateBack();
          }
        }
      });
    }
  },
  
  // 重置游戏
  resetGame() {
    this.setData({
      timeLeft: 60,
      timeString: '01:00',
      showResult: false,
      isCorrect: false
    }, () => {
      this.loadRandomIdiom();
      this.startTimer();
    });
  },
  
  // 使用提示
  useHint() {
    // 检查是否有足够的金币
    const hintCost = 20; // 提示的金币消耗
    
    if (this.data.coins < hintCost) {
      wx.showToast({
        title: '金币不足',
        icon: 'none',
        duration: 1500
      });
      return;
    }
    
    // 扣除金币
    const game = app.globalData.game;
    if (game) {
      game.useCoins(hintCost);
      game.saveGame();
      
      this.setData({
        coins: game.coins
      });
    }
    
    // 随机填充一个空位
    const answerChars = [...this.data.answerChars];
    const idiomChars = this.data.idiom.idiom.split('');
    
    // 找到所有空位
    const emptyIndices = [];
    for (let i = 0; i < answerChars.length; i++) {
      if (!answerChars[i].filled) {
        emptyIndices.push(i);
      }
    }
    
    if (emptyIndices.length > 0) {
      // 随机选择一个空位
      const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      
      // 填充正确的字符
      answerChars[randomIndex] = {
        char: idiomChars[randomIndex],
        filled: true
      };
      
      this.setData({
        answerChars: answerChars
      });
      
      // 检查是否填满，如果填满自动检查答案
      const isFull = answerChars.every(item => item.filled);
      if (isFull) {
        setTimeout(() => {
          this.checkAnswer();
        }, 300);
      }
    } else {
      // 已经填满，退还金币
      if (game) {
        game.addCoins(hintCost);
        game.saveGame();
        
        this.setData({
          coins: game.coins
        });
      }
      
      wx.showToast({
        title: '已填满所有空格',
        icon: 'none',
        duration: 1500
      });
    }
  },
  
  // 返回主页
  navigateToHome() {
    wx.navigateBack();
  }
}); 