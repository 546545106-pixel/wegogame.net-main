;(function (global) {
  /**
   * 统一的游戏广告调用接口。
   *
   * 使用方式（在游戏页面里）：
   *   1. 确保已经加载本文件：
   *        <script src="/game-ad-api.js"></script>
   *   2. 在需要展示广告的地方调用：
   *        var box = document.getElementById('game-ad-slot-top')
   *        if (window.GameAdAPI) {
   *          GameAdAPI.requestGameAd('game_code_top', { container: box })
   *        }
   *
   * 当前实现：
   *   - 在父页面存在时，通过 postMessage 通知父页面；
   *   - 父页面可以监听 message 事件，根据 slotId 自行渲染真正的广告。
   *   - 如果没有父页面，仅在本页面内占位。
   */

  function safePostMessage(message) {
    try {
      var target =
        global.parent && global.parent !== global ? global.parent : global
      if (!target || !target.postMessage) return
      target.postMessage(message, '*')
    } catch (e) {
      // 静默失败，避免影响游戏
      if (global.console && console.warn) {
        console.warn('GameAdAPI postMessage failed:', e)
      }
    }
  }

  /**
   * 请求在指定容器中渲染广告。
   *
   * @param {string} slotId - 广告位标识，如 'wuren_interstitial'
   * @param {Object} [options]
   * @param {HTMLElement} [options.container] - 要挂载的 DOM 容器
   * @param {string} [options.containerId] - 容器的 ID（如果还没有 DOM，可只传这个）
   * @param {Object} [options.extra] - 额外扩展信息（例如 game_code 等）
   */
  function requestGameAd(slotId, options) {
    options = options || {}

    var container =
      options.container ||
      (options.containerId
        ? global.document.getElementById(options.containerId)
        : null)

    // 在本页面里先占一个 div，避免版式空白
    if (container && !container.__gameAdPlaceholder__) {
      container.__gameAdPlaceholder__ = true
      container.style.position = container.style.position || 'relative'
      var placeholder = global.document.createElement('div')
      placeholder.className = 'game-ad-placeholder'
      placeholder.style.width = '100%'
      placeholder.style.height = '100%'
      placeholder.style.display = 'flex'
      placeholder.style.alignItems = 'center'
      placeholder.style.justifyContent = 'center'
      placeholder.style.boxSizing = 'border-box'
      placeholder.style.fontSize = '12px'
      placeholder.style.color = '#999'
      placeholder.style.background = 'rgba(0,0,0,0.03)'
      placeholder.innerHTML = 'Ad Slot: ' + slotId
      container.appendChild(placeholder)
    }

    // 通知父页面实际去加载 / 处理广告
    safePostMessage({
      type: 'GAME_AD_REQUEST',
      slotId: slotId,
      gameUrl: global.location ? global.location.href : '',
      containerId: options.containerId || (container && container.id) || '',
      extra: options.extra || null,
    })
  }

  global.GameAdAPI = {
    requestGameAd: requestGameAd,
  }
})(window)

