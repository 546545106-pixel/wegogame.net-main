<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="back-to-top"
      @click="scrollToTop"
      :class="{ 'show': visible }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4.5 15.75l7.5-7.5 7.5 7.5"
        />
      </svg>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)
let ticking = false

const handleScroll = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      visible.value = window.scrollY > 300
      ticking = false
    })
    ticking = true
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll, { passive: true })
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: #25b3e5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(37, 179, 229, 0.4);
  transition: all 0.3s ease;
  z-index: 1000;
  opacity: 0;
  transform: translateY(20px);
}

.back-to-top.show {
  opacity: 1;
  transform: translateY(0);
}

.back-to-top:hover {
  background: #1a9bc7;
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(37, 179, 229, 0.6);
}

.icon {
  width: 24px;
  height: 24px;
  color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .back-to-top {
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
  }
  
  .icon {
    width: 20px;
    height: 20px;
  }
}
</style>
