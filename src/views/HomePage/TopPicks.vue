<template>
  <div class="top-picks ui-optimized-content">
    <div class="ui-optimized-container">
      <div class="title ui-optimized-section-title">Top Picks</div>
      <div class="top-picks-grid">
        <div
          v-for="item in GamesList.filter((ele, index) => 25 <= index && index < 49)"
          :key="item.id"
        >
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
                {{ item.title }}
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
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import localGamesData from '@/data/games.js'
import { getDifficultyClass, getDifficultyText, getPlayCount } from '@/utils'
import { triggerHapticFeedback } from '@/utils/haptic'

const router = useRouter()

const GamesList = localGamesData

const toDetail = (id) => {
  router.push({
    path: '/detailpage',
    query: { id },
  })
}

const handleTouchStart = () => {
  triggerHapticFeedback('light')
}

const handleImageError = (event) => {
  if (event.target.src !== 'https://img.gamemonetize.com/default/512x512.jpg') {
    event.target.src = 'https://img.gamemonetize.com/default/512x512.jpg'
  }
}
</script>

<style lang="scss" scoped>
  .top-picks {
    width: 100%;
    overflow: hidden;
  }

  .top-picks-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
    width: 100%;
  }

  @media (max-width: 768px) {
    .top-picks-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }
  }
</style>