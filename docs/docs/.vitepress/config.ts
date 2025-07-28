import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  lang: 'zh-CN',
  title: "我的个人主页",
  description: "前端开发者的技术分享与成长记录",
  // 如果部署到 GitHub Pages 的子路径，需要设置 base
  // 例如：https://username.github.io/repository-name/
  base: '/fe-fast/',
  head: [
    [
      'script',
      {
        async: true,
        src: 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
      }
    ]
  ],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '关于我', link: '/about' },
      { text: '项目展示', link: '/projects' },
      { text: '技术文章', link: '/articles' },
      { text: 'CSS Pruner 使用指南', link: '/unused-css-pruner-guide' }
    ],
    sidebar: {
      '/articles/': [
        {
          text: '技术文章',
          items: [
            { text: 'VitePress 快速上手', link: '/articles/vitepress-guide' },
            { text: 'React 性能优化实践', link: '/articles/react-optimization' },
            { text: 'Vue3 新特性总结', link: '/articles/vue3-features' }
          ]
        }
      ]
    },
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
