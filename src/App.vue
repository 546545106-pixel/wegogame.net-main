<script setup>
import { RouterView } from 'vue-router'
import ErrorBoundary from '@/components/ErrorBoundary.vue'
</script>

<template>
  <ErrorBoundary>
    <RouterView />
  </ErrorBoundary>
</template>

<style>
  #app, body, html {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  
  /* 平滑滚动 */
  html {
    scroll-behavior: smooth;
  }
  
  /* 全局样式优化 */
  * {
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
