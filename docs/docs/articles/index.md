---
title: 文章与工程笔记
description: 长文写作：性能实测、架构取舍、踩坑复盘。每篇都对应一个可运行的 demo。
---

# 文章与工程笔记

写在这里的都是**自己跑过、能复跑**的东西：有数字、有代码、有反例。对应 demo 都能直接在线打开。

<div class="list">

<a class="item" href="./industrial-timeseries-benchmark">
  <div class="t">一百万点的曲线，为什么在工业软件里就是画不出来</div>
  <div class="d">用"负载率"解释图表越跑越慢的机制，并实测三种后端：朴素 ECharts 在 10 万点每次更新 104ms（负载率 2.2），自研分层在 100 万点 1.2ms。含回看全历史的对照。</div>
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
