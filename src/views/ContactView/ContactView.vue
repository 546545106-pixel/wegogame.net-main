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
    <article class="prose container mx-auto bg-white px-[10vw] py-12 contact-content">
      <h1>联系我们</h1>
      <p>
        感谢您访问我们的游戏网站！如果您有任何问题、建议或合作意向，欢迎通过以下方式联系我们：
      </p>
      <h2>联系方式</h2>
      <ul>
        <li>电子邮件：contact@wegogame.net（咨询、合作与侵权投诉请优先使用邮件，我们会在合理时间内回复）</li>
      </ul>
      <h2>常见问题</h2>
      <p>
        <strong>Q: 如何在网站上发布游戏？</strong><br/>
        A: 目前我们只接受精选游戏的合作，如果您有优质的HTML5游戏想要推荐，请通过电子邮件联系我们。
      </p>
      <p>
        <strong>Q: 如何投放广告？</strong><br/>
        A: 我们提供多种广告位合作方式，请通过电子邮件联系我们获取详细的广告投放方案。
      </p>
      <p>
        <strong>Q: 游戏加载缓慢怎么办？</strong><br/>
        A: 建议您检查网络连接，或尝试清除浏览器缓存。如果问题持续存在，请联系我们。
      </p>
      <h2>合作意向</h2>
      <p>
        我们欢迎各类合作意向，包括但不限于：
      </p>
      <ul>
        <li>游戏开发者合作</li>
        <li>广告投放合作</li>
        <li>媒体合作</li>
        <li>品牌推广</li>
      </ul>
      <p>
        请通过上述联系方式与我们取得联系，我们将在1-3个工作日内回复您。
      </p>
    </article>
    <!-- 底部广告位（VITE_ADSENSE_SLOT_CONTACT_BOTTOM） -->
    <div
      v-if="isValidAdSlot(AD_SLOTS.contactBottom)"
      class="site-ad-slot ad-slot contact-bottom-ad"
      data-adunitid="9"
      style="min-width: 300px; min-height: 250px; margin: 30px auto"
    >
      <div class="ad-placeholder">Advertisement</div>
      <AdSenseAd :ad-slot="AD_SLOTS.contactBottom" :width="300" :height="250" />
    </div>
  </div>
  <FooterWidget />
</template>

<style scoped>
/* Contact页面内容居中样式 */
.contact-content {
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

.contact-content h1 {
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 25px;
  color: #333;
}

.contact-content h2 {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 15px;
  color: #444;
}

.contact-content p {
  text-align: center;
  font-size: 16px;
  line-height: 1.8;
  color: #555;
  margin: 0 auto;
  max-width: 800px;
}

.contact-content ul {
  text-align: left;
  font-size: 16px;
  line-height: 1.8;
  color: #555;
  margin: 20px auto;
  max-width: 600px;
  padding-left: 20px;
}

.contact-content li {
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .contact-content {
    padding: 20px 15px;
  }
  
  .contact-content h1 {
    font-size: 28px;
    margin-bottom: 20px;
  }
  
  .contact-content h2 {
    font-size: 20px;
    margin-top: 25px;
    margin-bottom: 12px;
  }
  
  .contact-content p {
    font-size: 15px;
    line-height: 1.6;
  }
  
  .contact-content ul {
    font-size: 15px;
    line-height: 1.6;
    padding-left: 15px;
  }
}

/* Contact页面广告位样式 */
.contact-bottom-ad {
  max-width: 728px;
  margin: 30px auto;
}

@media (max-width: 768px) {
  .contact-bottom-ad {
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