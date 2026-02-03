# 网站全方位优化总结

## 已完成的优化项

### 1. SEO 优化

| 项目 | 说明 |
|------|------|
| **Sitemap** | 新增 `scripts/generate-sitemap.js`，在 `npm run build` 时自动生成 `public/sitemap.xml`，包含首页、关于、隐私及所有游戏详情页 |
| **robots.txt** | 优化规则：明确 Allow `/games/`、`/homepage`、`/detailpage`；移除 Crawl-delay（Google 不识别） |
| **404 页面** | 新增 `NotFoundView.vue`，展示友好提示、返回首页按钮及热门游戏推荐 |
| **游戏详情页 SEO** | 每个游戏页动态设置：`title`、`description`、`og:*`、`twitter:*`、`canonical`、`VideoGame` 结构化数据 |
| **index.html** | 移除错误的 preload（`/src/main.js` 在构建后路径会变）；新增 `format-detection` 等 meta |

### 2. 性能优化

| 项目 | 说明 |
|------|------|
| **Vite 构建** | `target: 'es2020'`，减小打包体积 |
| **控制台清理** | 移除 DetailPage 中的 `console.log`，减少生产环境噪音 |

### 3. 路由与体验

| 项目 | 说明 |
|------|------|
| **404 路由** | 新增 `/:pathMatch(.*)*` 通配路由，未匹配路径统一进入 404 页 |
| **404 内容** | 展示 8 个热门游戏卡片，引导用户继续浏览 |

---

## 使用说明

### 构建前生成 Sitemap

```bash
npm run build
```

构建时会自动执行 `node scripts/generate-sitemap.js`，生成最新的 sitemap.xml。

也可单独执行：

```bash
node scripts/generate-sitemap.js
```

### 提交 Sitemap 到搜索引擎

1. **Google Search Console**：添加资源 → 站点地图 → 提交 `https://wegogame.net/sitemap.xml`
2. **Bing Webmaster Tools**：同样提交 sitemap 地址

---

## 后续可优化方向

1. **Core Web Vitals**：用 PageSpeed Insights 检测，优化 LCP、CLS
2. **图片优化**：游戏缩略图使用 WebP、添加 `width`/`height` 防 CLS
3. **预加载关键路由**：对首页、详情页做 `router prefetch`
4. **Service Worker**：可选 PWA，提升离线体验
