---
layout: doc
---

# 关于我

<div class="profile">
  <img src="https://avatars.githubusercontent.com/u/20151622?s=200&v=4" alt="William Xue" width="96" />
  <div>
    <h2>William Xue</h2>
    <p class="role">资深软件工程师</p>
    <p class="meta">中后台业务系统 · 图形可视化 · 端到端交付</p>
  </div>
</div>

## 我是谁

十年里反复做的一件事，是把复杂的东西做简单：复杂到三万网点的业务系统，复杂到两万节点的图形编辑器，复杂到需要一个人从前端接到服务端的整条产品线。

对"卡住的问题"我有种执拗。一个方案在某个体量上崩掉时，我不绕开它，而是先弄清它为什么崩——数据怎么组织、代价花在哪一层——再换一个真正撑得住的。电网拓扑从五千节点做到两万节点，就是这么磨出来的。

## 关于做事

带过十二人的团队，也做过从零建组件库、立工程规范这类"给团队打地基"的事。我更愿意把复杂问题拆成可复用的结构——一套组件、一套规范、一套状态机——让后面接手的人少踩坑。

也做过不少"替代"：把旧方案换掉，把将就的东西换成真正撑得住的。这类活不讨巧，但前端工程师的价值，很多时候恰恰体现在能不能把"能跑"换成"跑得好"。

## 关于图形与架构

我的判断是：大多数"图形卡顿"不是渲染本身的问题，而是数据和管线怎么组织的问题。所以比起某个库的 API，我更关心分层——模型、几何、渲染、命令、历史各自独立、互不纠缠。这套认识，来自反复把卡住的系统拆开、重装。

在前端架构上也是同一条线：状态怎么组织、边界怎么划，往往比选哪个框架更决定成败。

## 关于开源

Varlet（Vue 3 移动端组件库，5.3k 星）核心开发者，日常做社区 PR 评审与 issue 分诊；为 AntV X6 写的端口编辑插件已并入上游主仓库。做开源和做产品是一回事——给别人用的东西，得经得起别人较真。

## 技术理念

- **以有涯随无涯，殆矣。** 技术追不完，与其追新，不如积累不变的东西——数据的取舍、渲染的代价、状态的组织。
- **干中学，学中干。** 离开真实问题去学框架，学得快、忘得也快；我习惯把学习放进正在做的事里。
- **快速掌握，快速迭代。** 接手陌生领域时，先做出能跑的最小版本，再在迭代里补齐认知。
- **窄门与交汇处。** AI 时代，全栈本身不值钱——CRUD 胶水代码大模型随手就写。值钱的是业务知识：往窄门里走（一个领域钻深），再走到几个领域的交汇处（图形 × 业务 × AI），锋利度才出得来。

## 联系

<div class="contact">
  <a href="mailto:xueyuan99999@gmail.com">xueyuan99999@gmail.com</a>
  <a href="https://github.com/william-xue">github.com/william-xue</a>
</div>

<style>
.profile { display: flex; align-items: center; gap: 1.25rem; margin: 1.5rem 0 2rem; }
.profile img { border-radius: 50%; border: 1px solid var(--vp-c-divider); }
.profile h2 { margin: 0 0 .25rem; }
.profile .role { margin: 0 0 .25rem; font-size: 1rem; color: var(--vp-c-text-1); font-weight: 600; }
.profile .meta { margin: 0; font-size: .85rem; color: var(--vp-c-text-2); }
.contact { display: flex; flex-wrap: wrap; gap: .75rem; margin: 1rem 0; }
.contact a { display: inline-flex; align-items: center; gap: .4rem; padding: .6rem 1.1rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; text-decoration: none; font-size: .9rem; }
.contact a:hover { border-color: var(--vp-c-brand-1); }
</style>
