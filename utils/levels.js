// utils/levels.js
class LevelManager {
  constructor(game) {
    this.game = game;
    this.currentDifficulty = '全部';
    this.difficulties = ['全部', '初级', '中级', '高级'];
    this.difficultyMapping = {
      'easy': '初级',
      'medium': '中级',
      'hard': '高级'
    };
  }
  
  // 获取当前难度的所有关卡
  getLevelsByDifficulty(difficulty) {
    if (difficulty === '全部') {
      return this.game.idioms;
    }
    
    // 反向查找映射
    const englishDifficulty = Object.keys(this.difficultyMapping).find(
      key => this.difficultyMapping[key] === difficulty
    );
    
    return this.game.idioms.filter(idiom => idiom.difficulty === englishDifficulty);
  }
  
  // 获取当前难度的关卡数量
  getLevelCountByDifficulty(difficulty) {
    return this.getLevelsByDifficulty(difficulty).length;
  }
  
  // 获取已完成的关卡数量
  getCompletedLevelCount(difficulty) {
    const currentLevel = this.game.currentLevel;
    let count = 0;
    
    this.getLevelsByDifficulty(difficulty).forEach(idiom => {
      if (idiom.id < currentLevel) {
        count++;
      }
    });
    
    return count;
  }
  
  // 切换难度
  switchDifficulty(difficulty) {
    if (this.difficulties.includes(difficulty)) {
      this.currentDifficulty = difficulty;
      return true;
    }
    return false;
  }
  
  // 获取关卡状态（已完成、当前、锁定）
  getLevelStatus(levelId) {
    if (levelId < this.game.currentLevel) {
      return 'completed';
    } else if (levelId === this.game.currentLevel) {
      return 'current';
    } else {
      return 'locked';
    }
  }
  
  // 获取关卡列表，用于在页面上显示
  getLevelsList() {
    const allLevels = this.game.idioms.sort((a, b) => a.id - b.id);
    
    // 根据当前难度过滤关卡
    let levels = allLevels;
    if (this.currentDifficulty !== '全部') {
      const englishDifficulty = Object.keys(this.difficultyMapping).find(
        key => this.difficultyMapping[key] === this.currentDifficulty
      );
      levels = allLevels.filter(level => level.difficulty === englishDifficulty);
    }
    
    // 添加状态信息
    return levels.map(level => ({
      ...level,
      status: this.getLevelStatus(level.id),
      difficultyText: this.difficultyMapping[level.difficulty] || level.difficulty
    }));
  }
  
  // 获取当前难度的进度百分比
  getDifficultyProgress() {
    const total = this.getLevelCountByDifficulty(this.currentDifficulty);
    const completed = this.getCompletedLevelCount(this.currentDifficulty);
    
    if (total === 0) return 0;
    
    return Math.floor((completed / total) * 100);
  }
  
  // 获取下一个未完成的关卡
  getNextIncompleteLevel() {
    return this.game.currentLevel;
  }
}

module.exports = {
  LevelManager
}; 