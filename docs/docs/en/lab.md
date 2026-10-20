---
layout: doc
---

# Engineering Lab & Tech Radar

<p class="lead">
Focusing on <b>Desktop AI-Native productivity engines</b> and <b>real-time multimodal pipelines for embodied AI</b>. Exploring the limits of modern rendering architectures, low-level media computation, and hardware coordination.
</p>

## Active Research

<div class="lab-grid">

<div class="lab-card">
  <div class="lab-badge">01 · Multimedia & Desktop Productivity</div>
  <h3>AI-Native Video Editing Workbench (CapCut-Style NLE + Agent Automation)</h3>
  <div class="lab-desc">
    <p class="summary">
      Breaking out of the "sidecar chatbot" toy pattern. Exploring the next-generation desktop productivity workbench where AI Agents directly control the multi-track timeline for automated non-linear editing (NLE).
    </p>
    <div class="tech-points">
      <div class="tp-item">
        <b>Multi-Track Timeline & Hybrid Render Pipeline</b>
        <span>High-precision, lock-free track layout, audio waveform rendering, keyframe curves, and frame-accurate preview. Desktop architecture enables direct multi-gigabyte local file reads, multi-process decoupling, and hardware GPU acceleration.</span>
      </div>
      <div class="tp-item">
        <b>Agent Timeline Semantic Control (Timeline IR)</b>
        <span>Translating multimodal semantic understanding into deterministic timeline mutation commands — supporting semantic rough cuts, silence/filler removal, multi-camera switching, and automated B-roll assembly.</span>
      </div>
      <div class="tp-item">
        <b>Client-Side & Low-Level Codec Acceleration</b>
        <span>Unified media pipeline spanning <code>WebCodecs</code> / <code>WebAudio</code> to native <code>FFmpeg</code> hardware acceleration, bridging lightweight web validation and industrial desktop throughput.</span>
      </div>
    </div>
  </div>
  <p class="tags"><span>Non-Linear Editing (NLE)</span><span>Agent Timeline Control</span><span>Desktop Architecture</span><span>WebCodecs / FFmpeg</span><span>Audio Graph</span></p>
</div>

<div class="lab-card">
  <div class="lab-badge">02 · Multimodal & Real-Time Comms</div>
  <h3>Real-Time Sensory Infrastructure for Embodied AI (Low-Latency Full-Duplex)</h3>
  <div class="lab-desc">
    <p class="summary">
      The core bottleneck for embodied AI in the physical world is client-side sensory transport. Sub-150ms bidirectional streaming giving machines responsive eyes, ears, and speech.
    </p>
    <div class="tech-points">
      <div class="tp-item">
        <b>Sub-150ms Bidirectional Streaming Pipeline</b>
        <span>Multimodal transport built on <code>WebRTC</code> and <code>LiveKit SFU</code> architectures for ultra-low-latency two-way streaming.</span>
      </div>
      <div class="tp-item">
        <b>Sensory Loop Closure (Vision · Hearing · Speech)</b>
        <span>
          <b>Eyes:</b> Dynamic resolution/framerate adaptation and hardware-accelerated video frame encoding.<br/>
          <b>Ears:</b> Client-side Voice Activity Detection (VAD), Acoustic Echo Cancellation (AEC), and active noise suppression.<br/>
          <b>Speech:</b> Sub-100ms Barge-in interrupt handling and chunked TTS streaming playback, eliminating awkward conversational pauses.
        </span>
      </div>
      <div class="tp-item">
        <b>Network Resilience & Audio Signal Engineering</b>
        <span>Deep tuning of JitterBuffer dynamics, packet-loss concealment (PLC / FEC), and multi-channel sample rate alignment.</span>
      </div>
    </div>
  </div>
  <p class="tags"><span>WebRTC</span><span>LiveKit SFU</span><span>Full-Duplex Intercom</span><span>VAD / AEC</span><span>Barge-in Interrupts</span></p>
</div>

</div>

<div class="contact">
  <a href="/en/projects">Explore Projects →</a>
  <a href="/en/services">Capabilities & Delivery →</a>
  <a href="tel:+8615895929981">+86 158 9592 9981</a>
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
