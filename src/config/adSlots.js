/**
 * 全站仅使用同一 Google AdSense 发布商帐号结算（ca-pub-…）。
 * 可在 `.env` 中设置 VITE_ADSENSE_PUBLISHER_ID，与 index.html 历史默认值保持一致。
 *
 * 广告单元 ID（仅数字）：在 AdSense 后台「广告」→ 各单元复制「广告单元 ID」。
 *   VITE_ADSENSE_SLOT_DETAIL_TOP=1234567890
 * 未填写有效单元 ID 时，对应位置不会发起广告请求。
 */
const env = import.meta.env

/** 与 AdSense 帐号中的发布商 ID 一致 */
export const ADSENSE_PUBLISHER_ID =
  env.VITE_ADSENSE_PUBLISHER_ID || 'ca-pub-5319587106206709'

export const AD_SLOTS = {
  detailTop: env.VITE_ADSENSE_SLOT_DETAIL_TOP || '',
  detailMid: env.VITE_ADSENSE_SLOT_DETAIL_MID || '',
  detailBottom: env.VITE_ADSENSE_SLOT_DETAIL_BOTTOM || '',
  privacyBottom: env.VITE_ADSENSE_SLOT_PRIVACY_BOTTOM || '',
  aboutBottom: env.VITE_ADSENSE_SLOT_ABOUT_BOTTOM || '',
  contactBottom: env.VITE_ADSENSE_SLOT_CONTACT_BOTTOM || '',
  sidebarLeft: env.VITE_ADSENSE_SLOT_SIDEBAR_LEFT || '',
  sidebarRight: env.VITE_ADSENSE_SLOT_SIDEBAR_RIGHT || '',
  /** 游戏内 iframe 通过 game-ad-api 请求的插屏/横幅位（与 adManager.js 中 SLOT_CONFIG 一致） */
  gameInterstitial: env.VITE_ADSENSE_SLOT_GAME_INTERSTITIAL || '',
}

/** AdSense 单元 ID 为纯数字，长度通常 10 位左右 */
export function isValidAdSlot(slot) {
  if (slot == null || typeof slot !== 'string') return false
  const s = slot.trim()
  if (!s) return false
  if (/^your-/i.test(s)) return false
  if (/placeholder/i.test(s)) return false
  return /^\d{6,}$/.test(s)
}
