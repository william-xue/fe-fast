import { CanvasEngine } from '../js/engines/engine-canvas.js';

// 浏览器控制台运行：await (await import('./tests/canvas-regression.js')).runCanvasRegression()
export function runCanvasRegression() {
  const descriptor = Object.getOwnPropertyDescriptor(window, 'devicePixelRatio');
  const results = [];
  const check = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  const coloredPixels = (canvas) => {
    const gl = canvas.getContext('webgl2');
    const data = new Uint8Array(canvas.width * canvas.height * 4);
    gl.readPixels(0, 0, canvas.width, canvas.height, gl.RGBA, gl.UNSIGNED_BYTE, data);
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
        check(engine.grids.get('a').right >= engine.buffers.get('a').lastT, '实时新点必须进入列栅格');
        const gl = engine.gl;
        const corner = new Uint8Array(4);
        gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, corner);
        check(corner[3] === 0, '数据层不能遮住背景网格');
        const after = coloredPixels(engine.cvData);
        engine.setSpan(5000);
        engine.flushSync();
        check(coloredPixels(engine.cvData) > 100, '缩放后必须有曲线');
        engine.host.style.width = '640px';
        engine.resize();
        engine.flushSync();
        check(engine.cvData.width === Math.floor(640 * dpr), '画布尺寸必须匹配 DPR');
        check(coloredPixels(engine.cvData) > 100, '调整尺寸后必须有曲线');
        engine.reviewFull();
        check(coloredPixels(engine.cvData) > 100, '全历史回看必须有曲线');
        check(gl.getError() === gl.NO_ERROR, 'WebGL 绘制不能产生错误');
        results.push({ dpr, before, after, frames: engine.fullFrames });
      } finally {
        const { gl, program, vertexBuffer } = engine;
        engine.dispose();
        check(!gl.isBuffer(vertexBuffer) && !gl.isProgram(program), '销毁必须释放 GPU 缓冲与程序');
        host.remove();
      }
    }
  } finally {
    if (descriptor) Object.defineProperty(window, 'devicePixelRatio', descriptor);
    else delete window.devicePixelRatio;
  }
  return results;
}
