// 自定义访客统计脚本
(function() {
  // 基础数据
  const BASE_UV = 10000;
  const BASE_PV = 50000;

  // 每日增长范围
  const UV_DAILY_INCREASE = { min: 20, max: 50 };
  const PV_DAILY_INCREASE = { min: 100, max: 300 };

  // 获取随机数
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // 获取当前数据
  function getCurrentStats() {
    const now = new Date();
    const lastUpdate = localStorage.getItem('visitorStatsLastUpdate');
    let uv = parseInt(localStorage.getItem('visitorStatsUV')) || BASE_UV;
    let pv = parseInt(localStorage.getItem('visitorStatsPV')) || BASE_PV;

    if (lastUpdate) {
      const lastUpdateDate = new Date(lastUpdate);
      const daysDiff = Math.floor((now - lastUpdateDate) / (1000 * 60 * 60 * 24));

      if (daysDiff > 0) {
        // 计算累计增长
        for (let i = 0; i < daysDiff; i++) {
          uv += getRandomInt(UV_DAILY_INCREASE.min, UV_DAILY_INCREASE.max);
          pv += getRandomInt(PV_DAILY_INCREASE.min, PV_DAILY_INCREASE.max);
        }

        // 保存更新后的数据
        localStorage.setItem('visitorStatsUV', uv);
        localStorage.setItem('visitorStatsPV', pv);
        localStorage.setItem('visitorStatsLastUpdate', now.toISOString());
      }
    } else {
      // 首次访问，初始化数据
      localStorage.setItem('visitorStatsUV', uv);
      localStorage.setItem('visitorStatsPV', pv);
      localStorage.setItem('visitorStatsLastUpdate', now.toISOString());
    }

    return { uv, pv };
  }

  // 更新页面显示
  function updateDisplay() {
    const stats = getCurrentStats();

    const uvElement = document.getElementById('custom_visitor_uv');
    const pvElement = document.getElementById('custom_visitor_pv');

    if (uvElement) {
      uvElement.textContent = stats.uv.toLocaleString();
    }
    if (pvElement) {
      pvElement.textContent = stats.pv.toLocaleString();
    }
  }

  // 页面加载完成后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateDisplay);
  } else {
    updateDisplay();
  }

  // 页面访问时增加PV（模拟真实访问）
  window.addEventListener('load', function() {
    const currentPV = parseInt(localStorage.getItem('visitorStatsPV')) || BASE_PV;
    localStorage.setItem('visitorStatsPV', currentPV + 1);
    updateDisplay();
  });
})();