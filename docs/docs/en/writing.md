---
layout: page
---

# Writing

I have published **274 original technical articles** with **1.02M cumulative reads** (101.2k blog + 4.3k community + 5.7k Q&A) and 818 followers. Almost all of it is in Chinese.

Most of it is fragmented. One series is not — and that is the one worth reading.

## A programmer's guide to demystifying power systems

This is the writing I would most like people to see. It started from a simple observation: in the power-industry software world, **very few people understand the domain and can also explain it to a programmer**. And from the other side, the first wall a software engineer hits when entering this industry is usually not programming — it is that they cannot tell what anyone is talking about.

The series dismantles that wall: starting from "the grid is a concurrent data stream", through topology, power flow, optimisation constraints and running a first SCUC, ending on the industry's ecosystem and where an individual fits.

| Part | Title | Reads |
|---|---|---|
| 1 | [Power basics: when the grid becomes a concurrent data stream](https://blog.csdn.net/baidu_31333625/article/details/164632603) | 146 |
| 2 | [Topology and networks: a matrix is not maths, it is a graph](https://blog.csdn.net/baidu_31333625/article/details/164632629) | 49 |
| 3 | [Power flow: de-hydrating a large system of equations](https://blog.csdn.net/baidu_31333625/article/details/164632635) | 322 |
| 4 | [Dispatch and planning: the optimiser and its cage of constraints](https://blog.csdn.net/baidu_31333625/article/details/164632647) | 617 |
| 5 | [Industry and architecture: from "academic toy" to "industrial production"](https://blog.csdn.net/baidu_31333625/article/details/164632656) | 176 |
| 6 | [From formulas to code: running your first SCUC](https://blog.csdn.net/baidu_31333625/article/details/165219331) | 414 |
| 7 | [From CRUD to constraints: a narrow gate, but worth walking through](https://blog.csdn.net/baidu_31333625/article/details/165243895) | 122 |
| 8 | [When `if/else` stops working, a programmer should meet operations research](https://blog.csdn.net/baidu_31333625/article/details/165244148) | 141 |
| 9 | [Niche, division of labour, and how a programmer should place themselves](https://blog.csdn.net/baidu_31333625/article/details/165445433) | 321 |
| Final | [The narrow gate, sharpness in the AI era, and the last twenty metres](https://blog.csdn.net/baidu_31333625/article/details/165444012) | 137 |

<p class="aside">
The value here is not traffic — individual read counts are modest. It is that the series demonstrates something hard to demonstrate otherwise: <b>I can translate domain knowledge into language engineers understand</b>. That is exactly the skill missing when writing technical proposals, documentation, or working with colleagues from another field.
</p>

## Most-searched articles

Older troubleshooting notes; the traffic comes from search engines:

- [Flutter + native vs H5 + native development](https://blog.csdn.net/baidu_31333625/article/details/104256818) — 3,565 reads
- [git: merge individual files or folders from another branch](https://blog.csdn.net/baidu_31333625/article/details/101372803) — 3,377 reads
- [SQL interview practice: retention rate](https://blog.csdn.net/baidu_31333625/article/details/121762197) — 1,136 reads
- [Using egg-swagger](https://blog.csdn.net/baidu_31333625/article/details/118485356) — 998 reads

## All articles

<div class="links">
  <a href="https://blog.csdn.net/baidu_31333625" target="_blank" rel="noreferrer">📚 CSDN blog (274 original articles)</a>
  <a href="https://blog.csdn.net/baidu_31333625/category_6433999.html" target="_blank" rel="noreferrer">📂 React Native &amp; cross-platform Flutter column</a>
</div>

<style>
.links { display: flex; flex-wrap: wrap; gap: .75rem; margin: 1.25rem 0; }
.links a {
  display: inline-flex;
  align-items: center;
  gap: .4rem;
  padding: .6rem 1.1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-decoration: none;
  font-size: .9rem;
}
.links a:hover { border-color: var(--vp-c-brand-1); }
.aside {
  font-size: .85rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  padding-left: .75rem;
  border-left: 3px solid var(--vp-c-divider);
}
table { display: table; width: 100%; }
</style>
