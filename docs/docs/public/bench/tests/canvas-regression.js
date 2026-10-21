import { CanvasEngine } from '../js/engines/engine-canvas.js';

// 浏览器控制台运行：await (await import('./tests/canvas-regression.js')).runCanvasRegression()
export function runCanvasRegression() {
  const descriptor = Object.getOwnPropertyDescriptor(window, 'devicePixelRatio');
  const results = [];
  const check = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  const coloredPixels = (canvas) => {
    const { data } = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    let count = 0;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 1] > 80 && data[i + 2] > 60) count++;
    }
    return count;
  };

  try {
    for (const dpr of [2, 1, 1.25]) {
      Object.defineProperty(window, 'devicePixelRatio', { configurable: true, value: dpr });
      const host = document.createElement('div');
      host.style.cssText = 'position:fixed;left:0;top:0;width:600px;height:300px';
      document.body.append(host);
      const engine = new CanvasEngine(host, {
        defs: [{ id: 'a', name: '测试曲线', color: '#35e0c2' }], spanMs: 10000,
      });
      try {
        const t = Float64Array.from({ length: 1000 }, (_, i) => 100000 + i * 10);
        const v = Float32Array.from(t, (_, i) => Math.sin(i / 100));
        engine.load(new Map([['a', { t, v }]]));
        engine.invalidateView = false;
        const before = coloredPixels(engine.cvData);
        check(before > 0, `DPR=${dpr} 首帧必须有曲线`);
        for (let i = 1; i <= 8; i++) {
          const grid = engine.grids.get('a');
          engine.push({ series: [{
            id: 'a', t: new Float64Array([grid.right + grid.colW / 2]),
            v: new Float32Array([Math.sin((999 + i) / 100)]),
          }] });
          engine.flushSync();
          const pixels = coloredPixels(engine.cvData);
          check(pixels > before * 0.6 && pixels < before * 1.5,
            `DPR=${dpr} 第 ${i} 帧曲线消失或缩放异常：${before} → ${pixels}`);
        }
        check(engine.incFrames === 8, '必须走真实增量绘制路径');
        const ctx = engine.cvData.getContext('2d');
        check(ctx.getImageData(0, 0, 1, 1).data[3] === 0, '数据层不能遮住背景网格');
        results.push({ dpr, before, after: coloredPixels(engine.cvData), incremental: engine.incFrames });
      } finally {
        engine.dispose();
        host.remove();
      }
    }
  } finally {
    if (descriptor) Object.defineProperty(window, 'devicePixelRatio', descriptor);
    else delete window.devicePixelRatio;
  }
  return results;
}
