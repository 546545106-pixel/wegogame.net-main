<script setup>
import GameComments from './GameComments.vue'

const props = defineProps({ game: { type: Object, required: true } })

const handleImageError = (event) => {
  if (event.target.src !== 'https://img.gamemonetize.com/default/512x512.jpg') {
    event.target.src = 'https://img.gamemonetize.com/default/512x512.jpg';
  }
}
</script>

<template>
  <div
    class="col-span-6 col-start-2 row-span-8 row-start-1 flex flex-col rounded bg-white shadow-md xl:col-span-8 xl:row-span-10 2xl:col-span-10 2xl:row-span-12"
  >
    <div class="flex-1 bg-black">
      <iframe class="h-full w-full" :src="props.game.url" frameborder="0"></iframe>
    </div>
    <div class="p-4">
      <div class="flex items-center mb-3">
        <img 
          class="mr-3 h-12 w-12 rounded-lg" 
          :src="props.game.thumb || 'https://img.gamemonetize.com/default/512x512.jpg'" 
          :alt="props.game.title"
          @error="handleImageError($event)"
        />
        <div>
          <h2 class="text-xl font-bold">{{ props.game.title }}</h2>
          <div class="flex items-center mt-1">
            <span class="text-sm bg-gray-100 px-2 py-1 rounded mr-2">{{ props.game.category }}</span>
            <span class="text-sm bg-gray-100 px-2 py-1 rounded mr-2">{{ props.game.subcategory }}</span>
            <span class="text-sm bg-gray-100 px-2 py-1 rounded">{{ props.game.difficulty }}</span>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <h3 class="font-semibold mb-1">游戏描述</h3>
        <p class="text-sm text-gray-600">{{ props.game.description }}</p>
      </div>
      <div class="mb-3">
        <h3 class="font-semibold mb-1">操作说明</h3>
        <p class="text-sm text-gray-600">{{ props.game.instructions }}</p>
      </div>
      <div>
        <h3 class="font-semibold mb-1">标签</h3>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="(tag, index) in props.game.tags.split(',')" 
            :key="index" 
            class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
          >
            {{ tag }}
          </span>
        </div>
      </div>
      
      <!-- 游戏评论 -->
      <GameComments :game-id="props.game.id" :game-title="props.game.title" />
    </div>
  </div>
</template>
