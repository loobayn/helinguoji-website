# 和林国际物流网站部署指南

## 🚀 部署方案

### 方案一：Vercel + Railway (推荐 - 免费)

#### 前端部署到 Vercel

1. **注册 Vercel 账号**
   - 访问 https://vercel.com
   - 使用 GitHub 账号注册

2. **上传代码到 GitHub**
   - 创建新的 GitHub 仓库
   - 将整个项目推送到 GitHub

3. **在 Vercel 中导入项目**
   - 点击 "New Project"
   - 选择您的 GitHub 仓库
   - 设置构建配置：
     - Framework Preset: Next.js
     - Root Directory: `frontend`
     - Build Command: `npm run build`
     - Output Directory: `.next`

4. **环境变量配置**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
   NODE_ENV=production
   ```

#### 后端部署到 Railway

1. **注册 Railway 账号**
   - 访问 https://railway.app
   - 使用 GitHub 账号注册

2. **创建新项目**
   - 点击 "New Project"
   - 选择 "Deploy from GitHub repo"
   - 选择您的仓库

3. **配置环境变量**
   ```
   NODE_ENV=production
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/helinguoji
   JWT_SECRET=your-jwt-secret-key
   JWT_EXPIRES_IN=7d
   ```

4. **添加 MongoDB 服务**
   - 在 Railway 项目中点击 "Add Service"
   - 选择 "MongoDB"
   - 获取连接字符串并更新 MONGO_URI

### 方案二：阿里云 ECS 部署

#### 1. 购买服务器
- 访问 https://ecs.console.aliyun.com
- 选择合适的配置（推荐 2核4G）
- 操作系统选择 Ubuntu 20.04

#### 2. 服务器环境配置
```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装 MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# 启动 MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# 安装 PM2
sudo npm install -g pm2
```

#### 3. 部署应用
```bash
# 克隆代码
git clone your-repository-url
cd helinguoji

# 安装依赖
npm install
cd frontend && npm install
cd ../backend && npm install

# 构建前端
cd ../frontend && npm run build

# 构建后端
cd ../backend && npm run build

# 配置 PM2
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

#### 4. 配置 Nginx
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 前端静态文件
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # API 请求
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 方案三：Docker 容器化部署

#### 1. 创建 docker-compose.yml
```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:5000
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGO_URI=mongodb://mongodb:27017/helinguoji
      - JWT_SECRET=your-jwt-secret
    depends_on:
      - mongodb

  mongodb:
    image: mongo:5.0
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

#### 2. 部署命令
```bash
# 构建并启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

## 📋 域名和 SSL 证书

### 购买域名
- 阿里云万网：https://wanwang.aliyun.com
- 腾讯云域名：https://dnspod.cloud.tencent.com

### SSL 证书配置
- Let's Encrypt 免费证书
- 阿里云/腾讯云 SSL 证书服务

## 🔧 性能优化建议

1. **前端优化**
   - 启用 Next.js 静态导出
   - 图片压缩和 WebP 格式
   - CDN 加速

2. **后端优化**
   - 数据库索引优化
   - API 缓存策略
   - 负载均衡

3. **服务器优化**
   - 启用 Gzip 压缩
   - 配置缓存策略
   - 监控和日志

## 📞 技术支持

如需帮助，请联系技术团队。 