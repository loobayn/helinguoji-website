# 🚀 快速部署指南 - 30分钟上线

## 📋 需要准备的账号

1. **GitHub**: https://github.com/signup （免费）
2. **Vercel**: https://vercel.com/signup （免费）
3. **Railway**: https://railway.app/login （免费额度）

## 🎯 第一步：上传代码（5分钟）

### 1.1 创建 GitHub 仓库
- 访问：https://github.com/new
- Repository name: `helinguoji-website`
- Public（免费用户必选）
- 点击 "Create repository"

### 1.2 记录仓库地址
您的仓库地址：`https://github.com/您的用户名/helinguoji-website`

### 1.3 安装 Git（如果没有）
- Windows: https://git-scm.com/download/win
- 下载安装后重启电脑

### 1.4 上传代码
打开命令提示符（cmd），执行：
```bash
cd E:\和林国际\helinguoji\helinguoji
git init
git add .
git commit -m "Initial deploy"
git remote add origin https://github.com/您的用户名/helinguoji-website.git
git branch -M main
git push -u origin main
```

## 🎯 第二步：部署前端（10分钟）

### 2.1 登录 Vercel
- 访问：https://vercel.com/new
- 点击 "Continue with GitHub"
- 授权 Vercel 访问您的 GitHub

### 2.2 导入项目
- 在 Vercel 页面找到 `helinguoji-website`
- 点击 "Import"

### 2.3 配置构建设置
```
Framework Preset: Next.js
Root Directory: frontend
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### 2.4 设置环境变量
点击 "Environment Variables"，添加：
```
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
NODE_ENV=production
```
（先随便填写，稍后会更新）

### 2.5 部署
- 点击 "Deploy"
- 等待3-5分钟
- 记录前端网址：`https://your-project.vercel.app`

## 🎯 第三步：部署后端（10分钟）

### 3.1 登录 Railway
- 访问：https://railway.app
- 点击 "Start a New Project"
- 选择 "Login with GitHub"

### 3.2 创建项目
- 点击 "New Project"
- 选择 "Deploy from GitHub repo"
- 选择 `helinguoji-website`
- 点击 "Deploy Now"

### 3.3 添加 MongoDB
- 在项目面板点击 "+ New"
- 选择 "Database" → "Add MongoDB"
- 等待创建完成
- 复制 `MONGO_URI` 连接字符串

### 3.4 配置后端环境变量
点击后端服务 → "Variables"，添加：
```
NODE_ENV=production
PORT=5000
JWT_SECRET=helinguoji-secret-2024
JWT_EXPIRES_IN=7d
MONGO_URI=（粘贴刚才复制的MongoDB连接字符串）
```

### 3.5 获取后端URL
- 部署完成后，在 Railway 项目中找到后端URL
- 记录：`https://your-backend.railway.app`

## 🎯 第四步：连接前后端（5分钟）

### 4.1 更新前端环境变量
- 回到 Vercel 项目
- Settings → Environment Variables
- 更新 `NEXT_PUBLIC_API_URL` 为 Railway 后端URL
- 点击 "Redeploy"

### 4.2 验证部署
- 访问前端网址
- 检查网站是否正常显示
- 测试联系表单（如果有的话）

## 🎉 完成！

### 您的网站地址：
- **前端**：`https://your-project.vercel.app`
- **后端API**：`https://your-backend.railway.app`

### 下一步：
1. **自定义域名**：在 Vercel 中配置您的域名
2. **内容更新**：修改公司信息和图片
3. **SEO优化**：添加关键词和描述

## 🔧 常用链接

- **Vercel 控制台**：https://vercel.com/dashboard
- **Railway 控制台**：https://railway.app/dashboard
- **GitHub 仓库**：https://github.com/您的用户名/helinguoji-website

## 📞 需要帮助？

如果遇到问题，请提供：
1. 具体的错误信息
2. 当前进行到哪一步
3. 截图（如果有的话）

立即开始部署吧！🚀 