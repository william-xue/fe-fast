---
layout: home
titleTemplate: false

hero:
  name: "William Xue"
  text: "资深软件工程师"
  tagline: 中后台业务系统与图形可视化
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
---

## 复杂业务系统

在中通快递负责业务前端五年，带领十二人前端团队。前三年聚焦集团智能办公，主导招聘、内训、绩效、考勤、薪酬五套内部系统；后两年转入核心业务域，负责商家端、物流中转及神州系统，覆盖发派件报价、账单管理等支撑全网三万余个网点运转的关键业务链路。期间主导建设部门组件库与工程规范，并制定开发规范与上线审核流程。

## 大规模图形与可视化

2025 年起负责电网拓扑编辑器的图形渲染与交互。原 ECharts + SVG 方案在五千节点量级出现掉帧，定位后确认瓶颈在 DOM 重排与元素拾取，而非数据规模本身；改以 WebGL（deck.gl）实现，引入 GPU buffer、视口剔除与 GPU picking 后，在两万节点、三万六千条连线的实际算例上，节点拖动与拐点编辑稳定于 60 FPS。六种图形引擎的可交互演示**全部在线可跑**（点开即用，不是录像），见[作品页](/projects)。

## 端到端交付 · Vibe Coding

具备从需求到上线的全栈交付能力：以 Java（Spring Boot / MyBatis-Plus）为坚实服务端底座，并熟练运用 Python、Go、Node 承担后端与工具链开发；服务以 Docker 容器化，交付走 CI/CD，一次 push 即自动构建并部署上线。

日常以 AI 辅助开发（Vibe Coding）驱动，整条链路的开发与迭代显著提速，可直接交付至生产环境。

已独立完成多个平台的端到端交付；公司内部的 AI 仿真助手，从客户端、服务端到流式链路，同样为全栈独立构建。

## 开源与工具

Varlet（Vue 3 移动端组件库）核心开发者，负责社区 PR 评审与 issue 分诊。为 AntV X6 开发的端口编辑插件（[PR #5093](https://github.com/antvis/X6/pull/5093)）已合并进主仓库，为该图编辑引擎补上端口的可视化编辑能力。另为 Element Plus、Ant Design Vue 等组件库贡献已合并的改动。

自研工具：[rusty-pic](https://william-xue.github.io/rusty-pic/demo)（Rust/WASM 图片压缩）、[port-checker](https://github.com/william-xue/port-checker)（端口检测）。

## 核心能力

<div class="value">

<a class="v" href="services">
  <div class="k">大规模图形与极端性能攻坚</div>
  <p>穿透至管线与 GPU 拾取定位瓶颈。20,000 节点 60 FPS，是真实算例量出来的。</p>
</a>

<a class="v" href="services">
  <div class="k">复杂业务系统端到端交付（Java 全栈）</div>
  <p>以 Java（Spring Boot / MyBatis-Plus）为坚实底座，打通至复杂前端与容器化自动部署。独立闭环，对最终可用性负责。</p>
</a>

<a class="v" href="services">
  <div class="k">生产级 AI 链路与工程化闭环</div>
  <p>工具调用、流式链路、状态恢复、长任务。跑在真实业务数据上的系统，而非聊天框。</p>
</a>

<a class="v" href="services">
  <div class="k">研发工程化与团队体系建设</div>
  <p>跨端组件库、架构分层、规范与发布流水线。带过 12 人前端团队。</p>
</a>

</div>

<p class="more-link"><a href="services">查看完整核心能力与专长 →</a></p>

## 联系

<div class="contact">
  <a href="mailto:xueyuan99999@gmail.com">xueyuan99999@gmail.com</a>
  <a href="https://github.com/william-xue">github.com/william-xue</a>
</div>

<style>
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
.value { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin: 1.5rem 0; }
.value .v { display: block; border: 1px solid var(--vp-c-divider); border-left: 3px solid var(--vp-c-brand-1); border-radius: 0 10px 10px 0; padding: 1rem 1.1rem; text-decoration: none; color: inherit; transition: border-color .2s, transform .2s; }
.value .v:hover { border-color: var(--vp-c-brand-1); transform: translateY(-2px); }
.value .k { font-size: .95rem; font-weight: 700; color: var(--vp-c-text-1); margin-bottom: .4rem; }
.value p { margin: 0; font-size: .88rem; line-height: 1.7; color: var(--vp-c-text-2); }
.more-link { margin: .5rem 0 1.5rem; font-size: .9rem; }
</style>
