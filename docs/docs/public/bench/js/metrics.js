/**
 * 指标采集。全部基于 performance.now()，与采样用 serverTs 对齐算端到端延迟。
 * 设计约束：采集本身不能污染被测对象 —— 只做累加，不做字符串/对象分配。
 */

export class FrameMeter {
  constructor() {
    this.reset();
    this._raf = 0;
  }

  reset() {
    this.frames = 0;
    this.times = new Float32Array(6000); // 帧间隔环形
    this.n = 0;
    this.head = 0;
    this.last = 0;
    this.longFrames = 0; // >50ms
  }

  /** 由渲染循环每帧调用 */
  tick() {
    const now = performance.now();
    if (this.last) {
      const dt = now - this.last;
      this.times[this.head] = dt;
      this.head = (this.head + 1) % this.times.length;
      if (this.n < this.times.length) this.n++;
      if (dt > 50) this.longFrames++;
    }
    this.last = now;
    this.frames++;
  }

  stats(elapsedMs) {
    const arr = Array.prototype.slice.call(this.times, 0, this.n).sort((a, b) => a - b);
    const p = (q) => (arr.length ? arr[Math.min(arr.length - 1, Math.floor(arr.length * q))] : 0);
    return {
      fps: elapsedMs > 0 ? +(this.frames / (elapsedMs / 1000)).toFixed(1) : 0,
      frameP50: +p(0.5).toFixed(1),
      frameP95: +p(0.95).toFixed(1),
      frameMax: arr.length ? +arr[arr.length - 1].toFixed(1) : 0,
      longFrames: this.longFrames,
      frames: this.frames,
    };
  }
}

export class LatencyMeter {
  constructor(cap = 8000) {
    this.cap = cap;
    this.buf = new Float32Array(cap);
    this.n = 0;
    this.head = 0;
    this.dropped = 0;
    this.received = 0;
  }

  reset() {
    this.n = 0; this.head = 0; this.dropped = 0; this.received = 0;
  }

  /** 每收到一批（无论是否绘制）记一次 */
  markReceived() { this.received++; }

  /** 上屏时刻 - 采样产生时刻 */
  markDrawn(serverTs) {
    const lag = performance.now() - serverTs;
    this.buf[this.head] = lag;
    this.head = (this.head + 1) % this.cap;
    if (this.n < this.cap) this.n++;
  }

  markDropped() { this.dropped++; }

  stats() {
    const arr = Array.prototype.slice.call(this.buf, 0, this.n).sort((a, b) => a - b);
    const p = (q) => (arr.length ? +arr[Math.min(arr.length - 1, Math.floor(arr.length * q))].toFixed(1) : 0);
    return {
      lagP50: p(0.5),
      lagP95: p(0.95),
      lagMax: arr.length ? +arr[arr.length - 1].toFixed(1) : 0,
      dropped: this.dropped,
      received: this.received,
      drawn: this.n,
    };
  }
}

export function heapMB() {
  const m = performance.memory;
  return m ? +(m.usedJSHeapSize / 1048576).toFixed(1) : null;
}

/** 简单环境探测，用于结果表脚注（跨设备复现时说明差异来源） */
export function envInfo() {
  const ua = navigator.userAgent;
  const m = ua.match(/(Chrome|Edg|Firefox|Safari)\/([\d.]+)/);
  return {
    browser: m ? `${m[1]} ${m[2].split('.')[0]}` : ua.slice(0, 40),
    cores: navigator.hardwareConcurrency || null,
    dpr: window.devicePixelRatio,
    screen: `${screen.width}x${screen.height}`,
    memory: navigator.deviceMemory || null,
  };
}
