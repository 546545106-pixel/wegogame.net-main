<template>
    <div class="homepage-container ui-optimized-container">
        <div class="gptslot ad-slot" data-adunitid="0" style="min-width: 300px; min-height: 250px; margin:10px auto">
            <div class="ad-placeholder">Advertisement Slot #0<br/><small>请替换 your-ad-slot-id-0 为您的实际广告位ID</small></div>
            <AdSenseAd ad-slot="your-ad-slot-id-0" :width="300" :height="250" />
        </div>
        <GameCarousel></GameCarousel>
        <TopPicks></TopPicks>
        <NewGames></NewGames>
        <HotGames></HotGames>
        <div class="gptslot ad-slot" data-adunitid="1" style="min-width: 300px; min-height: 250px; margin:10px auto">
            <div class="ad-placeholder">Advertisement Slot #1<br/><small>请替换 your-ad-slot-id-1 为您的实际广告位ID</small></div>
            <AdSenseAd ad-slot="your-ad-slot-id-1" :width="300" :height="250" />
        </div>
        <TryNow></TryNow>
        <Tips></Tips>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import NewGames from './NewGames.vue';
import HotGames from './HotGames.vue';
import TopPicks from './TopPicks.vue';
import TryNow from './TryNow.vue';
import Tips from './Tips.vue';
import GameCarousel from './GameCarousel.vue';
import AdSenseAd from '@/components/AdSenseAd.vue';

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