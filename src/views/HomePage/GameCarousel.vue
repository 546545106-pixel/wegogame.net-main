<template>
    <div class="game-carousel-wrapper">
        <div class="ui-optimized-container">
            <el-carousel 
                trigger="click" 
                indicator-position="outside" 
                arrow="always"
                :interval="5000"
                :autoplay="true"
                height="560px"
                @change="handleCarouselChange"
            >
                <!-- 使用精选的快乐/健康/合规展示图，而不是直接用游戏封面 -->
                <el-carousel-item
                    v-for="banner in heroBanners"
                    :key="banner.id"
                    class="carousel-item"
                >
                    <div 
                        class="carousel-background"
                        :style="{ backgroundImage: `url('${banner.image}')` }"
                    >
                        <div class="carousel-overlay">
                            <div class="carousel-content">
                                <h3 class="game-title">{{ banner.title }}</h3>
                                <p class="game-description">{{ banner.subtitle }}</p>
                                <button class="play-button ui-optimized-button" @click="toRandomGame">
                                    {{ banner.buttonText }}
                                </button>
                            </div>
                        </div>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { ElCarousel, ElCarouselItem } from 'element-plus';
    import { useRouter } from "vue-router";
    import localGamesData from '@/data/games.js';
    import { getRandomElements, getDisplayTitle } from '@/utils';
    
    const router = useRouter();
    
    const GamesList = localGamesData;

    // 快乐、健康、合规的轮播横幅数据（使用 public/首页大轮播 下的 5.png-8.png）
    const heroBanners = computed(() => {
        const baseBanners = [
            {
                id: 'fun-arcade',
                image: '/首页大轮播/5.png',
                title: 'Play Fun & Relaxing Games',
                subtitle: 'Enjoy hundreds of casual mini games. Safe, family-friendly and full of joy.',
                buttonText: 'START A RANDOM GAME'
            },
            {
                id: 'brain-training',
                image: '/首页大轮播/6.png',
                title: 'Train Your Brain, Have Fun',
                subtitle: 'Puzzle, logic and reaction challenges that keep your mind sharp.',
                buttonText: 'TRY A NEW CHALLENGE'
            },
            {
                id: 'happy-time',
                image: '/首页大轮播/7.png',
                title: 'Happy Game Time, Anytime',
                subtitle: 'No downloads, no pressure — just pure gaming happiness.',
                buttonText: 'PLAY NOW'
            },
            {
                id: 'colorful-world',
                image: '/首页大轮播/8.png',
                title: 'Colorful Arcade World',
                subtitle: 'Bright colors, simple controls and endless joyful moments.',
                buttonText: 'DISCOVER GAMES'
            }
        ];
        return baseBanners;
    });
    
    const toDetail = (id) => {
        router.push({
            path: '/detailpage',
            query: { id }
        });
    };
    
    // 轮播按钮：随机跳转到一个英文展示标题的游戏
    const toRandomGame = () => {
        if (!GamesList || GamesList.length === 0) return;
        const picked = getRandomElements(GamesList, 1)[0];
        if (!picked) return;
        toDetail(picked.id);
    };
    
    const handleCarouselChange = (index) => {
        // 轮播切换时的处理（可选）
        console.log('Carousel changed to index:', index);
    };
</script>

<style lang="scss" scoped>
    .game-carousel-wrapper {
        width: 100%;
        margin: 20px auto;
        padding: 0;
        
        .ui-optimized-container {
            width: 100%;
            max-width: var(--container-max-width);
            margin: 0 auto;
            padding: 0 20px;
            box-sizing: border-box;
        }
        
        .el-carousel {
            width: 100%;
            height: 560px;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
            margin: 0 auto;
            box-sizing: border-box;
        }
        
        .carousel-item {
            cursor: pointer;
            transition: transform 0.3s ease;
            
            &:hover {
                transform: scale(1.02);
            }
        }
        
        .carousel-background {
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            position: relative;
            overflow: hidden;
            /* 优化图片渲染质量 */
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
            image-rendering: high-quality;
            /* 使用GPU加速 */
            transform: translateZ(0);
            will-change: background-image;
        }
        
        .carousel-overlay {
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6));
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px;
            box-sizing: border-box;
        }
        
        .carousel-content {
            text-align: center;
            color: #ffffff;
            max-width: 800px;
            z-index: 2;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            
            .game-title {
                font-size: 36px;
                font-weight: bold;
                margin-bottom: 15px;
                text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
                line-height: 1.2;
                text-align: center;
                width: 100%;
            }
            
            .game-description {
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 25px;
                text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
                opacity: 0.95;
                text-align: center;
                width: 100%;
            }
            
            .play-button {
                font-size: 18px;
                padding: 12px 32px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                transition: all 0.3s ease;
                margin: 0 auto;
                display: block;
                
                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
                }
            }
        }
        
        /* 轮播指示器样式 */
        :deep(.el-carousel__indicators) {
            bottom: 20px;
            
            .el-carousel__indicator {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.5);
                margin: 0 5px;
                transition: all 0.3s ease;
                
                &.is-active {
                    background-color: #ffffff;
                    width: 30px;
                    border-radius: 5px;
                }
            }
        }
        
        /* 轮播箭头样式 */
        :deep(.el-carousel__arrow) {
            background-color: rgba(255, 255, 255, 0.9);
            color: #333;
            border: none;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
            
            &:hover {
                background-color: rgba(255, 255, 255, 1);
                transform: scale(1.1);
            }
        }
        
        :deep(.el-carousel__arrow--left) {
            left: 20px;
        }
        
        :deep(.el-carousel__arrow--right) {
            right: 20px;
        }
    }
    
    /* 响应式设计 */
    @media (max-width: 768px) {
        .game-carousel-wrapper {
            margin: 15px auto;
            
            .ui-optimized-container {
                padding: 0 16px;
            }
            
            .el-carousel {
                height: 380px;
            }
            
            .carousel-overlay {
                padding: 20px;
            }
            
            .carousel-content {
                .game-title {
                    font-size: 24px;
                    margin-bottom: 10px;
                }
                
                .game-description {
                    font-size: 14px;
                    margin-bottom: 15px;
                }
                
                .play-button {
                    font-size: 16px;
                    padding: 10px 24px;
                }
            }
            
            :deep(.el-carousel__arrow) {
                width: 35px;
                height: 35px;
            }
            
            :deep(.el-carousel__arrow--left) {
                left: 10px;
            }
            
            :deep(.el-carousel__arrow--right) {
                right: 10px;
            }
        }
    }
</style>
