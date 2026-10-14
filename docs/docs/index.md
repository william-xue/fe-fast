---
layout: home
titleTemplate: false

hero:
  name: "William Xue"
  text: "资深前端工程师"
  tagline: 中后台业务系统与图形可视化，写了十年
  image:
    src: https://avatars.githubusercontent.com/u/20151622?s=200&v=4
    alt: William Xue
  actions:
    - theme: brand
      text: 了解我
      link: "#我是谁"
    - theme: alt
      text: 关于我
      link: /about
    - theme: alt
      text: GitHub
      link: https://github.com/william-xue
---

## 我是谁

我叫薛源，在上海做了十年前端。业务系统做稳过，大规模图形跑顺过，需要时也能一个人把服务端到部署走完。

## 中后台：在中通的五年

2020 到 2025，我在中通快递做前端，后两年负责智能办公业务——招聘、内训、绩效、考勤、薪酬五套系统，支撑全网三万多个网点的日常运转。

- 从零建起部门组件库和工程规范；
- 带五人小组按季度交付五套系统的需求与迭代；
- 可配置公式计算组件（规则解析 + 正则求值），应对绩效薪酬里口径不一的计算规则，获实用新型专利；
- 小件分拣可视化大屏，Canvas 自绘传送带与包裹流转。

## 图形：从一个卡顿的问题开始

2025 年加入一家电力软件公司，接手电网拓扑编辑器。原方案 ECharts + SVG，五千节点开始掉帧——瓶颈在 DOM 重排和拾取，不在数据量。换成 WebGL（deck.gl）：GPU buffer、视口剔除、GPU picking。华东电网两万节点、三万六千条连线的实际算例，拖动与拐点编辑稳定 60 FPS。

同一思路用回开源：[pin-graph-lib](https://github.com/william-xue/pin-graph-lib)（零依赖 SVG 图编辑内核）、[selection-drag-engine](https://github.com/william-xue/selection-drag-engine)（框选百级图元不掉帧）。同一份两万节点数据集的六种引擎演示在[作品页](/projects)。

## 端到端

两个独立交付、现在在线上跑的平台，前端、Java 后端、数据库、部署全是自己做的：[Crazy Trail](https://crazytrailchina.com/)、[AICHE CHUHAI](https://aichechuhai.com/)。这条链走通过两次。

## AI

上一家公司内部的 AI 仿真助手，前端与流式链路从零搭建。处理过一个值得讲的问题：会话切换五次后流式响应永久挂起，最后用 Network 面板时间线定位到根因——旧 SSE 连接未随卸载释放，耗尽 HTTP/1.1 同源连接池。另给 openai-agents-python 提过数个已合并 PR。

## 小工具

[rusty-pic](https://william-xue.github.io/rusty-pic/demo)（Rust/WASM 图片压缩）、[port-checker](https://github.com/william-xue/port-checker)（端口检测）、[code-sweeper](https://github.com/william-xue/code-sweeper) / [unused-css-pruner](https://github.com/william-xue/unused-css-pruner) / [vite-plugin-font-subset](https://github.com/william-xue/vite-plugin-font-subset)。

## 联系

上海、南京的机会，中后台与图形方向优先。

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
</style>
