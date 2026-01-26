<template>
    <div class="top-picks ui-optimized-content">
        <div class="ui-optimized-container">
            <div class="title ui-optimized-section-title">Top Picks</div>
            <el-row :gutter="16" class="ui-optimized-game-list" justify="center">
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3"
                    v-for="item in GamesList.filter((ele, index) => 25 <= index && index < 49)"
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
    import { ElRow, ElCol } from 'element-plus';
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
    .top-picks {
        width: 100%;
        overflow: hidden;
    }
</style>