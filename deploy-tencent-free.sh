#!/bin/bash

# 设置颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}开始腾讯云免费部署流程...${NC}"

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

# 前端部署
echo -e "${GREEN}开始前端部署...${NC}"
cd frontend

# 安装依赖
echo -e "${YELLOW}安装前端依赖...${NC}"
npm install

# 构建项目
echo -e "${YELLOW}构建前端项目...${NC}"
npm run build

# 部署到腾讯云静态网站托管
echo -e "${YELLOW}部署到腾讯云静态网站托管...${NC}"
# 请替换以下变量为您的实际配置
TENCENT_SECRET_ID="your-secret-id"
TENCENT_SECRET_KEY="your-secret-key"
COS_BUCKET="your-bucket-name"
COS_REGION="ap-guangzhou"

# 使用 COSCMD 上传文件
coscmd config -a ${TENCENT_SECRET_ID} -s ${TENCENT_SECRET_KEY} -b ${COS_BUCKET} -r ${COS_REGION}
coscmd upload -r out/ /

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
    
    # 部署到腾讯云云函数
    echo -e "${YELLOW}部署到腾讯云云函数...${NC}"
    # 请替换以下变量为您的实际配置
    FUNCTION_NAME="your-function-name"
    FUNCTION_REGION="ap-guangzhou"
    
    # 使用 Serverless Framework 部署
    serverless deploy --name ${FUNCTION_NAME} --region ${FUNCTION_REGION}
    
elif [ -f "requirements.txt" ]; then
    # Python 后端
    echo -e "${YELLOW}检测到 Python 后端${NC}"
    pip install -r requirements.txt
    
    # 部署到腾讯云云函数
    echo -e "${YELLOW}部署到腾讯云云函数...${NC}"
    # 请替换以下变量为您的实际配置
    FUNCTION_NAME="your-function-name"
    FUNCTION_REGION="ap-guangzhou"
    
    # 使用 Serverless Framework 部署
    serverless deploy --name ${FUNCTION_NAME} --region ${FUNCTION_REGION}
else
    echo -e "${RED}错误: 无法确定后端类型${NC}"
    exit 1
fi

echo -e "${GREEN}部署完成！${NC}"
echo -e "${YELLOW}请检查部署日志，确保所有步骤都成功完成。${NC}" 