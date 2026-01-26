import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    assetsDir: 'static',
    // 代码分割优化
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 更精细的代码分割
          if (id.includes('node_modules')) {
            if (id.includes('vue') || id.includes('vue-router')) {
              return 'vue-vendor'
            }
            if (id.includes('element-plus')) {
              return 'element-plus'
            }
            if (id.includes('@vueuse')) {
              return 'vueuse'
            }
            // 其他第三方库
            return 'vendor'
          }
          // 按页面分割
          if (id.includes('/views/HomePage')) {
            return 'homepage'
          }
          if (id.includes('/views/DetailPage')) {
            return 'detailpage'
          }
        },
        // 优化文件命名
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      }
    },
    // 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 生产环境移除console
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'] // 移除特定console方法
      }
    },
    // 块大小警告限制
    chunkSizeWarningLimit: 1000,
    // 启用CSS代码分割
    cssCodeSplit: true,
    // 生成source map（生产环境可关闭以减小体积）
    sourcemap: false,
    // 启用gzip压缩报告
    reportCompressedSize: true,
    // 目标浏览器
    target: 'es2015',
    // 提高构建性能
    cssMinify: 'lightningcss'
  },
  // 开发服务器配置
  server: {
    port: 5173,
    open: true,
    cors: true,
    // 启用HTTP/2
    https: false,
    // 预热常用文件
    warmup: {
      clientFiles: ['./src/main.js', './src/router/index.js']
    }
  },
  // 预览服务器配置
  preview: {
    port: 4173,
    open: true
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: ['vue', 'vue-router', 'element-plus', '@vueuse/core'],
    exclude: []
  }
})
