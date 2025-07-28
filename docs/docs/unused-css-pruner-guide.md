# unused-css-pruner 使用指南

## 简介

`unused-css-pruner` 是一个强大且智能的 CSS 清理工具，能够识别和删除项目中未使用的 CSS 选择器，支持动态生成的类、CSS-in-JS 以及组件级分析。

## 功能特性

- **智能分析**：检测未使用的 CSS 选择器
- **支持多种框架**：适用于 Vue, React, Angular 和纯 HTML/JS 项目
- **多种报告格式**：支持控制台、JSON 和 HTML 格式
- **高度可配置**：提供丰富的配置选项
- **安全默认**：提供试运行模式和白名单支持
- **零依赖**：轻量化，外部依赖最少

## 安装

```bash
# 全局安装
npm install -g @fe-fast/unused-css-pruner

# 或者在项目中作为开发依赖安装
npm install --save-dev @fe-fast/unused-css-pruner
```

## 快速开始

### 命令行工具

分析 CSS 使用情况：

```bash
css-pruner analyze --css "src/**/*.css" --source "src"
```

清理未使用的 CSS 文件（试运行）：

```bash
css-pruner clean --css "src/**/*.css" --source "src" --dry-run
```

生成 HTML 报告：

```bash
css-pruner analyze --css "src/**/*.css" --source "src" --format html --output report.html
```

初始化配置文件：

```bash
css-pruner init
```

### 集成到构建工具

#### Vite 插件

在 `vite.config.js` 中：

```javascript
import { defineConfig } from 'vite'
import { cssPruner } from '@fe-fast/unused-css-pruner/vite'

export default defineConfig({
  plugins: [
    cssPruner({
      cssFiles: ['dist/**/*.css'],
      sourceDirectories: ['src'],
      mode: 'analyze',
      config: {
        reportFormat: 'console',
        verbose: true
      },
      onAnalysisComplete: (result) => {
        console.log(`发现 ${result.unusedSelectors.length} 个未使用的选择器`);
      }
    })
  ]
})
```

## 配置

在项目的根目录创建一个 `css-pruner.config.js` 文件：

```javascript
module.exports = {
  cssFiles: ['src/**/*.css', '!src/**/*.min.css'],
  sourceDirectories: ['src', 'components'],
  ignorePatterns: ['node_modules/**', 'dist/**'],
  whitelist: ['sr-only', /^wp-/, /^js-/],
  reportFormat: 'console',
  verbose: false,
  dryRun: false
};
```

## 最佳实践

1. **分析前先运行分析**：使用 `analyze` 模式以确保安全。
2. **添加白名单**：保护重要或动态生成的类。
3. **清理前做好版本控制**：在清理前提交代码。

## 支持与贡献

若遇问题或需贡献代码，请访问 [GitHub Repository](https://github.com/william-xue/css-pruner)。
