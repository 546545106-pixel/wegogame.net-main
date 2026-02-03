<template>
  <div class="not-found">
    <div class="content">
      <h1 class="title">404</h1>
      <p class="message">Page not found. The game or page you're looking for doesn't exist.</p>
      <router-link to="/homepage" class="btn ui-optimized-button">Back to Home</router-link>
      <div class="popular-games" v-if="popularGames.length">
        <p class="subtitle">Try these popular games:</p>
        <div class="game-grid">
          <div
            v-for="g in popularGames"
            :key="g.id"
            class="game-card"
            @click="$router.push({ path: '/detailpage', query: { id: g.id } })"
          >
            <img :src="g.thumb || fallbackThumb" :alt="g.title" loading="lazy" />
            <span>{{ getDisplayTitle(g) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import localGamesData from '@/data/games.js'
import { getDisplayTitle } from '@/utils'

const fallbackThumb = 'https://img.gamemonetize.com/default/512x512.jpg'
const popularGames = computed(() => localGamesData.slice(0, 8))
</script>

<style lang="scss" scoped>
.not-found {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}
.content {
  text-align: center;
  max-width: 600px;
}
.title {
  font-size: 72px;
  font-weight: bold;
  color: #4a90e2;
  margin-bottom: 16px;
}
.message {
  font-size: 18px;
  color: #666;
  margin-bottom: 24px;
}
.btn {
  display: inline-block;
  padding: 12px 32px;
  text-decoration: none;
  margin-bottom: 40px;
}
.subtitle {
  font-size: 16px;
  color: #333;
  margin-bottom: 16px;
}
.game-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 20px;
}
.game-card {
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}
.game-card:hover {
  transform: translateY(-4px);
}
.game-card img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  display: block;
}
.game-card span {
  display: block;
  padding: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
@media (max-width: 768px) {
  .game-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
