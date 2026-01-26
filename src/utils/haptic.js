/**
 * 移动端触控反馈工具
 * 提供触控震动反馈功能，符合欧美移动端用户的交互预期
 */

/**
 * 触发触控震动反馈
 * @param {string|number} intensity - 震动强度（可选值：'light', 'medium', 'heavy' 或数字）
 */
export function triggerHapticFeedback(intensity = 'medium') {
  // 检查是否支持震动API
  if (!navigator.vibrate) {
    return;
  }

  // 检测是否为移动设备
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (!isMobile) {
    return;
  }

  // 根据强度设置震动模式
  let pattern;
  switch (intensity) {
    case 'light':
      pattern = 10; // 10ms轻微震动
      break;
    case 'medium':
      pattern = 20; // 20ms中等震动
      break;
    case 'heavy':
      pattern = 30; // 30ms强烈震动
      break;
    default:
      if (typeof intensity === 'number') {
        pattern = Math.min(Math.max(intensity, 1), 50); // 限制在1-50ms之间
      } else {
        pattern = 20; // 默认中等强度
      }
  }

  try {
    navigator.vibrate(pattern);
  } catch (error) {
    // 静默处理错误，不影响其他功能
    console.warn('Haptic feedback not supported:', error);
  }
}

/**
 * 为元素添加触控反馈事件监听
 * @param {HTMLElement} element - 目标元素
 * @param {string} intensity - 震动强度
 */
export function addHapticFeedback(element, intensity = 'medium') {
  if (!element) {
    return;
  }

  const handleTouchStart = () => {
    triggerHapticFeedback(intensity);
  };

  // 添加触摸开始事件
  element.addEventListener('touchstart', handleTouchStart, { passive: true });

  // 返回清理函数
  return () => {
    element.removeEventListener('touchstart', handleTouchStart);
  };
}

/**
 * Vue组合式函数：为组件添加触控反馈
 * @param {string} intensity - 震动强度
 */
export function useHapticFeedback(intensity = 'medium') {
  const trigger = () => {
    triggerHapticFeedback(intensity);
  };

  return {
    trigger,
    triggerHapticFeedback: trigger
  };
}
