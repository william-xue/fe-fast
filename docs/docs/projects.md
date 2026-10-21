---
layout: doc
---

# 作品与工程实践

<p class="lead">
聚焦大规模图形渲染、可视化引擎、图编辑器与全栈工程落地。所有开源代码均公开可查，演示项目均可直接在线运行。
</p>

## 自研开源与架构工具

<div class="cards">

<a class="card" href="https://github.com/william-xue/selection-drag-engine" target="_blank" rel="noreferrer">
  <div class="head"><h3>selection-drag-engine</h3><span class="star">101 ★</span></div>
  <p class="sub">渲染器无关的框选与多选拖拽引擎</p>
  <p class="body">
    源于 <a href="https://github.com/antvis/X6/issues/4823" target="_blank" rel="noreferrer">AntV X6 issue #4823</a>。rAF 合并指针事件、拖拽快照避免中途读模型、preview / commit 分离解耦反馈与提交。
  </p>
  <p class="tags"><span>JavaScript</span><span>rAF 调度</span><span>拖拽状态机</span></p>
</a>

<a class="card" href="https://github.com/william-xue/pin-graph-lib" target="_blank" rel="noreferrer">
  <div class="head"><h3>pin-graph-lib</h3><span class="star">MIT · npm</span></div>
  <p class="sub">零依赖 SVG 图编辑内核</p>
  <p class="body">
    2,108 行零依赖引擎：语义引脚、正交避障布线、吸附、撤销栈、JSON 存档。49 单测 + 2 套 Chrome E2E，含 2,000 节点框选拖拽场景。
  </p>
  <p class="tags"><span>SVG</span><span>TypeScript</span><span>49 单测</span><span>E2E</span></p>
</a>

<a class="card" href="https://github.com/antvis/X6/pull/5093" target="_blank" rel="noreferrer">
  <div class="head"><h3>X6 端口编辑插件</h3><span class="star">已合并进上游</span></div>
  <p class="sub">AntV X6 · PR #5093</p>
  <p class="body">
    为 AntV X6 增加可视化端口编辑能力，以 <code>feat: add port editor plugin</code> 合并进主仓库（2026 年 10 月）。配套的独立插件包在 <a href="https://github.com/william-xue/x6-plugin-port-editor" target="_blank" rel="noreferrer">x6-plugin-port-editor</a>。
  </p>
  <p class="tags"><span>AntV X6</span><span>插件体系</span><span>已合并</span></p>
</a>

<a class="card" href="https://github.com/william-xue/gridpilot-studio" target="_blank" rel="noreferrer">
  <div class="head"><h3>gridpilot-studio</h3><span class="star">GIS + Agent</span></div>
  <p class="sub">电网 GIS 工作台 + AI Agent</p>
  <p class="body">
    Vue + deck.gl 渲染 1,327 个场站。Node 端 ReAct 循环 + 11 个工具注册表 + SSE 流式输出，5 条端到端验收脚本全绿。
  </p>
  <p class="tags"><span>deck.gl</span><span>Vue</span><span>ReAct</span><span>SSE</span></p>
</a>

</div>

## 大规模图形可视化工程系列

前六个共用同一份**确定性生成**的 20,000 节点真实拓扑数据集，以不同渲染器与管线分别实现；第 7 个为完整可交互的 3D 家居设计应用；第 8 个反过来做 —— 一个**渲染性能基准**，把三种后端放在同一份数据上硬碰，数字可复跑。**全部支持直接在线运行**（非录像演示），关键项目配有架构讲解视频。

<div class="series">

<div class="row">
  <div class="no">01</div>
  <div class="info">
    <h3>瓦片化网络地图 <span class="k">MapLibre + deck.gl</span></h3>
    <p>20,000 节点 / 36,610 连线。瓦片模式首屏 <b>1.62 MB / 16 块瓦片</b>，完整模式单次 <b>8.86 MB / 53 ms</b>，两种模式都保持 <b>60 FPS</b>。左侧实时显示可见瓦片数、传输字节、每次请求耗时。</p>
  </div>
  <div class="link">
    <a class="demo" href="https://showcase-01-network-topo.vercel.app" target="_blank" rel="noreferrer">▶ 在线演示</a>
    <a class="vid" href="https://www.bilibili.com/video/BV1tPpq6yEdu/" target="_blank" rel="noreferrer">看视频</a>
  </div>
</div>

<div class="row">
  <div class="no">02</div>
  <div class="info">
    <h3>交互式 3D 场景 <span class="k">Three.js</span></h3>
    <p>42 个互联站点的可交互 3D 场景：InstancedMesh 实例化渲染、无后处理的辉光、曲线连线与流动粒子、射线拾取 → instanceId 直接索引数据模型。<b>60 FPS / 83 draw calls</b>。</p>
  </div>
  <div class="link">
    <a class="demo" href="https://showcase-02-3d-viewer.vercel.app" target="_blank" rel="noreferrer">▶ 在线演示</a>
    <a class="vid" href="https://space.bilibili.com/169548308" target="_blank" rel="noreferrer">看视频</a>
  </div>
</div>

<div class="row">
  <div class="no">03</div>
  <div class="info">
    <h3>车队实时监控 <span class="k">MapLibre + deck.gl</span></h3>
    <p>500 台车实时跑动、拖尾历史、电子围栏（实时在场计数）、点击查看详情。位置逐帧更新，拖尾按 400ms 采样 —— <b>60 FPS</b>。</p>
  </div>
  <div class="link">
    <a class="demo" href="https://showcase-03-fleet-tracking.vercel.app" target="_blank" rel="noreferrer">▶ 在线演示</a>
    <a class="vid" href="https://space.bilibili.com/169548308" target="_blank" rel="noreferrer">看视频</a>
  </div>
</div>

<div class="row">
  <div class="no">04</div>
  <div class="info">
    <h3>图编辑器引擎 <span class="k">零依赖 SVG + TypeScript</span></h3>
    <p>元件设计器 + 装配画布：语义引脚、连接策略校验、正交避障路由、命令式撤销重做。压测按钮可生成 <b>2,000 个节点并保持 60 FPS</b>；配套单元测试覆盖核心路径。</p>
  </div>
  <div class="link">
    <a class="demo" href="https://showcase-04-x6-editor.vercel.app" target="_blank" rel="noreferrer">▶ 在线演示</a>
    <a class="vid" href="https://space.bilibili.com/169548308" target="_blank" rel="noreferrer">看视频</a>
  </div>
</div>

<div class="row">
  <div class="no">05</div>
  <div class="info">
    <h3>3D 产品配置器 <span class="k">Three.js</span></h3>
    <p>上传 GLB 模型与素材，点击模型表面贴花（DecalGeometry 贴合曲面而非浮在表面），支持拖动 / 缩放 / 旋转、分层管理、撤销与导出图片。</p>
  </div>
  <div class="link">
    <a class="demo" href="https://showcase-05-configurator.vercel.app" target="_blank" rel="noreferrer">▶ 在线演示</a>
    <a class="vid" href="https://www.bilibili.com/video/BV1UPpq6yEpL/" target="_blank" rel="noreferrer">看视频</a>
  </div>
</div>

<div class="row">
  <div class="no">06</div>
  <div class="info">
    <h3>3D 地球视图 <span class="k">CesiumJS</span></h3>
    <p>与 01 <b>共用同一份数据集</b>的 Cesium 地球视图 —— 一份数据、两套引擎。分级细节（Backbone / Regional / 全部 20,000 节点）均 <b>60 FPS</b>，无 ion token、无影像服务依赖，点击节点可定位。</p>
  </div>
  <div class="link">
    <a class="demo" href="https://showcase-06-cesium-globe.vercel.app" target="_blank" rel="noreferrer">▶ 在线演示</a>
    <a class="vid" href="https://space.bilibili.com/169548308" target="_blank" rel="noreferrer">看视频</a>
  </div>
</div>

<div class="row">
  <div class="no">07</div>
  <div class="info">
    <h3>家居 3D 配置器 <span class="k">React Three Fiber + Zustand</span></h3>
    <p>户型<b>本身是一份数据</b>（改 <code>floorplan.json</code> 就改房型，不用动代码），24 个 SKU 商品库 + 28 个真实 CC0 模型。拖动摆放支持网格吸附、贴墙、叠放；非法落点会就近顺到合法位置并留下脚印。换款 / 换色 / 换材质、商品清单与合计、本地存档与版本冲突、第一人称漫游、HDRI 光照 —— <b>所有操作共用同一条撤销历史</b>。</p>
  </div>
  <div class="link">
    <a class="demo" href="https://showcase-07-home3d-editor.vercel.app" target="_blank" rel="noreferrer">▶ 在线演示</a>
  </div>
</div>

<div class="row">
  <div class="no">08</div>
  <div class="info">
    <h3>工业时序渲染基准 <span class="k">WebGL2 曲线 + TypedArray</span></h3>
    <p>六路本地合成信号，当前试用版用 <b>WebGL2 绘制聚合后的曲线</b>，保留 ECharts 调优版和朴素版作为对照。支持十万到一百万历史点、实时追加、全历史回看和 JSON 导出。配套文章记录 Canvas 2D 与 WebGL 的实测对比、绘制差异和计时边界。</p>
  </div>
  <div class="link">
    <a class="demo" href="https://showcase-08-timeseries-bench.vercel.app" target="_blank" rel="noreferrer">▶ 在线演示</a>
    <a class="vid" href="articles/industrial-timeseries-benchmark">读分析</a>
  </div>
</div>

</div>

<p class="aside">
数据全部是合成或 CC0 素材，刷新即复现；网络类演示都挂了实时帧率计数器。<b>链接直接可开，不需要登录或安装</b>。
</p>

<style>
.lead { font-size: 1.15rem; line-height: 1.8; color: var(--vp-c-text-2); margin-bottom: 2rem; }
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem; margin: 1.5rem 0; }
.card { display: block; border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 1.25rem; text-decoration: none; color: inherit; transition: border-color .2s, transform .2s; }
.card:hover { border-color: var(--vp-c-brand-1); transform: translateY(-2px); }
.card .head { display: flex; align-items: baseline; justify-content: space-between; gap: .75rem; }
.card h3 { margin: 0 0 .35rem; font-size: 1.02rem; }
.card .live { font-size: .75rem; color: #67c23a; }
.card .star { font-size: .75rem; color: #e6a23c; white-space: nowrap; }
.card .sub { margin: 0 0 .6rem; font-size: .85rem; color: var(--vp-c-text-2); }
.card .body { margin: 0 0 .7rem; font-size: .9rem; line-height: 1.65; color: var(--vp-c-text-2); }
.card .stack { margin: 0 0 .7rem; font-size: .82rem; color: var(--vp-c-text-2); }
.card .stack b { color: var(--vp-c-text-1); }
.card .tags { margin: 0; display: flex; flex-wrap: wrap; gap: .4rem; }
.card .tags span { font-size: .75rem; padding: .15rem .5rem; border-radius: 4px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-2); }
.series { margin: 1.5rem 0; }
.series .row { display: flex; gap: 1rem; padding: 1.1rem 0; border-bottom: 1px solid var(--vp-c-divider); }
.series .row:last-child { border-bottom: none; }
.series .no { flex: 0 0 42px; font-size: 1.15rem; font-weight: 700; color: var(--vp-c-brand-1); font-variant-numeric: tabular-nums; }
.series .info { flex: 1; }
.series .info h3 { margin: 0 0 .4rem; font-size: .98rem; }
.series .info h3 .k { font-size: .75rem; font-weight: 500; color: var(--vp-c-text-2); border: 1px solid var(--vp-c-divider); border-radius: 4px; padding: .1rem .4rem; margin-left: .4rem; vertical-align: middle; }
.series .info p { margin: 0; font-size: .88rem; line-height: 1.75; color: var(--vp-c-text-2); }
.series .link { flex: 0 0 auto; padding-top: .15rem; display: flex; flex-direction: column; gap: .3rem; align-items: flex-end; }
.series .link a { font-size: .85rem; white-space: nowrap; }
.series .link a.demo { font-weight: 600; }
.series .link a.vid { font-size: .8rem; color: var(--vp-c-text-2); }
.aside { font-size: .85rem; color: var(--vp-c-text-2); line-height: 1.7; padding-left: .75rem; border-left: 3px solid var(--vp-c-divider); }
@media (max-width: 640px) {
  .series .row { flex-wrap: wrap; }
  .series .link { flex-basis: 100%; }
}
</style>
