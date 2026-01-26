<template>
  <div class="adsense-ad-slot" :class="adSlotClass">
    <ins
      class="adsbygoogle"
      :style="adStyle"
      :data-ad-client="adClient"
      :data-ad-slot="adSlot"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  </div>
</template>

<script setup>
import { computed, onMounted, nextTick } from 'vue'

const props = defineProps({
  adSlot: {
    type: String,
    required: true,
    default: ''
  },
  adClient: {
    type: String,
    default: 'ca-pub-5319587106206709'
  },
  width: {
    type: [String, Number],
    default: 'auto'
  },
  height: {
    type: [String, Number],
    default: 'auto'
  },
  adSlotClass: {
    type: String,
    default: ''
  }
})

const adStyle = computed(() => {
  const style = {
    display: 'block',
    textAlign: 'center'
  }
  
  if (props.width !== 'auto') {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  
  if (props.height !== 'auto') {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  
  return style
})

onMounted(() => {
  // 确保AdSense脚本已加载后再初始化广告
  nextTick(() => {
    const initAdSense = () => {
      try {
        if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
          window.adsbygoogle.push({})
          console.log(`AdSense ad initialized for slot: ${props.adSlot}`)
        } else {
          // 如果AdSense脚本还未加载，等待一段时间后重试
          setTimeout(() => {
            if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
              window.adsbygoogle.push({})
              console.log(`AdSense ad initialized for slot: ${props.adSlot} (delayed)`)
            } else {
              console.warn(`AdSense script not loaded for slot: ${props.adSlot}`)
            }
          }, 1000)
        }
      } catch (error) {
        console.warn('AdSense initialization error:', error)
      }
    }
    
    // 延迟初始化，确保DOM已渲染
    setTimeout(initAdSense, 100)
  })
})
</script>

<style scoped>
.adsense-ad-slot {
  display: block;
  width: 100%;
  min-height: 250px;
  text-align: center;
  z-index: 2;
  position: relative;
}

.adsense-ad-slot .adsbygoogle {
  display: block;
  width: 100%;
  max-width: 100%;
}
</style>
