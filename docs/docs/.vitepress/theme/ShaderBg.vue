<template>
  <div v-if="mounted" class="shaders-bg-outer" aria-hidden="true">
    <Shader class="shaders-bg-canvas">
      <Aurora
        :color-a="palette.a"
        :color-b="palette.b"
        :color-c="palette.c"
        :opacity="0.7"
        :intensity="1.2"
        :waviness="0.6"
      />
    </Shader>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Shader, Aurora } from 'shaders/vue'

// 首页 hero 的 WebGPU 背景：暗色用深靛蓝极光，亮色用淡彩极光。
// 无 WebGPU 时 canvas 保持透明，页面一切正常。
const mounted = ref(false)
const dark = ref(false)
let mo = null

const palette = computed(() =>
  dark.value
    ? { a: '#1e1b4b', b: '#0ea5e9', c: '#2dd4bf' }
    : { a: '#93c5fd', b: '#22d3ee', c: '#8b5cf6' }
)

onMounted(() => {
  dark.value = document.documentElement.classList.contains('dark')
  mo = new MutationObserver(() => {
    dark.value = document.documentElement.classList.contains('dark')
  })
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  mounted.value = true
})

onBeforeUnmount(() => {
  if (mo) mo.disconnect()
})
</script>

<style scoped>
.shaders-bg-outer {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}
.shaders-bg-canvas {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0.55;
  -webkit-mask-image: linear-gradient(to bottom, black 45%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 45%, transparent 100%);
}
.dark .shaders-bg-canvas {
  opacity: 0.7;
}
</style>
