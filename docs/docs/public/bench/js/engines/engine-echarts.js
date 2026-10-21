/**
 * ECharts 渲染引擎，两种形态，用来量化"调优到底救回多少"：
 *
 *  naive —— 朴素用法：全量数据 + 每次更新 setOption 整数组 + 无 sampling。
 *           这是绝大多数项目的真实写法，也是"数据一大就卡"的直接来源。
 *  tuned —— 工程用法：LTTB 降采样 + rAF 合帧 + 只喂可视窗口 + 关闭动画。
 *           它能把 ECharts 拉回可用区间，但代价是丢精度、丢历史（见 README 结论）。
 *
 * 两者共用同一套 option 与同一份数据，差别只在 sampling / 窗口 / 更新时机。
 */

const PANEL_BG = '#080c11';

export class EChartsEngine {
  constructor(host, opts) {
    this.host = host;
    this.mode = opts.mode || 'tuned';
    this.defs = opts.defs;
    this.spanMs = opts.spanMs || 60000;
    this.onDrawn = opts.onDrawn || (() => {});
    this.onFrame = opts.onFrame || (() => {});
    this.pairs = new Map();
    this.pendingTs = 0;
    this.raf = 0;
    this._firstFrame = null;

    this.host.innerHTML = '';
    this.chart = echarts.init(this.host, null, { renderer: 'canvas', useDirtyRect: false });
    this._ro = new ResizeObserver(() => this.chart.resize());
    this._ro.observe(this.host);

    this.chart.on('rendered', () => {
      const ts = this.pendingTs;
      this.pendingTs = 0;
      this.onDrawn(ts || 0);
      if (this._firstFrame) { const r = this._firstFrame; this._firstFrame = null; r(); }
    });
  }

  _blank() {
    return this.defs.map((d) => ({
      type: 'line',
      name: d.name,
      showSymbol: false,
      clip: true,
      animation: false,
      lineStyle: { width: 1.4, color: d.color },
      itemStyle: { color: d.color },
      sampling: this.mode === 'tuned' ? 'lttb' : undefined,
      data: [],
    }));
  }

  _option(series) {
    return {
      animation: false,
      backgroundColor: PANEL_BG,
      textStyle: { fontFamily: '"SF Mono", ui-monospace, Menlo, monospace' },
      grid: { left: 64, right: 14, top: 18, bottom: 26 },
      legend: {
        top: 0, left: 64, itemWidth: 8, itemHeight: 2, itemGap: 14,
        textStyle: { color: '#7f8fa3', fontSize: 10 },
        icon: 'rect',
      },
      xAxis: {
        type: 'time',
        axisLine: { lineStyle: { color: '#1e2a38' } },
        axisLabel: { color: '#5e7186', fontSize: 10, hideOverlap: true },
        axisTick: { show: false },
        splitLine: { show: true, lineStyle: { color: 'rgba(40,58,78,.55)' } },
      },
      // 6 条序列量纲不同，各挂一个隐藏 y 轴，避免互相压扁
      yAxis: this.defs.map((_, i) => ({
        type: 'value',
        show: false,
        scale: true,
        splitLine: { show: i === 0, lineStyle: { color: 'rgba(40,58,78,.55)' } },
        axisLabel: { show: false },
      })),
      series: series.map((s, i) => ({ ...s, yAxisIndex: i })),
    };
  }

  _toPairs(series) {
    const n = series.t.length;
    const out = new Array(n);
    for (let i = 0; i < n; i++) out[i] = [series.t[i], series.v[i]];
    return out;
  }

  _windowStart(span) {
    const now = performance.now();
    return now - span;
  }

  /** 历史数据一次性载入（对应真实系统"打开历史查询"） */
  load(backfill) {
    this.backfill = backfill; // 回看全历史时要从原始历史重建，故持有引用
    const t0 = performance.now();
    const now = performance.now();
    const span = this.spanMs;
    const series = this._blank();
    let total = 0;

    for (let i = 0; i < this.defs.length; i++) {
      const d = this.defs[i];
      const src = backfill.get(d.id);
      if (!src) continue;

      let pairs;
      if (this.mode === 'naive') {
        pairs = this._toPairs(src);           // 全量：1 个点 1 个数组
      } else {
        const cut = this._windowStart(span * 1.15); // 只喂可视窗口（这是调优的第一刀）
        let k = 0;
        while (k < src.t.length && src.t[k] < cut) k++;
        pairs = this._toPairs({ t: src.t.subarray(k), v: src.v.subarray(k) });
      }
      this.pairs.set(d.id, pairs);
      series[i].data = pairs;
      total += pairs.length;
    }
    this.pointCount = total;

    return new Promise((resolve) => {
      this._firstFrame = () => resolve({ loadMs: performance.now() - t0, points: total });
      this.chart.setOption(this._option(series), true);
      // 兜底：极慢场景下 rendered 也可能迟迟不来
      setTimeout(() => { if (this._firstFrame) { const r = this._firstFrame; this._firstFrame = null; r(); } }, 30000);
    });
  }

  /** 实时批次 */
  push(batch) {
    const now = performance.now();
    const span = this.spanMs;

    for (const s of batch.series) {
      let arr = this.pairs.get(s.id);
      if (!arr) continue;

      if (this.mode === 'naive') {
        // 朴素：逐点 push 进数组（真实项目最常用的写法）
        for (let i = 0; i < s.t.length; i++) arr.push([s.t[i], s.v[i]]);
        this.pointCount += s.t.length;
      } else {
        for (let i = 0; i < s.t.length; i++) arr.push([s.t[i], s.v[i]]);
        // 调优：裁掉窗口外的旧点，保持喂给 ECharts 的规模恒定
        const cut = now - span * 1.15;
        let k = 0;
        while (k < arr.length && arr[k][0] < cut) k++;
        if (k > 512) arr.splice(0, k);
        this.pointCount = arr.length;
      }
    }

    if (this.mode === 'naive') {
      // 每次都全量重喂 —— 这就是"卡"的根因
      this.pendingTs = batch.ts || now;
      this.chart.setOption({
        series: this.defs.map((d, i) => ({ data: this.pairs.get(d.id) })),
      });
    } else {
      // rAF 合帧：一帧内多次到达只渲染最后一次，从根上消灭队列积压
      this.pendingTs = batch.ts || now;
      if (!this.raf) {
        this.raf = requestAnimationFrame(() => {
          this.raf = 0;
          this.chart.setOption({
            series: this.defs.map((d) => ({ data: this.pairs.get(d.id) })),
          });
        });
      }
    }
  }

  startLoop(onDrawn) {
    if (onDrawn) this.onDrawn = onDrawn;
    const loop = () => { this.raf2 = requestAnimationFrame(loop); this.onFrame(); };
    this.loopId = requestAnimationFrame(loop);
  }

  stopLoop() {
    if (this.loopId) cancelAnimationFrame(this.loopId);
    if (this.raf2) cancelAnimationFrame(this.raf2);
    this.loopId = 0; this.raf2 = 0;
  }

  setSpan(ms) {
    this.spanMs = ms;
    // 视窗变化后需要重新裁数据，交给下一次 push 或显式 refresh
  }

  /** 同步刷新（供负载测量使用：把本该在 rAF 里做的事立刻做掉） */
  flushSync() {
    if (this.raf) { cancelAnimationFrame(this.raf); this.raf = 0; }
    this.chart.setOption({
      series: this.defs.map((d) => ({ data: this.pairs.get(d.id) })),
    });
  }

  /**
   * 回看全历史：把整段历史重新灌进图里（工业现场最常见的动作：
   * "把昨晚 2:13 那次跳闸拉出来看"）。
   * 对 ECharts 来说这是最贵的一步——窗口优化在这里失效，必须全量喂。
   * @returns 从发起变焦到首帧成图的毫秒数（'timeout' 表示 25s 内没画出来）
   */
  async reviewFull() {
    const t0 = performance.now();
    const series = this._blank();
    series.forEach((s) => { s.sampling = 'lttb'; }); // 允许它用最有利的降采样
    let total = 0;

    for (let i = 0; i < this.defs.length; i++) {
      const src = this.backfill && this.backfill.get(this.defs[i].id);
      if (!src) continue;
      const pairs = this._toPairs(src);
      this.pairs.set(this.defs[i].id, pairs);
      series[i].data = pairs;
      total += pairs.length;
    }
    this.pointCount = total;

    const done = new Promise((resolve) => {
      this._firstFrame = () => resolve('ok');
      this.chart.setOption(this._option(series), true); // notMerge：整体替换
      setTimeout(() => resolve(this._firstFrame ? 'timeout' : 'ok'), 25000);
    });

    const st = await done;
    this._firstFrame = null;
    return st === 'timeout' ? 'timeout' : +(performance.now() - t0).toFixed(1);
  }

  dispose() {
    this.stopLoop();
    this._ro && this._ro.disconnect();
    this.chart && this.chart.dispose();
    this.host.innerHTML = '';
  }
}
