<template>
  <div
    class="container mx-auto grid justify-center gap-4 p-4"
    style="grid-template-columns: repeat(auto-fill, 94px); grid-auto-rows: 94px"
  >
    <HeaderWidget />
    <div v-for="app in apps" :key="app.id">
      <GameItem :game="app" />
    </div>
  </div>
  <FooterWidget />
</template>

<script setup>
import HeaderWidget from '@/components/HeaderWidget.vue'
import FooterWidget from '@/components/FooterWidget.vue'
import GameItem from '@/components/GameItem.vue'
import games from '@/data/games.js'

const apps = games
</script>

<style scoped>
/* 列表页仅展示游戏入口；广告统一在详情页与布局侧栏等已配置位展示 */
</style>
