<template>
  <div class="container mx-auto grid justify-center gap-4 p-4"
       style="grid-template-columns: repeat(auto-fill, 94px); grid-auto-rows: 94px">
    <HeaderWidget />
    <div v-for="(app, index) in apps" :key="app.id">
      <GameItem :game="app" />
      <div v-if="(index + 1) % 3 === 0 && (index + 1) / 3 === 2">
        <div class="gptslot" data-adunitid="1" style="min-width: 300px; min-height: 250px;">
        </div>
      </div>
      <div v-if="(index + 1) % 3 === 0 && (index + 1) / 3 === 5">
        <div class="gptslot" data-adunitid="0" style="min-width: 300px; min-height: 250px;">
        </div>
      </div>
    </div>
  </div>
  <FooterWidget />
</template>

<script setup>
import { onMounted } from 'vue';
import HeaderWidget from '@/components/HeaderWidget.vue';
import FooterWidget from '@/components/FooterWidget.vue';
import GameItem from '@/components/GameItem.vue';
import games from '@/data/games.js';

const apps = games;

onMounted(() => {
  // GPT脚本已在index.html中加载，这里无需重复加载
})
</script>

<style scoped>
/* 可以添加一些组件的局部样式 */
</style>
