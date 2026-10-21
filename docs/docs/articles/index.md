---
title: 文章与工程笔记
description: 长文写作：性能实测、架构取舍、踩坑复盘。每篇都对应一个可运行的 demo。
---

# 文章与工程笔记

写在这里的都是**自己跑过、能复跑**的东西：有数字、有代码、有反例。对应 demo 都能直接在线打开。

<div class="list">

<a class="item" href="./industrial-timeseries-benchmark">
  <div class="t">工业时序曲线：一次 Canvas 与 ECharts 的对照实验</div>
  <div class="d">三种实现分别处理多少数据，Canvas 为什么在高分屏上闪一下就消失，以及旧测量里哪些数字不能直接比较。</div>
  <div class="tag">性能 · Canvas · 实时流</div>
</a>

</div>

<p class="hint">
还没写的（占位，别当承诺）：跨端 3D 场景的降本手法、SVG 编辑器在上万节点时的取舍、
一批业务系统重构里真正省下时间的那几处。
</p>

<style>
.list { display: grid; gap: 1rem; margin: 1.5rem 0; }
.item { display: block; border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 1.1rem 1.25rem; text-decoration: none; color: inherit; transition: border-color .2s, transform .2s; }
.item:hover { border-color: var(--vp-c-brand-1); transform: translateY(-2px); }
.item .t { font-weight: 600; font-size: 1.05rem; margin-bottom: .4rem; }
.item .d { color: var(--vp-c-text-2); font-size: .925rem; line-height: 1.7; }
.item .tag { margin-top: .6rem; font-size: .78rem; color: var(--vp-c-text-3); letter-spacing: .04em; }
.hint { color: var(--vp-c-text-3); font-size: .875rem; margin-top: 2rem; }
</style>
