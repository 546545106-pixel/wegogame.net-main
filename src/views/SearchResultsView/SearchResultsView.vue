<template>
  <div class="search-results ui-optimized-content">
    <div class="ui-optimized-container">
      <div class="search-header">
        <h1 class="ui-optimized-page-title">搜索结果</h1>
        <p class="search-query" v-if="searchQuery">
          搜索关键词: <span>{{ searchQuery }}</span>
        </p>
      </div>
      
      <div class="search-filters" v-if="searchQuery">
        <div class="filter-group">
          <label>搜索范围:</label>
          <div class="filter-buttons">
            <button 
              v-for="scope in searchScopes" 
              :key="scope.value"
              :class="['filter-button', { active: activeScope === scope.value }]"
              @click="activeScope = scope.value"
            >
              {{ scope.label }}
            </button>
          </div>
        </div>
      </div>
      
      <div v-if="isLoading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>搜索中...</p>
      </div>
      
      <div v-else-if="filteredGames.length === 0 && searchQuery" class="no-results">
        <div class="no-results-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="13" y1="9" x2="8" y2="4"></line>
            <line x1="9" y1="8" x2="4" y2="13"></line>
          </svg>
        </div>
        <h3>未找到匹配的游戏</h3>
        <p>请尝试使用不同的关键词或搜索范围</p>
        <button class="back-button" @click="goBack">返回首页</button>
      </div>
      
      <div v-else-if="filteredGames.length > 0" class="games-grid">
        <div v-for="game in filteredGames" :key="game.id" class="game-card-wrapper">
          <div class="ui-optimized-game-card" @click="toDetail(game.id)" @touchstart="handleTouchStart">
            <div class="card-image">
              <img
                :src="game.thumb || 'https://img.gamemonetize.com/default/512x512.jpg'"
                :alt="game.title"
                loading="lazy"
                @error="handleImageError($event)"
              />
            </div>
            <div class="card-content">
              <div class="card-title ui-optimized-game-name">
                {{ getDisplayTitle(game) }}
              </div>
              <div class="card-footer">
                <span class="difficulty-tag ui-optimized-auxiliary-text" :class="getDifficultyClass(game)">
                  {{ getDifficultyText(game) }}
                </span>
                <span class="play-count ui-optimized-auxiliary-text">{{ getPlayCount(game) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="empty-search">
        <div class="empty-search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <h3>请输入搜索关键词</h3>
        <p>在顶部搜索框中输入游戏名称、标签或描述来查找游戏</p>
        <button class="back-button" @click="goBack">返回首页</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import localGamesData from '@/data/games.js'
import { getDifficultyClass, getDifficultyText, getPlayCount, getDisplayTitle } from '@/utils'
import { triggerHapticFeedback } from '@/utils/haptic'

const router = useRouter()
const route = useRoute()

const searchQuery = ref('')
const activeScope = ref('all')
const isLoading = ref(false)

const searchScopes = [
  { label: '全部', value: 'all' },
  { label: '游戏名称', value: 'title' },
  { label: '描述', value: 'description' },
  { label: '标签', value: 'tags' }
]

// 计算搜索结果
const filteredGames = computed(() => {
  if (!searchQuery.value) return []
  
  const query = searchQuery.value.toLowerCase()
  
  return localGamesData.filter(game => {
    if (activeScope.value === 'all') {
      return (
        game.title.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query) ||
        game.tags.toLowerCase().includes(query) ||
        game.category.toLowerCase().includes(query)
      )
    } else if (activeScope.value === 'title') {
      return game.title.toLowerCase().includes(query)
    } else if (activeScope.value === 'description') {
      return game.description.toLowerCase().includes(query)
    } else if (activeScope.value === 'tags') {
      return game.tags.toLowerCase().includes(query)
    }
    return false
  })
})

// 处理搜索
const performSearch = (query) => {
  if (!query) return
  
  isLoading.value = true
  searchQuery.value = query
  
  // 模拟搜索延迟，提升用户体验
  setTimeout(() => {
    isLoading.value = false
  }, 300)
}

// 跳转到游戏详情页
const toDetail = (id) => {
  // 添加用户行为追踪
  if (window.gtag) {
    gtag('event', 'game_click', {
      event_category: 'Search',
      event_label: 'Search Results',
      game_id: id,
      search_query: searchQuery.value
    })
  }
  
  router.push({
    path: '/detailpage',
    query: { id }
  })
}

// 返回首页
const goBack = () => {
  router.push('/')
}

// 处理触摸反馈
const handleTouchStart = () => {
  triggerHapticFeedback('light')
}

// 处理图片加载错误
const handleImageError = (event) => {
  if (event.target.src !== 'https://img.gamemonetize.com/default/512x512.jpg') {
    event.target.src = 'https://img.gamemonetize.com/default/512x512.jpg'
  }
}

// 组件挂载时获取搜索关键词
onMounted(() => {
  const query = route.query.q
  if (query) {
    performSearch(query)
  }
})
</script>

<style lang="scss" scoped>
.search-results {
  padding: 40px 0;
}

.search-header {
  margin-bottom: 30px;
}

.search-query {
  font-size: 16px;
  color: #666;
  margin-top: 10px;
  
  span {
    font-weight: 600;
    color: #333;
  }
}

.search-filters {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.filter-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-group label {
  font-weight: 600;
  color: #333;
  white-space: nowrap;
}

.filter-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  
  &:hover {
    border-color: #4A90E2;
    color: #4A90E2;
  }
  
  &.active {
    background-color: #4A90E2;
    border-color: #4A90E2;
    color: #fff;
  }
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
  
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #4A90E2;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
  }
  
  p {
    color: #666;
    font-size: 16px;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-results,
.empty-search {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
  text-align: center;
}

.no-results-icon,
.empty-search-icon {
  margin-bottom: 20px;
  color: #ccc;
}

.no-results h3,
.empty-search h3 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.no-results p,
.empty-search p {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
  max-width: 400px;
}

.back-button {
  padding: 10px 24px;
  background-color: #4A90E2;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #357ABD;
    transform: translateY(-2px);
  }
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

@media (max-width: 768px) {
  .search-results {
    padding: 20px 0;
  }
  
  .filter-group {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .filter-buttons {
    width: 100%;
  }
  
  .filter-button {
    flex: 1;
    min-width: 80px;
    text-align: center;
  }
  
  .games-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  
  .no-results,
  .empty-search {
    padding: 60px 0;
  }
}
</style>