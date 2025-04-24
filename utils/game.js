// utils/game.js
const idioms = require('./idioms.js').idioms;

class EmojiIdiomGame {
  constructor() {
    this.currentLevel = 1;
    this.score = 0;
    this.coins = 100;
    this.timer = null;
    this.timeLeft = 120; // 秒
    this.idioms = idioms;
    this.loadGame();
  }
  
  // 加载游戏数据
  loadGame() {
    try {
      const savedGame = wx.getStorageSync('emojiIdiomGame');
      if (savedGame) {
        this.currentLevel = savedGame.currentLevel || 1;
        this.score = savedGame.score || 0;
        this.coins = savedGame.coins || 100;
      }
    } catch (e) {
      console.error('读取游戏数据失败', e);
    }
  }
  
  // 保存游戏进度
  saveGame() {
    const gameData = {
      currentLevel: this.currentLevel,
      score: this.score,
      coins: this.coins
    };
    
    try {
      wx.setStorageSync('emojiIdiomGame', gameData);
    } catch (e) {
      console.error('保存游戏数据失败', e);
    }
  }
  
  // 开始当前关卡 
  startLevel(levelId) {
    // 使用传入的levelId，如果没有则使用当前关卡
    const targetLevelId = levelId ? parseInt(levelId) : this.currentLevel;
    console.log('开始关卡:', targetLevelId);
    
    const currentIdiom = this.getIdiomByLevel(targetLevelId);
    
    if (!currentIdiom) {
      console.error('找不到关卡的成语:', targetLevelId);
      return false;
    }
    
    // 停止之前的计时器
    this.stopTimer();
    
    // 重置时间
    this.timeLeft = 120;
    
    return currentIdiom;
  }
  
  // 根据关卡获取成语
  getIdiomByLevel(level) {
    // 确保level是数字
    const levelId = parseInt(level);
    console.log('查找关卡ID:', levelId);
    console.log('可用成语数量:', this.idioms.length);
    
    // 查找匹配ID的成语
    const idiom = this.idioms.find(item => item.id === levelId);
    
    if (!idiom) {
      console.error('未找到ID为', levelId, '的成语');
    } else {
      console.log('找到成语:', idiom.idiom);
    }
    
    return idiom;
  }
  
  // 开始计时
  startTimer(callback) {
    this.timer = setInterval(() => {
      this.timeLeft--;
      
      if (callback && typeof callback === 'function') {
        callback(this.timeLeft);
      }
      
      if (this.timeLeft <= 0) {
        this.stopTimer();
        this.handleTimeUp();
      }
    }, 1000);
  }
  
  // 停止计时
  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
  
  // 处理时间用完的情况
  handleTimeUp() {
    // 可以在这里添加更多逻辑，小程序中通过回调处理
    return {
      status: 'timeout'
    };
  }
  
  // 检查答案
  checkAnswer(answer, levelId) {
    // 获取当前选择的关卡ID
    const targetLevelId = levelId ? parseInt(levelId) : this.currentLevel;
    
    const currentIdiom = this.getIdiomByLevel(targetLevelId);
    
    if (!currentIdiom) {
      return {
        status: 'error',
        message: '找不到关卡信息'
      };
    }
    
    if (answer === currentIdiom.idiom) {
      // 答案正确
      this.stopTimer();
      const scoreInfo = this.calculateScore();
      
      // 如果当前关卡等于游戏进度，则更新进度
      if (targetLevelId === this.currentLevel) {
        this.currentLevel++;
        this.saveGame();
      }
      
      return {
        status: 'success',
        score: scoreInfo.totalScore,
        baseScore: scoreInfo.baseScore,
        timeBonus: scoreInfo.timeBonus,
        nextLevel: this.currentLevel
      };
    }
    
    return {
      status: 'wrong',
      message: '答案不正确'
    };
  }
  
  // 计算得分
  calculateScore() {
    // 基础分数
    let baseScore = 100;
    
    // 根据剩余时间增加分数
    const timeBonus = Math.floor(this.timeLeft / 10);
    
    // 总分
    const totalScore = baseScore + timeBonus;
    
    this.score += totalScore;
    this.coins += Math.floor(totalScore / 10);
    
    return {
      baseScore,
      timeBonus,
      totalScore
    };
  }
  
  // 使用提示
  useHint() {
    // 使用提示需要消耗金币
    const hintCost = 10;
    
    if (this.coins >= hintCost) {
      this.coins -= hintCost;
      this.saveGame();
      return true;
    }
    
    return false;
  }
  
  // 获取提示
  getHint(answer, idiom) {
    // 找到一个还没有答对的字
    for (let i = 0; i < idiom.length; i++) {
      if (!answer[i] || answer[i] === '') {
        return {
          position: i,
          character: idiom[i]
        };
      }
    }
    
    return null;
  }
}

module.exports = {
  EmojiIdiomGame
}; 