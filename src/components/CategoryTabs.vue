<template>
  <div class="category-filter">
    <div class="ui-optimized-category-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        class="ui-optimized-category-tab"
        :class="{ active: activeTab === tab.value }"
        @click="handleTabClick(tab.value)"
        @touchstart="handleTouchStart"
      >
        {{ tab.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { triggerHapticFeedback } from '@/utils/haptic'

const props = defineProps({
  tabs: {
    type: Array,
    default: () => [
      { label: 'All', value: 'all' },
      { label: 'Logic Puzzles', value: 'puzzle' },
      { label: 'Action', value: 'action' },
      { label: 'Strategy', value: 'strategy' },
      { label: 'Racing', value: 'racing' }
    ]
  },
  defaultTab: {
    type: String,
    default: 'all'
  }
})

const emit = defineEmits(['change'])

const activeTab = ref(props.defaultTab)

const handleTabClick = (value) => {
  activeTab.value = value
  emit('change', value)
}

const handleTouchStart = () => {
  triggerHapticFeedback('light')
}
</script>

<style scoped>
.category-filter {
  margin-bottom: 24px;
}
</style>
