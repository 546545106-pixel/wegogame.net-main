<template>
    <div class="header ui-optimized-header">
        <div class="logo" @click="toHome">BreakPlay</div>
        <ul class="nav-menu" :class="{ active: menuOpen }">
            <li :class="{ active: currentRoute === '/homepage' }" @click="navigate('/homepage')">首页</li>
            <li :class="{ active: currentRoute === '/category' }" @click="navigate('/category')">分类</li>
            <li :class="{ active: currentRoute === '/ranking' }" @click="navigate('/ranking')">排行榜</li>
            <li :class="{ active: currentRoute === '/blog' }" @click="navigate('/blog')">博客</li>
            <li :class="{ active: currentRoute === '/my' }" @click="navigate('/my')">我的</li>
        </ul>
        <div class="search-container">
        <input 
            type="text" 
            class="search-box" 
            placeholder="搜索游戏..." 
            v-model="searchKeyword"
            @keyup.enter="handleSearch"
        />
        <button class="search-button" @click="handleSearch">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        </button>
    </div>
        <div class="hamburger" @click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { useRouter, useRoute } from "vue-router";
    
    const router = useRouter();
    const route = useRoute();
    const menuOpen = ref(false);
    const searchKeyword = ref('');

    const currentRoute = computed(() => route.path);

    const toHome = () => {
        router.push("/homepage");
        menuOpen.value = false;
    }

    const navigate = (path) => {
        router.push(path);
        menuOpen.value = false;
    }

    const toggleMenu = () => {
        menuOpen.value = !menuOpen.value;
    }

    const handleSearch = () => {
        // 搜索功能可以在这里实现
        if (searchKeyword.value.trim()) {
            router.push({
                path: '/search',
                query: { q: searchKeyword.value.trim() }
            });
        }
    }
</script>

<style lang="scss" scoped>
    /* 使用全局优化样式，这里只保留必要的覆盖样式 */
    .header {
        /* 样式已在 ui-optimized.css 中定义 */
    }
    
    .search-container {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        max-width: 300px;
        margin: 0 20px;
    }
    
    .search-box {
        flex: 1;
        padding: 8px 12px;
        padding-right: 40px;
        border: 1px solid #ddd;
        border-radius: 20px;
        font-size: 14px;
        outline: none;
        transition: all 0.3s ease;
    }
    
    .search-box:focus {
        border-color: #4A90E2;
        box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
    }
    
    .search-button {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        padding: 6px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }
    
    .search-button:hover {
        background-color: #f0f0f0;
        color: #333;
    }
    
    @media (max-width: 768px) {
        .search-container {
            max-width: 100%;
            margin: 10px 0;
        }
        
        .search-box {
            padding: 10px 16px;
            padding-right: 45px;
        }
        
        .search-button {
            padding: 8px;
        }
    }
</style>