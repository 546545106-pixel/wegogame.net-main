/**
 * 性能监控工具
 */

// 性能指标收集
export class PerformanceMonitor {
  constructor() {
    this.metrics = {}
    this.init()
  }

  init() {
    // 监听性能指标
    if ('PerformanceObserver' in window) {
      // 监控长任务
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              console.warn('Long Task detected:', entry.duration, 'ms')
              this.reportMetric('long_task', entry.duration)
            }
          }
        })
        longTaskObserver.observe({ entryTypes: ['longtask'] })
      } catch (e) {
        // 浏览器不支持longtask
      }

      // 监控布局偏移
      try {
        const layoutShiftObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              this.reportMetric('layout_shift', entry.value)
            }
          }
        })
        layoutShiftObserver.observe({ entryTypes: ['layout-shift'] })
      } catch (e) {
        // 浏览器不支持layout-shift
      }
    }

    // 页面加载完成后收集指标
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.collectWebVitals()
      }, 1000)
    })
  }

  collectWebVitals() {
    // 收集Web Vitals指标
    const navigation = performance.getEntriesByType('navigation')[0]
    if (navigation) {
      // DNS查询时间
      this.metrics.dns = navigation.domainLookupEnd - navigation.domainLookupStart
      
      // TCP连接时间
      this.metrics.tcp = navigation.connectEnd - navigation.connectStart
      
      // 请求响应时间
      this.metrics.request = navigation.responseStart - navigation.requestStart
      
      // DOM解析时间
      this.metrics.domParse = navigation.domInteractive - navigation.responseEnd
      
      // 资源加载时间
      this.metrics.resourceLoad = navigation.loadEventStart - navigation.domContentLoadedEventEnd
      
      // 总加载时间
      this.metrics.totalLoad = navigation.loadEventEnd - navigation.fetchStart
      
      // First Contentful Paint
      const paintEntries = performance.getEntriesByType('paint')
      paintEntries.forEach(entry => {
        if (entry.name === 'first-contentful-paint') {
          this.metrics.fcp = entry.startTime
        }
      })
      
      // Largest Contentful Paint
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1]
            this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime
          })
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
        } catch (e) {
          // 浏览器不支持LCP
        }
      }
    }

    // 输出性能指标
    console.log('Performance Metrics:', this.metrics)
    
    // 可以发送到分析服务
    this.sendToAnalytics()
  }

  reportMetric(name, value) {
    this.metrics[name] = value
    console.log(`Performance Metric: ${name} = ${value}`)
  }

  sendToAnalytics() {
    // 发送到Google Analytics或其他分析服务
    if (window.gtag) {
      Object.keys(this.metrics).forEach(key => {
        gtag('event', 'performance_metric', {
          'metric_name': key,
          'metric_value': Math.round(this.metrics[key]),
          'event_category': 'Performance'
        })
      })
    }
  }

  // 测量函数执行时间
  measureFunction(name, fn) {
    return (...args) => {
      const start = performance.now()
      const result = fn(...args)
      const end = performance.now()
      this.reportMetric(`function_${name}`, end - start)
      return result
    }
  }
}

// 创建全局实例
export const performanceMonitor = new PerformanceMonitor()

// 错误追踪
export function trackError(error, context = {}) {
  console.error('Error tracked:', error, context)
  
  // 发送到错误追踪服务
  if (window.gtag) {
    gtag('event', 'exception', {
      'description': error.message || error,
      'fatal': false,
      'error_context': JSON.stringify(context)
    })
  }
  
  // 可以集成Sentry等错误追踪服务
}

// 用户行为追踪
export function trackEvent(category, action, label = '', value = 0) {
  if (window.gtag) {
    gtag('event', action, {
      'event_category': category,
      'event_label': label,
      'value': value
    })
  }
}
