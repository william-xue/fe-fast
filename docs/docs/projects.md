---
layout: page
---

# 作品

按"能不能点开验证"排序：**已上线产品 → 自研开源项目 → 图形可视化演示 → 小玩意与实验 → 开源贡献**。

## 已上线产品

这两个项目从**前端到 Java 后端再到部署**都由我独立完成，现在正在线上运行。

<div class="cards">

<a class="card" href="https://crazytrailchina.com/" target="_blank" rel="noreferrer">
  <div class="head"><h3>🏃 Crazy Trail</h3><span class="live">● 线上</span></div>
  <p class="sub">越野跑赛事与路线平台 · 面向国际用户</p>
  <p class="body">中国越野跑赛事、路线与故事的英文内容平台，服务海外跑者。包含赛事信息、路线数据与内容展示。</p>
  <p class="stack"><b>技术</b>：Vue · Java 后端 · MySQL · CI/CD 一键部署</p>
  <p class="tags"><span>Vue</span><span>Java</span><span>MySQL</span><span>CI/CD</span></p>
</a>

<a class="card" href="https://aichechuhai.com/" target="_blank" rel="noreferrer">
  <div class="head"><h3>🚗 AICHE CHUHAI</h3><span class="live">● 线上</span></div>
  <p class="sub">二手车跨境交易平台</p>
  <p class="body">一站式二手车跨境交易平台，覆盖车源展示与交易流程，前端使用 Element Plus 组件体系。</p>
  <p class="stack"><b>技术</b>：Vue 3 · Element Plus · Java 后端 · Redis · CI/CD 一键部署</p>
  <p class="tags"><span>Vue 3</span><span>Element Plus</span><span>Java</span><span>Redis</span></p>
</a>

</div>

<p class="aside">
两个项目都覆盖了 Web 与小程序端，前端用过 Vue / React，后端为 Java，均配置了 CI/CD 一键部署。
</p>

## 自研开源项目

<div class="cards">

<a class="card" href="https://github.com/william-xue/selection-drag-engine" target="_blank" rel="noreferrer">
  <div class="head"><h3>⭐ selection-drag-engine</h3><span class="star">101 ★</span></div>
  <p class="sub">渲染器无关的框选与多选拖拽引擎</p>
  <p class="body">
    源于 AntV X6 issue #4823。核心是把"批量拖拽"这件事拆干净：<b>rAF 合并</b>把多次指针事件压成一帧一次计算、<b>拖拽快照</b>避免拖拽过程中反复读模型、<b>preview / commit 分离</b>让视觉反馈和状态提交解耦。
  </p>
  <p class="why"><b>解决什么</b>：拖 100 个图元就掉帧的问题。适用于任何图形编辑器，不绑定渲染器。</p>
  <p class="tags"><span>JavaScript</span><span>rAF 调度</span><span>拖拽状态机</span></p>
</a>

<a class="card" href="https://github.com/william-xue/pin-graph-lib" target="_blank" rel="noreferrer">
  <div class="head"><h3>🧩 pin-graph-lib</h3><span class="star">自研引擎</span></div>
  <p class="sub">零依赖 SVG 图编辑内核</p>
  <p class="body">
    2,108 行自研引擎：语义引脚（方向 / 边 / 角色 / 热区）、正交避障布线、吸附、撤销栈、JSON 存档 / 恢复。
  </p>
  <p class="why"><b>可核查</b>：49 个单元测试 + 2 套 Chrome E2E 全绿；npm 包 MIT 协议。</p>
  <p class="tags"><span>SVG</span><span>TypeScript</span><span>49 单测</span><span>E2E</span></p>
</a>

<a class="card" href="https://github.com/william-xue/x6-plugin-port-editor" target="_blank" rel="noreferrer">
  <div class="head"><h3>🔌 x6-plugin-port-editor</h3><span class="star">已并入上游</span></div>
  <p class="sub">AntV X6 端口编辑插件</p>
  <p class="body">
    为 AntV X6 增加可视化端口编辑能力，改动已作为 <code>feat: add port editor plugin</code> <b>合并进 X6 主仓库</b>。
  </p>
  <p class="why"><b>意义</b>：不只是"给开源提过 PR"，而是能改动别人的核心引擎并让其接受。</p>
  <p class="tags"><span>AntV X6</span><span>插件体系</span><span>已合并</span></p>
</a>

<a class="card" href="https://github.com/william-xue/gridpilot-studio" target="_blank" rel="noreferrer">
  <div class="head"><h3>🗺️ gridpilot-studio</h3><span class="star">GIS + Agent</span></div>
  <p class="sub">电网 GIS 工作台 + AI Agent</p>
  <p class="body">
    Vue + deck.gl 渲染 1,327 个场站的真实规模数据。内置可运行的 AI Agent：Node 端 ReAct 循环 + 11 个工具注册表（查数据 / BFS 连通性 / 地图动作）+ SSE 流式输出，5 条端到端验收脚本全绿。
  </p>
  <p class="why"><b>解决什么</b>：让用户用自然语言操控地图数据，而不是点十层菜单。</p>
  <p class="tags"><span>deck.gl</span><span>Vue</span><span>ReAct</span><span>SSE</span></p>
</a>

</div>

## 图形可视化演示系列

同一份**确定性生成**的 20,000 节点数据集，用不同引擎做成 6 个可交互演示 —— 对应六种客户会问到的能力。每个都有讲解视频。

<div class="series">

<div class="row">
  <div class="no">01</div>
  <div class="info">
    <h3>瓦片化网络地图 <span class="k">MapLibre + deck.gl</span></h3>
    <p>20,000 节点 / 36,610 连线。瓦片模式首屏 <b>1.62 MB / 16 块瓦片</b>，完整模式单次 <b>8.86 MB / 53 ms</b>，两种模式都保持 <b>60 FPS</b>。左侧实时显示可见瓦片数、传输字节、每次请求耗时。</p>
  </div>
  <div class="link"><a href="https://www.bilibili.com/video/BV1tPpq6yEdu/" target="_blank" rel="noreferrer">▶ 看视频</a></div>
</div>

<div class="row">
  <div class="no">02</div>
  <div class="info">
    <h3>交互式 3D 场景 <span class="k">Three.js</span></h3>
    <p>42 个互联站点的可交互 3D 场景：InstancedMesh 实例化渲染、无后处理的辉光、曲线连线与流动粒子、射线拾取 → instanceId 直接索引数据模型。<b>60 FPS / 83 draw calls</b>。</p>
  </div>
  <div class="link"><a href="https://space.bilibili.com/169548308" target="_blank" rel="noreferrer">▶ 合集</a></div>
</div>

<div class="row">
  <div class="no">03</div>
  <div class="info">
    <h3>车队实时监控 <span class="k">MapLibre + deck.gl</span></h3>
    <p>500 台车实时跑动、拖尾历史、电子围栏（实时在场计数）、点击查看详情。位置逐帧更新，拖尾按 400ms 采样 —— <b>60 FPS</b>。</p>
  </div>
  <div class="link"><a href="https://space.bilibili.com/169548308" target="_blank" rel="noreferrer">▶ 合集</a></div>
</div>

<div class="row">
  <div class="no">04</div>
  <div class="info">
    <h3>图编辑器引擎 <span class="k">零依赖 SVG + TypeScript</span></h3>
    <p>元件设计器 + 装配画布：语义引脚、连接策略校验、正交避障路由、命令式撤销重做。压测按钮可生成 <b>2,000 个节点并保持 60 FPS</b>；<b>211 个单测全绿</b>，产物仅 130 KB（gzip 36 KB）。</p>
  </div>
  <div class="link"><a href="https://space.bilibili.com/169548308" target="_blank" rel="noreferrer">▶ 合集</a></div>
</div>

<div class="row">
  <div class="no">05</div>
  <div class="info">
    <h3>3D 产品配置器 <span class="k">Three.js</span></h3>
    <p>上传 GLB 模型与素材，点击模型表面贴花（DecalGeometry 贴合曲面而非浮在表面），支持拖动 / 缩放 / 旋转、分层管理、撤销与导出图片。</p>
  </div>
  <div class="link"><a href="https://www.bilibili.com/video/BV1UPpq6yEpL/" target="_blank" rel="noreferrer">▶ 看视频</a></div>
</div>

<div class="row">
  <div class="no">06</div>
  <div class="info">
    <h3>3D 地球视图 <span class="k">CesiumJS</span></h3>
    <p>与 01 <b>共用同一份数据集</b>的 Cesium 地球视图 —— 一份数据、两套引擎。分级细节（Backbone / Regional / 全部 20,000 节点）均 <b>60 FPS</b>，无 ion token、无影像服务依赖，点击节点可定位。</p>
  </div>
  <div class="link"><a href="https://space.bilibili.com/169548308" target="_blank" rel="noreferrer">▶ 合集</a></div>
</div>

</div>

<p class="aside">
这六个演示的共同点：数据都是确定性生成的合成数据（无客户数据、无真实拓扑），刷新即复现；每一个都挂了实时帧率计数器，性能可以当场验证而不是听我说。
</p>

## 小玩意与实验

不上台面的小东西，但能说明一件事：**我喜欢琢磨**。看到一个问题就想自己写一个工具解决它，哪怕是凌晨两点。

<div class="cards">

<a class="card" href="https://william-xue.github.io/rusty-pic/" target="_blank" rel="noreferrer">
  <div class="head"><h3>🦀 Rusty Pic</h3><span class="live">● 线上可玩</span></div>
  <p class="sub">Rust + WebAssembly 极限图片压缩</p>
  <p class="body">
    为了减少图片带宽消耗写的：Rust 侧编译为 WebAssembly，在浏览器里直接处理，图片不出本地。除了 Web 版还提供了 <b>CLI</b> 与 <b>Vite 插件</b>，也能发布到 npm。
  </p>
  <p class="tags"><span>Rust</span><span>WebAssembly</span><span>Vite 插件</span><span>CLI</span></p>
</a>

<a class="card" href="https://github.com/william-xue/port-checker" target="_blank" rel="noreferrer">
  <div class="head"><h3>🔧 port-checker</h3><span class="star">crates.io</span></div>
  <p class="sub">Rust 命令行端口检测工具</p>
  <p class="body">
    快速检测端口占用与对应进程，支持单端口与范围扫描、超时与并发控制、结果导出。跨 macOS / Linux / Windows。
  </p>
  <p class="why"><b>最近还在维护</b>：收到 Linux 编译失败的 issue 后已定位并修复（分支路径在系统分配端口时返回 0），PR 上的 CI 已恢复运行。</p>
  <p class="tags"><span>Rust</span><span>CLI</span><span>跨平台</span></p>
</a>

<a class="card" href="https://github.com/william-xue/js-interaction-lens" target="_blank" rel="noreferrer">
  <div class="head"><h3>🔍 js-interaction-lens</h3><span class="star">调试工具</span></div>
  <p class="sub">交互阶段对照工具</p>
  <p class="body">
    把交互拆成开始 / 更新 / 完成 / 取消四个阶段并可视化对照，用来调试复杂手势与拖拽逻辑 —— 拖拽类 bug 最常见的原因就是这四个阶段没分清。
  </p>
  <p class="tags"><span>JavaScript</span><span>调试工具</span></p>
</a>

</div>

## 开源贡献

<div class="oss">

| 项目 | 说明 |
|---|---|
| **Varlet** | Vue 3 移动端组件库，**组织成员**；提交并维护 `input` / `field-decorator` / `ellipsis` / `date-picker` 等改动 |
| **AntV X6** | 图编辑引擎；**端口编辑插件已合并进主仓库**，另有多处文档与修复 |
| **Element Plus** | 表格多选筛选、滚动条过渡等修复 |
| **antdv-next** | 组件修复与文档改进（合并数最多，11 个） |
| **vercel/ai** | OpenAI provider 与 codemod 相关改动 |
| **其他** | plotly.js、recharts、deck.gl、naive-ui、vexip-ui、Pyomo、PyPSA、PowerGridModel、Grid2op、pandapower、litellm、cline、OpenHands、modelcontextprotocol |

<p class="aside">
累计提交 <b>94 个 PR</b>（<b>48 个已合并</b>）、覆盖 <b>39 个仓库</b>、提出 122 个 issue。全部可以在 GitHub 上按作者 @william-xue 查到。
</p>

</div>

<style>
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem; margin: 1.5rem 0; }
.card { display: block; border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 1.25rem; text-decoration: none; color: inherit; transition: border-color .2s, transform .2s; }
.card:hover { border-color: var(--vp-c-brand-1); transform: translateY(-2px); }
.card .head { display: flex; align-items: baseline; justify-content: space-between; gap: .75rem; }
.card h3 { margin: 0 0 .35rem; font-size: 1.02rem; }
.card .live { font-size: .75rem; color: #67c23a; }
.card .star { font-size: .75rem; color: #e6a23c; white-space: nowrap; }
.card .sub { margin: 0 0 .6rem; font-size: .85rem; color: var(--vp-c-text-2); }
.card .body { margin: 0 0 .7rem; font-size: .9rem; line-height: 1.65; color: var(--vp-c-text-2); }
.card .why { margin: 0 0 .7rem; font-size: .85rem; line-height: 1.6; color: var(--vp-c-text-2); }
.card .why b, .card .stack b { color: var(--vp-c-text-1); }
.card .stack { margin: 0 0 .7rem; font-size: .82rem; color: var(--vp-c-text-2); }
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
.series .link { flex: 0 0 auto; padding-top: .15rem; }
.series .link a { font-size: .85rem; white-space: nowrap; }
.aside { font-size: .85rem; color: var(--vp-c-text-2); line-height: 1.7; padding-left: .75rem; border-left: 3px solid var(--vp-c-divider); }
.oss table { display: table; width: 100%; }
@media (max-width: 640px) {
  .series .row { flex-wrap: wrap; }
  .series .link { flex-basis: 100%; }
}
</style>
