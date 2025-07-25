---
title: VitePress 快速上手指南
date: 2024-01-15
tags: [VitePress, Vue, 静态站点生成器]
description: 详细介绍如何使用 VitePress 搭建个人博客，包括配置、主题定制和部署等内容。
---

# VitePress 快速上手指南

> 发布时间：2024-01-15  
> 标签：VitePress, Vue, 静态站点生成器

VitePress 是一个基于 Vite 和 Vue 的静态站点生成器，专为技术文档而设计。它具有快速的开发体验、优秀的性能和简洁的配置。本文将详细介绍如何使用 VitePress 搭建个人博客。

## 🚀 什么是 VitePress

VitePress 是 VuePress 的精神继承者，基于 Vite 构建。它具有以下特点：

- ⚡ **极快的开发体验**：基于 Vite 的热重载
- 🎨 **Vue 3 支持**：可以在 Markdown 中使用 Vue 组件
- 📱 **响应式设计**：默认主题适配移动端
- 🔍 **内置搜索**：支持全文搜索
- 🌙 **暗黑模式**：内置明暗主题切换

## 📦 安装和初始化

### 环境要求

- Node.js 16+ 
- 推荐使用 pnpm 作为包管理器

### 创建项目

```bash
# 创建项目目录
mkdir my-vitepress-blog
cd my-vitepress-blog

# 初始化 package.json
pnpm init

# 安装 VitePress
pnpm add -D vitepress

# 初始化 VitePress
pnpm exec vitepress init
```

### 初始化配置

在初始化过程中，你需要回答几个问题：

1. **配置目录位置**：建议选择 `./docs`
2. **站点标题**：输入你的博客名称
3. **站点描述**：简短描述你的博客
4. **主题选择**：推荐选择 "Default Theme + Customization"

## ⚙️ 基础配置

### 配置文件结构

```
my-vitepress-blog/
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts          # 主配置文件
│   │   └── theme/             # 主题定制
│   ├── index.md               # 首页
│   └── articles/              # 文章目录
├── package.json
└── pnpm-lock.yaml
```

### 配置 config.ts

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  // 站点基本信息
  title: '我的技术博客',
  description: '记录技术成长的点点滴滴',
  lang: 'zh-CN',
  
  // 主题配置
  themeConfig: {
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/articles/' },
      { text: '关于', link: '/about' }
    ],
    
    // 侧边栏
    sidebar: {
      '/articles/': [
        {
          text: '前端技术',
          items: [
            { text: 'Vue 3 实践', link: '/articles/vue3-practice' },
            { text: 'React Hooks', link: '/articles/react-hooks' }
          ]
        }
      ]
    },
    
    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username' }
    ],
    
    // 页脚
    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2024 Your Name'
    }
  }
})
```

## 📝 编写内容

### Markdown 增强功能

VitePress 扩展了标准 Markdown 语法：

#### 代码块高亮

```javascript{2,4-6}
function hello() {
  console.log('Hello VitePress!') // [!code highlight]
  
  const name = 'World' // [!code focus]
  const greeting = `Hello ${name}!` // [!code focus]
  return greeting // [!code focus]
}
```

#### 自定义容器

::: tip 提示
这是一个提示容器
:::

::: warning 警告
这是一个警告容器
:::

::: danger 危险
这是一个危险容器
:::

#### 在 Markdown 中使用 Vue

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <div>
    <p>计数器: {{ count }}</p>
    <button @click="count++">点击 +1</button>
  </div>
</template>
```

## 🎨 主题定制

### 自定义 CSS

创建 `docs/.vitepress/theme/style.css`：

```css
:root {
  /* 自定义颜色 */
  --vp-c-brand-1: #646cff;
  --vp-c-brand-2: #747bff;
  
  /* 自定义字体 */
  --vp-font-family-base: 'Inter', sans-serif;
  
  /* 自定义布局 */
  --vp-sidebar-width: 280px;
}

/* 自定义样式 */
.custom-block {
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
}
```

### 扩展默认主题

创建 `docs/.vitepress/theme/index.ts`：

```typescript
import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    // app.component('CustomComponent', CustomComponent)
  }
}
```

## 🚀 部署

### GitHub Pages 部署

1. 创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm
          
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Install dependencies
        run: npm ci
        
      - name: Build with VitePress
        run: npm run docs:build
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. 在 GitHub 仓库设置中启用 Pages，选择 GitHub Actions 作为部署源。

### Vercel 部署

1. 连接 GitHub 仓库到 Vercel
2. 设置构建命令：`npm run docs:build`
3. 设置输出目录：`docs/.vitepress/dist`

## 📊 性能优化

### 图片优化

```markdown
<!-- 使用 WebP 格式 -->
![示例图片](./images/example.webp)

<!-- 响应式图片 -->
<picture>
  <source srcset="./images/example.webp" type="image/webp">
  <img src="./images/example.jpg" alt="示例图片">
</picture>
```

### 代码分割

```typescript
// 动态导入组件
const HeavyComponent = defineAsyncComponent(() => 
  import('./components/HeavyComponent.vue')
)
```

## 🔧 常用插件

### 添加评论系统

```bash
pnpm add @giscus/vue
```

```vue
<template>
  <Giscus
    repo="your-username/your-repo"
    repo-id="your-repo-id"
    category="General"
    category-id="your-category-id"
    mapping="pathname"
    reactions-enabled="1"
    emit-metadata="0"
    theme="light"
    lang="zh-CN"
  />
</template>
```

### 添加搜索功能

```typescript
export default defineConfig({
  themeConfig: {
    search: {
      provider: 'algolia',
      options: {
        appId: 'YOUR_APP_ID',
        apiKey: 'YOUR_API_KEY',
        indexName: 'YOUR_INDEX_NAME'
      }
    }
  }
})
```

## 📚 最佳实践

### 文件组织

```
docs/
├── .vitepress/
├── public/              # 静态资源
│   ├── images/
│   └── favicon.ico
├── articles/            # 文章目录
│   ├── frontend/        # 前端相关
│   ├── backend/         # 后端相关
│   └── tools/           # 工具相关
├── about.md
└── index.md
```

### SEO 优化

```typescript
export default defineConfig({
  head: [
    ['meta', { name: 'keywords', content: 'VitePress, Vue, 博客' }],
    ['meta', { name: 'author', content: 'Your Name' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ]
})
```

### 内容规范

1. **文件命名**：使用小写字母和连字符
2. **Front Matter**：为每篇文章添加元数据
3. **图片处理**：统一放在 `public/images/` 目录
4. **链接检查**：定期检查内部链接的有效性

## 🎯 总结

VitePress 是一个功能强大且易于使用的静态站点生成器，特别适合技术博客和文档站点。通过本文的介绍，你应该能够：

- ✅ 快速搭建 VitePress 项目
- ✅ 配置导航和侧边栏
- ✅ 自定义主题样式
- ✅ 部署到各种平台
- ✅ 优化性能和 SEO

开始你的 VitePress 博客之旅吧！如果遇到问题，可以查看 [官方文档](https://vitepress.dev/) 或在评论区交流。

---

**相关链接**：
- [VitePress 官方文档](https://vitepress.dev/)
- [Vue 3 文档](https://vuejs.org/)
- [Vite 文档](https://vitejs.dev/)