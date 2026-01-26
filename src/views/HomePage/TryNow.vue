<template>
    <div class="try-now ui-optimized-content">
        <div class="ui-optimized-container">
            <div class="title ui-optimized-section-title">Try Now</div>
            <el-row :gutter="16" class="ui-optimized-game-list" justify="center">
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3"
                    v-for="item in GamesList"
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
    import { ref } from 'vue';
    import { ElRow, ElCol, ElPagination } from 'element-plus';
    import { useRouter } from "vue-router";
    import localGamesData from '@/data/games.js';
    import { getDifficultyClass, getDifficultyText, getPlayCount } from '@/utils';
    import { triggerHapticFeedback } from '@/utils/haptic';
    
    const router = useRouter();
    
    let GamesList = ref(localGamesData.filter((ele, index) => 49 <= index && index < 73));
    let pageSize = 24; // 增加每页显示数量，充分利用空间
    let total = localGamesData.filter((ele, index) => index >= 49).length;
    
    const toDetail = (id) => {
      router.push({
        path: '/detailpage',
        query: { id }
      });
    };

    const currentChange = (val) => {
        const startIndex = (val - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        GamesList.value = localGamesData.filter((ele, index) => index >= 49 && index < 49 + total).slice(startIndex, endIndex);
    }

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
    .try-now {
        width: 100%;
        overflow: hidden;
    }
</style>