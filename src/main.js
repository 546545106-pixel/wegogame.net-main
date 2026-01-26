import '@/assets/style.css'
import '@/assets/ui-optimized.css' // 引入UI优化样式表

import VueLazyload from 'vue-lazyload'
import { createApp } from 'vue'
import 'element-plus/dist/index.css'

import router from '@/router'

import LinkWidget from '@/components/LinkWidget.vue'
import App from '@/App.vue'

// 导入性能监控（开发环境）
if (import.meta.env.DEV) {
  import('@/utils/performance.js').then(({ performanceMonitor, trackError }) => {
    // 全局错误处理
    window.addEventListener('error', (event) => {
      trackError(event.error, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      })
    })
    
    // Promise rejection处理
    window.addEventListener('unhandledrejection', (event) => {
      trackError(event.reason, {
        type: 'unhandledrejection'
      })
    })
  })
}

// 配置图片懒加载
const app = createApp(App)

app.use(VueLazyload, {
  preLoad: 1.3,
  error: '/favicon.ico', // 加载失败时的占位图
  loading: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TG9hZGluZy4uLjwvdGV4dD48L3N2Zz4=', // 加载中的占位图
  attempt: 3,
  listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove'],
  // 优化配置
  throttleWait: 200, // 节流等待时间
  observer: true, // 使用IntersectionObserver
  observerOptions: {
    rootMargin: '50px', // 提前50px开始加载
    threshold: 0.01
  }
})

// 全局错误处理
app.config.errorHandler = (err, instance, info) => {
  console.error('Vue Error:', err, info)
  // 可以发送到错误追踪服务
  if (window.gtag) {
    gtag('event', 'exception', {
      'description': err.message || err.toString(),
      'fatal': false,
      'error_info': info
    })
  }
}

// 挂载应用
app.use(router).component('LinkWidget', LinkWidget).mount('#app')
