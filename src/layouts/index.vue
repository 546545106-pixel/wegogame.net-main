<template>
    <div class="layout-wrapper">
        <!-- 左侧滚动广告位 -->
        <aside class="sidebar-ad sidebar-ad-left" v-if="showSidebarAds">
            <div class="gptslot ad-slot sidebar-ad-slot" data-adunitid="9">
                <div class="ad-placeholder">左侧广告位 #9<br/><small>请替换 your-ad-slot-id-9 为您的实际广告位ID</small></div>
                <AdSenseAd ad-slot="your-ad-slot-id-9" :width="160" :height="600" />
            </div>
        </aside>
        
        <!-- 右侧滚动广告位 -->
        <aside class="sidebar-ad sidebar-ad-right" v-if="showSidebarAds">
            <div class="gptslot ad-slot sidebar-ad-slot" data-adunitid="10">
                <div class="ad-placeholder">右侧广告位 #10<br/><small>请替换 your-ad-slot-id-10 为您的实际广告位ID</small></div>
                <AdSenseAd ad-slot="your-ad-slot-id-10" :width="160" :height="600" />
            </div>
        </aside>
        
        <main class="main-content">
            <router-view v-slot="{ Component, route }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" :key="route.path" />
                </transition>
            </router-view>
            <Footer v-show="route.path != '/detailpage'"></Footer>
            <BackToTop />
        </main>
    </div>
</template>

<script setup>
    import { computed, onMounted, onUnmounted } from 'vue';
    import Footer from '@/components/Footer.vue';
    import BackToTop from '@/components/BackToTop.vue';
    import AdSenseAd from '@/components/AdSenseAd.vue';
    
    import { useRoute } from "vue-router";
    
    const route = useRoute();
    
    // 只在足够宽的屏幕上显示侧边栏广告，并且不在详情页显示（避免干扰游戏）
    const showSidebarAds = computed(() => {
        return route.path !== '/detailpage';
    });
    
    // 优化广告位位置，确保在页面顶部和底部时也能正确显示
    let scrollHandler = null;
    
    onMounted(() => {
        if (window.innerWidth >= 1400 && showSidebarAds.value) {
            const updateAdPosition = () => {
                const sidebarAds = document.querySelectorAll('.sidebar-ad');
                if (sidebarAds.length === 0) return;
                
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                const adHeight = 600; // 广告位高度
                const adHalfHeight = adHeight / 2;
                
                sidebarAds.forEach(ad => {
                    if (!ad) return;
                    
                    // 计算广告位应该的位置
                    // 默认在视口中央（50%）
                    let topPercent = 50;
                    
                    // 如果滚动到顶部，确保广告位不会超出视口
                    if (scrollTop < adHalfHeight) {
                        topPercent = 50 + (adHalfHeight - scrollTop) / windowHeight * 100;
                        topPercent = Math.min(topPercent, 100 - (adHalfHeight / windowHeight * 100));
                    }
                    
                    // 如果滚动到底部，确保广告位不会超出视口
                    const maxScroll = documentHeight - windowHeight;
                    if (scrollTop > maxScroll - adHalfHeight) {
                        const remainingSpace = documentHeight - scrollTop - windowHeight;
                        topPercent = 50 - (adHalfHeight - remainingSpace) / windowHeight * 100;
                        topPercent = Math.max(topPercent, adHalfHeight / windowHeight * 100);
                    }
                    
                    ad.style.top = `${topPercent}%`;
                });
            };
            
            // 使用 requestAnimationFrame 优化滚动性能
            let ticking = false;
            scrollHandler = () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        updateAdPosition();
                        ticking = false;
                    });
                    ticking = true;
                }
            };
            
            // 初始设置
            updateAdPosition();
            
            // 监听滚动事件
            window.addEventListener('scroll', scrollHandler, { passive: true });
            window.addEventListener('resize', updateAdPosition, { passive: true });
        }
    });
    
    onUnmounted(() => {
        if (scrollHandler) {
            window.removeEventListener('scroll', scrollHandler);
            window.removeEventListener('resize', scrollHandler);
        }
    });
</script>

<style lang="scss" scoped>
    /* 页面过渡动画 */
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.2s ease-out;
    }
    
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>

<style lang="scss">
    /* 布局包装器 */
    .layout-wrapper {
        position: relative;
        min-height: 100vh;
        display: flex;
        justify-content: center;
    }
    
    /* 主内容区域 */
    .main-content {
        flex: 1;
        width: 100%;
        max-width: var(--container-max-width);
    }
    
    /* 侧边栏广告位样式 - 使用全局样式，因为需要定位到视口 */
    .sidebar-ad {
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        z-index: 100;
        width: 180px;
        display: none; /* 默认隐藏，只在足够宽的屏幕上显示 */
        pointer-events: auto;
    }
    
    /* 左侧广告位 */
    .sidebar-ad-left {
        left: 20px;
    }
    
    /* 右侧广告位 */
    .sidebar-ad-right {
        right: 20px;
    }
    
    /* 侧边栏广告位容器 */
    .sidebar-ad-slot {
        position: relative;
        width: 160px;
        min-height: 600px;
        border: 2px dashed #4A90E2;
        background-color: rgba(74, 144, 226, 0.05);
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0;
    }
    
    /* 侧边栏广告位占位符 */
    .sidebar-ad-slot .ad-placeholder {
        color: #4A90E2;
        font-size: 14px;
        font-weight: bold;
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 15px;
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 6px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
        pointer-events: none;
        width: 90%;
    }
    
    .sidebar-ad-slot .ad-placeholder small {
        display: block;
        font-size: 11px;
        font-weight: normal;
        color: #999999;
        margin-top: 8px;
        line-height: 1.4;
    }
    
    .sidebar-ad-slot:hover .ad-placeholder {
        background-color: rgba(74, 144, 226, 0.1);
    }
    
    /* 当AdSense广告加载后，隐藏占位符 */
    .sidebar-ad-slot:has(.adsbygoogle[data-adsbygoogle-status]),
    .sidebar-ad-slot:has(.adsbygoogle iframe),
    .sidebar-ad-slot:has(iframe[src*="googlesyndication"]) {
        border: none;
        background-color: transparent;
    }
    
    .sidebar-ad-slot:has(.adsbygoogle[data-adsbygoogle-status]) .ad-placeholder,
    .sidebar-ad-slot:has(.adsbygoogle iframe) .ad-placeholder,
    .sidebar-ad-slot:has(iframe[src*="googlesyndication"]) .ad-placeholder {
        display: none;
    }
    
    /* 只在足够宽的屏幕上显示侧边栏广告（≥1400px） */
    @media (min-width: 1400px) {
        .sidebar-ad {
            display: block;
        }
        
        /* 为主内容区域添加左右边距，避免被侧边栏广告遮挡 */
        .main-content {
            max-width: calc(var(--container-max-width) - 400px);
            margin: 0 auto;
        }
    }
    
    /* 超大屏幕（≥1600px）时，侧边栏广告位置更靠外 */
    @media (min-width: 1600px) {
        .sidebar-ad-left {
            left: calc((100vw - 1600px) / 2 - 200px);
        }
        
        .sidebar-ad-right {
            right: calc((100vw - 1600px) / 2 - 200px);
        }
    }
    
    /* 超大屏幕（≥1920px）时，侧边栏广告位置固定 */
    @media (min-width: 1920px) {
        .sidebar-ad-left {
            left: 20px;
        }
        
        .sidebar-ad-right {
            right: 20px;
        }
    }
    
    /* 确保侧边栏广告不会遮挡其他重要元素 */
    @media (min-width: 1400px) {
        /* 为Header等固定元素预留空间 */
        header,
        .header-widget {
            z-index: 101;
        }
    }
</style>