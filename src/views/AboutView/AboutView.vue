<script setup>
import HeaderWidget from '@/components/HeaderWidget.vue'
import FooterWidget from '@/components/FooterWidget.vue'
import AdSenseAd from '@/components/AdSenseAd.vue'
import { AD_SLOTS, isValidAdSlot } from '@/config/adSlots'
</script>

<template>
  <div class="px-[10vw] pt-12">
    <div class="mb-4 h-[94px] w-[94px]">
      <HeaderWidget />
    </div>
    <!-- 顶部广告位 -->
    <article class="prose container mx-auto bg-white px-[10vw] py-12 about-content">
      <h1>关于我们</h1>
      <p>
        这是一个乐趣永不停歇的地方，每一次体验都能带来你从未感受过的全新刺激。我们的目标是只提供最优质的免费在线游戏。你不需要付费，甚至不需要下载任何东西。我们是一个在线游戏平台，致力于以零成本为你带来最好的在线游戏。无论你在寻找什么样的在线游戏，我们都有多种选择来适应每种游戏风格——当我们说"多种"时，我们指的是"成百上千"的游戏！这就是我们所做的一切，而且我们可以说，我们非常擅长这一点。我们了解游戏玩家的想法，因为我们自己就是游戏玩家。这个地方是专门为你打造的。
      </p>
      <h2>我们的使命</h2>
      <p>
        我们的使命是为所有年龄段的玩家提供安全、有趣、高质量的在线游戏体验。我们相信游戏是一种艺术形式，能够带来快乐、挑战和社交互动。我们致力于创建一个积极的游戏社区，让每个玩家都能找到适合自己的游戏。
      </p>
      <h2>我们的优势</h2>
      <ul>
        <li>免费游戏：所有游戏均可免费游玩，无需付费</li>
        <li>高质量：精选优质HTML5游戏，确保良好的游戏体验</li>
        <li>无需下载：直接在浏览器中游玩，无需安装任何软件</li>
        <li>多样化：涵盖射击、益智、冒险、休闲等多种游戏类型</li>
        <li>安全可靠：所有游戏均经过安全检查，确保玩家安全</li>
      </ul>
    </article>
    <!-- 底部广告位（VITE_ADSENSE_SLOT_ABOUT_BOTTOM） -->
    <div
      v-if="isValidAdSlot(AD_SLOTS.aboutBottom)"
      class="site-ad-slot ad-slot about-bottom-ad"
      data-adunitid="7"
      style="min-width: 300px; min-height: 250px; margin: 30px auto"
    >
      <div class="ad-placeholder">Advertisement</div>
      <AdSenseAd :ad-slot="AD_SLOTS.aboutBottom" :width="300" :height="250" />
    </div>
  </div>
  <FooterWidget />
</template>

<style scoped>
/* About页面内容居中样式 */
.about-content {
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

.about-content h1 {
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 25px;
  color: #333;
}

.about-content p {
  text-align: center;
  font-size: 16px;
  line-height: 1.8;
  color: #555;
  margin: 0 auto;
  max-width: 800px;
}

.about-content h2 {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 15px;
  color: #444;
}

.about-content ul {
  text-align: left;
  font-size: 16px;
  line-height: 1.8;
  color: #555;
  margin: 20px auto;
  max-width: 600px;
  padding-left: 20px;
}

.about-content li {
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .about-content {
    padding: 20px 15px;
  }
  
  .about-content h1 {
    font-size: 28px;
    margin-bottom: 20px;
  }
  
  .about-content h2 {
    font-size: 20px;
    margin-top: 25px;
    margin-bottom: 12px;
  }
  
  .about-content p {
    font-size: 15px;
    line-height: 1.6;
  }
  
  .about-content ul {
    font-size: 15px;
    line-height: 1.6;
    padding-left: 15px;
  }
  
  .about-content li {
    margin-bottom: 8px;
  }
}

/* About页面广告位样式 */
.about-bottom-ad {
  max-width: 728px;
  margin: 30px auto;
}

@media (max-width: 768px) {
  .about-bottom-ad {
    max-width: 100%;
    margin: 20px 15px;
  }
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
