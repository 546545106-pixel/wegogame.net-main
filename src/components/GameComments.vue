<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const props = defineProps({
  gameId: {
    type: String,
    required: true
  },
  gameTitle: {
    type: String,
    required: true
  }
})

// 模拟评论数据
const comments = ref([
  {
    id: '1',
    username: '游戏爱好者',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    content: '这款游戏非常好玩，画面精美，操作流畅，推荐给大家！',
    date: '2024-01-15 14:30'
  },
  {
    id: '2',
    username: '休闲玩家',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4,
    content: '游戏不错，适合打发时间，难度适中，值得一试。',
    date: '2024-01-10 09:15'
  },
  {
    id: '3',
    username: '硬核玩家',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    rating: 3,
    content: '游戏还可以，但是有些关卡难度有点高，希望能优化一下。',
    date: '2024-01-05 16:45'
  }
])

// 新评论表单
const newComment = ref({
  username: '',
  content: '',
  rating: 5
})

// 计算平均评分
const averageRating = computed(() => {
  if (comments.value.length === 0) return 0
  const sum = comments.value.reduce((acc, comment) => acc + comment.rating, 0)
  return (sum / comments.value.length).toFixed(1)
})

// 提交评论
const submitComment = () => {
  if (!newComment.value.username) {
    ElMessage.warning('请输入用户名')
    return
  }
  if (!newComment.value.content) {
    ElMessage.warning('请输入评论内容')
    return
  }
  if (!newComment.value.rating) {
    ElMessage.warning('请选择评分')
    return
  }

  // 添加新评论
  const comment = {
    id: Date.now().toString(),
    username: newComment.value.username,
    avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
    rating: newComment.value.rating,
    content: newComment.value.content,
    date: new Date().toLocaleString('zh-CN')
  }

  comments.value.unshift(comment)
  
  // 重置表单
  newComment.value = {
    username: '',
    content: '',
    rating: 5
  }

  ElMessage.success('评论提交成功！')
}

// 删除评论
const deleteComment = (commentId) => {
  ElMessageBox.confirm('确定要删除这条评论吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    comments.value = comments.value.filter(comment => comment.id !== commentId)
    ElMessage.success('评论删除成功！')
  }).catch(() => {
    // 取消删除
  })
}

// 生成星级评分
const generateStars = (rating) => {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= rating)
  }
  return stars
}
</script>

<template>
  <div class="game-comments">
    <div class="comments-header">
      <h3 class="comments-title">游戏评论</h3>
      <div class="rating-summary">
        <span class="average-rating">{{ averageRating }}</span>
        <div class="stars">
          <i 
            v-for="(filled, index) in generateStars(parseFloat(averageRating))" 
            :key="index"
            class="star" 
            :class="{ 'filled': filled }"
          >★</i>
        </div>
        <span class="comment-count">({{ comments.length }} 条评论)</span>
      </div>
    </div>

    <!-- 评论表单 -->
    <div class="comment-form">
      <h4>发表评论</h4>
      <div class="form-group">
        <label for="username">用户名</label>
        <input 
          type="text" 
          id="username" 
          v-model="newComment.username" 
          placeholder="请输入您的用户名"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label>评分</label>
        <div class="rating-input">
          <i 
            v-for="i in 5" 
            :key="i"
            class="star" 
            :class="{ 'filled': i <= newComment.rating }"
            @click="newComment.rating = i"
          >★</i>
        </div>
      </div>
      <div class="form-group">
        <label for="content">评论内容</label>
        <textarea 
          id="content" 
          v-model="newComment.content" 
          placeholder="请输入您的评论内容"
          class="form-control"
          rows="4"
        ></textarea>
      </div>
      <button class="submit-btn" @click="submitComment">提交评论</button>
    </div>

    <!-- 评论列表 -->
    <div class="comments-list">
      <div 
        v-for="comment in comments" 
        :key="comment.id"
        class="comment-item"
      >
        <div class="comment-avatar">
          <img :src="comment.avatar" :alt="comment.username">
        </div>
        <div class="comment-content">
          <div class="comment-header">
            <span class="comment-username">{{ comment.username }}</span>
            <div class="comment-rating">
              <i 
                v-for="(filled, index) in generateStars(comment.rating)" 
                :key="index"
                class="star" 
                :class="{ 'filled': filled }"
              >★</i>
            </div>
            <span class="comment-date">{{ comment.date }}</span>
          </div>
          <p class="comment-text">{{ comment.content }}</p>
          <div class="comment-actions">
            <button class="delete-btn" @click="deleteComment(comment.id)">删除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-comments {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin-top: 30px;
}

.comments-header {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.comments-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.rating-summary {
  display: flex;
  align-items: center;
  gap: 10px;
}

.average-rating {
  font-size: 24px;
  font-weight: bold;
  color: #ff9500;
}

.stars {
  display: flex;
  gap: 2px;
}

.star {
  font-size: 16px;
  color: #ddd;
  cursor: pointer;
}

.star.filled {
  color: #ff9500;
}

.comment-count {
  color: #666;
  font-size: 14px;
}

.comment-form {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.comment-form h4 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-control:focus {
  outline: none;
  border-color: #4A90E2;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.rating-input {
  display: flex;
  gap: 5px;
}

.rating-input .star {
  font-size: 20px;
}

.submit-btn {
  background-color: #4A90E2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #357ABD;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.comment-item {
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  gap: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.comment-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.comment-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.comment-username {
  font-weight: bold;
  color: #333;
}

.comment-rating {
  display: flex;
  gap: 2px;
}

.comment-date {
  font-size: 12px;
  color: #999;
  margin-left: auto;
}

.comment-text {
  color: #333;
  line-height: 1.5;
  margin-bottom: 10px;
}

.comment-actions {
  text-align: right;
}

.delete-btn {
  background-color: transparent;
  color: #ff3b30;
  border: none;
  font-size: 12px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background-color: rgba(255, 59, 48, 0.1);
}

@media (max-width: 768px) {
  .game-comments {
    padding: 15px;
  }

  .comment-form {
    padding: 15px;
  }

  .comment-item {
    padding: 12px;
    gap: 12px;
  }

  .comment-avatar {
    width: 40px;
    height: 40px;
  }

  .comments-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .rating-summary {
    width: 100%;
    justify-content: space-between;
  }
}
</style>