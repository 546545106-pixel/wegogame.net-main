export function getRandomElements(arr, count) {
    const result = [];
    const shuffled = arr.slice(); // 创建原数组的副本以避免修改原数组
    let i = arr.length;
    
    if (count > i) {
        throw new RangeError('Count larger than array length');
    }
    
    if (count === 0) {
        return [];
    }
    
    while (i-- > 0 && result.length < count) {
        const randomIndex = Math.floor(Math.random() * i);
        result.push(shuffled[randomIndex]);
        shuffled[randomIndex] = shuffled[i];
        shuffled[i] = result[result.length - 1];
    }
    
    return result;
}

/**
 * 获取游戏难度样式类
 * @param {Object} item - 游戏对象
 * @returns {string} - 难度样式类: 'easy', 'medium', 'hard'
 */
export function getDifficultyClass(item) {
  if (item.difficulty) {
    const diff = item.difficulty.toLowerCase();
    if (['easy', 'medium', 'hard', '简单', '中等', '困难'].includes(diff)) {
      if (diff === '简单' || diff === 'easy') return 'easy';
      if (diff === '中等' || diff === 'medium') return 'medium';
      if (diff === '困难' || diff === 'hard') return 'hard';
      return diff;
    }
  }
  // 根据star评分生成难度：1-2简单，3中等，4-5困难
  if (item.star <= 2) return 'easy';
  if (item.star === 3) return 'medium';
  return 'hard';
}

/**
 * 获取游戏难度文本
 * @param {Object} item - 游戏对象
 * @returns {string} - 难度文本: 'Easy', 'Medium', 'Hard'
 */
export function getDifficultyText(item) {
  if (item.difficulty) {
    const diff = item.difficulty.toLowerCase();
    if (diff === 'easy' || diff === '简单') return 'Easy';
    if (diff === 'medium' || diff === '中等') return 'Medium';
    if (diff === 'hard' || diff === '困难') return 'Hard';
    // 如果已经是英文，首字母大写
    return diff.charAt(0).toUpperCase() + diff.slice(1);
  }
  // 根据star评分生成
  if (item.star <= 2) return 'Easy';
  if (item.star === 3) return 'Medium';
  return 'Hard';
}

/**
 * 获取游玩次数
 * @param {Object} item - 游戏对象
 * @returns {string} - 格式化后的游玩次数
 */
export function getPlayCount(item) {
  let count = item.playCount;
  
  // 如果没有playCount字段，使用游戏ID作为种子生成固定值
  if (!count) {
    const seed = parseInt(item.id) || 0;
    count = 1000 + (seed % 99000);
  }
  
  return formatNumber(count);
}

/**
 * 格式化数字显示
 * @param {number} num - 数字
 * @returns {string} - 格式化后的字符串
 */
export function formatNumber(num) {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  }
  return num.toString();
}