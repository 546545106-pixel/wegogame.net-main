<template>
  <div v-if="error" class="error-boundary">
    <div class="error-content">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="error-icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>
      <h2 class="error-title">Oops! Something went wrong</h2>
      <p class="error-message">{{ error.message || 'An unexpected error occurred' }}</p>
      <button @click="handleRetry" class="retry-button">
        Try Again
      </button>
      <button @click="goHome" class="home-button">
        Go Home
      </button>
    </div>
  </div>
  <slot v-else />
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const error = ref(null)

onErrorCaptured((err) => {
  error.value = err
  console.error('Error caught by boundary:', err)
  return false
})

const handleRetry = () => {
  error.value = null
  window.location.reload()
}

const goHome = () => {
  error.value = null
  router.push('/homepage')
}
</script>

<style scoped>
.error-boundary {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.error-content {
  text-align: center;
  max-width: 500px;
}

.error-icon {
  width: 64px;
  height: 64px;
  color: #ef4444;
  margin: 0 auto 20px;
}

.error-title {
  font-size: 24px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 12px;
}

.error-message {
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 24px;
}

.retry-button,
.home-button {
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin: 0 8px;
}

.retry-button {
  background: #25b3e5;
  color: #fff;
  border: none;
}

.retry-button:hover {
  background: #1a9bc7;
}

.home-button {
  background: #fff;
  color: #25b3e5;
  border: 2px solid #25b3e5;
}

.home-button:hover {
  background: #f0f9ff;
}
</style>
