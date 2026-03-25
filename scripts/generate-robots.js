/**
 * Generate robots.txt with the correct sitemap URL.
 * Run: node scripts/generate-robots.js
 *
 * Cloudflare/host should set SITE_URL (recommended) to your actual domain,
 * so Search Console validations won't fail due to sitemap host mismatch.
 */
import { writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const BASE_URL = process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://wegogame.net'
const outPath = join(__dirname, '../public/robots.txt')

const content = `# robots.txt for Free Online Games
User-agent: *
Allow: /
Allow: /games/
Allow: /homepage
Allow: /detailpage
Disallow: /api/
Disallow: /admin/

Sitemap: ${BASE_URL.replace(/\\/$/, '')}/sitemap.xml
`

writeFileSync(outPath, content, 'utf-8')
console.log(`Robots generated: ${outPath}`)

