// 统一广告管理模块
// 使用说明：
// 1. 在这里配置你的 AdSense 信息：
//    - 将 AD_CLIENT 改成你自己的 ca-pub-XXXXXX
//    - 将 SLOT_CONFIG 中的 adSlot 改为你在 AdSense 后台创建的广告位 ID
// 2. 游戏内部通过 /public/game-ad-api.js 调用 GameAdAPI.requestGameAd(slotId)
// 3. 本模块会监听 window.postMessage，按 slotId 决定展示哪个广告

// 你的 AdSense 发布商 ID（与 index.html / AdSense接入指南.md 一致）
const AD_CLIENT = 'ca-pub-5319587106206709'

// 按广告位标识配置映射关系
// key 必须和 GameAdAPI.requestGameAd(slotId) 里传入的 slotId 对应
// 60 款游戏统一使用同一个游戏内广告位，你可在 AdSense 后台创建一个「游戏插屏」单元，把下面 adSlot 换成该单元 ID
const GAME_INTERSTITIAL_SLOT = 'your-game-interstitial-slot-id' // 换成你在 AdSense 创建的游戏广告位 ID

const SLOT_CONFIG = {
  // ===== 站内常规广告位 =====
  homepage_banner_0: { type: 'adsense', adSlot: 'your-homepage-slot-id-0' },
  homepage_banner_1: { type: 'adsense', adSlot: 'your-homepage-slot-id-1' },

  // ===== 60 款游戏内广告（全部接你的 AdSense） =====
  game_01: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_02: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_03: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_04: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_05: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_06: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_07: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_08: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_09: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_10: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_11: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_12: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_13: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_14: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_15: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_16: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_17: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_18: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_19: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_20: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_21: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_22: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_23: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_24: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_25: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_26: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_27: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_28: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_29: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_30: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_31: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_32: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_33: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_34: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_35: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_36: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_37: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_38: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_39: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_40: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_41: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_42: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_43: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_44: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_45: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_46: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_47: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_48: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_49: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_50: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_51: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_52: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_53: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_54: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_55: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_56: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_57: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_58: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_59: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
  game_60: { type: 'adsense', adSlot: GAME_INTERSTITIAL_SLOT },
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

