<template>
    <div class="similar-games">
        <div class="title">Similar Games</div>
        <div class="games-container">
            <el-row :gutter="10" justify="center">
                <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4"
                    v-for="item in GamesList"
                    :key="item.id"
                >
                    <div class="box" @click="toDetail(item.id)">
                        <img 
                            class="img" 
                            v-lazy="item.thumb || 'https://img.gamemonetize.com/default/512x512.jpg'" 
                            :alt="item.title"
                            @error="handleImageError($event)"
                        />
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup>

    import { computed } from 'vue';
    import { defineEmits } from 'vue';
    import { ElRow, ElCol } from 'element-plus';
    import localGamesData from '@/data/games.js';
    import { getRandomElements } from '@/utils'

    import { useRouter, useRoute } from "vue-router";
    
    const router = useRouter();
    const route = useRoute();
    const emit = defineEmits(['childEvent']);

    // 获取当前游戏ID，排除当前游戏
    const currentGameId = computed(() => route.query.id);
    
    // 过滤掉当前游戏，然后随机选择24个游戏（如果游戏总数足够）
    const availableGames = computed(() => {
        return localGamesData.filter(game => game.id !== currentGameId.value);
    });
    
    // 增加游戏数量，填充空白区域（显示24个游戏，确保填满空间）
    const GamesList = computed(() => {
        const maxGames = Math.min(24, availableGames.value.length);
        if (maxGames > 0) {
            return getRandomElements(availableGames.value, maxGames);
        }
        return [];
    });

    const toDetail = (id) => {
        emit('childEvent', id);
        router.push({
            path: '/detailpage',
            query: { id }
        });
    };

    const handleImageError = (event) => {
        if (event.target.src !== 'https://img.gamemonetize.com/default/512x512.jpg') {
            event.target.src = 'https://img.gamemonetize.com/default/512x512.jpg';
        }
    };

</script>

<style lang="scss" scoped>
    .similar-games {
        width: 100%;
        overflow: hidden;
        padding: 20px 0;
        
        .title {
            font-size: 21px;
            color: #25b3e5;
            line-height: 36px;
            font-weight: bold;
            padding: 10px 15px;
            text-align: center;
        }
        
        .games-container {
            padding: 0 15px;
            
            .el-row {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                
                .el-col {
                    margin-bottom: 15px;
                    
                    .box {
                        background: #fff;
                        border-radius: 8px;
                        overflow: hidden;
                        cursor: pointer;
                        transition: transform 0.2s, box-shadow 0.2s;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                        
                        &:hover {
                            transform: translateY(-3px);
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                        }
                        
                        &:active {
                            transform: translateY(-1px);
                        }
                    }
                    
                    .img {
                        width: 100%;
                        height: 140px;
                        background: #eee;
                        object-fit: cover;
                        display: block;
                    }
                }
            }
        }
    }
</style>