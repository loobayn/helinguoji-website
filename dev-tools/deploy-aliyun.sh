#!/bin/bash

# 设置颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}开始阿里云部署流程...${NC}"

# 检查是否安装了必要的工具
echo -e "${YELLOW}检查必要的工具...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}错误: 未安装 Node.js${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}错误: 未安装 npm${NC}"
    exit 1
fi

if ! command -v git &> /dev/null; then
    echo -e "${RED}错误: 未安装 git${NC}"
    exit 1
fi

# 检查是否安装了阿里云 CLI
if ! command -v aliyun &> /dev/null; then
    echo -e "${YELLOW}请先安装阿里云 CLI: https://help.aliyun.com/document_detail/121541.html${NC}"
    exit 1
fi

# 前端部署
echo -e "${GREEN}开始前端部署...${NC}"
cd frontend

# 安装依赖
echo -e "${YELLOW}安装前端依赖...${NC}"
npm install

# 构建项目
echo -e "${YELLOW}构建前端项目...${NC}"
npm run build

# 部署到阿里云 OSS
echo -e "${YELLOW}部署到阿里云 OSS...${NC}"
# 请替换以下变量为您的实际配置
OSS_BUCKET="your-bucket-name"
OSS_ENDPOINT="oss-cn-hangzhou.aliyuncs.com"
OSS_ACCESS_KEY_ID="your-access-key-id"
OSS_ACCESS_KEY_SECRET="your-access-key-secret"

# 使用 ossutil 上传文件
ossutil cp -r out/ oss://${OSS_BUCKET}/ --endpoint=${OSS_ENDPOINT} --access-key-id=${OSS_ACCESS_KEY_ID} --access-key-secret=${OSS_ACCESS_KEY_SECRET}

# 返回根目录
cd ..

# 后端部署
echo -e "${GREEN}开始后端部署...${NC}"
cd backend

# 检查后端类型
if [ -f "package.json" ]; then
    # Node.js 后端
    echo -e "${YELLOW}检测到 Node.js 后端${NC}"
    npm install
    npm run build
    
    # 部署到阿里云 ECS
    echo -e "${YELLOW}部署到阿里云 ECS...${NC}"
    # 请替换以下变量为您的实际配置
    ECS_HOST="your-ecs-host"
    ECS_USER="your-ecs-user"
    ECS_KEY_PATH="your-ssh-key-path"
    
    # 使用 scp 上传文件
    scp -i ${ECS_KEY_PATH} -r dist/* ${ECS_USER}@${ECS_HOST}:/var/www/backend/
    
    # SSH 到服务器并重启服务
    ssh -i ${ECS_KEY_PATH} ${ECS_USER}@${ECS_HOST} "cd /var/www/backend && pm2 restart all"
    
elif [ -f "requirements.txt" ]; then
    # Python 后端
    echo -e "${YELLOW}检测到 Python 后端${NC}"
    pip install -r requirements.txt
    
    # 部署到阿里云 ECS
    echo -e "${YELLOW}部署到阿里云 ECS...${NC}"
    # 请替换以下变量为您的实际配置
    ECS_HOST="your-ecs-host"
    ECS_USER="your-ecs-user"
    ECS_KEY_PATH="your-ssh-key-path"
    
    # 使用 scp 上传文件
    scp -i ${ECS_KEY_PATH} -r ./* ${ECS_USER}@${ECS_HOST}:/var/www/backend/
    
    # SSH 到服务器并重启服务
    ssh -i ${ECS_KEY_PATH} ${ECS_USER}@${ECS_HOST} "cd /var/www/backend && source venv/bin/activate && pip install -r requirements.txt && supervisorctl restart backend"
else
    echo -e "${RED}错误: 无法确定后端类型${NC}"
    exit 1
fi

echo -e "${GREEN}部署完成！${NC}"
echo -e "${YELLOW}请检查部署日志，确保所有步骤都成功完成。${NC}" 