import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  lang: 'zh-CN',
  title: "我的个人主页",
  description: "前端开发者的技术分享与成长记录",
  // 根据环境自动设置 base 路径
  // 生产环境（GitHub Pages）需要 /fe-fast/，本地开发不需要
  base: (process as any).env.NODE_ENV === 'production' ? '/fe-fast/' : '/',
  head: [
    [
      'script',
      {
        async: '',
        src: 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
      }
    ]
  ],
  themeConfig: {
    // 文章布局配置
    outline: 'deep',

    nav: [
      { text: '首页', link: '/' },
      { text: '关于我', link: '/about' },
      { text: '项目展示', link: '/projects' },
      { text: 'rusty-pic', link: '/rusty-pic' }
    ],
    sidebar: {},
    socialLinks: [
      { icon: 'github', link: 'https://github.com/william-xue' },
      { icon: 'twitter', link: 'https://twitter.com/99999_yuan' }
    ],
    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2024 我的个人主页'
    }
  }
})
