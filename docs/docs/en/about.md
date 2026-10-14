---
layout: page
---

# About

<div class="profile">
  <img src="https://avatars.githubusercontent.com/u/20151622?s=200&v=4" alt="William Xue" width="96" />
  <div>
    <h2>William Xue</h2>
    <p class="role">Frontend Engineer · Large-Scale Visualization · 10 years</p>
    <p class="meta">WebGL / GIS / digital twin · end-to-end delivery · open-source contributor</p>
  </div>
</div>

## Who I am

Ten years as a frontend engineer, nine of them in Shanghai. The first five were spent on complex business applications — componentisation, tooling, design systems. The last few years have been almost entirely **industrial-grade visualization**: making large graphs, maps and datasets behave in a browser.

The difference I bring is not the number of frameworks I can list. It is that I can take a stalled rendering problem, find the actual cause, and replace the approach — and that when a project needs one person to own the whole line, I can pick up the backend too.

## Skills

<div class="grid">

<div class="block">
  <h3>🎨 Frontend & visualization (primary)</h3>
  <ul>
    <li><b>Frameworks</b>: Vue 2/3, React, TypeScript</li>
    <li><b>Graphics</b>: WebGL, Three.js, deck.gl, CesiumJS, AntV X6, custom Canvas / SVG engines</li>
    <li><b>Engineering</b>: Vite, Webpack, component &amp; utility libraries, micro-frontends</li>
    <li><b>Performance</b>: large-dataset rendering, viewport culling, GPU buffer reuse, Web Worker offloading</li>
  </ul>
</div>

<div class="block">
  <h3>🔌 Backend & data (closes the loop)</h3>
  <ul>
    <li><b>Languages</b>: Java / Spring Boot, Node.js, Python</li>
    <li><b>Data</b>: MySQL, Redis (caching, distributed locks, rate limiting, queues)</li>
    <li><b>APIs</b>: REST design, frontend–backend integration, schema design, slow-query diagnosis</li>
    <li><b>Scope note</b>: enough to deliver a whole business chain; <b>not</b> a distributed-systems architect, and I do not claim high-concurrency numbers</li>
  </ul>
</div>

<div class="block">
  <h3>🚀 Build & deploy</h3>
  <ul>
    <li><b>Containers & proxy</b>: Docker, Nginx</li>
    <li><b>CI/CD</b>: GitHub Actions, one-click build and deploy (this site included)</li>
    <li><b>Debugging</b>: log and error-code driven, layered triage (frontend / gateway / API / database)</li>
  </ul>
</div>

</div>

<p class="aside">
I do not sell "familiar with ten languages". Of the three blocks above, <b>visualization is the main skill</b> and the backend is the ability to finish the chain when the project needs it.
</p>

## Experience

<div class="timeline">

<div class="item">
  <div class="when">2025.05 – 2026.08</div>
  <div class="what">
    <h3>Senior Frontend Engineer · energy industry software</h3>
    <p>Led a power-system graphical editing tool: replaced an approach that stalled at roughly 5,000 nodes with WebGL / deck.gl, then verified node dragging and vertex editing on a <b>20,000+ node</b> dataset. Built a component editor from scratch; contributed to an industry simulation platform and an AI-agent workbench.</p>
  </div>
</div>

<div class="item">
  <div class="when">2020.05 – 2025.04</div>
  <div class="what">
    <h3>Frontend Engineer / Frontend Lead · national logistics</h3>
    <p>Core business systems serving <b>30,000+ outlets</b> nationwide. As frontend lead, built and ran a <b>5-person team</b> delivering five internal systems (recruiting, training, performance, attendance, payroll). Established the component library, coding standards and release process; authored a configurable formula-calculation component that earned a <b>utility-model patent</b>.</p>
  </div>
</div>

<div class="item">
  <div class="when">2018.03 – 2020.05</div>
  <div class="what">
    <h3>Frontend Engineer · publishing</h3>
    <p>React + TypeScript ERP for the publishing industry. Led cross-platform mini-program work, cutting development resource usage by roughly 60% through conditional compilation and sub-package preloading.</p>
  </div>
</div>

<div class="item">
  <div class="when">2016.01 – 2018.02</div>
  <div class="what">
    <h3>Frontend Engineer · fintech, Shanghai</h3>
    <p>Rebuilt an aggregated-payments platform onto a modern stack; built a post-loan management frontend from zero; designed a shared single-sign-on scheme across projects.</p>
  </div>
</div>

</div>

## Open source

Every number below is checkable on GitHub:

| Metric | Figure |
|---|---|
| Pull requests submitted | **94** (**48 merged**) |
| Repositories contributed to | **39** |
| Issues filed | 122 |
| Organisation membership | **Varlet** (Vue 3 mobile component library) — public member |
| Representative merged work | AntV X6 **port editor plugin**, Element Plus table-filter fix, varlet ellipsis / date-picker changes |
| Own project with community traction | [`selection-drag-engine`](https://github.com/william-xue/selection-drag-engine) — **101 ★** |

Projects I have contributed to: Varlet, AntV X6, Element Plus, antdv-next, vercel/ai, plotly.js, recharts, deck.gl, naive-ui, vexip-ui — plus engineering libraries in the power-systems and optimisation space such as Pyomo, PyPSA, PowerGridModel and pandapower.

## How I work

- **Diagnose before optimising.** Prove where the bottleneck is before swapping renderers — DOM count, layout thrash or GPU submission. Pick the wrong layer and every later optimisation is wasted.
- **Concrete over conceptual.** I would rather say "this stalled at 5,000 nodes, here is what I replaced it with, why, and what the measured numbers were" than talk about paradigms.
- **Nothing on this site is something I have not done.** Every figure points to a live system, a runnable test, or a public repository.

## Working together

I take **remote** and **contract** work. Three kinds fit best:

1. **Large-scale rendering / performance rescue** — your visualization stalls and you need the root cause found and the approach replaced
2. **GIS and digital twin** — 2D tiled maps, 3D globes, topology editors
3. **Small-to-mid projects that need one person across the stack** — frontend, backend and deployment

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
table { display: table; width: 100%; }
@media (max-width: 640px) {
  .timeline .item { flex-direction: column; gap: .35rem; }
  .timeline .when { flex: none; }
}
</style>
