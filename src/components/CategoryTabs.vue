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
      { label: '全部', value: 'all' },
      { label: '射击', value: '射击' },
      { label: '益智', value: '益智' },
      { label: '冒险', value: '冒险' },
      { label: '休闲', value: '休闲' },
      { label: '动作', value: '动作' },
      { label: '策略', value: '策略' },
      { label: '竞速', value: '竞速' },
      { label: '教育', value: '教育' },
      { label: '模拟', value: '模拟' }
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
