import { seriesDefs, generateBackfill, LiveProducer } from './producer.js';
import { FrameMeter, LatencyMeter, heapMB, envInfo } from './metrics.js';
import { CanvasEngine } from './engines/engine-canvas.js';
import { WebGLEngine } from './engines/engine-webgl.js';
import { EChartsEngine } from './engines/engine-echarts.js';

const HIST_SPAN_MS = 3 * 3600 * 1000; // 历史回填跨度：3 小时
const NAIVE_CAP = 100000;             // 朴素模式封顶点数（再往上浏览器会失去响应）

const $ = (id) => document.getElementById(id);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const S = {
  engine: null,
  engineKind: null,
  producer: null,
  frame: new FrameMeter(),
  lat: new LatencyMeter(),
  running: false,
  results: [],
  review: [],
  runStart: 0,
};

function defs() { return seriesDefs(); }

function makeEngine(kind, host, opts) {
  if (kind === 'canvas') return new CanvasEngine(host, opts);
  if (kind === 'webgl') return new WebGLEngine(host, opts);
  return new EChartsEngine(host, { ...opts, mode: kind });
}

function clearEngine() {
  if (S.engine) { try { S.engine.dispose(); } catch (_) {} }
  if (S.producer) { S.producer.stop(); S.producer = null; }
  S.engine = null; S.engineKind = null;
}

/**
 * 跑一次基准：同一份数据、同一台机器、同一窗口
 * @returns 指标对象
 */
async function runOnce({ kind, points, rate = 400, spanMs = 60000, streamMs = 12000, seed = 20261021 }) {
  clearEngine();
  const host = $('chart-host');
  const ds = defs();
  const backfill = generateBackfill(ds, points, HIST_SPAN_MS, performance.now(), seed);

  S.frame.reset();
  S.lat.reset();

  const opts = {
    defs: ds,
    spanMs,
    onDrawn: (ts) => { if (ts) S.lat.markDrawn(ts); },
    onFrame: () => S.frame.tick(),
  };
  S.engine = makeEngine(kind, host, opts);
  S.engineKind = kind;
  window.__engine = S.engine;

  const loaded = await Promise.resolve(S.engine.load(backfill));
  const firstFrameMs = loaded && loaded.loadMs ? +loaded.loadMs.toFixed(1) : null;

  S.engine.startLoop();
  await sleep(220);

  const t0 = performance.now();
  S.frame.reset();
  S.lat.reset();

  S.producer = new LiveProducer(ds, rate, (batch) => {
    if (!S.running) return;
    S.lat.markReceived();
    S.engine.push(batch);
  }, 50);
  S.running = true;
  S.producer.start();

  const tickUi = setInterval(refreshStats, 250);
  await sleep(streamMs);
  S.running = false;
  S.producer.stop();
  clearInterval(tickUi);
  await sleep(180);

  const elapsed = performance.now() - t0;
  const f = S.frame.stats(elapsed);
  const l = S.lat.stats();
  const heap = heapMB();

  S.engine.stopLoop();
  const merged = Math.max(0, l.received - l.drawn);

  // 标签页不可见 / 显示器休眠 / 远程桌面下 rAF 会被节流，此时 FPS 与帧时不可采信
  const throttled = f.frames < Math.max(5, Math.round(streamMs / 1000));

  const row = {
    engine: kind,
    engineLabel: labelOf(kind),
    points,
    firstFrameMs,
    fps: throttled ? null : f.fps,
    frameP95: throttled ? null : f.frameP95,
    frameMax: throttled ? null : f.frameMax,
    longFrames: f.longFrames,
    lagP50: l.lagP50,
    lagP95: l.lagP95,
    mergedBatches: merged,
    heapMB: heap,
    streamMs,
    rate,
    spanMs,
    verdict: throttled ? '环境节流·FPS 未采信' : verdictOf(f.fps, l.lagP95),
  };
  S.results.push(row);
  renderTable();
  refreshStats();
  return row;
}

function labelOf(kind) {
  return { canvas: '分层 Canvas 2D', tuned: 'ECharts 调优（lttb+rAF）', naive: 'ECharts 朴素（全量）', webgl: 'WebGL 曲线（试用）' }[kind] || kind;
}

/**
 * 回看全历史：工业现场最常见的动作——「把昨晚 2:13 那次跳闸拉出来看」。
 * 与实时流的区别：实时流只画窗口内几万点，回看必须一次性面对整段历史。
 * 对 ECharts 这是最贵的路径（窗口优化失效、要全量喂 + diff）；
 * 对自研渲染层只是一次 O(n) 聚合，之后缩放不再碰原始数据。
 */
async function runReview({ kind, points = 1000000 }) {
  clearEngine();
  const host = $('chart-host');
  const ds = defs();
  const backfill = generateBackfill(ds, points, HIST_SPAN_MS, performance.now(), 20261021);

  S.engine = makeEngine(kind, host, { defs: ds, spanMs: 60000 });
  window.__engine = S.engine;
  const loaded = await Promise.resolve(S.engine.load(backfill));
  const firstFrameMs = loaded && loaded.loadMs ? +loaded.loadMs.toFixed(1) : null;

  let reviewMs = null;
  let cols = null;
  let redrawP50 = null;

  if (kind === 'canvas' || kind === 'webgl') {
    const r = S.engine.reviewFull();
    reviewMs = r.ms;
    cols = r.cols;
    const xs = [];
    for (let i = 0; i < 5; i++) xs.push(S.engine.redrawFull());
    xs.sort((a, b) => a - b);
    redrawP50 = xs[2];
  } else {
    reviewMs = await S.engine.reviewFull();
  }

  const verdict =
    reviewMs === 'timeout' ? '25s 未成图'
      : typeof reviewMs !== 'number' ? '未测'
        : reviewMs < 300 ? '可接受'
          : reviewMs < 1500 ? '明显等待'
            : '不可用';

  const row = {
    engine: kind, engineLabel: labelOf(kind), points,
    firstFrameMs, reviewMs, cols, redrawP50, heapMB: heapMB(), verdict,
  };
  S.review.push(row);
  renderReview();
  return row;
}

async function reviewSweep() {
  // ECharts 在 100 万点全量回看会长时间占用主线程，故扫描止于 30 万（单点跑可手动选）
  const plan = [];
  for (const p of [100000, 300000, 1000000]) plan.push({ kind: 'canvas', points: p });
  for (const p of [100000, 300000]) plan.push({ kind: 'tuned', points: p });
  for (const p of [100000, 300000, 1000000]) plan.push({ kind: 'webgl', points: p });

  S.review = [];
  renderReview();
  const btnA = $('btn-run'), btnB = $('btn-sweep'), btnC = $('btn-review');
  btnA.disabled = btnB.disabled = btnC.disabled = true;

  for (let i = 0; i < plan.length; i++) {
    const step = plan[i];
    banner(`回看全历史 ${i + 1}/${plan.length}\n${labelOf(step.kind)} · ${(step.points / 10000).toFixed(0)} 万点`);
    await sleep(80);
    try {
      await runReview(step);
    } catch (err) {
      S.review.push({
        engine: step.kind, engineLabel: labelOf(step.kind) + '（异常）', points: step.points,
        firstFrameMs: null, reviewMs: null, cols: null, redrawP50: null, heapMB: null,
        verdict: '异常：' + ((err && err.message) || err),
      });
      renderReview();
    }
    await sleep(150);
  }

  banner('');
  btnA.disabled = btnB.disabled = btnC.disabled = false;
  $('note2').textContent =
    '回看全历史会把三小时数据纳入视窗；Canvas与WebGL都按像素列聚合后绘制。' +
    'ECharts 在 100 万点全量回看会长时间占用主线程，扫描故意止于 30 万。';
}

function renderReview() {
  const tb = $('tbl-review').querySelector('tbody');
  tb.innerHTML = S.review.map((r) => {
    const num = typeof r.reviewMs === 'number' ? r.reviewMs : null;
    const cls = num === null ? '' : num < 300 ? 'good' : num < 1500 ? 'warnc' : 'badc';
    return `<tr>
      <td>${r.engineLabel}</td>
      <td>${(r.points / 10000).toFixed(0)} 万</td>
      <td>${fmt(r.firstFrameMs, 0)} ms</td>
      <td class="${cls}">${num === null ? (r.reviewMs === 'timeout' ? '超时' : '–') : fmt(num, 0) + ' ms'}</td>
      <td>${r.cols ? r.cols + ' 列' : '–'}</td>
      <td>${r.redrawP50 === null ? '–' : fmt(r.redrawP50, 2) + ' ms'}</td>
      <td>${r.heapMB === null ? 'n/a' : r.heapMB + ' MB'}</td>
      <td class="verdict">${r.verdict}</td>
    </tr>`;
  }).join('');
  $('btn-export').disabled = !(S.results.length || S.review.length);
}

function verdictOf(fps, lag95) {
  if (fps >= 50 && lag95 < 120) return '可用';
  if (fps >= 24) return '勉强';
  if (fps >= 8) return '明显卡顿';
  return '不可用';
}

function fmt(n, d = 1) { return n === null || n === undefined ? '–' : Number(n).toFixed(d); }

function refreshStats() {
  const f = S.frame.stats(performance.now() - (S.runStart || performance.now())) ;
  const l = S.lat.stats();
  set('s-fps', S.frame.last ? String(f.fps) : '–');
  set('s-frame', S.frame.last ? `${fmt(f.frameP95)} ms` : '–');
  set('s-lag50', l.drawn ? `${fmt(l.lagP50)} ms` : '–');
  set('s-lag95', l.drawn ? `${fmt(l.lagP95)} ms` : '–');
  set('s-drop', l.received ? `${Math.max(0, l.received - l.drawn)} / ${l.received}` : '–');
  const h = heapMB();
  set('s-heap', h === null ? 'n/a' : `${h} MB`);
  set('s-points', S.engine && S.engine.pointCount ? S.engine.pointCount.toLocaleString() : '–');
}

function set(id, v) { const el = $(id); if (el) el.textContent = v; }

function renderTable() {
  const tb = $('tbl').querySelector('tbody');
  tb.innerHTML = S.results.map((r) => {
    const cls = r.fps === null ? '' : r.fps >= 50 ? 'good' : r.fps >= 24 ? 'warnc' : 'badc';
    return `<tr>
      <td>${r.engineLabel}</td>
      <td>${(r.points / 10000).toFixed(0)} 万</td>
      <td class="${r.firstFrameMs > 2000 ? 'badc' : ''}">${fmt(r.firstFrameMs, 0)} ms</td>
      <td class="${cls}">${fmt(r.fps)}</td>
      <td>${fmt(r.frameP95)} ms</td>
      <td>${fmt(r.lagP50)} ms</td>
      <td>${fmt(r.lagP95)} ms</td>
      <td>${r.mergedBatches}</td>
      <td>${r.heapMB === null ? 'n/a' : r.heapMB + ' MB'}</td>
      <td class="verdict">${r.verdict}</td>
    </tr>`;
  }).join('');
  $('btn-export').disabled = !S.results.length;
}

function banner(msg) {
  const b = $('banner');
  if (!msg) { b.hidden = true; return; }
  b.hidden = false;
  b.textContent = msg;
}

async function sweep() {
  const pointsList = [100000, 300000, 1000000];
  const plan = [];
  for (const p of pointsList) plan.push({ kind: 'canvas', points: p });
  for (const p of pointsList) plan.push({ kind: 'tuned', points: p });
  plan.push({ kind: 'naive', points: 100000 });
  for (const p of pointsList) plan.push({ kind: 'webgl', points: p });

  S.results = [];
  renderTable();
  $('btn-run').disabled = true;
  $('btn-sweep').disabled = true;

  for (let i = 0; i < plan.length; i++) {
    const step = plan[i];
    banner(`基准进行中 ${i + 1}/${plan.length}\n${labelOf(step.kind)} · ${(step.points / 10000).toFixed(0)} 万点`);
    await sleep(60);
    try {
      await runOnce({ ...step, streamMs: 9000 });
    } catch (err) {
      console.error(err);
      S.results.push({
        engine: step.kind, engineLabel: labelOf(step.kind) + '（失败）',
        points: step.points, firstFrameMs: null, fps: 0, frameP95: null, frameMax: null,
        longFrames: 0, lagP50: null, lagP95: null, mergedBatches: 0, heapMB: null,
        verdict: '异常：' + (err && err.message || err),
      });
      renderTable();
    }
  }

  banner('');
  $('btn-run').disabled = false;
  $('btn-sweep').disabled = false;
  $('note').textContent =
    '注：朴素模式封顶 10 万点——在 100 万点下它会长时间占用主线程直至浏览器提示"页面无响应"，' +
    '这本身就是结论，故不再跑更高档位。所有数值随设备差异较大，请在自己机器上复跑。';
}

function wire() {
  $('env-chip').textContent = (() => {
    const e = envInfo();
    return `${e.browser} · ${e.cores || '?'} 核 · dpr ${e.dpr}`;
  })();

  $('btn-run').addEventListener('click', async () => {
    const kind = $('sel-engine').value;
    const points = +$('sel-points').value;
    const rate = +$('sel-rate').value;
    const spanMs = +$('sel-window').value;

    if (kind === 'naive' && points > NAIVE_CAP) {
      banner('朴素模式在 ' + points.toLocaleString() + ' 点下会让页面长时间无响应。\n已切换到 10 万点档位演示。');
      $('sel-points').value = String(NAIVE_CAP);
      await sleep(1600);
      banner('');
      return;
    }

    $('btn-run').disabled = true;
    $('btn-stop').disabled = false;
    banner('加载历史数据…');
    await sleep(80);
    banner('');
    S.runStart = performance.now();
    try {
      await runOnce({ kind, points, rate, spanMs, streamMs: 20000 });
    } finally {
      $('btn-run').disabled = false;
      $('btn-stop').disabled = true;
      S.running = false;
      if (S.producer) S.producer.stop();
    }
  });

  $('btn-stop').addEventListener('click', () => {
    S.running = false;
    if (S.producer) S.producer.stop();
    $('btn-run').disabled = false;
    $('btn-stop').disabled = true;
  });

  $('btn-sweep').addEventListener('click', () => sweep());
  $('btn-review').addEventListener('click', () => reviewSweep());

  $('btn-export').addEventListener('click', () => {
    const payload = {
      measuredAt: new Date().toISOString(),
      env: envInfo(),
      histSpanMs: HIST_SPAN_MS,
      rows: S.results,
      reviewRows: S.review,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `bench-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  });

  setInterval(refreshStats, 400);
}

wire();
$('ver').textContent = 'v1.0 · ' + new Date().getFullYear();

// 自动化入口（供无头浏览器采集真实数字）
window.__bench = {
  runOnce,
  sweep: async () => { await sweep(); return S.results; },
  review: async (opts) => reviewSweep(opts),
  reviewOne: async (opts) => runReview(opts),
  reviewResults: () => S.review,
  results: () => S.results,
  env: envInfo,
  clear: () => { S.results = []; S.review = []; renderTable(); renderReview(); },
  /**
   * 同步负载测量（不依赖 vsync，显示器休眠/远程桌面下也能测）：
   * 逐批执行「接收 → 更新」并记录主线程耗时，
   * 负载率 = 单次更新耗时 / 批次间隔；>1 意味着消费慢于生产，延迟必然单调增长。
   */
  runSync: async ({ kind, points = 1000000, rate = 400, spanMs = 60000, batches = 60 } = {}) => {
    clearEngine();
    const host = $('chart-host');
    const ds = seriesDefs();
    const backfill = generateBackfill(ds, points, HIST_SPAN_MS, performance.now(), 20261021);
    S.engine = makeEngine(kind, host, { defs: ds, spanMs });
    await Promise.resolve(S.engine.load(backfill));
    window.__engine = S.engine;

    // load() 建好栅格但不会清 invalidateView；不清掉的话 push 会跳过列聚合，
    // 测出来的就是"新点根本没参与绘制"的空转耗时。这里先让视图落定。
    if (S.engine._layoutScale) {
      S.engine._layoutScale(S.engine._latestT());
      S.engine.invalidateView = false;
      S.engine.dirty = false;
    }

    const queue = [];
    const prod = new LiveProducer(ds, rate, (b) => queue.push(b), 50);
    for (let i = 0; i < batches; i++) prod.tick();

    // 批量生产时时间戳几乎相同，需按 50ms 间距重排，才有真实的窗口推进与列位移
    queue.forEach((b, k) => {
      const shift = k * 50;
      for (const s of b.series) for (let i = 0; i < s.t.length; i++) s.t[i] += shift;
    });

    const costs = [];
    for (const b of queue) {
      const t = performance.now();
      S.engine.push(b);
      if (S.engine.flushSync) S.engine.flushSync();
      costs.push(performance.now() - t);
    }
    costs.sort((a, b) => a - b);
    const p = (q) => +costs[Math.min(costs.length - 1, Math.floor(costs.length * q))].toFixed(2);
    const interval = 50;
    const out = {
      engine: kind, points, rate, batches,
      costP50: p(0.5), costP95: p(0.95), costMax: +costs[costs.length - 1].toFixed(2),
      loadP50: +(p(0.5) / interval).toFixed(3),
      loadP95: +(p(0.95) / interval).toFixed(3),
      headroomX: +(interval / Math.max(0.01, p(0.95))).toFixed(1),
      heapMB: heapMB(),
    };
    return out;
  },
};
