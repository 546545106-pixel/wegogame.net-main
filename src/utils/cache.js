/**
 * 缓存工具
 */

// 内存缓存
const memoryCache = new Map()

/**
 * 内存缓存
 * @param {string} key - 缓存键
 * @param {any} value - 缓存值
 * @param {number} ttl - 过期时间（毫秒）
 */
export function setCache(key, value, ttl = 3600000) { // 默认1小时
  const expireTime = Date.now() + ttl
  memoryCache.set(key, {
    value,
    expireTime
  })
}

/**
 * 获取缓存
 * @param {string} key - 缓存键
 * @returns {any|null} 缓存值或null
 */
export function getCache(key) {
  const item = memoryCache.get(key)
  if (!item) return null
  
  if (Date.now() > item.expireTime) {
    memoryCache.delete(key)
    return null
  }
  
  return item.value
}

/**
 * 清除缓存
 * @param {string} key - 缓存键（可选，不传则清除所有）
 */
export function clearCache(key) {
  if (key) {
    memoryCache.delete(key)
  } else {
    memoryCache.clear()
  }
}

/**
 * LocalStorage缓存
 */
export const localStorageCache = {
  set(key, value, ttl = 3600000) {
    const item = {
      value,
      expireTime: Date.now() + ttl
    }
    try {
      localStorage.setItem(key, JSON.stringify(item))
    } catch (e) {
      console.warn('LocalStorage set failed:', e)
    }
  },
  
  get(key) {
    try {
      const itemStr = localStorage.getItem(key)
      if (!itemStr) return null
      
      const item = JSON.parse(itemStr)
      if (Date.now() > item.expireTime) {
        localStorage.removeItem(key)
        return null
      }
      
      return item.value
    } catch (e) {
      console.warn('LocalStorage get failed:', e)
      return null
    }
  },
  
  remove(key) {
    try {
      localStorage.removeItem(key)
    } catch (e) {
      console.warn('LocalStorage remove failed:', e)
    }
  },
  
  clear() {
    try {
      localStorage.clear()
    } catch (e) {
      console.warn('LocalStorage clear failed:', e)
    }
  }
}
