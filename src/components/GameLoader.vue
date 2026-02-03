<template>
  <Transition name="loader-fade">
    <div v-if="visible" class="ui-optimized-loading">
      <div class="ui-optimized-loading-spinner"></div>
      <div class="ui-optimized-loading-text">Loading Game...</div>
    </div>
  </Transition>
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
.loader-fade-enter-active,
.loader-fade-leave-active {
  transition: opacity 0.15s ease;
}
.loader-fade-enter-from,
.loader-fade-leave-to {
  opacity: 0;
}
</style>
