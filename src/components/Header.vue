<template>
    <div class="header ui-optimized-header">
        <div class="logo" @click="toHome">wooo</div>
        <ul class="nav-menu" :class="{ active: menuOpen }">
            <li :class="{ active: currentRoute === '/homepage' }" @click="navigate('/homepage')">首页</li>
            <li :class="{ active: currentRoute === '/category' }" @click="navigate('/category')">分类</li>
            <li :class="{ active: currentRoute === '/ranking' }" @click="navigate('/ranking')">排行榜</li>
            <li :class="{ active: currentRoute === '/my' }" @click="navigate('/my')">我的</li>
        </ul>
        <input 
            type="text" 
            class="search-box" 
            placeholder="搜索游戏..." 
            v-model="searchKeyword"
            @keyup.enter="handleSearch"
        />
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
        console.log('搜索:', searchKeyword.value);
    }
</script>

<style lang="scss" scoped>
    /* 使用全局优化样式，这里只保留必要的覆盖样式 */
    .header {
        /* 样式已在 ui-optimized.css 中定义 */
    }
</style>