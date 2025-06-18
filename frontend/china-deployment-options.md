# 中国境内部署选项

## 选项1：阿里云静态网站托管
```bash
# 1. 构建静态文件
npm run build
npm run export  # 如果需要静态导出

# 2. 上传到阿里云OSS
# 3. 配置CDN加速
# 4. 绑定自定义域名
```

## 选项2：腾讯云Web应用托管
- 支持直接从GitHub部署
- 自动CI/CD
- 中国境内CDN

## 选项3：Netlify（备选）
- 类似Vercel的服务
- 在某些地区访问可能更稳定

## 选项4：GitHub Pages + CDN
```bash
# 修改package.json添加部署脚本
"scripts": {
  "deploy": "next build && next export && gh-pages -d out"
}
```

## 推荐顺序：
1. 🥇 **Cloudflare + Vercel**（最佳性价比）
2. 🥈 **阿里云静态网站托管**（最佳中国访问）
3. 🥉 **腾讯云Web应用托管**（易用性好） 