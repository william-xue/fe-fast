---
title: Writing
description: Long-form notes on performance, architecture and things that broke. Every piece ships with a runnable demo.
---

# Writing

Everything here was measured on a real machine and can be re-run: numbers, code, and the failed approaches.

<div class="list">

<a class="item" href="./industrial-timeseries-benchmark">
  <div class="t">A million-point chart: measuring a switch from Canvas 2D to WebGL</div>
  <div class="d">How DOM and canvas differ, measurements of Canvas 2D and WebGL under the same conditions, and why the GPU did not clearly pull ahead.</div>
  <div class="tag">Performance · Canvas · WebGL</div>
</a>

</div>

<style>
.list { display: grid; gap: 1rem; margin: 1.5rem 0; }
.item { display: block; border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 1.1rem 1.25rem; text-decoration: none; color: inherit; transition: border-color .2s, transform .2s; }
.item:hover { border-color: var(--vp-c-brand-1); transform: translateY(-2px); }
.item .t { font-weight: 600; font-size: 1.05rem; margin-bottom: .4rem; }
.item .d { color: var(--vp-c-text-2); font-size: .925rem; line-height: 1.7; }
.item .tag { margin-top: .6rem; font-size: .78rem; color: var(--vp-c-text-3); letter-spacing: .04em; }
</style>
