<template>
    <div class="detail-page" v-if="obj">
        <div class="detail-header">
            <button class="back-button ui-optimized-button-secondary" @click="goBack">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="back-icon">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                <span>Back</span>
            </button>
        </div>
        <!-- 顶部广告位 - 游戏信息上方 -->
        <div class="gptslot ad-slot top-ad" data-adunitid="4" style="min-width: 300px; min-height: 250px; margin: 10px auto 20px;">
            <div class="ad-placeholder">Advertisement Slot #4<br/><small>请替换 your-ad-slot-id-4 为您的实际广告位ID</small></div>
            <AdSenseAd ad-slot="your-ad-slot-id-4" :width="300" :height="250" />
        </div>
        <div class="detail">
            <div class="content">
                <img 
                    class="icon" 
                    v-lazy="obj.thumb || 'https://img.gamemonetize.com/default/512x512.jpg'" 
                    :alt="obj.title"
                    @error="handleImageError($event)"
                />
                <div class="info">
                    <div class="name">{{ obj.title }}</div>
                    <div class="category-s" v-if="obj.category">
                        <span class="category">{{ obj.category }}</span>
                    </div>
                    <el-rate v-model="obj.star" disabled />
                </div>
            </div>
            <div class="desc">{{ obj.description }}</div>
            <button class="play ui-optimized-button" @click="toPlay" @touchstart="handleButtonTouchStart">Play Now</button>
        </div>
        <!-- Play Now按钮下方的广告位 -->
        <div class="gptslot ad-slot" data-adunitid="2" style="min-width: 300px; min-height: 250px; margin: 20px auto">
            <div class="ad-placeholder">Advertisement Slot #2<br/><small>请替换 your-ad-slot-id-2 为您的实际广告位ID</small></div>
            <AdSenseAd ad-slot="your-ad-slot-id-2" :width="300" :height="250" />
        </div>
        <SimilarGames @childEvent="handleChildEvent"></SimilarGames>
    </div>
    <div v-else class="loading-container">
        <div class="loading-text">Loading game details...</div>
    </div>
    
    <div class="gptslot ad-slot" data-adunitid="3" style="min-width: 300px; min-height: 250px; margin:10px auto">
        <div class="ad-placeholder">Advertisement Slot #3<br/><small>请替换 your-ad-slot-id-3 为您的实际广告位ID</small></div>
        <AdSenseAd ad-slot="your-ad-slot-id-3" :width="300" :height="250" />
    </div>
    
    <GameLoader :visible="isLoading" />
    
    <Teleport to="body">
        <div class="fixed left-0 top-0 z-20 flex h-full w-full flex-col bg-white" v-if="show && obj">
            <div class="flex-1">
                <iframe 
                    class="h-full w-full" 
                    :src="obj.url" 
                    frameborder="0"
                    allowfullscreen
                    allow="autoplay; fullscreen; gamepad; microphone; camera; geolocation; payment"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation allow-modals allow-presentation allow-downloads"
                    @load="handleIframeLoad"
                    @error="handleIframeError"
                ></iframe>
            </div>
            <div class="h-[50px]"></div>

            <div
                class="absolute left-0 top-10 flex items-center rounded-r-xl bg-white py-3 pr-4 shadow-2xl cursor-pointer z-30"
                @click="closeGame"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="ml-1 h-4 w-4"
                >
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                <img 
                    class="ml-2 h-6 w-6 rounded" 
                    :src="obj.thumb || 'https://img.gamemonetize.com/default/512x512.jpg'" 
                    :alt="obj.title"
                    @error="handleImageError($event)"
                />
            </div>
        </div>
    </Teleport>
</template>

<script setup>

    import { ref, onMounted, onUnmounted, watch } from 'vue';
    import { ElRate } from 'element-plus';
    import SimilarGames from './SimilarGames.vue';
    import GameLoader from '@/components/GameLoader.vue';
    import AdSenseAd from '@/components/AdSenseAd.vue';
    import localGamesData from '@/data/games.js';
    import { triggerHapticFeedback } from '@/utils/haptic';
    
    import { useRoute, useRouter } from "vue-router";

    const route = useRoute();
    const router = useRouter();
    
    let show = ref(false);
    let isLoading = ref(false);
    let obj = ref(localGamesData.find((item) => item.id == route.query.id) || null);
    
    // 记录来源页面，用于返回时导航
    const fromRoute = ref(null);

    // 如果找不到游戏，重定向到首页
    if (!obj.value && route.query.id) {
        router.push('/homepage')
    }

    const toPlay = () => {
        // 记录当前路由作为来源
        fromRoute.value = route.path;
        
        // 检查游戏对象和URL
        if (!obj.value) {
            console.error('Game object not found for id:', route.query.id);
            return;
        }
        
        if (!obj.value.url) {
            console.error('Game URL is missing:', obj.value);
            return;
        }
        
        console.log('Loading game:', {
            id: obj.value.id,
            title: obj.value.title,
            url: obj.value.url,
            fullUrl: window.location.origin + obj.value.url
        });
        
        isLoading.value = true;
        show.value = true;
        
        // 当iframe打开时，添加一个历史记录，这样浏览器返回按钮可以关闭iframe
        if (window.history && window.history.pushState) {
            window.history.pushState({ iframeOpen: true, gameId: route.query.id }, '', window.location.href);
        }
    }
    
    // 关闭游戏iframe
    const closeGame = () => {
        show.value = false;
        isLoading.value = false;
    }
    
    // 监听浏览器返回按钮
    const handlePopState = (event) => {
        // 如果iframe正在显示，关闭它
        if (show.value) {
            closeGame();
            
            // 如果返回后的状态是我们添加的iframe记录，说明用户点击返回关闭iframe
            // 此时应该保持在当前详情页，不需要额外操作
            if (event.state && event.state.iframeOpen) {
                return;
            }
        }
        // 允许用户正常访问隐私页面，不再阻止
    }
    
    onMounted(() => {
        if (obj.value && obj.value.title) {
            document.title = `${obj.value.title} - BreakPlay`
        }
        
        // 监听浏览器返回按钮
        window.addEventListener('popstate', handlePopState);
    })
    
    onUnmounted(() => {
        // 清理事件监听
        window.removeEventListener('popstate', handlePopState);
    })

    const handleButtonTouchStart = () => {
        triggerHapticFeedback('medium');
    }

    const handleIframeLoad = () => {
        console.log('Iframe loaded successfully');
        // iframe加载完成后隐藏加载动画
        setTimeout(() => {
            isLoading.value = false;
        }, 500);
    }

    const handleIframeError = (event) => {
        console.error('Iframe load error:', event);
        isLoading.value = false;
        // 可以在这里显示错误提示
        alert('游戏加载失败，请检查游戏文件是否存在或刷新页面重试。');
    }

    const handleImageError = (event) => {
        if (event.target.src !== 'https://img.gamemonetize.com/default/512x512.jpg') {
            event.target.src = 'https://img.gamemonetize.com/default/512x512.jpg';
        }
    }

    const handleChildEvent = (id) => {
        obj.value = localGamesData.find((item) => item.id == id)
        // 更新URL但不添加新的历史记录
        router.replace({ path: '/detailpage', query: { id } })
    }

    // 返回上一页
    const goBack = () => {
        // 如果iframe正在显示，先关闭iframe
        if (show.value) {
            closeGame();
            return;
        }
        
        // 直接返回首页，确保不会进入隐私页面
        // 用户可以通过其他方式访问隐私页面（如直接输入URL或从菜单）
        router.push('/homepage');
    }
    
    // 动态更新页面标题
    watch(() => obj.value, (newObj) => {
        if (newObj && newObj.title) {
            document.title = `${newObj.title} - BreakPlay`
        }
    }, { immediate: true })
    
    onMounted(() => {
        if (obj.value && obj.value.title) {
            document.title = `${obj.value.title} - BreakPlay`
        }
    })

</script>

<style lang="scss">
    .el-rate__item {
        margin-right: -5px;
    }
</style>

<style lang="scss" scoped>
    .detail-page {
        padding: 15px 0;
        
        .detail-header {
            padding: 0 15px 15px;
        }
        
        .detail {
            padding: 0 15px;
            margin-bottom: 20px;
        }
        .content {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 10px;
        }
        .icon {
            width: 150px;
            height: 150px;
            background: #eee;
            object-fit: cover;
            border-radius: 12px;
            margin-bottom: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .info {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            .name {
                color: #25b3e5;
                font-size: 21px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .category-s {
                margin-bottom: 5px;
            }
            .category {
                color: #fff;
                font-size: 13px;
                background: rgba(37, 179, 229, .4);
                padding: 4px 8px;
                border-radius: 6px;
            }
        }
        .desc {
            max-height: 300px;
            overflow-y: auto;
            font-size: 14px;
            color: #000;
            line-height: 25px;
            margin-top: 25px;
        }
        .play {
            width: 100%;
            height: 50px;
            margin-top: 30px;
            border-radius: 8px;
        }
    }
    .loading-container {
        padding: 50px;
        text-align: center;
        .loading-text {
            font-size: 18px;
            color: #25b3e5;
        }
    }
    
    /* 顶部广告位样式 */
    .top-ad {
        width: 100%;
        max-width: 728px; /* 标准横幅广告宽度 */
        margin: 10px auto 20px;
    }
    
    @media (max-width: 768px) {
        .top-ad {
            max-width: 100%;
            margin: 10px 15px 20px;
        }
    }
</style>