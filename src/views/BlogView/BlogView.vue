<template>
  <div class="blog ui-optimized-content">
    <div class="ui-optimized-container">
      <div class="blog-header">
        <h1 class="ui-optimized-page-title">Game Blog</h1>
        <p class="blog-description ui-optimized-auxiliary-text">
          Latest game news, tips, and reviews
        </p>
      </div>
      
      <div class="blog-categories" v-if="categories.length > 0">
        <button 
          v-for="category in categories" 
          :key="category"
          :class="['category-button', { active: activeCategory === category }]"
          @click="activeCategory = category"
        >
          {{ category }}
        </button>
      </div>
      
      <div class="blog-grid">
        <div 
          v-for="article in filteredArticles" 
          :key="article.id"
          class="blog-card"
          @click="toArticleDetail(article.id)"
          @touchstart="handleTouchStart"
        >
          <div class="blog-card-image">
            <img 
              :src="article.image" 
              :alt="article.title"
              loading="lazy"
              @error="handleImageError($event)"
            />
            <div class="blog-card-category">{{ article.category }}</div>
          </div>
          <div class="blog-card-content">
            <h3 class="blog-card-title">{{ article.title }}</h3>
            <p class="blog-card-excerpt">{{ article.excerpt }}</p>
            <div class="blog-card-meta">
              <span class="blog-card-date">{{ formatDate(article.date) }}</span>
              <span class="blog-card-views">{{ article.views }} Views</span>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="filteredArticles.length === 0" class="no-articles">
        <div class="no-articles-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </div>
        <h3>No Articles</h3>
        <p>Stay tuned for more exciting content</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { triggerHapticFeedback } from '@/utils/haptic'
import blogArticles from '@/data/blog.js'

const router = useRouter()
const activeCategory = ref('All')

// 提取所有分类
const categories = computed(() => {
  const cats = ['All']
  const uniqueCats = new Set(blogArticles.map(article => article.category))
  uniqueCats.forEach(cat => cats.push(cat))
  return cats
})

// 根据分类过滤文章
const filteredArticles = computed(() => {
  if (activeCategory.value === 'All') {
    return blogArticles
  }
  return blogArticles.filter(article => article.category === activeCategory.value)
})

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

// 跳转到文章详情页
const toArticleDetail = (id) => {
  // 添加用户行为追踪
  if (window.gtag) {
    gtag('event', 'article_click', {
      event_category: 'Blog',
      event_label: 'Blog List',
      article_id: id
    })
  }
  
  router.push({
    path: '/blog/detail',
    query: { id }
  })
}

// 处理触摸反馈
const handleTouchStart = () => {
  triggerHapticFeedback('light')
}

// 处理图片加载错误
const handleImageError = (event) => {
  if (event.target.src !== 'https://img.gamemonetize.com/default/1024x1024.jpg') {
    event.target.src = 'https://img.gamemonetize.com/default/1024x1024.jpg'
  }
}
</script>

<style lang="scss" scoped>
.blog {
  padding: 40px 0;
}

.blog-header {
  margin-bottom: 40px;
  text-align: center;
}

.blog-description {
  margin-top: 10px;
  color: #666;
}

.blog-categories {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.category-button {
  padding: 8px 20px;
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

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.blog-card {
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
}

.blog-card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  .blog-card:hover img {
    transform: scale(1.05);
  }
}

.blog-card-category {
  position: absolute;
  top: 15px;
  left: 15px;
  padding: 4px 12px;
  background-color: #4A90E2;
  color: #fff;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.blog-card-content {
  padding: 20px;
}

.blog-card-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
  line-height: 1.4;
}

.blog-card-excerpt {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #999;
}

.no-articles {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
  text-align: center;
}

.no-articles-icon {
  margin-bottom: 20px;
  color: #ccc;
}

.no-articles h3 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.no-articles p {
  font-size: 16px;
  color: #666;
}

@media (max-width: 768px) {
  .blog {
    padding: 20px 0;
  }
  
  .blog-header {
    margin-bottom: 20px;
  }
  
  .blog-categories {
    margin-bottom: 20px;
  }
  
  .category-button {
    flex: 1;
    min-width: 80px;
    text-align: center;
  }
  
  .blog-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .blog-card-image {
    height: 180px;
  }
  
  .no-articles {
    padding: 60px 0;
  }
}
</style>