---
title: 'Industrial time-series charts: a Canvas and ECharts experiment'
description: Three rendering implementations, a high-DPI Canvas flicker fix, and the limits of the current performance measurements.
outline: deep
---

# Industrial time-series charts: a Canvas and ECharts experiment

> Update, 2026-10-21: the live demo now uses an experimental WebGL2 curve layer with the same column aggregation. The background and cursor remain Canvas 2D. The Canvas 2D implementation and bug report below describe the earlier version, rather than WebGL performance.

<div class="meta">
  <span>2026-10-21</span><span>·</span>
  <a href="../../bench/" target="_blank" rel="noreferrer">Run the demo</a>
</div>

This experiment compares three ways to update a chart: send every batch to ECharts, trim the visible window before updating ECharts, or draw with Canvas. The question is how much data each update still needs to process as history grows.

The browser generates six synthetic signals representing power, frequency, voltage, oil temperature and battery charge. Three hours of history contain 100k, 300k or 1M points in total, followed by a batch every 50 ms. No real device or network is connected, and production reliability has not been tested.

## What the implementations do

| Implementation | Streaming updates |
|---|---|
| Naive ECharts | Keep every point and pass the complete series to `setOption` on each batch |
| Tuned ECharts | Trim old points, enable LTTB, disable animation and coalesce updates with rAF |
| Canvas | Store raw points in ring buffers, aggregate the visible window into pixel columns, then draw |

The default viewport is 60 seconds. A million stored historical points does not mean a million points are drawn during each live update. Full-history review expands the viewport to the entire dataset and is measured separately.

The Canvas implementation has wheel zoom and a crosshair, but lacks much of a general charting library's functionality. These are specific implementations with different capabilities, rather than a general ranking of the technologies.

## Where the Canvas work happens

Fixed-capacity ring buffers store timestamps in `Float64Array` and values in `Float32Array`. Once full, they overwrite the oldest points. This reduces per-point object allocation, but history that must remain queryable needs separate storage.

The visible time interval is divided into CSS-pixel columns. Each keeps `min / max / first / last`, and the drawing path uses those values instead of visiting every raw point. Extrema remain available to draw, but sample ordering inside each column is compressed. The aggregate cannot replace raw data for analysis.

Zooming or changing the viewport still reads visible raw points through `_layoutScale` to rebuild the grid. Aggregation does not make every later interaction independent of the original data.

Three canvases hold the background, curves and cursor. Mouse movement redraws only the cursor. When the range is unchanged and time advances by a few columns, the data layer shifts its existing bitmap left and draws the new columns on the right. Other updates redraw the full plot. Moving the bitmap also has a cost; drawing fewer new columns does not make the entire frame a one-column operation.

## Why the chart flashed and disappeared

On a screen with `devicePixelRatio` set to 2, the initial chart appeared, then disappeared after a few incremental updates.

A canvas 600 CSS pixels wide has a 1200-pixel bitmap at DPR 2. Its context is scaled so drawing code can use CSS coordinates. The original self-copy was:

```js
ctx.drawImage(canvas, -dx, 0);
```

This used the source bitmap's dimensions under the scaled context, enlarging it again on every copy. In a fixed regression fixture, the initial curve covered 6,489 colored pixels. By the third update, none remained in the canvas.

The copy now specifies its destination in CSS pixels:

```js
ctx.drawImage(canvas, -dx, 0, cssWidth, cssHeight);
```

The data layer is transparent so the background grid remains visible. The copy uses `copy` compositing to replace old pixels, is clipped to the plot, and is followed by drawing the new right-hand columns. Smoothing is disabled during the copy to avoid repeated interpolation spreading the curves at fractional pixel ratios. The complete code is in `_render` in `js/engines/engine-canvas.js`.

Eight consecutive incremental updates now pass at DPR 1, 1.25 and 2. At DPR 2, the curve pixel count goes from 7,257 to 7,205. A million-point live run also retained the curves through 66 incremental updates; wheel zoom and resizing were checked. These are display-correctness checks, not evidence of long-running performance.

## Measurements that cannot be compared directly

The old synchronous Canvas test skipped real updates: a view-invalidation flag remained set after loading, so appending data did not update the column grid, while the synchronous flush rendered the old grid. Its reported cost therefore did not cover drawing the new data. The WebGL trial now shares one refresh path between synchronous and animation-frame updates.

ECharts's synchronous flush does call `setOption` directly. A near-zero result cannot simply be attributed to waiting for a later rAF callback. GPU completion and physical presentation also require separate timing boundaries. A separate run happened while the display was asleep and rAF was throttled, so it cannot establish 60 fps either.

Dividing processing time by batch interval helps identify insufficient processing capacity. Persistent backlog requires sustained arrivals and a queue that processes every batch without coalescing or dropping work. Browser timers can be delayed, and rendering can coalesce updates. This local demo does not establish that a chart becomes 60 seconds late after 50 seconds of operation.

The page's FPS counter measures rAF callback frequency. Its latency endpoint is a drawing callback or ECharts's `rendered` event, not the exact physical display time. The old performance table is not treated as a result for the current trial, and does not support speed multipliers or claims about other devices.

## Run it

ECharts is included locally and the demo has no build step. From the project directory:

```bash
python3 -m http.server 8765
```

Open `http://127.0.0.1:8765/`, run one configuration and check that the curves remain visible before comparing live updates with full-history review. Export the JSON together with the browser, DPR, viewport size and whether the tab was in the foreground.

Run the flicker regression from the demo's console:

```js
await (await import('./tests/canvas-regression.js')).runCanvasRegression();
```

<style>
.meta { display: flex; gap: .5rem; align-items: center; color: var(--vp-c-text-3); font-size: .875rem; margin: -.5rem 0 2rem; }
.meta a { color: var(--vp-c-brand-1); text-decoration: none; }
.meta a:hover { text-decoration: underline; }
</style>
