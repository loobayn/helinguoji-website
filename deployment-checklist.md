# 部署检查清单

## ✅ 准备工作

- [ ] 注册 GitHub 账号
- [ ] 注册 Vercel 账号
- [ ] 注册 Railway 账号
- [ ] 安装 Git（如果还没有）

## ✅ 第一步：上传代码到 GitHub

1. **创建 GitHub 仓库**
   - 仓库名称：`helinguoji-website`
   - 设置为 Public
   - 不要初始化 README

2. **本地上传代码**
   ```bash
   # 在项目根目录执行
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/您的用户名/helinguoji-website.git
   git branch -M main
   git push -u origin main
   ```

## ✅ 第二步：Vercel 前端部署

1. **导入项目**
   - 访问 https://vercel.com/new
   - 选择 GitHub 仓库
   - 点击 Import

2. **配置设置**
   ```
   Framework Preset: Next.js
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: .next
   ```

3. **环境变量**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app
   NODE_ENV=production
   ```

4. **部署完成**
   - 获取前端URL：`https://your-project.vercel.app`

## ✅ 第三步：Railway 后端部署

1. **创建项目**
   - 访问 https://railway.app
   - 新建项目 → 从 GitHub 部署
   - 选择仓库

2. **环境变量配置**
   ```
   NODE_ENV=production
   PORT=5000
   JWT_SECRET=helinguoji-jwt-secret-2024
   JWT_EXPIRES_IN=7d
   MONGO_URI=mongodb://localhost:27017/helinguoji
   ```

3. **添加 MongoDB**
   - 新建服务 → 数据库 → MongoDB
   - 复制连接字符串到 MONGO_URI

4. **部署完成**
   - 获取后端URL：`https://your-backend.railway.app`

## ✅ 第四步：连接前后端

1. **更新前端环境变量**
   - 在 Vercel 中更新 `NEXT_PUBLIC_API_URL`
   - 重新部署

2. **测试连接**
   - 访问前端网站
   - 测试联系表单等功能

## ✅ 第五步：域名配置（可选）

1. **购买域名**
   - 阿里云/腾讯云等平台

2. **配置DNS**
   - 在 Vercel 项目中添加域名
   - 按照提示配置 DNS 记录

## 🎯 完成标志

- [ ] 前端网站可以正常访问
- [ ] 后端API可以正常响应
- [ ] 数据库连接正常
- [ ] 表单提交功能正常
- [ ] 多语言切换正常
- [ ] 移动端适配正常

## 📞 常见问题

**Q: 前端部署失败怎么办？**
A: 检查 `frontend` 目录结构，确保 package.json 存在

**Q: 后端连接数据库失败？**
A: 检查 MONGO_URI 环境变量是否正确设置

**Q: API 请求失败？**
A: 检查 CORS 配置和前端 API_URL 设置

**Q: 网站加载慢？**
A: 启用 CDN 和图片优化 