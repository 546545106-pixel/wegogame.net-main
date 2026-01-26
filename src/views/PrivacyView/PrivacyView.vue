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
    <div class="gptslot ad-slot privacy-top-ad" data-adunitid="5" style="min-width: 300px; min-height: 250px; margin: 20px auto;">
      <div class="ad-placeholder">Advertisement Slot #5<br/><small>请替换 your-ad-slot-id-5 为您的实际广告位ID</small></div>
      <AdSenseAd ad-slot="your-ad-slot-id-5" :width="300" :height="250" />
    </div>
    <article class="prose container mx-auto bg-white px-[10vw] py-12">
      <h1>Privacy</h1>
      <h2>Information Collection And Use</h2>
      <p>
        Does not collect, analyze, distribute any personal information. IP address and logging Your
        IP address is used only by google analytics to gather demographic information and to track
        your general visiting patterns (how many pages you view while at one website, statistics
        regarding most played games, etc).
      </p>
      <p>
        Third-Party Advertising We allow third-party companies to serve ads and/or collect certain
        anonymous information when you visit our website.
      </p>
      <p>
        These companies may use non-personally identifiable information (e.g., click stream
        information, browser type, time and date, subject of advertisements clicked or scrolled
        over) during your visits to this and other Web sites in order to provide advertisements
        about goods and services likely to be of greater interest to you.
      </p>
      <h2>Log Data</h2>
      <p>
        Like many site operators, we collect information that your browser sends whenever you visit
        our Site (“Log Data”). This Log Data may include information such as your computer’s
        Internet Protocol (“IP”) address, browser type, browser version, the pages of our Site that
        you visit, the time and date of your visit, the time spent on those pages, and other
        statistics.
      </p>
      <h2>Cookies</h2>
      <p>
        Cookies are files with a small amount of data, which may include an anonymous unique
        identifier. Cookies are sent to your browser from a website and stored on your computer’s
        hard drive. Like many sites, we use “cookies” to collect and store information – including
        data which is essential to the proper function of many games. You can instruct your browser
        to refuse all cookies or to indicate when a cookie is being sent. However, if you do not
        accept cookies, you may not be able to use some portions of our Site/games. Ultimately it is
        your choice whether to access this Site and whether you wish to allow cookies to be stored.
      </p>
      <h2>Security</h2>
      <p>
        The security of your Personal Information is important to us, but remember that no method of
        transmission over the Internet, or method of electronic storage, is 100% secure. While we
        strive to use commercially acceptable means to protect your Personal Information, we cannot
        guarantee its absolute security.
      </p>
      <h2>Third-Party Advertising</h2>
      <p>
        We use several third-party advertising companies to serve ads when you visit the Site. These
        companies may use cookies to store information about your visits to this and other websites
        (your browsing activity) in order to provide advertisements on this Site and other sites
        about goods and services that may be of interest to you.
      </p>
      <p>
        You may refuse the use of cookies by selecting the appropriate settings on your browser.
        Google Adsense delivered by Google, Inc., may make use of one or more DoubleClick DART
        Cookies. DART cookies store and collect data on your computer about your browsing activity.
        Google may use this data to show advertisements on this Site based on your browsing
        activity. You can choose to opt-out of Google’s use of cookies by visiting the Google ad and
        content privacy policy.
      </p>
    </article>
    <!-- 内容中间广告位 -->
    <div class="gptslot ad-slot privacy-middle-ad" data-adunitid="6" style="min-width: 300px; min-height: 250px; margin: 30px auto;">
      <div class="ad-placeholder">Advertisement Slot #6<br/><small>请替换 your-ad-slot-id-6 为您的实际广告位ID</small></div>
      <AdSenseAd ad-slot="your-ad-slot-id-6" :width="300" :height="250" />
    </div>
  </div>
  <FooterWidget />
</template>

<style scoped>
/* 隐私页面广告位样式 */
.privacy-top-ad,
.privacy-middle-ad {
  max-width: 728px;
  margin: 20px auto;
}

@media (max-width: 768px) {
  .privacy-top-ad,
  .privacy-middle-ad {
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
