---
layout: page
---

# 关于我

<div class="profile">
  <img src="https://avatars.githubusercontent.com/u/20151622?s=200&v=4" alt="William Xue" width="96" />
  <div>
    <h2>William Xue</h2>
    <p class="role">工业级可视化前端 · 10 年经验</p>
    <p class="meta">WebGL / GIS / 数字孪生 · 可闭环的后端交付 · 开源贡献者</p>
  </div>
</div>

## 我是谁

做了 10 年前端，其中 9 年在上海。前 5 年主要在复杂业务系统里做组件化和工程化，最近几年稳定在**工业级图形可视化**这一块：把大规模图形、地图和数据在浏览器里跑顺。

我的差异化不在"会用多少个框架"，而在**能把卡住的性能问题定位到根因并换掉方案**，以及**需要一个人把整条线做完时，前后端都能接上**。

## 能力结构

<div class="grid">

<div class="block">
  <h3>🎨 前端与图形可视化（主线）</h3>
  <ul>
    <li><b>框架</b>：Vue 2/3、React、TypeScript</li>
    <li><b>图形</b>：WebGL、Three.js、deck.gl、CesiumJS、AntV X6、Canvas / SVG 自研引擎</li>
    <li><b>工程</b>：Vite、Webpack、组件库与工具库建设、微前端</li>
    <li><b>性能</b>：大数据量渲染、视口剔除、GPU 缓冲复用、Web Worker 卸载</li>
  </ul>
</div>

<div class="block">
  <h3>🔌 后端与数据（可闭环，非长期主业）</h3>
  <ul>
    <li><b>语言</b>：Java / Spring Boot、Node.js、Python</li>
    <li><b>数据</b>：MySQL、Redis（缓存、分布式锁、限流、队列）</li>
    <li><b>接口</b>：RESTful API 设计、前后端联调、表设计、慢 SQL 定位</li>
    <li><b>定位</b>：能把一条业务链从前端做到库；<b>不是</b>资深后端架构师，不写微服务与高并发量级</li>
  </ul>
</div>

<div class="block">
  <h3>🚀 工程与部署</h3>
  <ul>
    <li><b>容器与网关</b>：Docker、Nginx</li>
    <li><b>CI/CD</b>：GitHub Actions 一键构建部署（本站就是）</li>
    <li><b>排查</b>：日志与错误码定位、分层排查（前端 / 网关 / 接口 / 库）</li>
  </ul>
</div>

</div>

<p class="aside">
说明：我不把"熟悉十种语言"当卖点。上面三块里，<b>图形可视化是主项</b>，后端是"需要时我能把这条链做完"的交付能力。
</p>

## 工作经历

<div class="timeline">

<div class="item">
  <div class="when">2025.05 – 2026.08</div>
  <div class="what">
    <h3>能源行业软件公司 · 高级前端</h3>
    <p>主导电力系统图形编辑工具，把原方案（约 5,000 节点开始卡顿）换成 WebGL / deck.gl 渲染，在 <b>20,000+ 节点</b>算例下完成节点拖动与拐点编辑；从 0 到 1 搭建电力元件可视化编辑器；参与行业仿真平台与 AI Agent 工作台的前端落地。</p>
  </div>
</div>

<div class="item">
  <div class="when">2020.05 – 2025.04</div>
  <div class="what">
    <h3>头部快递物流企业 · 前端开发 / 前端技术负责人</h3>
    <p>负责服务全国 <b>30,000+ 网点</b>的核心业务系统前端；作为前端负责人组建并带领 <b>5 人团队</b>交付招聘、内训、绩效、考勤、薪酬五套系统；建设内部组件库与工具库、制定前端规范与上线流程；研发可配置公式计算组件并获<b>实用新型专利</b>。</p>
  </div>
</div>

<div class="item">
  <div class="when">2018.03 – 2020.05</div>
  <div class="what">
    <h3>出版文化公司 · 前端开发</h3>
    <p>React + TypeScript 开发出版行业 ERP；主导小程序多端适配，通过条件编译与分包预加载把开发资源消耗降低约 60%。</p>
  </div>
</div>

<div class="item">
  <div class="when">2016.01 – 2018.02</div>
  <div class="what">
    <h3>金融科技公司（上海） · 前端开发</h3>
    <p>聚合支付平台技术栈重构；独立完成贷后管理系统前端从 0 到 1 搭建；设计跨项目统一单点登录方案。</p>
  </div>
</div>

</div>

## 开源

数字都能点开核对：

| 指标 | 数据 |
|---|---|
| 提交过的 PR | **94 个**（其中 **48 个已被合并**） |
| 贡献过的仓库 | **39 个** |
| 提过的 issue | 122 个 |
| 组织成员 | **Varlet**（Vue 3 移动端组件库）公开成员 |
| 被上游合并的代表性改动 | AntV X6 的**端口编辑插件**、Element Plus 表格筛选修复、varlet 的 ellipsis / date-picker 改动 |
| 自研且被社区认可 | [`selection-drag-engine`](https://github.com/william-xue/selection-drag-engine) **101 ★** |

参与过的主要项目：Varlet、AntV X6、Element Plus、antdv-next、vercel/ai、plotly.js、recharts、deck.gl、naive-ui、vexip-ui，以及 Pyomo / PyPSA / PowerGridModel / pandapower 等电力系统与优化方向的工程库。

## 技术理念

- **先定位再优化。** 换渲染器之前先证明瓶颈在哪：是 DOM 数量、是重排，还是 GPU 提交。搞错一层，再优化也是白费。
- **能不讲概念就不讲。** 面试也好、交付也好，我更愿意说"这个方案在 5,000 节点时卡住，我换成什么、为什么、验证数字是多少"。
- **不写自己没做过的东西。** 这份主页上每个数字都能指向一个可点开的链接、一个可跑的测试或一个线上系统。

## 合作方式

接受**远程合作**与**合同制项目**，尤其欢迎这三类：

1. **大规模图形 / 性能优化** —— 你的可视化卡住了，需要有人定位到根因并换掉方案
2. **GIS 与数字孪生** —— 2D 瓦片地图、3D 地球、拓扑图编辑器
3. **需要一个人打通前后端的中小型项目** —— 前端 + 后端 + 部署一条线交给我

<div class="contact">
  <a href="mailto:xueyuan99999@gmail.com">📧 xueyuan99999@gmail.com</a>
  <a href="https://github.com/william-xue" target="_blank" rel="noreferrer">🐙 github.com/william-xue</a>
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
.aside { font-size: .85rem; color: var(--vp-c-text-2); line-height: 1.7; padding-left: .75rem; border-left: 3px solid var(--vp-c-divider); }
.timeline { margin: 1.5rem 0; }
.timeline .item { display: flex; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--vp-c-divider); }
.timeline .item:last-child { border-bottom: none; }
.timeline .when { flex: 0 0 150px; font-size: .82rem; color: var(--vp-c-text-2); font-variant-numeric: tabular-nums; padding-top: .15rem; }
.timeline .what h3 { margin: 0 0 .4rem; font-size: .98rem; }
.timeline .what p { margin: 0; font-size: .88rem; line-height: 1.75; color: var(--vp-c-text-2); }
.contact { display: flex; flex-wrap: wrap; gap: .75rem; margin: 1.5rem 0; }
.contact a { display: inline-flex; align-items: center; gap: .4rem; padding: .6rem 1.1rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; text-decoration: none; font-size: .9rem; }
.contact a:hover { border-color: var(--vp-c-brand-1); }
@media (max-width: 640px) {
  .timeline .item { flex-direction: column; gap: .35rem; }
  .timeline .when { flex: none; }
}
</style>
