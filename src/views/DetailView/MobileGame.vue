<script setup>
import { ref } from 'vue'

const props = defineProps({
  game: { type: Object, required: true }
})

const show = ref(false)

const handleImageError = (event) => {
  if (event.target.src !== 'https://img.gamemonetize.com/default/512x512.jpg') {
    event.target.src = 'https://img.gamemonetize.com/default/512x512.jpg';
  }
}
</script>

<template>
  <div
    class="relative col-span-3 col-start-1 row-span-1 row-start-2 aspect-square overflow-hidden rounded-2xl after:absolute after:left-0 after:top-0 after:block after:h-full after:w-full after:bg-black after:opacity-40"
  >
    <img 
      :src="props.game.thumb || 'https://img.gamemonetize.com/default/512x512.jpg'" 
      alt=""
      @error="handleImageError($event)"
    />
    <div class="absolute left-0 top-0 z-10 flex h-full w-full">
      <div
        class="m-auto flex h-20 w-20 rounded-full bg-white pl-[5px] text-[#0f172a] shadow-xl"
        @click="show = true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="m-auto h-14 w-14"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          />
        </svg>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <div class="fixed left-0 top-0 z-20 flex h-full w-full flex-col bg-white" v-if="show">
      <div class="flex-1">
        <iframe class="h-full w-full" :src="props.game.url" frameborder="0"></iframe>
      </div>
      <div class="h-[50px]"></div>

      <div
        class="absolute left-0 top-10 flex items-center rounded-r-xl bg-white py-3 pr-4 shadow-2xl"
        @click="show = false"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="ml-1 h-4 w-4"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        <img 
          class="ml-2 h-6 w-6 rounded" 
          :src="props.game.thumb || 'https://img.gamemonetize.com/default/512x512.jpg'" 
          alt=""
          @error="handleImageError($event)"
        />
      </div>
    </div>
  </Teleport>
</template>
