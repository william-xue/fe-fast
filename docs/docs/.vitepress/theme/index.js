// .vitepress/theme/index.js
import { h, defineAsyncComponent } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

// shaders 库很重（~2.7MB），拆成异步块，首屏不阻塞
const ShaderBg = defineAsyncComponent(() => import('./ShaderBg.vue'))

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-before': () => h(ShaderBg),
    })
  },
}
