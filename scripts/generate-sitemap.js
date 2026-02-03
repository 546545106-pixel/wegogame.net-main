/**
 * Generate sitemap.xml from games.js for SEO
 * Run: node scripts/generate-sitemap.js
 */
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const BASE_URL = 'https://wegogame.net'

// 读取 games.js 并解析游戏 id
const gamesPath = join(__dirname, '../src/data/games.js')
const content = readFileSync(gamesPath, 'utf-8')
const idMatches = content.matchAll(/id\s*:\s*['"]([^'"]+)['"]/g)
const ids = [...new Set([...idMatches].map(m => m[1]))]

const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/homepage', priority: '1.0', changefreq: 'daily' },
  { url: '/about', priority: '0.6', changefreq: 'monthly' },
  { url: '/privacy', priority: '0.4', changefreq: 'yearly' },
]

const gamePages = ids.map(id => ({
  url: `/detailpage?id=${id}`,
  priority: '0.8',
  changefreq: 'weekly',
}))

const allUrls = [...staticPages, ...gamePages]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(p => `  <url>
    <loc>${BASE_URL}${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`

const outPath = join(__dirname, '../public/sitemap.xml')
writeFileSync(outPath, sitemap, 'utf-8')
console.log(`Sitemap generated: ${outPath} (${allUrls.length} URLs)`)
