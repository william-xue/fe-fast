---
layout: home
titleTemplate: false

hero:
  name: "William Xue"
  text: "工业级可视化前端"
  tagline: 10 年前端 · 48 个开源 PR 被合并 · 20,000 节点 60 FPS
  image:
    src: https://avatars.githubusercontent.com/u/20151622?s=200&v=4
    alt: William Xue
  actions:
    - theme: brand
      text: 看作品
      link: /projects
    - theme: alt
      text: 关于我
      link: /about
    - theme: alt
      text: GitHub
      link: https://github.com/william-xue

features:
  - icon: 🎯
    title: 大规模图形与性能
    details: 让几万个图元在浏览器里跑顺：20,000 节点 / 36,610 连线 60 FPS；自研 SVG 图编辑内核；把卡在同一处的方案换掉。
  - icon: 🗺️
    title: 多引擎 GIS 与数字孪生
    details: 同一份数据集，用 MapLibre 做 2D 瓦片地图、用 CesiumJS 做 3D 地球，各实现一遍——数据一次建模，多视图复用。
  - icon: 🔌
    title: 可闭环的后端交付
    details: 需要一个人把整条线做完时：Vue / React / 小程序前端 + Java 后端 + MySQL / Redis + Docker，CI/CD 一键部署。
  - icon: 🌍
    title: 开源工程影响力
    details: 为 Varlet、AntV X6、Element Plus 等 39 个开源项目提交过 PR，48 个已被合并；Varlet 组织成员。
---

## 已上线产品

这两个项目从**前端到 Java 后端再到部署**都由我独立完成，现在正在线上运行。

<div class="cards">

<a class="card" href="https://crazytrailchina.com/" target="_blank" rel="noreferrer">
  <h3>🏃 Crazy Trail</h3>
  <p class="card-sub">越野跑赛事与路线平台 · 面向国际用户</p>
  <p class="card-body">中国越野跑赛事、路线与故事的英文内容平台，含赛事信息、路线数据与内容展示，服务海外跑者。</p>
  <p class="card-tags"><span>Vue</span><span>Java</span><span>MySQL</span><span>CI/CD</span></p>
</a>

<a class="card" href="https://aichechuhai.com/" target="_blank" rel="noreferrer">
  <h3>🚗 AICHE CHUHAI</h3>
  <p class="card-sub">二手车跨境交易平台</p>
  <p class="card-body">一站式二手车跨境交易平台，覆盖车源、展示与交易流程，前端使用 Element Plus 组件体系。</p>
  <p class="card-tags"><span>Vue 3</span><span>Element Plus</span><span>Java</span><span>Redis</span></p>
</a>

</div>

## 精选开源作品

<div class="cards">

<a class="card" href="https://github.com/william-xue/selection-drag-engine" target="_blank" rel="noreferrer">
  <h3>⭐ selection-drag-engine <em>101 ★</em></h3>
  <p class="card-sub">渲染器无关的框选与多选拖拽引擎</p>
  <p class="card-body">源于 AntV X6 issue #4823：rAF 合并、拖拽快照、preview / commit 分离。解决"拖 100 个图元时掉帧"这一具体问题。</p>
  <p class="card-tags"><span>JavaScript</span><span>rAF 调度</span><span>拖拽状态机</span></p>
</a>

<a class="card" href="https://github.com/william-xue/pin-graph-lib" target="_blank" rel="noreferrer">
  <h3>🧩 pin-graph-lib</h3>
  <p class="card-sub">零依赖 SVG 图编辑内核</p>
  <p class="card-body">2,108 行自研引擎：语义引脚、正交避障布线、吸附、撤销栈、JSON 存档。49 个单测 + 2 套 Chrome E2E。</p>
  <p class="card-tags"><span>SVG</span><span>TypeScript</span><span>49 单测</span></p>
</a>

</div>

<a class="more" href="/projects">查看全部作品与演示 →</a>

## 图形可视化演示系列

同一份确定性生成的 20,000 节点数据集，用不同引擎做成 6 个可交互演示（附讲解视频）。

<div class="cards">

<a class="card" href="https://www.bilibili.com/video/BV1tPpq6yEdu/" target="_blank" rel="noreferrer">
  <h3>🎬 01 · 瓦片化网络地图</h3>
  <p class="card-sub">MapLibre + deck.gl · 20,000 节点</p>
  <p class="card-body">瓦片模式首屏 1.62 MB / 16 块瓦片，完整模式单次 8.86 MB / 53 ms，两种模式都是 60 FPS。</p>
</a>

<a class="card" href="https://www.bilibili.com/video/BV1UPpq6yEpL/" target="_blank" rel="noreferrer">
  <h3>🎬 05 · 3D 产品配置器</h3>
  <p class="card-sub">Three.js · 点击即贴图</p>
  <p class="card-body">上传 GLB 模型与素材，点击模型表面贴花（DecalGeometry 贴合曲面），支持拖动 / 缩放 / 旋转 / 分层与导出。</p>
</a>

</div>

<a class="more" href="/projects#图形可视化演示系列">查看完整 6 个演示 →</a>

## 写作

在 CSDN 写了 **274 篇**原创文章、累计 **102 万**阅读。其中一组是我认真写的：[**《写给程序员的电力系统去魅指南》**](/writing)（10 篇）—— 把电网是并发数据流、拓扑、潮流计算、优化器约束一直讲到 SCUC 跑通和行业生态。

<div class="cards">

<a class="card" href="/writing">
  <h3>✍️ 写给程序员的电力系统去魅指南</h3>
  <p class="card-sub">10 篇 · 我最想让人看到的一组文章</p>
  <p class="card-body">这个行业里既懂电力又能给程序员讲清楚的人很少。这组文章就是拆这道墙的。</p>
</a>

<a class="card" href="https://blog.csdn.net/baidu_31333625" target="_blank" rel="noreferrer">
  <h3>📚 CSDN 博客</h3>
  <p class="card-sub">274 篇原创 · 102 万阅读 · 818 关注</p>
  <p class="card-body">早年的踩坑记录占多数，流量主要来自搜索引擎。写得碎，但一直在写。</p>
</a>

</div>

## 联系方式

<div class="contact">

<a href="mailto:xueyuan99999@gmail.com">📧 xueyuan99999@gmail.com</a>
<a href="https://github.com/william-xue" target="_blank" rel="noreferrer">🐙 github.com/william-xue</a>

</div>

<p class="note">
接受远程合作与合同制项目，尤其欢迎：大规模图形 / 性能优化、GIS 与数字孪生、需要一个人把前后端打通的中小型项目。
</p>

<div class="visitors">
  <span>👀 独立访客 <b id="busuanzi_value_site_uv">—</b></span>
  <span>📈 总访问量 <b id="busuanzi_value_site_pv">—</b></span>
</div>

<style>
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.25rem;
  margin: 1.5rem 0;
}
.card {
  display: block;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1.25rem;
  text-decoration: none;
  color: inherit;
  transition: border-color .2s, transform .2s;
}
.card:hover { border-color: var(--vp-c-brand-1); transform: translateY(-2px); }
.card h3 { margin: 0 0 .35rem; font-size: 1.05rem; }
.card h3 em { font-style: normal; color: #e6a23c; font-size: .85rem; }
.card-sub { margin: 0 0 .6rem; font-size: .85rem; color: var(--vp-c-text-2); }
.card-body { margin: 0 0 .8rem; font-size: .9rem; line-height: 1.6; color: var(--vp-c-text-2); }
.card-tags { margin: 0; display: flex; flex-wrap: wrap; gap: .4rem; }
.card-tags span {
  font-size: .75rem;
  padding: .15rem .5rem;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}
.more { display: inline-block; margin: .5rem 0 1.5rem; font-size: .9rem; }
.contact { display: flex; flex-wrap: wrap; gap: .75rem; margin: 1rem 0; }
.contact a {
  display: inline-flex;
  align-items: center;
  gap: .4rem;
  padding: .6rem 1.1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-decoration: none;
  font-size: .9rem;
}
.contact a:hover { border-color: var(--vp-c-brand-1); }
.note { color: var(--vp-c-text-2); font-size: .9rem; line-height: 1.7; }
.visitors {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
  font-size: .85rem;
  color: var(--vp-c-text-2);
}
.visitors b { color: var(--vp-c-text-1); }
</style>
