# Cloudflare CDN 设置指南

## 步骤1：准备域名
1. 购买一个域名（推荐：阿里云、腾讯云、GoDaddy）
2. 例如：`helinguoji.com` 或 `和林国际.com`

## 步骤2：设置Cloudflare
1. 访问 [cloudflare.com](https://cloudflare.com)
2. 注册账号并添加你的域名
3. 将域名的DNS服务器改为Cloudflare提供的

## 步骤3：配置DNS记录
添加以下DNS记录：
```
类型: CNAME
名称: www
内容: your-vercel-project.vercel.app
代理状态: 已代理（橙色云朵）

类型: CNAME  
名称: @
内容: your-vercel-project.vercel.app
代理状态: 已代理（橙色云朵）
```

## 步骤4：Vercel域名配置
1. 在Vercel项目设置中添加自定义域名
2. 添加：`yourdomain.com` 和 `www.yourdomain.com`

## 步骤5：优化设置
在Cloudflare中开启：
- ✅ 自动HTTPS重写
- ✅ 始终使用HTTPS  
- ✅ Brotli压缩
- ✅ 缓存等级：标准

## 优势：
- 🚀 中国境内访问速度大幅提升
- 🛡️ DDoS防护
- 📈 免费SSL证书
- 💰 完全免费 