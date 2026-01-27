<template>
    <div class="hot-games ui-optimized-content">
        <div class="ui-optimized-container">
            <div class="title ui-optimized-section-title">Hot Games</div>
            <div class="carousel-wrapper">
                <el-carousel 
                    trigger="click" 
                    indicator-position="none" 
                    arrow="always"
                    :interval="4000"
                    :autoplay="true"
                    height="300px"
                >
                    <el-carousel-item
                        v-for="item in GamesList.filter((ele, index) => 9 <= index && index < 13)"
                        :key="item.id"
                        :style="{ backgroundImage: `url(${item.thumb || 'https://img.gamemonetize.com/default/512x512.jpg'})` }"
                    >
                        <div class="entrance">
                            <div class="name">{{ item.title }}</div>
                            <div class="btn ui-optimized-button" @click="toDetail(item.id)">PLAY NOW</div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="hot-games-grid">
                <div
                    v-for="item in GamesList.filter((ele, index) => 13 <= index && index < 25)"
                    :key="item.id"
                >
                    <div class="ui-optimized-game-card" @click="toDetail(item.id)" @touchstart="handleTouchStart">
                        <div class="card-image">
                            <img
                                :src="item.thumb || 'https://img.gamemonetize.com/default/512x512.jpg'"
                                :alt="item.title"
                                loading="lazy"
                                @error="handleImageError($event)"
                            />
                        </div>
                        <div class="card-content">
                            <div class="card-title ui-optimized-game-name">{{ item.title }}</div>
                            <div class="card-footer">
                                <span class="difficulty-tag ui-optimized-auxiliary-text" :class="getDifficultyClass(item)">
                                    {{ getDifficultyText(item) }}
                                </span>
                                <span class="play-count ui-optimized-auxiliary-text">{{ getPlayCount(item) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ElCarousel, ElCarouselItem, ElRow, ElCol } from 'element-plus';
    import { useRouter } from "vue-router";
    import localGamesData from '@/data/games.js';
    import { getDifficultyClass, getDifficultyText, getPlayCount } from '@/utils';
    import { triggerHapticFeedback } from '@/utils/haptic';
    
    const router = useRouter();
    
    const GamesList = localGamesData;
    
    const toDetail = (id) => {
      router.push({
        path: '/detailpage',
        query: { id }
      });
    };

    const handleTouchStart = () => {
      triggerHapticFeedback('light');
    };

    const handleImageError = (event) => {
      if (event.target.src !== 'https://img.gamemonetize.com/default/512x512.jpg') {
        event.target.src = 'https://img.gamemonetize.com/default/512x512.jpg';
      }
    };
</script>

<style lang="scss" scoped>
    .hot-games {
        width: 100%;
        overflow: hidden;
        
        .carousel-wrapper {
            width: 100%;
            max-width: 100%;
            margin: 0 auto 20px;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            box-sizing: border-box; /* 确保与游戏列表宽度对齐 */
        }
        
        .el-carousel {
            width: 100%;
            height: 300px;
            overflow: hidden;
            border-radius: 12px;
        }
        
        .el-carousel__item {
            height: 300px;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            position: relative;
            
            .entrance {
                width: 100%;
                height: 60px;
                color: #fff;
                background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
                position: absolute;
                bottom: 0;
                left: 0;
                display: flex;
                align-items: center;
                padding: 0 20px;
                backdrop-filter: blur(5px);
                
                .name {
                    flex: 1;
                    font-size: 22px;
                    font-weight: bold;
                    padding-right: 15px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
                }
                
                .btn {
                    flex-shrink: 0;
                }
            }
        }
        
        /* 轮播箭头样式优化 */
        :deep(.el-carousel__arrow) {
            background-color: rgba(255, 255, 255, 0.8);
            color: #333;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
            
            &:hover {
                background-color: rgba(255, 255, 255, 1);
                transform: scale(1.1);
            }
        }
        
        :deep(.el-carousel__arrow--left) {
            left: 15px;
        }
        
        :deep(.el-carousel__arrow--right) {
            right: 15px;
        }
    }

    .hot-games-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 16px;
        width: 100%;
        margin-top: 20px;
    }

    @media (max-width: 768px) {
        .hot-games-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
        }
    }
</style>