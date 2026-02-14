<template>
    <div class="header ui-optimized-header">
        <div class="logo" @click="toHome">BreakPlay</div>
        <ul class="nav-menu" :class="{ active: menuOpen }">
            <li :class="{ active: currentRoute === '/homepage' }" @click="navigate('/homepage')">Home</li>
            <li :class="{ active: currentRoute === '/category' }" @click="navigate('/category')">Categories</li>
            <li :class="{ active: currentRoute === '/ranking' }" @click="navigate('/ranking')">Ranking</li>
            <li :class="{ active: currentRoute === '/blog' }" @click="navigate('/blog')">Blog</li>
            <li :class="{ active: currentRoute === '/my' }" @click="navigate('/my')">My</li>
        </ul>
        <div class="search-container">
        <input 
            type="text" 
            class="search-box" 
            placeholder="Search games..." 
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
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px 20px;
        background-color: #fff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 0;
        z-index: 1000;
    }
    
    .logo {
        font-size: 24px;
        font-weight: bold;
        color: #4A90E2;
        cursor: pointer;
    }
    
    .nav-menu {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        gap: 20px;
    }
    
    .nav-menu li {
        padding: 8px 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        border-radius: 4px;
    }
    
    .nav-menu li:hover {
        background-color: rgba(74, 144, 226, 0.1);
        color: #4A90E2;
    }
    
    .nav-menu li.active {
        background-color: #4A90E2;
        color: #fff;
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
    
    .hamburger {
        display: none;
        flex-direction: column;
        gap: 4px;
        cursor: pointer;
    }
    
    .hamburger span {
        width: 24px;
        height: 2px;
        background-color: #333;
        transition: all 0.3s ease;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background-color: #fff;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transform: translateY(-150%);
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease;
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
            pointer-events: all;
        }
        
        .hamburger {
            display: flex;
        }
        
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