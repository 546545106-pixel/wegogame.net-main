<template>
    <div class="homepage-container ui-optimized-container">
        <GameCarousel></GameCarousel>
        <CategoryTabs @change="handleCategoryChange" />
        <TopPicks :activeCategory="activeCategory" />
        <div class="gptslot ad-slot homepage-main-ad" data-adunitid="0" style="min-width: 300px; min-height: 250px; margin:20px auto">
            <div class="ad-placeholder">Advertisement Slot #0<br/><small>请替换 your-ad-slot-id-0 为您的实际广告位ID</small></div>
            <AdSenseAd ad-slot="your-ad-slot-id-0" :width="300" :height="250" />
        </div>
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
import AdSenseAd from '@/components/AdSenseAd.vue';
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

/* 广告位占位符样式 */
.ad-slot {
    position: relative;
    border: 2px dashed #4A90E2;
    background-color: rgba(74, 144, 226, 0.05);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 250px;
}

/* 首页主广告位样式 */
.homepage-main-ad {
    max-width: 728px;
    margin: 30px auto;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
    .homepage-main-ad {
        max-width: 100%;
        margin: 20px 15px;
        padding: 5px;
    }
}

.ad-placeholder {
    color: #4A90E2;
    font-size: 16px;
    font-weight: bold;
    font-family: Arial, sans-serif;
    text-align: center;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    pointer-events: none;
}

.ad-placeholder small {
    display: block;
    font-size: 12px;
    font-weight: normal;
    color: #999999;
    margin-top: 8px;
}

.ad-slot:hover .ad-placeholder {
    background-color: rgba(74, 144, 226, 0.1);
}

/* 当AdSense广告加载后，隐藏占位符 */
.ad-slot:has(.adsbygoogle[data-adsbygoogle-status]),
.ad-slot:has(.adsbygoogle iframe),
.ad-slot:has(iframe[src*="googlesyndication"]) {
    border: none;
    background-color: transparent;
}

.ad-slot:has(.adsbygoogle[data-adsbygoogle-status]) .ad-placeholder,
.ad-slot:has(.adsbygoogle iframe) .ad-placeholder,
.ad-slot:has(iframe[src*="googlesyndication"]) .ad-placeholder {
    display: none;
}
</style>