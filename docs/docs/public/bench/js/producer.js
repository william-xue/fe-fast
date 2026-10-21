/**
 * 数据生产端。
 * 两种模式：
 *  1. local —— 浏览器内合成（纯静态站点也能跑，适合部署到个人网站）
 *  2. ws    —— 连接 server/ws-server.mjs（验证真实 WebSocket 链路的延迟与背压）
 *
 * 每个采样点都携带"产生时刻"，端到端延迟 = 上屏时刻 - 产生时刻，
 * 这样瓶颈到底在链路、在队列、还是在绘制，可以被拆开看。
 */

const DEFS = [
  { id: 'p', name: '机组有功', unit: 'MW', base: 320, amp: 45, period: 180000, noise: 1.8, color: '#35e0c2' },
  { id: 'q', name: '机组无功', unit: 'MVar', base: 85, amp: 22, period: 260000, noise: 1.1, color: '#5aa9ff' },
  { id: 'f', name: '系统频率', unit: 'Hz', base: 50, amp: 0.035, period: 90000, noise: 0.006, color: '#ffd166' },
  { id: 'u', name: '母线电压', unit: 'kV', base: 220, amp: 3.4, period: 420000, noise: 0.22, color: '#b48bff' },
  { id: 'oil', name: '主变油温', unit: '℃', base: 62, amp: 5.5, period: 1800000, noise: 0.28, color: '#ff8f5a' },
  { id: 'soc', name: '储能 SOC', unit: '%', base: 58, amp: 18, period: 900000, noise: 0.4, color: '#43d17a' },
];

export function seriesDefs() { return DEFS.map((d) => ({ ...d })); }

/** 可复现的伪随机（同一 seed 出同一份数据，便于别人复跑对比） */
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * 历史回填：一次性生成 totalPoints 个点（均摊到各序列），时间跨度 spanMs。
 * 真实系统里这一步是"打开历史查询"，它决定了首帧成本。
 */
export function generateBackfill(defs, totalPoints, spanMs, endT, seed = 20261021) {
  const rnd = mulberry32(seed);
  const per = Math.floor(totalPoints / defs.length);
  const out = new Map();

  for (const d of defs) {
    const t = new Float64Array(per);
    const v = new Float32Array(per);
    const step = spanMs / per;
    let walk = 0;
    for (let i = 0; i < per; i++) {
      const tt = endT - spanMs + i * step;
      walk = walk * 0.985 + (rnd() - 0.5) * d.noise;
      const cyc = Math.sin((tt / d.period) * Math.PI * 2) * d.amp;
      let val = d.base + cyc + walk;
      // 尖峰：工业信号的关键特征，也是降采样必须保住的东西
      if (rnd() < 0.0025) val += (rnd() > 0.5 ? 1 : -1) * d.amp * (1.2 + rnd() * 2.2);
      t[i] = tt;
      v[i] = val;
    }
    out.set(d.id, { t, v });
  }
  return out;
}

export class LiveProducer {
  /**
   * @param defs 序列定义
   * @param ratePerSec 总采样率（点/秒，均摊到各序列）
   * @param onBatch 回调（批对象）
   * @param interval 批次间隔 ms
   */
  constructor(defs, ratePerSec, onBatch, interval = 50, seed = 777) {
    this.defs = defs;
    this.rate = ratePerSec;
    this.onBatch = onBatch;
    this.interval = interval;
    this.rnd = mulberry32(seed);
    this.seq = 0;
    this.timer = 0;
    this.state = defs.map(() => 0);
  }

  start() {
    if (this.timer) return;
    this.timer = setInterval(() => this.tick(), this.interval);
  }

  stop() {
    clearInterval(this.timer);
    this.timer = 0;
  }

  tick() {
    const now = performance.now();
    const total = Math.max(1, Math.round((this.rate * this.interval) / 1000));
    const per = Math.max(1, Math.floor(total / this.defs.length));
    const series = [];

    for (let s = 0; s < this.defs.length; s++) {
      const d = this.defs[s];
      const t = new Float64Array(per);
      const v = new Float32Array(per);
      const step = this.interval / per;
      let walk = this.state[s];
      for (let i = 0; i < per; i++) {
        walk = walk * 0.985 + (this.rnd() - 0.5) * d.noise;
        const tt = now - this.interval + i * step;
        let val = d.base + Math.sin((tt / d.period) * Math.PI * 2) * d.amp + walk;
        if (this.rnd() < 0.003) val += (this.rnd() > 0.5 ? 1 : -1) * d.amp * (1.5 + this.rnd() * 2);
        t[i] = tt;
        v[i] = val;
      }
      this.state[s] = walk;
      series.push({ id: d.id, t, v });
    }

    this.onBatch({ seq: ++this.seq, ts: now, series });
  }
}
