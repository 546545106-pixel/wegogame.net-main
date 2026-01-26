<script setup>
import HeaderWidget from '@/components/HeaderWidget.vue'
import FooterWidget from '@/components/FooterWidget.vue'
import AdSenseAd from '@/components/AdSenseAd.vue'
</script>

<template>
  <div class="px-[10vw] pt-12">
    <div class="mb-4 h-[94px] w-[94px]">
      <HeaderWidget />
    </div>
    <!-- 顶部广告位 -->
    <div class="gptslot ad-slot about-top-ad" data-adunitid="7" style="min-width: 300px; min-height: 250px; margin: 20px auto;">
      <div class="ad-placeholder">Advertisement Slot #7<br/><small>请替换 your-ad-slot-id-7 为您的实际广告位ID</small></div>
      <AdSenseAd ad-slot="your-ad-slot-id-7" :width="300" :height="250" />
    </div>
    <article class="prose container mx-auto bg-white px-[10vw] py-12 about-content">
      <h1>About</h1>
      <p>
        A place where the fun never stops, and each experience brings a new kind of thrill that
        you’ve never experienced. Our target is to have only the best quality free online games. You
        don’t need to pay or even download anything. We are an online gaming experience dedicated to
        bringing you the best games online at absolutely zero cost. Whatever kind of online game
        you’re looking for, we’ve got multiple selections to suit each play style – and when we say
        “multiple,” we mean “hundreds upon hundreds” of games! This is all that we do, and if we may
        say so, we’re very good at it. We know how gamers think because we aregamers. This place was
        built just for you.
      </p>
    </article>
    <!-- 内容中间广告位 -->
    <div class="gptslot ad-slot about-middle-ad" data-adunitid="8" style="min-width: 300px; min-height: 250px; margin: 30px auto;">
      <div class="ad-placeholder">Advertisement Slot #8<br/><small>请替换 your-ad-slot-id-8 为您的实际广告位ID</small></div>
      <AdSenseAd ad-slot="your-ad-slot-id-8" :width="300" :height="250" />
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

@media (max-width: 768px) {
  .about-content {
    padding: 20px 15px;
  }
  
  .about-content h1 {
    font-size: 28px;
    margin-bottom: 20px;
  }
  
  .about-content p {
    font-size: 15px;
    line-height: 1.6;
  }
}

/* About页面广告位样式 */
.about-top-ad,
.about-middle-ad {
  max-width: 728px;
  margin: 20px auto;
}

@media (max-width: 768px) {
  .about-top-ad,
  .about-middle-ad {
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
