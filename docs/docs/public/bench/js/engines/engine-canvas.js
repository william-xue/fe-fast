/**
 * 曲线层使用 WebGL2；背景和光标保留 Canvas 2D。
 * 原始点 → ColumnGrid 像素列 → 线段端点缓冲 → GPU 三角形。
 * 保留 CanvasEngine 名称和原入口，供当前页面直接替换试用。
 */
import { SeriesBuffer } from '../util/ringbuffer.js';
import { ColumnGrid } from '../util/columns.js';

const PAD = { l: 64, r: 14, t: 14, b: 26 };

export class CanvasEngine {
  constructor(host, opts) {
    this.host = host;
    this.defs = opts.defs;
    this.spanMs = opts.spanMs || 60000;
    this.onDrawn = opts.onDrawn || (() => {});
    this.onFrame = opts.onFrame || (() => {});
    this.buffers = new Map();
    this.grids = new Map();
    this.invalidateView = true;
    this.dirty = false;
    this.pendingTs = 0;
    this.hover = null;
    this.raf = 0;
    this.fullFrames = 0;
    this._buildDom();
  }

  _buildDom() {
    this.host.innerHTML = '';
    const mk = (z) => {
      const c = document.createElement('canvas');
      c.style.cssText = `position:absolute;inset:0;width:100%;height:100%;z-index:${z}`;
      this.host.appendChild(c);
      return c;
    };
    this.cvBg = mk(1);
    this.cvBg.getContext('2d', { alpha: false });
    this.cvData = mk(2);
    this.cvCursor = mk(3);
    this._initGL();

    this.resize();
    this._ro = new ResizeObserver(() => { this.resize(); this.invalidateView = true; this.dirty = true; });
    this._ro.observe(this.host);

    this.host.style.cursor = 'crosshair';
    this._onMove = (e) => {
      const r = this.cvCursor.getBoundingClientRect();
      this.hover = { x: e.clientX - r.left, y: e.clientY - r.top };
      this._drawCursor();
    };
    this._onLeave = () => {
      this.hover = null;
      const ctx = this.cvCursor.getContext('2d');
      ctx.clearRect(0, 0, this.w, this.h);
    };
    this.host.addEventListener('mousemove', this._onMove);
    this.host.addEventListener('mouseleave', this._onLeave);

    // 滚轮缩放后，从原始点重建可视列栅格。
    this._onWheel = (e) => {
      e.preventDefault();
      const k = e.deltaY > 0 ? 1.3 : 0.77;
      this.setSpan(Math.max(2000, Math.min(6 * 3600 * 1000, this.spanMs * k)));
    };
    this.host.addEventListener('wheel', this._onWheel, { passive: false });
  }

  resize() {
    const r = this.host.getBoundingClientRect();
    this.w = Math.max(320, Math.floor(r.width));
    this.h = Math.max(180, Math.floor(r.height));
    const dpr = window.devicePixelRatio || 1;
    for (const c of [this.cvBg, this.cvData, this.cvCursor]) {
      c.width = Math.floor(this.w * dpr);
      c.height = Math.floor(this.h * dpr);
    }
    for (const c of [this.cvBg, this.cvCursor]) {
      c.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    // 每列最多四条线段，每条线段保存两端点；各序列复用这块 CPU 缓冲。
    this.segments = new Float32Array(Math.max(64, this.w - PAD.l - PAD.r) * 16);
    this.invalidateView = true;
  }

  setSpan(ms) {
    this.spanMs = ms;
    this.invalidateView = true;
    this.dirty = true;
  }

  /** 历史数据一次性载入（对应 ECharts 的首帧 setOption） */
  load(backfill) {
    const t0 = performance.now();
    let total = 0;
    let endT = 0;
    for (const d of this.defs) {
      const src = backfill.get(d.id);
      if (!src) continue;
      const buf = new SeriesBuffer(src.t.length + 8192);
      buf.pushMany(src.t, src.v);
      this.buffers.set(d.id, buf);
      total += buf.count;
      if (buf.lastT > endT) endT = buf.lastT;
    }
    this.pointCount = total;
    this.endT = endT || performance.now();
    this.invalidateView = true;
    this.dirty = true;

    this.flushSync();
    return { loadMs: performance.now() - t0, points: total };
  }

  /** 实时批次：写环形缓冲 + 追加进末列，O(新增点数) */
  push(batch) {
    const now = performance.now();
    for (const s of batch.series) {
      const buf = this.buffers.get(s.id);
      if (!buf) continue;
      const before = buf.count;
      buf.pushMany(s.t, s.v);
      this.pointCount += buf.count - before;

      const g = this.grids.get(s.id);
      if (g && !this.invalidateView) {
        const from = Math.max(0, buf.count - s.t.length);
        g.append(buf, from, buf.count);
      }
    }
    this.dirty = true;
    this.pendingTs = batch.ts || now; // 端到端延迟的起点：采样产生时刻
  }

  startLoop(onDrawn) {
    if (onDrawn) this.onDrawn = onDrawn;
    const loop = () => {
      this.raf = requestAnimationFrame(loop);
      if (this.dirty || this.invalidateView) {
        this.flushSync();
        const ts = this.pendingTs;
        this.pendingTs = 0;
        this.onDrawn(ts || 0);
      }
      this.onFrame();
    };
    this.raf = requestAnimationFrame(loop);
  }

  stopLoop() {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  _latestT() {
    let t = this.endT || performance.now();
    for (const [, b] of this.buffers) if (b.lastT > t) t = b.lastT;
    return t || performance.now();
  }

  /** 按同一时间右边界重建各序列的可视列栅格。 */
  _layoutScale(endT) {
    this.nCols = Math.max(64, Math.floor(this.w - PAD.l - PAD.r));
    this.endT = endT;

    for (const d of this.defs) {
      const buf = this.buffers.get(d.id);
      if (!buf) continue;
      let g = this.grids.get(d.id);
      if (!g || g.nCols !== this.nCols) { g = new ColumnGrid(this.nCols); this.grids.set(d.id, g); }
      g.rebuild(buf, this.spanMs, endT);
    }
  }

  _visibleRange(g) {
    let lo = Infinity, hi = -Infinity;
    for (let c = 0; c < this.nCols; c++) {
      if (!g.count[c]) continue;
      if (g.min[c] < lo) lo = g.min[c];
      if (g.max[c] > hi) hi = g.max[c];
    }
    return [lo, hi];
  }

  _drawBg(endT) {
    const ctx = this.cvBg.getContext('2d');
    const { w, h } = this;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#080c11';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(40,58,78,.55)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i <= 5; i++) {
      const y = PAD.t + ((h - PAD.t - PAD.b) * i) / 5;
      ctx.moveTo(PAD.l, Math.round(y) + 0.5);
      ctx.lineTo(w - PAD.r, Math.round(y) + 0.5);
    }
    for (let i = 0; i <= 6; i++) {
      const x = PAD.l + ((w - PAD.l - PAD.r) * i) / 6;
      ctx.moveTo(Math.round(x) + 0.5, PAD.t);
      ctx.lineTo(Math.round(x) + 0.5, h - PAD.b);
    }
    ctx.stroke();

    ctx.fillStyle = '#5e7186';
    ctx.font = '10px "SF Mono", ui-monospace, Menlo, monospace';
    ctx.textAlign = 'center';
    const right = endT;
    for (let i = 0; i <= 6; i++) {
      const x = PAD.l + ((w - PAD.l - PAD.r) * i) / 6;
      const t = right - this.spanMs + (this.spanMs * i) / 6;
      const s = Math.round((t - right) / 1000);
      ctx.fillText(s === 0 ? 'now' : `${s}s`, x, h - PAD.b + 15);
    }

    ctx.textAlign = 'left';
    let y = PAD.t + 10;
    for (const d of this.defs) {
      if (d._lo === undefined) continue;
      ctx.fillStyle = d.color;
      ctx.fillRect(6, y - 7, 6, 2);
      ctx.fillStyle = '#7f8fa3';
      ctx.fillText(d.name, 16, y - 1);
      y += 15;
    }
  }

  _initGL() {
    const gl = this.cvData.getContext('webgl2', { alpha: true, antialias: true, depth: false });
    if (!gl) throw new Error('当前浏览器无法创建 WebGL2 曲线上下文');
    this.gl = gl;
    const compile = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const message = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error('曲线着色器编译失败：' + message);
      }
      return shader;
    };
    const vertex = compile(gl.VERTEX_SHADER, `#version 300 es
      in vec4 aSegment;
      uniform vec2 uSize;
      void main() {
        vec2 delta = aSegment.zw - aSegment.xy;
        vec2 normal = vec2(-delta.y, delta.x) / max(length(delta), 0.001);
        float side = gl_VertexID % 2 == 0 ? -1.0 : 1.0;
        vec2 endpoint = gl_VertexID < 2 ? aSegment.xy : aSegment.zw;
        vec2 position = endpoint + normal * side * 0.7;
        vec2 clip = position / uSize * 2.0 - 1.0;
        gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
      }
    `);
    const fragment = compile(gl.FRAGMENT_SHADER, `#version 300 es
      precision mediump float;
      uniform vec3 uColor;
      out vec4 color;
      void main() { color = vec4(uColor, 1.0); }
    `);
    this.program = gl.createProgram();
    gl.attachShader(this.program, vertex);
    gl.attachShader(this.program, fragment);
    gl.linkProgram(this.program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      throw new Error('曲线着色器链接失败：' + gl.getProgramInfoLog(this.program));
    }
    this.vertexBuffer = gl.createBuffer();
    this.segmentLocation = gl.getAttribLocation(this.program, 'aSegment');
    this.sizeLocation = gl.getUniformLocation(this.program, 'uSize');
    this.colorLocation = gl.getUniformLocation(this.program, 'uColor');
  }

  _render(forceFull) {
    const gl = this.gl;
    const top = PAD.t, bot = this.h - PAD.b;
    const sx = this.cvData.width / this.w, sy = this.cvData.height / this.h;
    gl.viewport(0, 0, this.cvData.width, this.cvData.height);
    gl.disable(gl.SCISSOR_TEST);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.SCISSOR_TEST);
    gl.scissor(Math.ceil(PAD.l * sx), Math.ceil(PAD.b * sy),
      Math.floor(this.nCols * sx), Math.floor((bot - top) * sy));
    gl.useProgram(this.program);
    gl.uniform2f(this.sizeLocation, this.w, this.h);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.enableVertexAttribArray(this.segmentLocation);
    gl.vertexAttribPointer(this.segmentLocation, 4, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(this.segmentLocation, 1);

    const vertices = this.segments;
    let count = 0;
    const segment = (x0, y0, x1, y1) => {
      vertices[count++] = x0; vertices[count++] = y0;
      vertices[count++] = x1; vertices[count++] = y1;
    };
    for (const d of this.defs) {
      const g = this.grids.get(d.id);
      if (!g || !g.colW) continue;
      const [lo, hi] = this._visibleRange(g);
      if (!isFinite(lo)) continue;
      if (forceFull || d._lo === undefined || lo < d._lo || hi > d._hi) {
        const pad = (hi - lo) * 0.06 || 1;
        d._lo = lo - pad; d._hi = hi + pad;
      }
      const scale = (bot - top) / (d._hi - d._lo);
      count = 0;
      let previousX, previousY;
      for (let c = 0; c < this.nCols; c++) {
        if (!g.count[c]) continue;
        const x = PAD.l + c + 0.5;
        const firstY = bot - (g.first[c] - d._lo) * scale;
        const minY = bot - (g.min[c] - d._lo) * scale;
        const maxY = bot - (g.max[c] - d._lo) * scale;
        const lastY = bot - (g.last[c] - d._lo) * scale;
        if (previousX !== undefined) segment(previousX, previousY, x, firstY);
        segment(x, firstY, x, minY);
        segment(x, minY, x, maxY);
        segment(x, maxY, x, lastY);
        previousX = x; previousY = lastY;
      }
      const color = parseInt(d.color.slice(1), 16);
      gl.uniform3f(this.colorLocation, (color >> 16) / 255, ((color >> 8) & 255) / 255, (color & 255) / 255);
      gl.bufferData(gl.ARRAY_BUFFER, vertices.subarray(0, count), gl.DYNAMIC_DRAW);
      // 每个实例是一条 1.4 CSS 像素宽的线段，避免依赖设备支持的原生线宽。
      gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, count / 4);
    }
    gl.disable(gl.SCISSOR_TEST);
    this.fullFrames++;
  }

  _drawCursor() {
    const ctx = this.cvCursor.getContext('2d');
    ctx.clearRect(0, 0, this.w, this.h);
    if (!this.hover) return;
    const { x, y } = this.hover;
    if (x < PAD.l || x > this.w - PAD.r) return;

    ctx.strokeStyle = 'rgba(53,224,194,.45)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(Math.round(x) + 0.5, PAD.t);
    ctx.lineTo(Math.round(x) + 0.5, this.h - PAD.b);
    ctx.moveTo(PAD.l, Math.round(y) + 0.5);
    ctx.lineTo(this.w - PAD.r, Math.round(y) + 0.5);
    ctx.stroke();

    const col = Math.floor(x - PAD.l);
    const lines = [];
    for (const d of this.defs) {
      const g = this.grids.get(d.id);
      if (!g || !g.count || !g.count[col] || d._lo === undefined) continue;
      lines.push([d.color, `${d.name} ${g.last[col].toFixed(d.amp < 1 ? 3 : 1)} ${d.unit}`]);
    }
    if (!lines.length) return;

    ctx.font = '11px "SF Mono", ui-monospace, Menlo, monospace';
    const wBox = 168, hBox = 26 + lines.length * 15;
    let bx = x + 12;
    let by = Math.max(PAD.t, y - hBox / 2);
    if (bx + wBox > this.w - PAD.r) bx = x - wBox - 12;
    ctx.fillStyle = 'rgba(11,15,20,.94)';
    ctx.strokeStyle = 'rgba(53,224,194,.32)';
    ctx.beginPath();
    ctx.roundRect(bx, by, wBox, hBox, 5);
    ctx.fill();
    ctx.stroke();

    const g0 = this.grids.get(this.defs[0].id);
    const tt = g0.colStart(col) + g0.colW / 2;
    const dt = new Date(Date.now() - (performance.now() - tt));
    ctx.fillStyle = '#5e7186';
    ctx.fillText(dt.toLocaleTimeString('zh-CN', { hour12: false }), bx + 9, by + 14);
    lines.forEach(([color, text], i) => {
      ctx.fillStyle = color;
      ctx.fillText(text, bx + 9, by + 31 + i * 15);
    });
  }

  /** 同步刷新（供负载测量使用：把本该在 rAF 里做的事立刻做掉） */
  flushSync() {
    const force = this.invalidateView;
    if (force) this._layoutScale(this._latestT());
    this._render(force);
    if (force) this._drawBg(this._latestT());
    this.invalidateView = false;
    this.dirty = false;
  }

  /**
   * 回看全历史：视窗拉到整段数据跨度，重建列栅格并成图。
   * 重建全历史列栅格；后续缩放会按新窗口重新聚合。
   * @returns { ms, points, cols }
   */
  reviewFull() {
    const t0 = performance.now();
    let firstT = Infinity, lastT = -Infinity, total = 0;
    for (const [, b] of this.buffers) {
      if (!b.count) continue;
      if (b.firstT < firstT) firstT = b.firstT;
      if (b.lastT > lastT) lastT = b.lastT;
      total += b.count;
    }
    if (!isFinite(firstT)) return { ms: 0, points: 0 };

    this.spanMs = Math.max(2000, lastT - firstT);
    this.invalidateView = true;
    this._layoutScale(lastT);   // 全量聚合：1M 点 → nCols 列
    this._drawBg(lastT);
    this._render(true);

    return { ms: +(performance.now() - t0).toFixed(1), points: total, cols: this.nCols, spanMs: Math.round(this.spanMs) };
  }

  /** 全览状态下再整幅重绘一次（衡量"放大到全局后拖一次"的成本） */
  redrawFull() {
    const t0 = performance.now();
    this._render(true);
    return +(performance.now() - t0).toFixed(2);
  }

  dispose() {
    this.stopLoop();
    this._ro && this._ro.disconnect();
    this.host.removeEventListener('mousemove', this._onMove);
    this.host.removeEventListener('mouseleave', this._onLeave);
    this.host.removeEventListener('wheel', this._onWheel);
    this.gl.useProgram(null);
    this.gl.deleteBuffer(this.vertexBuffer);
    this.gl.deleteProgram(this.program);
    this.host.innerHTML = '';
  }
}
