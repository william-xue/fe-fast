---
layout: doc
---

# 实验室 · Lab

<p class="lead">
聚焦<b>桌面端 AI-Native 生产力工具</b>与<b>具身实时多模态通信中枢</b>。持续探索现代渲染架构、多媒体底层计算与硬件协同的工程极限。
</p>

## 核心探索

<div class="lab-grid">

<div class="lab-card">
  <div class="lab-badge">01 · 多媒体与桌面生产力</div>
  <h3>AI-Native 音视频剪辑工作台（类剪映 NLE + 自动化 Agent）</h3>
  <div class="lab-desc">
    <p class="summary">
      突破“旁置聊天框”的玩具形态，探索面向桌面端（Desktop）的下一代重型音视频生产力工具。让 AI Agent 深度接管多轨时间轴操作，实现真正的自动化非线性编辑（NLE）。
    </p>
    <div class="tech-points">
      <div class="tp-item">
        <b>多轨时间轴与混合渲染管线</b>
        <span>高精度无锁音视频轨道排布、波形渲染、关键帧曲线与帧准确预览；桌面端支撑本地超大素材直读、多进程解耦与 GPU 硬件加速。</span>
      </div>
      <div class="tp-item">
        <b>Agent 时间轴语义控制（Timeline IR）</b>
        <span>将多模态语义理解转化为确定性的时间轴操作指令——支持语义级自动粗剪、智能静音与废话裁切、多机位切换与 B-roll 轨道自动化组装。</span>
      </div>
      <div class="tp-item">
        <b>端侧与底层编解码加速</b>
        <span>贯通 <code>WebCodecs</code> / <code>WebAudio</code> 到本地 <code>FFmpeg</code> 硬件编解码链路，兼顾 Web 端轻量化算法验证与桌面端工业级大吞吐。</span>
      </div>
    </div>
  </div>
  <p class="tags"><span>非线性编辑 (NLE)</span><span>Agent 时间轴控制</span><span>桌面端架构</span><span>WebCodecs / FFmpeg</span><span>多轨音频图</span></p>
</div>

<div class="lab-card">
  <div class="lab-badge">02 · 端侧多模态与实时通信</div>
  <h3>具身智能端侧感官系统（毫秒级全双工对讲）</h3>
  <div class="lab-desc">
    <p class="summary">
      大模型走向物理世界的核心瓶颈在端侧。基于实时双向流管道，为硬件终端构建极低延迟的“眼、耳、嘴”交互闭环。
    </p>
    <div class="tech-points">
      <div class="tp-item">
        <b>低于 150ms 双向流管道</b>
        <span>基于 <code>WebRTC</code> 与 <code>LiveKit SFU</code> 架构，搭建超低延迟音视频双向流通信通道。</span>
      </div>
      <div class="tp-item">
        <b>端侧感官回路（眼 · 耳 · 嘴）</b>
        <span>
          <b>眼：</b>动态帧率控制与硬件加速视频流编码。<br/>
          <b>耳：</b>端侧高灵敏 VAD 语音活动检测、AEC 声学回声消除与主动降噪。<br/>
          <b>嘴：</b>毫秒级全双工打断机制（Barge-in）与实时 TTS 流连续消费，消除对话迟滞。
        </span>
      </div>
      <div class="tp-item">
        <b>弱网鲁棒性与信号治理</b>
        <span>JitterBuffer 动态调优、丢包补偿（PLC / FEC）以及音频多通道重采样与相位对齐。</span>
      </div>
    </div>
  </div>
  <p class="tags"><span>WebRTC</span><span>LiveKit SFU</span><span>全双工实时对讲</span><span>VAD / AEC</span><span>Barge-in 打断</span></p>
</div>

</div>

<div class="contact">
  <a href="projects">查看代表作品 →</a>
  <a href="services">核心能力与交付 →</a>
  <a href="tel:15895929981">158 9592 9981</a>
  <a href="mailto:xueyuan99999@gmail.com">xueyuan99999@gmail.com</a>
  <a href="https://github.com/william-xue" target="_blank" rel="noreferrer">GitHub</a>
</div>

<style>
.lead { font-size: 1.12rem; line-height: 1.8; color: var(--vp-c-text-2); margin-bottom: 2rem; }
.lead b { color: var(--vp-c-text-1); }

.lab-grid { display: flex; flex-direction: column; gap: 1.5rem; margin: 1.5rem 0 2.5rem; }
.lab-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem 1.6rem;
  background: var(--vp-c-bg-soft);
  transition: border-color .25s, transform .25s;
}
.lab-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}
.lab-badge {
  display: inline-block;
  font-size: .8rem;
  font-weight: 700;
  letter-spacing: .06em;
  color: var(--vp-c-brand-1);
  margin-bottom: .5rem;
  text-transform: uppercase;
}
.lab-card h3 {
  margin: 0 0 .6rem;
  font-size: 1.15rem;
  line-height: 1.4;
  color: var(--vp-c-text-1);
}
.lab-desc .summary {
  font-size: .92rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  margin: 0 0 1rem;
}
.tech-points {
  display: flex;
  flex-direction: column;
  gap: .75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: .9rem 1.1rem;
  margin-bottom: 1.1rem;
}
.tp-item {
  font-size: .88rem;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}
.tp-item b {
  display: block;
  color: var(--vp-c-text-1);
  font-size: .9rem;
  margin-bottom: .15rem;
}
.tp-item code {
  font-size: .82rem;
  padding: .15rem .35rem;
  border-radius: 4px;
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-brand-1);
}

.tags { display: flex; flex-wrap: wrap; gap: .5rem; margin: 0; }
.tags span {
  font-size: .8rem;
  padding: .2rem .55rem;
  background: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  color: var(--vp-c-text-2);
}

.contact { display: flex; flex-wrap: wrap; gap: .75rem; margin: 2rem 0; }
.contact a {
  display: inline-flex;
  align-items: center;
  gap: .4rem;
  padding: .6rem 1.1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-decoration: none;
  font-size: .9rem;
  color: var(--vp-c-text-1);
}
.contact a:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
</style>
