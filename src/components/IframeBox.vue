<script setup>
const props = defineProps({ game: { type: Object, required: true } })

const handleImageError = (event) => {
  if (event.target.src !== 'https://img.gamemonetize.com/default/512x512.jpg') {
    event.target.src = 'https://img.gamemonetize.com/default/512x512.jpg';
  }
}
</script>

<template>
  <div
    class="col-span-6 col-start-2 row-span-4 row-start-1 flex flex-col rounded bg-white shadow-md xl:col-span-8 xl:row-span-5 2xl:col-span-10 2xl:row-span-6"
  >
    <div class="flex-1 bg-black">
      <iframe class="h-full w-full" :src="props.game.url" frameborder="0"></iframe>
    </div>
    <div class="flex h-16 items-center p-3">
      <img 
        class="mr-2 h-10 w-10 rounded-lg" 
        :src="props.game.thumb || 'https://img.gamemonetize.com/default/512x512.jpg'" 
        alt=""
        @error="handleImageError($event)"
      />
      <h2 class="font-bold">{{ props.game.title }}</h2>
    </div>
  </div>
</template>
