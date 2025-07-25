# 🌟 我的个人主页

基于 VitePress 构建的现代化个人主页，展示个人技能、项目经验和技术文章。

## ✨ 特性

- 🎨 现代化设计，响应式布局
- 📱 移动端友好
- 🚀 基于 VitePress，构建速度快
- 📝 支持 Markdown 写作
- 🔍 SEO 优化
- 🌙 支持暗色模式
- 📊 技术文章分类管理

## 🛠️ 技术栈

- [VitePress](https://vitepress.dev/) - 静态站点生成器
- [Vue 3](https://vuejs.org/) - 前端框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [GitHub Actions](https://github.com/features/actions) - 自动化部署
- [GitHub Pages](https://pages.github.com/) - 静态网站托管

## 🚀 快速开始

### 本地开发

```bash
# 克隆项目
git clone <your-repo-url>
cd fe-fast

# 安装依赖
cd docs
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:5173 查看网站。

### 构建生产版本

```bash
# 构建
npm run docs:build

# 预览构建结果
npm run docs:preview
```

## 📁 项目结构

```
fe-fast/
├── docs/                    # VitePress 项目目录
│   ├── docs/               # 文档源文件
│   │   ├── .vitepress/     # VitePress 配置
│   │   │   └── config.ts   # 主配置文件
│   │   ├── articles/       # 技术文章
│   │   ├── index.md        # 首页
│   │   ├── about.md        # 关于页面
│   │   ├── projects.md     # 项目展示
│   │   └── articles.md     # 文章目录
│   └── package.json        # 依赖配置
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions 部署配置
├── DEPLOY.md               # 部署指南
└── README.md               # 项目说明
```

## 🎯 自定义指南

### 修改个人信息

1. **基本信息**：编辑 `docs/index.md` 修改首页内容
2. **关于页面**：编辑 `docs/about.md` 更新个人简介
3. **项目展示**：编辑 `docs/projects.md` 添加您的项目
4. **网站配置**：编辑 `docs/.vitepress/config.ts` 修改网站标题、导航等

### 添加新文章

1. 在 `docs/articles/` 目录下创建新的 `.md` 文件
2. 在 `docs/.vitepress/config.ts` 的 sidebar 配置中添加链接
3. 在 `docs/articles.md` 中添加文章介绍

### 自定义样式

可以在 `docs/.vitepress/theme/` 目录下添加自定义样式和组件。

## 🚀 部署到 GitHub Pages

详细部署步骤请查看 [DEPLOY.md](./DEPLOY.md) 文件。

简要步骤：
1. 创建 GitHub 仓库
2. 配置 base 路径（如果需要）
3. 推送代码到 GitHub
4. 在仓库设置中启用 GitHub Pages
5. 等待自动部署完成

## 📝 写作指南

### Markdown 语法

VitePress 支持标准 Markdown 语法，以及一些扩展功能：

- 代码高亮
- 表格
- 数学公式
- 自定义容器
- 组件嵌入

### 文章模板

```markdown
---
title: 文章标题
date: 2024-01-01
tags: [标签1, 标签2]
description: 文章描述
---

# 文章标题

文章内容...
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🔗 相关链接

- [VitePress 官方文档](https://vitepress.dev/)
- [Vue 3 文档](https://vuejs.org/)
- [Markdown 语法指南](https://www.markdownguide.org/)

---

⭐ 如果这个项目对您有帮助，请给个 Star！