<script setup>
import HeaderWidget from '@/components/HeaderWidget.vue'
import FooterWidget from '@/components/FooterWidget.vue'
import GameItem from '@/components/GameItem.vue'

import MobileGame from './MobileGame.vue'

const props = defineProps({
  app: Object,
  apps: Array
})
</script>

<template>
  <div
    class="container mx-auto grid justify-center gap-4 p-4"
    style="grid-template-columns: repeat(auto-fill, 94px); grid-auto-rows: 94px"
  >
    <HeaderWidget />
    <div
      class="col-span-2 flex items-center justify-center rounded-2xl bg-white px-4 py-2 text-lg font-bold shadow-md"
    >
      {{ props.app.title }}
    </div>
    <MobileGame :game="app" />
    <GameItem v-for="app in props.apps" :key="app.id" :game="app" />
  </div>

  <FooterWidget />
</template>
