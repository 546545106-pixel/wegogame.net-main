<script setup>
import HeaderWidget from '@/components/HeaderWidget.vue'
import FooterWidget from '@/components/FooterWidget.vue'
import IframeBox from '@/components/IframeBox.vue'
import GameItem from '@/components/GameItem.vue'

const props = defineProps({
  app: Object,
  apps: Array
})
</script>

<template>
  <div
    class="container mx-auto grid min-w-[768px] auto-rows-[94px] justify-center gap-4 p-4"
    style="grid-template-columns: repeat(auto-fill, 94px); grid-auto-rows: 94px;"
  >
    <HeaderWidget />
    <IframeBox :game="props.app" />

    <GameItem v-for="app in props.apps" :key="app.id" :game="app" />
  </div>
  <FooterWidget />
</template>
