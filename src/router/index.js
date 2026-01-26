import { createRouter, createWebHistory } from 'vue-router'

// 懒加载组件，提高首屏加载速度
const Layout = () => import('@/layouts/index.vue')
const AboutView = () => import('@/views/AboutView/AboutView.vue')
const PrivacyView = () => import('@/views/PrivacyView/PrivacyView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: "/homepage",
      children: [
        {
          path: "/homepage",
          name: "homepage",
          component: () => import(/* webpackChunkName: "homepage" */ "@/views/HomePage/index.vue"),
          meta: {
            title: "Free Online Games - Play Now!",
            description: "Play free online games including puzzle, action, adventure, strategy and more. Enjoy unlimited gaming fun on our platform!",
            keywords: "free online games, puzzle games, action games, adventure games, strategy games, browser games"
          },
        },
        {
          path: '/detailpage',
          name: "detailpage",
          component: () => import(/* webpackChunkName: "detailpage" */ "@/views/DetailPage/index.vue"),
          meta: {
            title: "Game Details - Free Online Games",
            description: "Play this exciting game now!",
            keywords: "online game, free game, browser game"
          },
        },
      ]
    },
    {
      path: '/about',
      component: AboutView,
      meta: {
        title: "About Us - Free Online Games",
        description: "Learn more about our free online games platform."
      },
    },
    {
      path: '/privacy',
      component: PrivacyView,
      meta: {
        title: "Privacy Policy - Free Online Games",
        description: "Read our privacy policy to understand how we protect your data."
      },
    },
  ],
  // 路由滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// 路由守卫：动态更新页面标题和SEO meta标签
router.beforeEach((to, from, next) => {
  // 更新页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'Free Online Games - Play Now!'
  }
  
  // 更新SEO meta标签
  updateMetaTags(to.meta)
  
  // 允许访问隐私页面和关于页面（用户希望保留这些功能）
  // 不再阻止从详情页进入这些页面
  next()
})

// 更新meta标签的函数
function updateMetaTags(meta) {
  // 更新description
  let metaDescription = document.querySelector('meta[name="description"]')
  if (!metaDescription) {
    metaDescription = document.createElement('meta')
    metaDescription.setAttribute('name', 'description')
    document.head.appendChild(metaDescription)
  }
  metaDescription.setAttribute('content', meta.description || 'Play free online games including puzzle, action, adventure, strategy and more.')
  
  // 更新keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]')
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta')
    metaKeywords.setAttribute('name', 'keywords')
    document.head.appendChild(metaKeywords)
  }
  metaKeywords.setAttribute('content', meta.keywords || 'free online games, puzzle games, action games, adventure games, strategy games, browser games')
  
  // 更新Open Graph
  updateOGTag('og:title', meta.title || 'Free Online Games - Play Now!')
  updateOGTag('og:description', meta.description || 'Play free online games including puzzle, action, adventure, strategy and more.')
  
  // 更新Twitter Card
  updateTwitterTag('twitter:title', meta.title || 'Free Online Games - Play Now!')
  updateTwitterTag('twitter:description', meta.description || 'Play free online games including puzzle, action, adventure, strategy and more.')
}

function updateOGTag(property, content) {
  let tag = document.querySelector(`meta[property="${property}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('property', property)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function updateTwitterTag(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

export default router
