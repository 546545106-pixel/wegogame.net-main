<template>
  <div class="skeleton-container">
    <div class="skeleton-item" v-for="n in count" :key="n">
      <div class="skeleton-image"></div>
      <div class="skeleton-text"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  count: {
    type: Number,
    default: 6
  }
})
</script>

<style scoped>
.skeleton-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(94px, 1fr));
  gap: 10px;
  padding: 15px;
}

.skeleton-item {
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
}

.skeleton-image {
  width: 100%;
  height: 110px;
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
}

.skeleton-text {
  height: 30px;
  margin: 8px 10px;
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
  border-radius: 4px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
