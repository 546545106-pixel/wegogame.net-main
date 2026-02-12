<template>
    <div class="homepage-container ui-optimized-container">
        <GameCarousel></GameCarousel>
        <CategoryTabs @change="handleCategoryChange" />
        <TopPicks :activeCategory="activeCategory" />

        <NewGames :activeCategory="activeCategory" />
        <HotGames :activeCategory="activeCategory" />
        <TryNow></TryNow>
        <Tips></Tips>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import NewGames from './NewGames.vue';
import HotGames from './HotGames.vue';
import TopPicks from './TopPicks.vue';
import TryNow from './TryNow.vue';
import Tips from './Tips.vue';
import GameCarousel from './GameCarousel.vue';
import CategoryTabs from '@/components/CategoryTabs.vue';

const activeCategory = ref('all');

const handleCategoryChange = (category) => {
    activeCategory.value = category;
};

onMounted(() => {
    // 页面加载完成后的初始化操作
})
</script>

<style scoped>
.homepage-container {
    padding-top: 30px; /* 顶部留白30px */
}


</style>