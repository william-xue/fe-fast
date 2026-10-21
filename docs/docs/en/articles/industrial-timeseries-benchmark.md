---
title: Why a million-point chart cannot be drawn in industrial software
description: A load-factor model for streaming charts, measured on three backends with identical data.
outline: deep
---

# Why a million-point chart cannot be drawn in industrial software

<div class="meta">
  <span>2026-10</span><span>·</span><span>12 min read</span><span>·</span>
  <span>Runnable benchmark: <a href="../bench/" target="_blank" rel="noreferrer">run it in the browser</a></span>
</div>

Industrial software keeps producing the same requirement: dozens of signals, hours of history, sub-second refresh, and the ability to zoom into the exact moment something tripped. Teams build it on a general-purpose charting library, the demo looks fine, and three months after launch the operators complain that *the screen is a minute behind reality*.

That minute is not a feeling. It is arithmetic.

## The short version

- Naive usage is already insolvent at **100k points**: 104 ms per update against a 50 ms arrival interval → load factor **2.2**
- Load factor > 1 means consumption is slower than production, so latency grows linearly with uptime
- The layered renderer holds **1.2 ms per update at 1M points**; full 3-hour history review costs **22.6 ms / 27 MB**
- ECharts on the same review: **930 ms / 316 MB**

## 1. Compute the deficit before optimising

```
load factor = main-thread ms per "receive → updated" ÷ arrival interval
```

| Load factor | Meaning |
|---|---|
| < 0.3 | comfortable |
| 0.6 – 1.0 | critical — any long task starts a backlog |
| > 1 | **consumption is slower than production; latency accumulates every second** |

After 50 seconds you are looking at data from 60 seconds ago. Reconnects, deduplication and WebSockets are irrelevant to this.

## 2. Three implementations, one dataset

Same machine, same synthetic substation signals (6 series, spikes included), same 60-second viewport, 20 points per batch every 50 ms:

| Backend | 100k points | 1M points | Load factor p95 |
|---|---|---|---|
| Naive ECharts (full `setOption`) | **104.2 ms/update** | not measured (page becomes unresponsive) | **2.22** |
| Tuned ECharts (LTTB + rAF + windowed) | ≈0 ms | ≈0 ms | ≈0 |
| Layered Canvas (custom) | 0.5 ms | 1.2 ms | 0.024 |

::: warning The measurement trap nobody mentions
The `≈0 ms` for tuned ECharts is not "it is as fast as the custom renderer". `setOption` renders asynchronously, so the synchronous return is zero.

Benchmarking a charting library by timing its API call will give you a beautiful, completely wrong table. Measure to the `rendered` event, or to the moment the frame reaches the screen.
:::

## 3. The real gap opens on full-history review

Streaming is only half of the job. The daily action in the control room is *"pull up the trip at 2:13 last night"* — zoom from 60 seconds to 3 hours and face the entire history at once.

| Backend | 100k | 300k | 1M | Heap at 1M |
|---|---|---|---|---|
| Tuned ECharts (lttb) | 94.4 ms | 248.7 ms | **930.2 ms** | 316.3 MB |
| Layered Canvas (custom) | 7.5 ms | 7.4 ms | **22.6 ms** | 27.6 MB |

The difference is not drawing speed, it is **who still has to process the data**:

- The custom renderer keeps history in `Float64Array` and aggregates it once into 1,158 pixel columns. Every later zoom or pan works on those columns, never on raw points.
- ECharts has to rebuild a million `[t, v]` pairs and run a full `setOption`. Cost scales linearly with the point count and the heap jumps from 78 MB to 316 MB.

One second of white screen is nothing in a demo. On a dispatch wall display it is "this software is slow".

## 4. Four techniques that move the cost

1. **Fixed-capacity ring buffer** instead of `push` + `shift`: O(1) writes, zero allocation, flat memory.
2. **Pixel-column grid**: slice the time axis into columns, keep `min / max / first / last`. Drawing cost depends on pixel width (~1,200), not on point count. Use min/max rather than averaging or sampling — averaging erases single-sample spikes, and spikes are exactly what industrial operators care about.
3. **Dirty-rect incremental drawing**: shift the bitmap left by N pixels, clear the newly exposed strip, redraw only those columns. On machines without a GPU this is the difference between 60 fps and 15 fps, because a full 1236×357 repaint costs ~65 ms while the JS itself takes 0.2 ms.
4. **Layered canvases + rAF coalescing**: background redraws only on layout change, data layer redraws incrementally, cursor layer only on mousemove; multiple batches arriving within one frame collapse into a single render.

## 5. Is ECharts still usable?

Yes — and it should remain the default for most work. Its boundaries are clear:

- Static charts under 100k points: tune `sampling: 'lttb'`, disable animation, add `dataZoom`. Done.
- Streaming charts: usable, provided you feed only the visible window and decouple rendering from arrival rate.
- Million points + many series + long-history review + weak client machines: three walls at once — full-diff `setOption`, object-array memory and GC, and compositor cost on full repaints. The third one cannot be fixed by swapping libraries.

## 6. How to judge the system in front of you

1. Stamp every sample with its creation time and log the percentile of `screen time − creation time`.
2. Compute the load factor over a window of traffic. Above 1 means you are running on debt.
3. Run it again with the WebSocket replaced by local synthetic data. Still slow → rendering. Instantly fine → transport and backpressure.

Either outcome beats switching chart libraries again.

## 7. Re-run it yourself

<a href="../bench/" target="_blank" rel="noreferrer">Open the benchmark</a>, hit *Run full sweep* for the seven configurations, then *Full-history review* for the industrial case, and export the JSON.

The absolute numbers will differ on your machine. The order of magnitude between the three backends will not.

<style>
.meta { display: flex; gap: .5rem; align-items: center; color: var(--vp-c-text-3); font-size: .875rem; margin: -.5rem 0 2rem; }
.meta a { color: var(--vp-c-brand-1); text-decoration: none; }
.meta a:hover { text-decoration: underline; }
</style>
