# 部署指南：将 VitePress 网站发布到 GitHub Pages

本指南将帮助您将 VitePress 网站部署到 GitHub Pages，让全世界的人都能访问您的个人主页。

## 📋 前提条件

- GitHub 账户
- Git 已安装并配置
- 项目已在本地运行成功

## 🚀 部署步骤

### 1. 创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 填写仓库信息：
   - **Repository name**: 例如 `my-homepage` 或 `fe-fast`
   - **Description**: "我的个人主页"
   - **Public**: 选择公开（免费用户必须选择公开才能使用 GitHub Pages）
   - 不要勾选 "Add a README file"（因为我们已经有项目了）

### 2. 配置 base 路径（重要！）

如果您的仓库名不是 `<username>.github.io`，需要修改 VitePress 配置：

打开 `docs/.vitepress/config.ts`，取消注释并修改 base 配置：

```typescript
export default defineConfig({
  // 其他配置...
  base: '/your-repository-name/', // 替换为您的仓库名
  // 其他配置...
})
```

**示例**：
- 如果仓库名是 `my-homepage`，则设置 `base: '/my-homepage/'`
- 如果仓库名是 `<username>.github.io`，则不需要设置 base

### 3. 初始化 Git 并推送代码

在项目根目录执行以下命令：

```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit: VitePress personal homepage"

# 添加远程仓库（替换为您的仓库地址）
git remote add origin https://github.com/your-username/your-repository-name.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 4. 启用 GitHub Pages

1. 进入您的 GitHub 仓库页面
2. 点击 "Settings" 选项卡
3. 在左侧菜单中找到 "Pages"
4. 在 "Source" 部分，选择 "GitHub Actions"
5. 点击 "Save"

### 5. 等待部署完成

1. 推送代码后，GitHub Actions 会自动开始构建和部署
2. 在仓库页面点击 "Actions" 选项卡查看部署进度
3. 部署成功后，您的网站将在以下地址可用：
   - 如果仓库名是 `<username>.github.io`：`https://<username>.github.io/`
   - 其他仓库名：`https://<username>.github.io/<repository-name>/`

## 🔧 常见问题解决

### 问题 1：页面显示空白或样式丢失

**原因**：base 路径配置错误

**解决方案**：
1. 检查 `docs/.vitepress/config.ts` 中的 base 配置
2. 确保 base 路径与仓库名一致
3. 重新推送代码触发部署

### 问题 2：GitHub Actions 构建失败

**可能原因**：
- Node.js 版本不兼容
- 依赖安装失败
- 构建脚本错误

**解决方案**：
1. 检查 Actions 日志中的错误信息
2. 确保 `package.json` 中有正确的构建脚本
3. 本地测试构建命令：`cd docs && npm run docs:build`

### 问题 3：权限错误

**解决方案**：
1. 进入仓库 Settings > Actions > General
2. 在 "Workflow permissions" 部分选择 "Read and write permissions"
3. 点击 "Save"

## 📝 更新网站内容

每次修改内容后，只需要：

```bash
git add .
git commit -m "Update content"
git push
```

GitHub Actions 会自动重新构建和部署您的网站。

## 🎯 自定义域名（可选）

如果您有自己的域名，可以：

1. 在 GitHub Pages 设置中添加自定义域名
2. 在域名提供商处设置 CNAME 记录指向 `<username>.github.io`
3. 在项目的 `docs/public/` 目录下创建 `CNAME` 文件，内容为您的域名

## 🔗 有用的链接

- [VitePress 官方部署指南](https://vitepress.dev/guide/deploy)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)

---

🎉 恭喜！您的个人主页现在已经可以在互联网上访问了！