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
    <article class="prose container mx-auto bg-white px-[10vw] py-12 privacy-content">
      <h1>隐私政策</h1>
      <h2>信息收集与使用</h2>
      <p>
        我们不会在未经说明的情况下主动收集可单独识别您身份的个人信息。服务器或托管方可能因网络通信产生常规访问日志（如 IP、访问时间、请求路径），用于保障服务安全与排查故障。
      </p>
      <p>
        第三方广告：我们允许第三方公司在您访问我们的网站时提供广告和/或收集某些匿名信息。
      </p>
      <p>
        这些公司可能会在您访问本网站和其他网站期间使用非个人身份信息（例如，点击流信息、浏览器类型、时间和日期、点击或滚动的广告主题），以提供有关您可能更感兴趣的商品和服务的广告。
      </p>
      <h2>日志数据</h2>
      <p>
        与许多网站运营商一样，我们会收集您的浏览器在访问我们网站时发送的信息（"日志数据"）。这些日志数据可能包括您计算机的互联网协议（"IP"）地址、浏览器类型、浏览器版本、您访问的我们网站的页面、访问的时间和日期、在这些页面上花费的时间以及其他统计信息。
      </p>
      <h2>Cookies</h2>
      <p>
        Cookies是包含少量数据的文件，可能包括匿名唯一标识符。Cookies从网站发送到您的浏览器并存储在计算机的硬盘上。与许多网站一样，我们使用"cookies"来收集和存储信息——包括许多游戏正常运行所必需的数据。您可以指示您的浏览器拒绝所有cookies或在发送cookie时通知您。但是，如果您不接受cookies，您可能无法使用我们网站/游戏的某些部分。最终，是否访问本网站以及是否允许存储cookies取决于您的选择。
      </p>
      <h2>安全性</h2>
      <p>
        您个人信息的安全对我们很重要，但请记住，通过互联网传输或电子存储的任何方法都不是100%安全的。虽然我们努力使用商业上可接受的手段来保护您的个人信息，但我们不能保证其绝对安全性。
      </p>
      <h2>第三方广告</h2>
      <p>
        本站通过 Google AdSense 在部分页面展示广告，广告收入归属本站在 AdSense 登记的同一发布商帐号。Google 可能使用 Cookie 等技术，依据其政策投放或衡量广告。您可查阅：
        <a href="https://policies.google.com/technologies/ads" rel="noopener noreferrer" target="_blank">Google 广告与 Cookie 说明</a>、
        <a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">Google 隐私权政策</a>；
        并可通过 <a href="https://www.google.com/settings/ads" rel="noopener noreferrer" target="_blank">Google 广告设置</a> 管理个性化广告偏好。
      </p>
      <p>
        您也可在浏览器中管理或删除 Cookie；若禁用必要 Cookie，部分页面或游戏功能可能受限。
      </p>
    </article>
    <!-- 底部广告位（VITE_ADSENSE_SLOT_PRIVACY_BOTTOM） -->
    <div
      v-if="isValidAdSlot(AD_SLOTS.privacyBottom)"
      class="site-ad-slot ad-slot privacy-bottom-ad"
      data-adunitid="5"
      style="min-width: 300px; min-height: 250px; margin: 30px auto"
    >
      <div class="ad-placeholder">Advertisement</div>
      <AdSenseAd :ad-slot="AD_SLOTS.privacyBottom" :width="300" :height="250" />
    </div>
  </div>
  <FooterWidget />
</template>

<style scoped>
/* 隐私页面内容样式 */
.privacy-content {
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

.privacy-content h1 {
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 25px;
  color: #333;
}

.privacy-content h2 {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 15px;
  color: #444;
}

.privacy-content p {
  text-align: center;
  font-size: 16px;
  line-height: 1.8;
  color: #555;
  margin: 0 auto;
  max-width: 800px;
}

@media (max-width: 768px) {
  .privacy-content {
    padding: 20px 15px;
  }
  
  .privacy-content h1 {
    font-size: 28px;
    margin-bottom: 20px;
  }
  
  .privacy-content h2 {
    font-size: 20px;
    margin-top: 25px;
    margin-bottom: 12px;
  }
  
  .privacy-content p {
    font-size: 15px;
    line-height: 1.6;
  }
}

/* 隐私页面广告位样式 */
.privacy-bottom-ad {
  max-width: 728px;
  margin: 30px auto;
}

@media (max-width: 768px) {
  .privacy-bottom-ad {
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
