// 统一广告管理模块
// 使用说明：
// 1. 在这里配置你的 AdSense 信息：
//    - 将 AD_CLIENT 改成你自己的 ca-pub-XXXXXX
//    - 将 SLOT_CONFIG 中的 adSlot 改为你在 AdSense 后台创建的广告位 ID
// 2. 游戏内部通过 /public/game-ad-api.js 调用 GameAdAPI.requestGameAd(slotId)
// 3. 本模块会监听 window.postMessage，按 slotId 决定展示哪个广告

const AD_CLIENT = 'ca-pub-xxxxxxxxxxxxxxxx' // TODO: 换成你自己的 ca-pub

// 按广告位标识配置映射关系
// key 必须和 GameAdAPI.requestGameAd(slotId) 里传入的 slotId 对应
const SLOT_CONFIG = {
  // ===== 示例：站内常规广告位 =====
  homepage_banner_0: {
    type: 'adsense',
    adSlot: 'your-homepage-slot-id-0',
  },
  homepage_banner_1: {
    type: 'adsense',
    adSlot: 'your-homepage-slot-id-1',
  },

  // ===== 示例：游戏内插屏广告 =====
  wuren_interstitial: {
    type: 'adsense',
    adSlot: 'your-game-slot-id-wuren',
  },
  luomazhiyue_interstitial: {
    type: 'adsense',
    adSlot: 'your-game-slot-id-luomazhiyue',
  },
  sdpp_interstitial: {
    type: 'adsense',
    adSlot: 'your-game-slot-id-sdpp',
  },
  shengdanpengpengle_interstitial: {
    type: 'adsense',
    adSlot: 'your-game-slot-id-shengdanpengpengle',
  },
}

function ensureAdSenseLoaded() {
  if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
    return
  }

  const existing = document.querySelector(
    'script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]',
  )
  if (existing) {
    return
  }

  const script = document.createElement('script')
  script.async = true
  // 建议你在 index.html 中保留官方的 AdSense 加载脚本
  // 这里只是兜底示例
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`
  script.crossOrigin = 'anonymous'
  document.head.appendChild(script)
}

function createOrGetOverlayContainer() {
  const id = 'game-ad-overlay'
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('div')
    el.id = id
    el.style.position = 'fixed'
    el.style.left = '0'
    el.style.right = '0'
    el.style.bottom = '0'
    el.style.zIndex = '9999'
    el.style.display = 'flex'
    el.style.justifyContent = 'center'
    el.style.pointerEvents = 'none' // 不挡住游戏操作（如需可改为 auto）
    document.body.appendChild(el)
  }
  return el
}

function renderAdSenseIn(container, config) {
  if (!AD_CLIENT || AD_CLIENT.includes('xxxxxxxx')) {
    console.warn(
      '[adManager] 请先在 src/utils/adManager.js 中配置你的 AD_CLIENT (ca-pub-...)',
    )
    return
  }

  ensureAdSenseLoaded()

  // 清空旧内容
  container.innerHTML = ''
  container.style.pointerEvents = 'auto'

  const ins = document.createElement('ins')
  ins.className = 'adsbygoogle'
  ins.style.display = 'block'
  ins.style.width = '320px'
  ins.style.height = '50px'
  ins.setAttribute('data-ad-client', AD_CLIENT)
  ins.setAttribute('data-ad-slot', config.adSlot || '')
  ins.setAttribute('data-ad-format', 'auto')
  ins.setAttribute('data-full-width-responsive', 'true')

  container.appendChild(ins)

  try {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  } catch (e) {
    console.warn('[adManager] AdSense push 错误: ', e)
  }
}

function handleGameAdRequest(message) {
  const data = message.data
  if (!data || data.type !== 'GAME_AD_REQUEST') return

  const { slotId } = data
  if (!slotId) return

  const config = SLOT_CONFIG[slotId]
  if (!config) {
    console.warn('[adManager] 未配置的广告位 slotId: ', slotId)
    return
  }

  // 当前示例：统一在页面底部的 overlay 中展示游戏广告
  const container = createOrGetOverlayContainer()

  if (config.type === 'adsense') {
    renderAdSenseIn(container, config)
  } else {
    console.warn('[adManager] 未实现的广告类型: ', config.type)
  }
}

// 监听来自 iframe / 子窗口的广告请求
window.addEventListener('message', handleGameAdRequest)

// 也暴露一个手动触发的接口，方便站内其它位置直接调用
export function requestAd(slotId) {
  handleGameAdRequest({ data: { type: 'GAME_AD_REQUEST', slotId } })
}

