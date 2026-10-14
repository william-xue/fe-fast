---
layout: page
---

# Work

Ordered by how easily you can verify it: **live products → own open-source projects → visualization demos → side projects → contributions**.

## Live products

Both built end to end by me — frontend, Java backend, deployment — and running in production.

<div class="cards">

<a class="card" href="https://crazytrailchina.com/" target="_blank" rel="noreferrer">
  <div class="head"><h3>🏃 Crazy Trail</h3><span class="live">● live</span></div>
  <p class="sub">Trail-running races and routes platform · international audience</p>
  <p class="body">Content platform for China's trail races, routes and stories, serving runners outside China: race information, route data and editorial content.</p>
  <p class="stack"><b>Stack</b>: Vue · Java backend · MySQL · one-click CI/CD deploy</p>
  <p class="tags"><span>Vue</span><span>Java</span><span>MySQL</span><span>CI/CD</span></p>
</a>

<a class="card" href="https://aichechuhai.com/" target="_blank" rel="noreferrer">
  <div class="head"><h3>🚗 AICHE CHUHAI</h3><span class="live">● live</span></div>
  <p class="sub">Cross-border used-car trading platform</p>
  <p class="body">One-stop platform covering listings and the trading flow, built on the Element Plus component system.</p>
  <p class="stack"><b>Stack</b>: Vue 3 · Element Plus · Java backend · Redis · one-click CI/CD deploy</p>
  <p class="tags"><span>Vue 3</span><span>Element Plus</span><span>Java</span><span>Redis</span></p>
</a>

</div>

<p class="aside">
Both projects cover web and mini-program clients; frontends in Vue and React, backends in Java, with CI/CD configured for one-click deployment.
</p>

## Own open-source projects

<div class="cards">

<a class="card" href="https://github.com/william-xue/selection-drag-engine" target="_blank" rel="noreferrer">
  <div class="head"><h3>⭐ selection-drag-engine</h3><span class="star">101 ★</span></div>
  <p class="sub">Renderer-agnostic rubberband selection &amp; multi-drag engine</p>
  <p class="body">
    Grew out of AntV X6 issue #4823. It splits batch dragging into three clean parts: <b>rAF coalescing</b> (many pointer events collapse into one computation per frame), a <b>drag snapshot</b> (no repeated model reads mid-drag), and a <b>preview / commit split</b> (visual feedback decoupled from state commits).
  </p>
  <p class="why"><b>Problem it solves</b>: frames dropping after ~100 selected elements. Works with any graph editor and binds to no renderer.</p>
  <p class="tags"><span>JavaScript</span><span>rAF scheduling</span><span>Drag state machine</span></p>
</a>

<a class="card" href="https://github.com/william-xue/pin-graph-lib" target="_blank" rel="noreferrer">
  <div class="head"><h3>🧩 pin-graph-lib</h3><span class="star">own engine</span></div>
  <p class="sub">Zero-dependency SVG graph-editing kernel</p>
  <p class="body">
    2,108 lines, written from scratch: semantic pins (direction / side / role / hot zone), orthogonal obstacle-avoiding routing, snapping, an undo stack and JSON persistence.
  </p>
  <p class="why"><b>Verifiable</b>: 49 unit tests plus 2 Chrome E2E suites, all passing.</p>
  <p class="tags"><span>SVG</span><span>TypeScript</span><span>49 tests</span><span>E2E</span></p>
</a>

<a class="card" href="https://github.com/william-xue/x6-plugin-port-editor" target="_blank" rel="noreferrer">
  <div class="head"><h3>🔌 x6-plugin-port-editor</h3><span class="star">merged upstream</span></div>
  <p class="sub">Port-editing plugin for AntV X6</p>
  <p class="body">
    Adds visual port-editing to AntV X6. The change landed in the X6 main repository as <code>feat: add port editor plugin</code>.
  </p>
  <p class="why"><b>Why it matters</b>: not "I have sent PRs" — I can modify someone else's core engine and get it accepted.</p>
  <p class="tags"><span>AntV X6</span><span>Plugin system</span><span>Merged</span></p>
</a>

<a class="card" href="https://github.com/william-xue/gridpilot-studio" target="_blank" rel="noreferrer">
  <div class="head"><h3>🗺️ gridpilot-studio</h3><span class="star">GIS + agent</span></div>
  <p class="sub">Grid GIS workbench with an AI agent</p>
  <p class="body">
    Vue + deck.gl rendering 1,327 real-scale sites. Ships a runnable AI agent: a Node-side ReAct loop with an 11-tool registry (data queries, BFS connectivity, map actions) streaming over SSE, with 5 end-to-end acceptance scripts passing.
  </p>
  <p class="why"><b>Problem it solves</b>: letting users drive map data in natural language instead of walking ten levels of menu.</p>
  <p class="tags"><span>deck.gl</span><span>Vue</span><span>ReAct</span><span>SSE</span></p>
</a>

</div>

## Visualisation demo series

One **deterministically generated** 20,000-node dataset, rendered with different engines across six interactive demos — one for each capability a client tends to ask about. Each has a walkthrough video.

<div class="series">

<div class="row">
  <div class="no">01</div>
  <div class="info">
    <h3>Tiled network map <span class="k">MapLibre + deck.gl</span></h3>
    <p>20,000 nodes / 36,610 links. Tiled mode delivers the first screen in <b>1.62 MB across 16 tiles</b>; full-dataset mode pulls <b>8.86 MB in 53 ms</b>. Both hold <b>60 FPS</b>. A live inspector shows visible tiles, transferred bytes and per-request timing.</p>
  </div>
  <div class="link"><a href="https://www.bilibili.com/video/BV1tPpq6yEdu/" target="_blank" rel="noreferrer">▶ Video</a></div>
</div>

<div class="row">
  <div class="no">02</div>
  <div class="info">
    <h3>Interactive 3D scene <span class="k">Three.js</span></h3>
    <p>42 linked sites: instanced rendering via <code>InstancedMesh</code>, glow with no post-processing pass, bezier link arcs with animated particles, and raycast picking that returns an <code>instanceId</code> straight into the data model. <b>60 FPS / 83 draw calls</b>.</p>
  </div>
  <div class="link"><a href="https://space.bilibili.com/169548308" target="_blank" rel="noreferrer">▶ Series</a></div>
</div>

<div class="row">
  <div class="no">03</div>
  <div class="info">
    <h3>Real-time fleet tracking <span class="k">MapLibre + deck.gl</span></h3>
    <p>500 vehicles moving live, with trail history, geofenced zones and live occupancy counts, and click-to-inspect. Positions update every frame; trails are sampled at 400 ms — <b>60 FPS</b>.</p>
  </div>
  <div class="link"><a href="https://space.bilibili.com/169548308" target="_blank" rel="noreferrer">▶ Series</a></div>
</div>

<div class="row">
  <div class="no">04</div>
  <div class="info">
    <h3>Graph editor engine <span class="k">Zero-dependency SVG + TypeScript</span></h3>
    <p>Component designer and assembly canvas: semantic pins, connection-policy validation, orthogonal obstacle-avoiding routing, command-based undo/redo. A stress-test button generates <b>2,000 nodes and holds 60 FPS</b>; <b>211 unit tests pass</b>; the bundle is 130 KB (36 KB gzipped).</p>
  </div>
  <div class="link"><a href="https://space.bilibili.com/169548308" target="_blank" rel="noreferrer">▶ Series</a></div>
</div>

<div class="row">
  <div class="no">05</div>
  <div class="info">
    <h3>3D product configurator <span class="k">Three.js</span></h3>
    <p>Upload a GLB and artwork, click the model surface to place a decal that conforms to the geometry via <code>DecalGeometry</code> rather than floating in front of it, then drag, resize, rotate, manage layers, undo and export an image.</p>
  </div>
  <div class="link"><a href="https://www.bilibili.com/video/BV1UPpq6yEpL/" target="_blank" rel="noreferrer">▶ Video</a></div>
</div>

<div class="row">
  <div class="no">06</div>
  <div class="info">
    <h3>3D globe view <span class="k">CesiumJS</span></h3>
    <p>The <b>same dataset</b> as demo 01 rendered on a Cesium globe — one dataset, two engines. All detail levels (Backbone / Regional / all 20,000 nodes) hold <b>60 FPS</b>, with no ion token and no imagery-provider dependency, and click-to-locate on any node.</p>
  </div>
  <div class="link"><a href="https://space.bilibili.com/169548308" target="_blank" rel="noreferrer">▶ Series</a></div>
</div>

</div>

<p class="aside">
What the six have in common: the data is always deterministically generated synthetic data (no client data, no real topology), so every reload reproduces the same scene; and every demo carries a live frame-rate counter, so performance can be verified on the spot instead of taken on trust.
</p>

## Side projects &amp; experiments

Small things that do not belong on a CV, but say something: **I like building tools**. When I hit a problem I would rather write the tool than work around it — even at 2am.

<div class="cards">

<a class="card" href="https://william-xue.github.io/rusty-pic/" target="_blank" rel="noreferrer">
  <div class="head"><h3>🦀 Rusty Pic</h3><span class="live">● live, playable</span></div>
  <p class="sub">Rust + WebAssembly image compression</p>
  <p class="body">
    Written to cut image bandwidth: the Rust side compiles to WebAssembly so images are processed in the browser and never leave the machine. Ships as a web app plus a <b>CLI</b> and a <b>Vite plugin</b>.
  </p>
  <p class="tags"><span>Rust</span><span>WebAssembly</span><span>Vite plugin</span><span>CLI</span></p>
</a>

<a class="card" href="https://github.com/william-xue/port-checker" target="_blank" rel="noreferrer">
  <div class="head"><h3>🔧 port-checker</h3><span class="star">crates.io</span></div>
  <p class="sub">Rust CLI for port inspection</p>
  <p class="body">
    Checks port usage and the owning process, with single-port and range scans, timeout and concurrency control, and result export. Cross-platform across macOS / Linux / Windows.
  </p>
  <p class="why"><b>Still maintained</b>: after a Linux build failure was reported, the root cause was found and fixed (the branch returned 0 when the system assigned the port), and CI on the pull request is running again.</p>
  <p class="tags"><span>Rust</span><span>CLI</span><span>Cross-platform</span></p>
</a>

<a class="card" href="https://github.com/william-xue/js-interaction-lens" target="_blank" rel="noreferrer">
  <div class="head"><h3>🔍 js-interaction-lens</h3><span class="star">debugging tool</span></div>
  <p class="sub">Interaction-phase comparison tool</p>
  <p class="body">
    Splits an interaction into start / update / finish / cancel and visualises the four phases side by side — because the most common cause of a drag bug is that those four phases were never separated.
  </p>
  <p class="tags"><span>JavaScript</span><span>Tooling</span></p>
</a>

</div>

## Open-source contributions

<div class="oss">

| Project | Contribution |
|---|---|
| **Varlet** | Vue 3 mobile component library — **organisation member**; submitted and maintains changes to `input`, `field-decorator`, `ellipsis` and `date-picker` |
| **AntV X6** | Graph-editing engine — **port editor plugin merged into the main repository**, plus documentation and fixes |
| **Element Plus** | Table multi-select filter, scrollbar transition fixes |
| **antdv-next** | Component fixes and documentation improvements (11 merged — my highest count) |
| **vercel/ai** | OpenAI provider and codemod changes |
| **Others** | plotly.js, recharts, deck.gl, naive-ui, vexip-ui, Pyomo, PyPSA, PowerGridModel, Grid2op, pandapower, litellm, cline, OpenHands, modelcontextprotocol |

<p class="aside">
94 pull requests submitted (<b>48 merged</b>), across <b>39 repositories</b>, plus 122 issues filed. All of it is searchable on GitHub under @william-xue.
</p>

</div>

<style>
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem; margin: 1.5rem 0; }
.card { display: block; border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 1.25rem; text-decoration: none; color: inherit; transition: border-color .2s, transform .2s; }
.card:hover { border-color: var(--vp-c-brand-1); transform: translateY(-2px); }
.card .head { display: flex; align-items: baseline; justify-content: space-between; gap: .75rem; }
.card h3 { margin: 0 0 .35rem; font-size: 1.02rem; }
.card .live { font-size: .75rem; color: #67c23a; }
.card .star { font-size: .75rem; color: #e6a23c; white-space: nowrap; }
.card .sub { margin: 0 0 .6rem; font-size: .85rem; color: var(--vp-c-text-2); }
.card .body { margin: 0 0 .7rem; font-size: .9rem; line-height: 1.65; color: var(--vp-c-text-2); }
.card .why { margin: 0 0 .7rem; font-size: .85rem; line-height: 1.6; color: var(--vp-c-text-2); }
.card .why b, .card .stack b { color: var(--vp-c-text-1); }
.card .stack { margin: 0 0 .7rem; font-size: .82rem; color: var(--vp-c-text-2); }
.card .tags { margin: 0; display: flex; flex-wrap: wrap; gap: .4rem; }
.card .tags span { font-size: .75rem; padding: .15rem .5rem; border-radius: 4px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-2); }
.series { margin: 1.5rem 0; }
.series .row { display: flex; gap: 1rem; padding: 1.1rem 0; border-bottom: 1px solid var(--vp-c-divider); }
.series .row:last-child { border-bottom: none; }
.series .no { flex: 0 0 42px; font-size: 1.15rem; font-weight: 700; color: var(--vp-c-brand-1); font-variant-numeric: tabular-nums; }
.series .info { flex: 1; }
.series .info h3 { margin: 0 0 .4rem; font-size: .98rem; }
.series .info h3 .k { font-size: .75rem; font-weight: 500; color: var(--vp-c-text-2); border: 1px solid var(--vp-c-divider); border-radius: 4px; padding: .1rem .4rem; margin-left: .4rem; vertical-align: middle; }
.series .info p { margin: 0; font-size: .88rem; line-height: 1.75; color: var(--vp-c-text-2); }
.series .link { flex: 0 0 auto; padding-top: .15rem; }
.series .link a { font-size: .85rem; white-space: nowrap; }
.aside { font-size: .85rem; color: var(--vp-c-text-2); line-height: 1.7; padding-left: .75rem; border-left: 3px solid var(--vp-c-divider); }
.oss table { display: table; width: 100%; }
@media (max-width: 640px) {
  .series .row { flex-wrap: wrap; }
  .series .link { flex-basis: 100%; }
}
</style>
