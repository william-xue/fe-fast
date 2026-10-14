---
layout: doc
---

# 关于我

<div class="profile">
  <img src="https://avatars.githubusercontent.com/u/20151622?s=200&v=4" alt="William Xue" width="96" />
  <div>
    <h2>William Xue</h2>
    <p class="role">资深前端工程师 · 十年经验</p>
    <p class="meta">中后台业务系统 · 图形可视化 · 可闭环的端到端交付</p>
  </div>
</div>

## 我是谁

十年前端，九年在上海。

前五年在中通快递，做到智能办公业务前端负责人，带五人小组支撑招聘、内训、绩效、考勤、薪酬五套系统。最近一年在电力软件公司做图形方向：接手电网拓扑编辑器，把五千节点开始掉帧的方案换成 WebGL，两万节点算例稳定 60 FPS。

## 能力结构

<div class="grid">

<div class="block">
  <h3>前端与图形可视化（主线）</h3>
  <ul>
    <li><b>框架</b>：Vue 2/3、React、TypeScript</li>
    <li><b>图形</b>：WebGL、Three.js、deck.gl、CesiumJS、AntV X6、Canvas / SVG 自研引擎</li>
    <li><b>工程</b>：Vite、Webpack、组件库与工具库建设、微前端</li>
    <li><b>性能</b>：大数据量渲染、视口剔除、GPU 缓冲复用、Web Worker 卸载</li>
  </ul>
</div>

<div class="block">
  <h3>后端与数据（可闭环）</h3>
  <ul>
    <li><b>语言</b>：Java / Spring Boot、Node.js、Python</li>
    <li><b>数据</b>：MySQL、Redis（缓存、分布式锁、限流、队列）</li>
    <li><b>接口</b>：RESTful API 设计、前后端联调、表设计、慢 SQL 定位</li>
    <li><b>定位</b>：能把一条业务链从前端做到库并上线；不是后端架构师，不虚标高并发经验</li>
  </ul>
</div>

<div class="block">
  <h3>工程与部署</h3>
  <ul>
    <li><b>容器与网关</b>：Docker、Nginx</li>
    <li><b>CI/CD</b>：GitHub Actions 一键构建部署（本站就是）</li>
    <li><b>排查</b>：日志与错误码定位、分层排查（前端 / 网关 / 接口 / 库）</li>
  </ul>
</div>

</div>

## 工作经历

<div class="timeline">

<div class="item">
  <div class="when">2025.05 – 2026.08</div>
  <div class="what">
    <h3>南京图德科技 · 高级前端工程师（电力软件）</h3>
    <p>主导电力图形编辑替代工具：独立负责 WebGL / deck.gl 渲染与交互，把五千节点开始卡顿的 ECharts 方案替换为支撑两万+节点算例编辑的实现；从 0 到 1 搭建 AntV X6 电力元件编辑器；独立交付公司内部 AI 仿真助手的前端与流式链路。</p>
  </div>
</div>

<div class="item">
  <div class="when">2020.05 – 2025.04</div>
  <div class="what">
    <h3>中通快递 · 前端开发工程师 / 智能办公前端负责人</h3>
    <p>负责服务全国三万+网点的业务系统前端；作为智能办公前端负责人，组建并带领五人小组交付招聘、内训、绩效、考勤、薪酬五套系统；建设内部组件库与工具库、制定前端规范与上线流程；研发可配置公式计算组件并获实用新型专利；另交付过 Canvas 自研的小件分拣可视化大屏。</p>
  </div>
</div>

<div class="item">
  <div class="when">2018.03 – 2020.05</div>
  <div class="what">
    <h3>果麦文化传媒 · 前端开发工程师</h3>
    <p>React + TypeScript 开发出版行业 ERP；主导小程序多端适配，通过条件编译与分包预加载把开发资源消耗降低约 60%。</p>
  </div>
</div>

<div class="item">
  <div class="when">2016.01 – 2018.02</div>
  <div class="what">
    <h3>上海嘉银金融科技 · 前端开发工程师</h3>
    <p>聚合支付平台技术栈重构；独立完成贷后管理系统前端从 0 到 1 搭建；设计跨项目统一单点登录方案。</p>
  </div>
</div>

</div>

## 开源

给 AntV X6、Element Plus、varlet、antdv-next、VisActor/VTable、openai-agents-python、vercel/ai 等提过 PR，累计 **95 个，47 个已合并**；日常在 varlet 社区分诊 issue、评审 PR。自研的 [selection-drag-engine](https://github.com/william-xue/selection-drag-engine) 101 星。

代表性改动：X6 端口编辑插件（[PR #5093](https://github.com/antvis/X6/pull/5093)，已并入主仓库）、Element Plus 表格筛选修复。电力方向给 Pyomo、PyPSA、PowerGridModel、Grid2op 提过已合并 PR。自研工具见[首页](/#小工具)。

## 技术理念

- **先定位再优化。** 换渲染器之前先证明瓶颈在哪：DOM 数量、重排，还是 GPU 提交。
- **数字说话。** "5,000 节点卡住，换成什么，验证是多少"——比任何概念都有说服力。
- **不写没做过的东西。** 主页上每个数字都指向一个可点开的链接、一个可跑的测试或一个线上系统。

## 联系

目前看上海和南京的机会，中后台与图形方向优先。

<div class="contact">
  <a href="mailto:xueyuan99999@gmail.com">xueyuan99999@gmail.com</a>
  <a href="https://github.com/william-xue">github.com/william-xue</a>
</div>

<style>
.profile { display: flex; align-items: center; gap: 1.25rem; margin: 1.5rem 0 2rem; }
.profile img { border-radius: 50%; border: 1px solid var(--vp-c-divider); }
.profile h2 { margin: 0 0 .25rem; }
.profile .role { margin: 0 0 .25rem; font-size: 1rem; color: var(--vp-c-text-1); font-weight: 600; }
.profile .meta { margin: 0; font-size: .85rem; color: var(--vp-c-text-2); }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.25rem; margin: 1.5rem 0; }
.block { border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 1.25rem; }
.block h3 { margin: 0 0 .75rem; font-size: 1rem; }
.block ul { margin: 0; padding-left: 1.1rem; font-size: .9rem; line-height: 1.8; color: var(--vp-c-text-2); }
.block li b { color: var(--vp-c-text-1); }
.timeline { margin: 1.5rem 0; }
.timeline .item { display: flex; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--vp-c-divider); }
.timeline .item:last-child { border-bottom: none; }
.timeline .when { flex: 0 0 150px; font-size: .82rem; color: var(--vp-c-text-2); font-variant-numeric: tabular-nums; padding-top: .15rem; }
.timeline .what h3 { margin: 0 0 .4rem; font-size: .98rem; }
.timeline .what p { margin: 0; font-size: .88rem; line-height: 1.75; color: var(--vp-c-text-2); }
.contact { display: flex; flex-wrap: wrap; gap: .75rem; margin: 1rem 0; }
.contact a { display: inline-flex; align-items: center; gap: .4rem; padding: .6rem 1.1rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; text-decoration: none; font-size: .9rem; }
.contact a:hover { border-color: var(--vp-c-brand-1); }
@media (max-width: 640px) {
  .timeline .item { flex-direction: column; gap: .35rem; }
  .timeline .when { flex: none; }
}
</style>
