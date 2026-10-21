import { CanvasEngine } from '../js/engines/engine-canvas.js';
import { WebGLEngine } from '../js/engines/engine-webgl.js';

// 浏览器控制台运行：await (await import('./tests/canvas-regression.js')).runCanvasRegression()
export function runCanvasRegression() {
  const descriptor = Object.getOwnPropertyDescriptor(window, 'devicePixelRatio');
  const results = [];
  const check = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  const readPixels = (engine, width = engine.cvData.width, height = engine.cvData.height) => {
    if (!engine.gl) return engine.dataCtx.getImageData(0, 0, width, height).data;
    const gl = engine.gl;
    const data = new Uint8Array(width * height * 4);
    gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, data);
    return data;
  };
  const coloredPixels = (engine) => {
    const data = readPixels(engine);
    let count = 0;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 1] > 80 && data[i + 2] > 60) count++;
    }
    return count;
  };

  try {
    for (const [kind, Engine] of [['canvas', CanvasEngine], ['webgl', WebGLEngine]]) {
      for (const dpr of [2, 1, 1.25]) {
        Object.defineProperty(window, 'devicePixelRatio', { configurable: true, value: dpr });
        const host = document.createElement('div');
        host.style.cssText = 'position:fixed;left:0;top:0;width:600px;height:300px';
        document.body.append(host);
        const engine = new Engine(host, {
          defs: [{ id: 'a', name: '测试曲线', color: '#35e0c2' }], spanMs: 10000,
        });
        try {
          const t = Float64Array.from({ length: 1000 }, (_, i) => 100000 + i * 10);
          const v = Float32Array.from(t, (_, i) => Math.sin(i / 100));
          engine.load(new Map([['a', { t, v }]]));
          const before = coloredPixels(engine);
          check(before > 0, `DPR=${dpr} 首帧必须有曲线`);
          for (let i = 1; i <= 8; i++) {
            const grid = engine.grids.get('a');
            engine.push({ series: [{
              id: 'a', t: new Float64Array([grid.right + grid.colW / 2]),
              v: new Float32Array([Math.sin((999 + i) / 100)]),
            }] });
            engine.flushSync();
            const pixels = coloredPixels(engine);
            check(pixels > before * 0.6 && pixels < before * 1.5,
              `DPR=${dpr} 第 ${i} 帧曲线消失或缩放异常：${before} → ${pixels}`);
          }
          check(engine.grids.get('a').right >= engine.buffers.get('a').lastT, '实时新点必须进入列栅格');
          const corner = readPixels(engine, 1, 1);
          check(corner[3] === 0, '数据层不能遮住背景网格');
          const after = coloredPixels(engine);
          engine.setSpan(5000);
          engine.flushSync();
          check(coloredPixels(engine) > 100, '缩放后必须有曲线');
          engine.host.style.width = '640px';
          engine.resize();
          engine.flushSync();
          check(engine.cvData.width === Math.floor(640 * dpr), '画布尺寸必须匹配 DPR');
          check(coloredPixels(engine) > 100, '调整尺寸后必须有曲线');
          engine.reviewFull();
          check(coloredPixels(engine) > 100, '全历史回看必须有曲线');
          if (engine.gl) check(engine.gl.getError() === engine.gl.NO_ERROR, 'WebGL 绘制不能产生错误');
          if (kind === 'canvas') check(engine.incFrames === 8, 'Canvas必须保留位图增量绘制');
          results.push({ kind, dpr, before, after, frames: engine.fullFrames + engine.incFrames });
        } finally {
          const { gl, program, vertexBuffer } = engine;
          engine.dispose();
          host.remove();
          if (gl) check(!gl.isBuffer(vertexBuffer) && !gl.isProgram(program), '销毁必须释放 GPU 缓冲与程序');
        }
      }
    }
  } finally {
    if (descriptor) Object.defineProperty(window, 'devicePixelRatio', descriptor);
    else delete window.devicePixelRatio;
  }
  return results;
}
