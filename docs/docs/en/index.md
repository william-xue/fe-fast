---
layout: home
titleTemplate: false

hero:
  name: "William Xue"
  text: "Large-Scale Visualization"
  tagline: Frontend Engineer · 10 years · 48 merged open-source PRs · 20,000 nodes at 60 FPS
  image:
    src: https://avatars.githubusercontent.com/u/20151622?s=200&v=4
    alt: William Xue
  actions:
    - theme: brand
      text: See the work
      link: /en/projects
    - theme: alt
      text: About me
      link: /en/about
    - theme: alt
      text: GitHub
      link: https://github.com/william-xue

features:
  - icon: 🎯
    title: Large-scale rendering & performance
    details: Making tens of thousands of elements behave in a browser — 20,000 nodes / 36,610 links at 60 FPS, a self-built SVG graph engine, and replacing whatever stalls at a few thousand items.
  - icon: 🗺️
    title: Multi-engine GIS & digital twin
    details: The same dataset rendered twice — a 2D tiled map in MapLibre and a 3D globe in CesiumJS. Model the data once, reuse it across views.
  - icon: 🔌
    title: End-to-end delivery, backend included
    details: When a project needs one person to own the whole line — Vue / React / mini-program frontend, Java backend, MySQL / Redis, Docker, one-click CI/CD deploys.
  - icon: 🌍
    title: Open-source track record
    details: PRs submitted to 39 open-source projects including Varlet, AntV X6 and Element Plus; 48 merged. Member of the Varlet organisation.
---

## Selected open source

<div class="cards">

<a class="card" href="https://github.com/william-xue/selection-drag-engine" target="_blank" rel="noreferrer">
  <h3>⭐ selection-drag-engine <em>101 ★</em></h3>
  <p class="card-sub">Renderer-agnostic rubberband selection & multi-drag engine</p>
  <p class="card-body">Grew out of AntV X6 issue #4823: rAF coalescing, drag snapshots, and a preview/commit split. It exists to solve one concrete problem — dragging 100 elements should not drop frames.</p>
  <p class="card-tags"><span>JavaScript</span><span>rAF scheduling</span><span>Drag state machine</span></p>
</a>

<a class="card" href="https://github.com/william-xue/pin-graph-lib" target="_blank" rel="noreferrer">
  <h3>🧩 pin-graph-lib</h3>
  <p class="card-sub">Zero-dependency SVG graph-editing kernel</p>
  <p class="card-body">2,108 lines: semantic pins, orthogonal obstacle-avoiding routing, snapping, undo stack, JSON persistence. 49 unit tests plus 2 Chrome E2E suites.</p>
  <p class="card-tags"><span>SVG</span><span>TypeScript</span><span>49 tests</span></p>
</a>

</div>

<a class="more" href="/en/projects">All work and demos →</a>

## Visualization demo series

One deterministically generated 20,000-node dataset, rendered with different engines across six interactive demos — each with a walkthrough video.

<div class="cards">

<a class="card" href="https://www.bilibili.com/video/BV1tPpq6yEdu/" target="_blank" rel="noreferrer">
  <h3>🎬 01 · Tiled network map</h3>
  <p class="card-sub">MapLibre + deck.gl · 20,000 nodes</p>
  <p class="card-body">Tiled mode delivers the first screen in 1.62 MB across 16 tiles; full-dataset mode pulls 8.86 MB in 53 ms. Both hold 60 FPS.</p>
</a>

<a class="card" href="https://www.bilibili.com/video/BV1UPpq6yEpL/" target="_blank" rel="noreferrer">
  <h3>🎬 05 · 3D product configurator</h3>
  <p class="card-sub">Three.js · click-to-place decals</p>
  <p class="card-body">Upload a GLB and artwork, click the model surface to place a decal that conforms to the geometry, then drag, resize, rotate and export.</p>
</a>

</div>

<a class="more" href="/en/projects#visualisation-demo-series">See all six demos →</a>

## Get in touch

<div class="contact">

<a href="mailto:xueyuan99999@gmail.com">📧 xueyuan99999@gmail.com</a>
<a href="https://github.com/william-xue" target="_blank" rel="noreferrer">🐙 github.com/william-xue</a>

</div>

<p class="note">
Available for remote and contract work — especially large-scale rendering and performance rescue, GIS / digital-twin front ends, and small-to-mid projects where one person should own the whole line.
</p>

<div class="visitors">
  <span>👀 Visitors <b id="busuanzi_value_site_uv">—</b></span>
  <span>📈 Page views <b id="busuanzi_value_site_pv">—</b></span>
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
