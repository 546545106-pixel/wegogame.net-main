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
                    height="420px"
                >
                    <el-carousel-item
                        v-for="banner in hotBanners"
                        :key="banner.id"
                    >
                        <img
                          class="hot-banner-image"
                          :src="banner.image"
                          :alt="banner.title"
                        />
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="hot-games-grid">
                <div
                    v-for="item in hotListGames"
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
                            <div class="card-title ui-optimized-game-name">{{ getDisplayTitle(item) }}</div>
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
    import { computed } from 'vue';
    import { ElCarousel, ElCarouselItem } from 'element-plus';
    import { useRouter } from "vue-router";
    import localGamesData from '@/data/games.js';
    import { getDifficultyClass, getDifficultyText, getPlayCount, getDisplayTitle, getRandomElements } from '@/utils';
    import { triggerHapticFeedback } from '@/utils/haptic';
    
    const router = useRouter();
    
    const GamesList = localGamesData;

    // Hot Games 顶部轮播横幅（使用 public/排行榜 下的 1.png-4.png）
    const hotBanners = computed(() => {
      return [
        {
          id: 'rank-1',
          image: '/排行榜/1.png',
          title: 'Top Ranked Arcade Hits',
          buttonText: 'PLAY HOT GAME'
        },
        {
          id: 'rank-2',
          image: '/排行榜/2.png',
          title: 'Trending Now',
          buttonText: 'TRY POPULAR GAME'
        },
        {
          id: 'rank-3',
          image: '/排行榜/3.png',
          title: 'High Score Challenge',
          buttonText: 'CHALLENGE YOURSELF'
        },
        {
          id: 'rank-4',
          image: '/排行榜/4.png',
          title: 'Daily Hot Picks',
          buttonText: 'START PLAYING'
        }
      ];
    });

    // 下方热门列表：紧接着轮播之后的若干游戏
    const hotListGames = computed(() => {
      if (!Array.isArray(GamesList) || GamesList.length === 0) return [];
      return GamesList.slice(13, 25).length > 0 ? GamesList.slice(13, 25) : GamesList.slice(0, Math.min(12, GamesList.length));
    });
    
    const toDetail = (id) => {
      router.push({
        path: '/detailpage',
        query: { id }
      });
    };

    // 顶部轮播的按钮：随机进入一个热门游戏详情
    const playRandomHotGame = () => {
      if (!Array.isArray(GamesList) || GamesList.length === 0) return;
      const picked = getRandomElements(GamesList, 1)[0];
      if (!picked) return;
      toDetail(picked.id);
    };

    const handleTouchStart = () => {
      triggerHapticFeedback('light');
    };

    const handleImageError = (event) => {
      if (event.target.src !== 'https://img.gamemonetize.com/default/512x512.jpg') {
        event.target.src = 'https://img.gamemonetize.com/default/512x512.jpg';
      }
    };

    const handleBannerError = (event) => {
      // 如果轮播图加载失败，使用顶部轮播同一套灰色背景做兜底
      if (!event.target.dataset.fallback) {
        event.target.dataset.fallback = '1';
        event.target.src = 'https://img.gamemonetize.com/default/1024x1024.jpg';
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
            box-sizing: border-box;
        }
        
        .el-carousel {
            width: 100%;
            height: 420px;
            overflow: hidden;
            border-radius: 12px;
        }

        .el-carousel__item {
            height: 420px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .hot-banner-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
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

    .hot-banner {
        position: relative;
        width: 100%;
        height: 420px;
        overflow: hidden;

        .hot-banner-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
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
        .hot-games :deep(.el-carousel),
        .hot-games :deep(.el-carousel__item) {
            height: 280px !important;
        }
        .hot-games-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
        }
    }
</style>