#!/bin/bash

# 设置颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}开始部署流程...${NC}"

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

# 检查是否安装了 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}安装 Vercel CLI...${NC}"
    npm install -g vercel
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

# 部署到 Vercel
echo -e "${YELLOW}部署到 Vercel...${NC}"
vercel --prod

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
    vercel --prod
elif [ -f "requirements.txt" ]; then
    # Python 后端
    echo -e "${YELLOW}检测到 Python 后端${NC}"
    pip install -r requirements.txt
    # 这里需要根据您的 Python 后端框架添加部署命令
    # 例如，如果是 Flask 应用：
    # pip install gunicorn
    # gunicorn app:app
else
    echo -e "${RED}错误: 无法确定后端类型${NC}"
    exit 1
fi

echo -e "${GREEN}部署完成！${NC}"
echo -e "${YELLOW}请检查部署日志，确保所有步骤都成功完成。${NC}" 