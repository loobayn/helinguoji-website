# 后端 Dockerfile
FROM node:18-alpine

WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY backend/package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制源代码
COPY backend/ .

# 构建 TypeScript
RUN npm run build

# 暴露端口
EXPOSE 5000

# 启动应用
CMD ["npm", "start"] 