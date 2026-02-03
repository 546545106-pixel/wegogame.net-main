<template>
  <div class="try-now ui-optimized-content">
    <div class="ui-optimized-container">
      <div class="title ui-optimized-section-title">Try Now</div>

      <!-- 顶部轮播：展示推荐试玩游戏（使用 public/轻松 下的4张图片） -->
      <div class="carousel-wrapper" v-if="relaxBanners.length">
        <el-carousel
          trigger="click"
          indicator-position="none"
          arrow="always"
          :interval="4000"
          :autoplay="true"
          height="560px"
        >
          <el-carousel-item
            v-for="banner in relaxBanners"
            :key="banner.id"
          >
            <img
              class="relax-banner-image"
              :src="banner.image"
              :alt="banner.title"
            />
          </el-carousel-item>
        </el-carousel>
      </div>

      <!-- 下方网格：分页列表 -->
      <div class="try-now-grid">
        <div v-for="item in GamesList" :key="item.id">
          <div
            class="ui-optimized-game-card"
            @click="toDetail(item.id)"
            @touchstart="handleTouchStart"
          >
            <div class="card-image">
              <img
                :src="item.thumb || 'https://img.gamemonetize.com/default/512x512.jpg'"
                :alt="item.title"
                loading="lazy"
                @error="handleImageError($event)"
              />
            </div>
            <div class="card-content">
              <div class="card-title ui-optimized-game-name">
                {{ getDisplayTitle(item) }}
              </div>
              <div class="card-footer">
                <span
                  class="difficulty-tag ui-optimized-auxiliary-text"
                  :class="getDifficultyClass(item)"
                >
                  {{ getDifficultyText(item) }}
                </span>
                <span class="play-count ui-optimized-auxiliary-text">
                  {{ getPlayCount(item) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-pagination
        :pager-count="5"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="total"
        @current-change="currentChange"
        class="ui-optimized-pagination"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElPagination, ElCarousel, ElCarouselItem } from 'element-plus'
import { useRouter } from 'vue-router'
import localGamesData from '@/data/games.js'
import { getDifficultyClass, getDifficultyText, getPlayCount, getDisplayTitle, getRandomElements } from '@/utils'
import { triggerHapticFeedback } from '@/utils/haptic'

const router = useRouter()

// 统一管理“Try Now”区使用的游戏集合，从第 50 条开始
const allTryNowGames = computed(() =>
  localGamesData.filter((ele, index) => index >= 49),
)

// 顶部轮播：使用 public/轻松 文件夹中的 1.png-4.png
const relaxBanners = computed(() => [
  {
    id: 'relax-1',
    image: '/轻松/1.png',
    title: 'Relax & Play',
    buttonText: 'START RELAXING GAME',
  },
  {
    id: 'relax-2',
    image: '/轻松/2.png',
    title: 'Light & Easy Fun',
    buttonText: 'PLAY LIGHT GAME',
  },
  {
    id: 'relax-3',
    image: '/轻松/3.png',
    title: 'Happy Casual Time',
    buttonText: 'TRY CASUAL GAME',
  },
  {
    id: 'relax-4',
    image: '/轻松/4.png',
    title: 'Quick Game Break',
    buttonText: 'PLAY NOW',
  },
])

// 分页配置
let pageSize = 24 // 增加每页显示数量，充分利用空间
let total = computed(() => allTryNowGames.value.length)

// 当前页数据
let GamesList = ref(allTryNowGames.value.slice(0, pageSize))

const toDetail = (id) => {
  router.push({
    path: '/detailpage',
    query: { id },
  })
}

// 顶部轮播按钮：随机挑选一个“Try Now”游戏
const playRandomRelaxGame = () => {
  const list = allTryNowGames.value
  if (!list || list.length === 0) return
  const picked = getRandomElements(list, 1)[0]
  if (!picked) return
  toDetail(picked.id)
}

const currentChange = (val) => {
  const startIndex = (val - 1) * pageSize
  const endIndex = startIndex + pageSize
  const list = allTryNowGames.value
  GamesList.value = list.slice(startIndex, endIndex)
}

const handleTouchStart = () => {
  triggerHapticFeedback('light')
}

const handleImageError = (event) => {
  if (
    event.target.src !== 'https://img.gamemonetize.com/default/512x512.jpg'
  ) {
    event.target.src = 'https://img.gamemonetize.com/default/512x512.jpg'
  }
}

const handleRelaxBannerError = (event) => {
  if (!event.target.dataset.fallback) {
    event.target.dataset.fallback = '1'
    event.target.src = 'https://img.gamemonetize.com/default/1024x1024.jpg'
  }
}
</script>

<style lang="scss" scoped>
  .try-now {
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
      height: 560px;
      overflow: hidden;
      border-radius: 12px;
    }

    .el-carousel__item {
      height: 560px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :deep(.el-carousel__arrow) {
      background-color: rgba(255, 255, 255, 0.8);
      color: #333;
      border: none;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;

      &:hover {
        background-color: rgba(255, 255, 255, 1);
        transform: scale(1.05);
      }
    }

    :deep(.el-carousel__arrow--left) {
      left: 15px;
    }

    :deep(.el-carousel__arrow--right) {
      right: 15px;
    }
  }

  .relax-banner-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .try-now-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
    width: 100%;
  }

  @media (max-width: 768px) {
    .try-now :deep(.el-carousel),
    .try-now :deep(.el-carousel__item) {
      height: 380px !important;
    }
    .try-now-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }
  }
</style>