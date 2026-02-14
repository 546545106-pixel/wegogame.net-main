<template>
  <div class="blog-detail ui-optimized-content">
    <div class="ui-optimized-container">
      <button class="back-button" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5"></path>
          <path d="M12 19l-7-7 7-7"></path>
        </svg>
        Back to Blog
      </button>
      
      <div v-if="currentArticle" class="article-content">
        <div class="article-header">
          <h1 class="article-title ui-optimized-page-title">{{ currentArticle.title }}</h1>
          <div class="article-meta">
            <span class="article-date ui-optimized-auxiliary-text">{{ formatDate(currentArticle.date) }}</span>
            <span class="article-category ui-optimized-auxiliary-text">{{ currentArticle.category }}</span>
            <span class="article-views ui-optimized-auxiliary-text">{{ currentArticle.views }} Views</span>
          </div>
        </div>
        
        <div class="article-image">
          <img 
            :src="currentArticle.image" 
            :alt="currentArticle.title"
            @error="handleImageError($event)"
          />
        </div>
        
        <div class="article-body">
          <div v-html="currentArticle.content" class="article-text"></div>
        </div>
        
        <div class="article-tags">
          <span 
            v-for="tag in currentArticle.tags" 
            :key="tag"
            class="tag"
          >
            {{ tag }}
          </span>
        </div>
        
        <div class="article-share">
          <h4>Share Article</h4>
          <div class="share-buttons">
            <button class="share-button" @click="shareArticle('wechat')">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              WeChat
            </button>
            <button class="share-button" @click="shareArticle('weibo')">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
              Weibo
            </button>
            <button class="share-button" @click="shareArticle('copy')">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy Link
            </button>
          </div>
        </div>
      </div>
      
      <div v-else class="article-not-found">
        <div class="not-found-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </div>
        <h3>Article Not Found</h3>
        <p>Sorry, the article you're looking for doesn't exist or has been deleted</p>
        <button class="back-button" @click="goBack">Back to Blog</button>
      </div>
      
      <div class="related-articles" v-if="currentArticle && relatedArticles.length > 0">
        <h3 class="related-title">Related Articles</h3>
        <div class="related-grid">
          <div 
            v-for="article in relatedArticles" 
            :key="article.id"
            class="related-card"
            @click="toArticleDetail(article.id)"
            @touchstart="handleTouchStart"
          >
            <div class="related-image">
              <img 
                :src="article.image" 
                :alt="article.title"
                loading="lazy"
                @error="handleImageError($event)"
              />
            </div>
            <div class="related-content">
              <h4 class="related-title">{{ article.title }}</h4>
              <span class="related-date ui-optimized-auxiliary-text">{{ formatDate(article.date) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { triggerHapticFeedback } from '@/utils/haptic'
import blogArticles from '@/data/blog.js'

const router = useRouter()
const route = useRoute()

const currentArticle = ref(null)
const relatedArticles = ref([])

// 获取当前文章
const getCurrentArticle = (id) => {
  return blogArticles.find(article => article.id === id)
}

// 获取相关文章
const getRelatedArticles = (currentArticle, limit = 3) => {
  if (!currentArticle) return []
  
  return blogArticles
    .filter(article => 
      article.id !== currentArticle.id && 
      (article.category === currentArticle.category || 
       article.tags.some(tag => currentArticle.tags.includes(tag)))
    )
    .slice(0, limit)
}

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

// 跳转到文章详情页
const toArticleDetail = (id) => {
  router.push({
    path: '/blog/detail',
    query: { id }
  })
}

// 返回博客首页
const goBack = () => {
  router.push('/blog')
}

// 分享文章
const shareArticle = (platform) => {
  const url = window.location.href
  
  if (platform === 'copy') {
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('Link copied to clipboard')
      })
      .catch(err => {
        console.error('Copy failed:', err)
      })
  } else if (platform === 'wechat') {
    // WeChat sharing requires special handling, this is just a prompt
    alert('Please open this page in WeChat to share')
  } else if (platform === 'weibo') {
    const text = `${currentArticle.value.title} - From BreakPlay Game Blog`
    const weiboUrl = `http://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`
    window.open(weiboUrl, '_blank')
  }
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

// 组件挂载时获取文章
onMounted(() => {
  const articleId = route.query.id
  if (articleId) {
    const article = getCurrentArticle(articleId)
    if (article) {
      currentArticle.value = article
      relatedArticles.value = getRelatedArticles(article)
      
      // 更新页面标题
      document.title = `${article.title} - BreakPlay Game Blog`
    }
  }
})
</script>

<style lang="scss" scoped>
.blog-detail {
  padding: 40px 0;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: #f8f9fa;
  color: #333;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  margin-bottom: 30px;
  
  &:hover {
    background-color: #e9ecef;
    transform: translateY(-2px);
  }
}

.article-content {
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.article-header {
  padding: 30px;
  border-bottom: 1px solid #f0f0f0;
}

.article-title {
  font-size: 28px;
  margin-bottom: 20px;
  line-height: 1.3;
}

.article-meta {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.article-image {
  width: 100%;
  height: 400px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.article-body {
  padding: 30px;
}

.article-text {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  
  h2 {
    font-size: 24px;
    margin: 30px 0 20px;
    color: #222;
  }
  
  h3 {
    font-size: 20px;
    margin: 25px 0 15px;
    color: #333;
  }
  
  p {
    margin-bottom: 20px;
  }
  
  img {
    max-width: 100%;
    height: auto;
    margin: 20px 0;
    border-radius: 8px;
  }
  
  ul, ol {
    margin: 20px 0;
    padding-left: 30px;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  blockquote {
    border-left: 4px solid #4A90E2;
    padding-left: 20px;
    margin: 20px 0;
    color: #666;
    font-style: italic;
  }
}

.article-tags {
  padding: 0 30px 30px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tag {
  padding: 4px 12px;
  background-color: #f0f0f0;
  color: #666;
  border-radius: 12px;
  font-size: 12px;
}

.article-share {
  padding: 30px;
  border-top: 1px solid #f0f0f0;
  background-color: #f9f9f9;
}

.article-share h4 {
  margin-bottom: 15px;
  color: #333;
}

.share-buttons {
  display: flex;
  gap: 10px;
}

.share-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #fff;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #4A90E2;
    color: #4A90E2;
  }
}

.article-not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
  text-align: center;
}

.not-found-icon {
  margin-bottom: 20px;
  color: #ccc;
}

.article-not-found h3 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.article-not-found p {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
}

.related-articles {
  margin-top: 50px;
}

.related-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.related-card {
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

.related-image {
  height: 150px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  .related-card:hover img {
    transform: scale(1.05);
  }
}

.related-content {
  padding: 15px;
}

.related-content h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .blog-detail {
    padding: 20px 0;
  }
  
  .article-header {
    padding: 20px;
  }
  
  .article-title {
    font-size: 24px;
  }
  
  .article-meta {
    flex-direction: column;
    gap: 5px;
    align-items: flex-start;
  }
  
  .article-image {
    height: 200px;
  }
  
  .article-body {
    padding: 20px;
  }
  
  .article-text {
    font-size: 15px;
  }
  
  .article-tags {
    padding: 0 20px 20px;
  }
  
  .article-share {
    padding: 20px;
  }
  
  .share-buttons {
    flex-direction: column;
  }
  
  .share-button {
    justify-content: center;
  }
  
  .article-not-found {
    padding: 60px 0;
  }
  
  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>