<template>
    <div class="new-games ui-optimized-content">
        <div class="ui-optimized-container">
            <div class="title ui-optimized-section-title">NEW GAMES</div>
            <el-row :gutter="16" class="ui-optimized-game-list" justify="center">
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3"
                    v-for="item in displayedGames"
                    :key="item.id"
                >
                    <div class="ui-optimized-game-card" @click="toDetail(item.id)" @touchstart="handleTouchStart">
                        <div class="card-image">
                            <img 
                                v-lazy="item.thumb || 'https://img.gamemonetize.com/default/512x512.jpg'" 
                                :alt="item.title"
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
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { ElRow, ElCol } from 'element-plus';
    import { useRouter } from "vue-router";
    import localGamesData from '@/data/games.js';
    import { getDifficultyClass, getDifficultyText, getPlayCount } from '@/utils';
    import { triggerHapticFeedback } from '@/utils/haptic';

    const router = useRouter();
    
    // 使用computed优化列表过滤，避免每次渲染都重新计算
    // 增加显示数量，填满页面
    const displayedGames = computed(() => {
      return localGamesData.slice(0, 24);
    });
    
    const toDetail = (id) => {
      // 添加用户行为追踪
      if (window.gtag) {
        gtag('event', 'game_click', {
          'event_category': 'Game',
          'event_label': 'New Games',
          'game_id': id
        });
      }
      
      router.push({
        path: '/detailpage',
        query: { id }
      });
    };

    const handleTouchStart = () => {
      triggerHapticFeedback('light');
    };

    const handleImageError = (event) => {
      // 如果图片加载失败，使用默认头像
      if (event.target.src !== 'https://img.gamemonetize.com/default/512x512.jpg') {
        event.target.src = 'https://img.gamemonetize.com/default/512x512.jpg';
      }
    };
</script>

<style lang="scss" scoped>
    .new-games {
        width: 100%;
        overflow: hidden;
    }
</style>