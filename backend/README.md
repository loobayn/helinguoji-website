# 和林国际物流网站后端

这是和林国际物流公司官方网站的后端API服务。

## 技术栈

- Node.js
- Express
- TypeScript
- MongoDB
- JWT认证

## 项目结构

```
backend/
├── config/           # 配置文件
├── controllers/      # 控制器
├── middleware/       # 中间件
├── models/           # 数据模型
├── routes/           # 路由
├── utils/            # 工具函数
└── src/              # 源代码
    └── index.ts      # 主入口文件
```

## 安装与设置

1. 安装依赖:

```bash
npm install
```

2. 创建`.env`文件:

```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/helinguoji
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

3. 解决TypeScript错误:

当前项目中存在一些TypeScript类型错误，这是因为需要安装相应的类型定义。运行以下命令安装所需的类型定义:

```bash
npm install --save-dev @types/node @types/express @types/mongoose @types/bcryptjs @types/jsonwebtoken @types/cors @types/dotenv
```

4. 启动开发服务器:

```bash
npm run dev
```

服务器将在 `http://localhost:5000` 上运行。

## API端点

### 用户认证

- `POST /api/users/register` - 注册新用户
- `POST /api/users/login` - 用户登录
- `GET /api/users/me` - 获取当前用户信息 (需要认证)

### 联系表单

- `POST /api/contact` - 提交联系表单
- `GET /api/contact` - 获取所有联系表单提交 (需要认证)

### 询价表单

- `POST /api/inquiry` - 提交询价表单
- `GET /api/inquiry` - 获取所有询价表单 (需要认证)
- `GET /api/inquiry/:id` - 获取单个询价表单 (需要认证)

## 构建生产版本

```bash
npm run build
```

编译后的文件将输出到 `dist` 目录。

## 启动生产服务器

```bash
npm start
``` 