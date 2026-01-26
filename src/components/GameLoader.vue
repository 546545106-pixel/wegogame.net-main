<template>
  <div v-if="visible" class="ui-optimized-loading">
    <div class="ui-optimized-loading-spinner"></div>
    <div class="ui-optimized-loading-text">Loading Game...</div>
  </div>
</template>

<script setup>
import { watch } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
/* 样式已在 ui-optimized.css 中定义 */
</style>
