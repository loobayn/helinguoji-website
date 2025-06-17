# 合灵国际网站项目结构

## 📁 项目目录结构

```
helinguoji/
├── frontend/                    # 前端应用（Next.js）
│   ├── src/                     # 源代码
│   │   ├── components/          # React 组件
│   │   ├── pages/              # 页面文件
│   │   ├── styles/             # 样式文件
│   │   ├── hooks/              # 自定义 Hooks
│   │   ├── utils/              # 工具函数
│   │   └── layouts/            # 布局组件
│   ├── public/                 # 静态资源
│   │   ├── images/             # 图片资源
│   │   ├── videos/             # 视频资源
│   │   └── locales/            # 国际化文件
│   ├── package.json            # 前端依赖配置
│   ├── next.config.js          # Next.js 配置
│   ├── tailwind.config.js      # Tailwind CSS 配置
│   └── tsconfig.json           # TypeScript 配置
├── backend/                    # 后端应用
│   ├── src/                    # 源代码
│   ├── routes/                 # 路由配置
│   ├── controllers/            # 控制器
│   ├── models/                 # 数据模型
│   ├── middleware/             # 中间件
│   ├── config/                 # 配置文件
│   ├── services/               # 服务层
│   ├── utils/                  # 工具函数
│   └── package.json            # 后端依赖配置
├── dev-tools/                  # 开发工具（已整理）
│   ├── image_processor.py      # 图片处理脚本
│   ├── fix_image_paths.py      # 图片路径修复脚本
│   ├── deploy.sh               # Vercel 部署脚本
│   ├── deploy-aliyun.sh        # 阿里云部署脚本
│   ├── deploy-tencent-free.sh  # 腾讯云免费部署脚本
│   ├── ALIYUN_DEPLOY_README.md # 阿里云部署说明
│   ├── TENCENT_FREE_DEPLOY_README.md # 腾讯云免费部署说明
│   └── DEPLOY_README.md        # 通用部署说明
├── temp-storage/               # 临时存储（已整理）
│   ├── 矢量智能对象1_左边.png   # 临时图片文件
│   └── 矢量智能对象1_右边.png   # 临时图片文件
├── node_modules/               # Node.js 依赖包
├── package.json                # 根目录依赖配置
├── package-lock.json           # 依赖锁定文件
├── .gitignore                  # Git 忽略文件配置
├── .git/                       # Git 版本控制
├── README.md                   # 项目说明文档
└── PROJECT_STRUCTURE.md        # 项目结构说明（本文件）
```

## 🎯 核心功能模块

### 前端应用 (`frontend/`)
- **主要技术栈**: Next.js + React + TypeScript + Tailwind CSS
- **核心功能**: 
  - 响应式企业官网
  - 多语言支持（中英文）
  - 服务展示
  - 案例展示
  - 联系方式
  - 智能化平台展示

### 后端应用 (`backend/`)
- **主要技术栈**: Node.js + Express + TypeScript
- **核心功能**:
  - API 接口服务
  - 数据管理
  - 用户认证
  - 业务逻辑处理

## 🛠️ 开发工具 (`dev-tools/`)
- **图片处理工具**: 自动化图片处理和路径修复
- **部署脚本**: 支持多平台部署（Vercel、阿里云、腾讯云）
- **部署文档**: 详细的部署说明和配置指南

## 📦 依赖管理
- **根目录**: 统一管理前后端启动脚本
- **前端**: 独立的 Next.js 应用依赖
- **后端**: 独立的 Node.js 应用依赖

## 🚀 快速启动

### 开发环境
```bash
# 安装依赖
npm install

# 启动开发服务器（前后端同时启动）
npm run dev

# 或者分别启动
npm run dev:frontend  # 启动前端
npm run dev:backend   # 启动后端
```

### 生产环境
```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

### 部署
```bash
# 使用部署脚本
cd dev-tools

# Vercel 部署
./deploy.sh

# 阿里云部署
./deploy-aliyun.sh

# 腾讯云免费部署
./deploy-tencent-free.sh
```

## 📝 文件说明

### 保留的核心文件
- 所有前端和后端源代码
- 项目配置文件
- 静态资源文件
- 项目说明文档

### 整理的文件
- **开发工具**: 移动到 `dev-tools/` 目录
- **临时文件**: 移动到 `temp-storage/` 目录
- **系统文件**: 已删除（如 `.DS_Store`）

### 清理的文件
- macOS 系统生成的 `.DS_Store` 文件
- 不必要的临时文件

## 🔧 维护建议

1. **定期清理**: 定期清理 `temp-storage/` 目录中的临时文件
2. **依赖更新**: 定期更新 Node.js 依赖包
3. **代码规范**: 保持代码风格一致性
4. **文档更新**: 及时更新项目文档

## 📞 技术支持

如有问题，请联系技术支持团队。 