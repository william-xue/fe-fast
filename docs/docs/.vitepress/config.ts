import { defineConfig } from 'vitepress'

// 生产环境（GitHub Pages）需要 /fe-fast/，本地开发不需要
const base = (process as any).env.NODE_ENV === 'production' ? '/fe-fast/' : '/'

const GITHUB = 'https://github.com/william-xue'

// 语言切换由 VitePress 1.x 自带的下拉完成，不需要手写语言项。
const ZH_NAV = [
  { text: '首页', link: '/' },
  { text: '作品', link: '/projects' },
  { text: '关于我', link: '/about' }
]

const EN_NAV = [
  { text: 'Home', link: '/en/' },
  { text: 'Work', link: '/en/projects' },
  { text: 'About', link: '/en/about' }
]

export default defineConfig({
  base,
  title: 'William Xue',
  titleTemplate: ':title | William Xue',
  description: '资深前端工程师 · 中后台业务系统与图形可视化',

  // 真实访客统计（不蒜子）。此前用的是 visitor-stats.js 里硬编码的模拟数字，该文件已删除。
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
    [
      'script',
      { async: '', src: 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js' }
    ]
  ],

  themeConfig: {
    socialLinks: [{ icon: 'github', link: GITHUB }]
  },

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'William Xue',
  description: '资深前端工程师 · 中后台业务系统与图形可视化',
      themeConfig: {
        outlineTitle: '本页目录',
        nav: ZH_NAV,
        docFooter: { prev: '上一篇', next: '下一篇' },
        footer: {
          message: '本站由 GitHub Actions 自动构建部署',
          copyright: 'Copyright © 2024-present William Xue'
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'William Xue',
      description: 'Frontend & Visualization Engineer · WebGL / GIS / Digital Twin',
      themeConfig: {
        outlineTitle: 'On this page',
        nav: EN_NAV,
        docFooter: { prev: 'Previous', next: 'Next' },
        footer: {
          message: 'Built and deployed automatically with GitHub Actions',
          copyright: 'Copyright © 2024-present William Xue'
        }
      }
    }
  }
})
