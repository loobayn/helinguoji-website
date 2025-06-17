# 和林国际物流官网

这是和林国际物流公司的官方网站项目，包括前端展示和后台管理系统。

## 项目结构

```
helinguoji/
├── frontend/             # 前端项目
│   ├── public/           # 静态资源
│   │   ├── images/       # 图片资源
│   │   └── videos/       # 视频资源
│   └── src/              # 源代码
│       ├── components/   # 组件
│       ├── layouts/      # 布局组件
│       ├── pages/        # 页面
│       ├── styles/       # 样式
│       └── utils/        # 工具函数
├── backend/              # 后端项目
│   ├── config/           # 配置
│   ├── controllers/      # 控制器
│   ├── models/           # 数据模型
│   ├── routes/           # 路由
│   ├── services/         # 服务
│   └── utils/            # 工具函数
└── image_processor.py    # 图片处理脚本
```

## 技术栈

### 前端
- Next.js
- React
- TypeScript
- Tailwind CSS
- Styled Components
- Swiper
- i18next (国际化)

### 后端
- Node.js
- Express
- MongoDB
- JWT认证

## 开发环境设置

### 前端

1. 进入前端目录:
```bash
cd helinguoji/frontend
```

2. 安装依赖:
```bash
npm install
```

3. 启动开发服务器:
```bash
npm run dev
```

4. 在浏览器中访问 `http://localhost:3000`

### 后端

1. 进入后端目录:
```bash
cd helinguoji/backend
```

2. 安装依赖:
```bash
npm install
```

3. 启动开发服务器:
```bash
npm run dev
```

4. 后端API将在 `http://localhost:5000` 上运行

## 图片资源管理

项目使用自动化的图片处理系统，所有图片和视频资源都按照功能区域进行分类和命名。

### 图片处理脚本

使用`image_processor.py`脚本来处理图片和视频文件：

```bash
python3 helinguoji/image_processor.py
```

该脚本会：
1. 将源图片目录中的图片按照功能分类复制到前端静态资源目录
2. 对图片进行规范化命名
3. 生成图片映射文件`image_map.json`供前端使用

### 图片目录结构

图片按照以下目录结构进行组织：

```
frontend/public/
├── images/
│   ├── header/       # 页头图片
│   ├── services/     # 服务图片
│   ├── features/     # 特点图片
│   ├── smart/        # 智能化特点图片
│   ├── intelligent/  # 智能化图标
│   ├── platform/     # 平台展示图片
│   ├── logistics_partner/ # 物流好拍档图片
│   ├── case_studies/ # 合作案例图片
│   ├── brands/       # 合作品牌logo
│   ├── contact/      # 联系方式图标
│   └── footer/       # 页脚图片
└── videos/           # 视频资源
```

### 在前端使用图片

在前端组件中，使用`imageUtils`工具类来获取图片URL，而不是硬编码路径：

```tsx
import imageUtils from '@/utils/imageUtils';

// 获取单个图片URL
const logo = imageUtils.getImageUrl('header', 'logo');

// 在组件中使用
<Image src={logo} alt="Logo" />
```

## 部署

### 前端

构建前端项目:
```bash
cd helinguoji/frontend
npm run build
```

### 后端

构建后端项目:
```bash
cd helinguoji/backend
npm run build
```

## 多语言支持

网站支持中文和英文两种语言，使用 i18next 进行国际化。

## 后端开发进度

后端部分已经完成了以下功能：

1. 基础架构搭建
   - 创建了Express服务器
   - 配置了MongoDB连接
   - 设置了中间件和错误处理

2. API端点实现
   - 用户认证（注册、登录、获取用户信息）
   - 联系表单提交和管理
   - 询价表单提交和管理

3. 数据模型
   - 用户模型（User）
   - 联系表单模型（Contact）
   - 询价表单模型（Inquiry）

4. 安全性
   - JWT认证
   - 密码加密
   - 路由保护

## 下一步工作

1. 前端与后端集成
   - 将前端的联系表单与后端API连接
   - 将前端的询价表单与后端API连接

2. 管理员面板
   - 创建管理员登录界面
   - 实现表单数据的管理功能

3. 部署
   - 配置生产环境
   - 设置持续集成/持续部署

## 贡献

如果您想为项目做出贡献，请遵循以下步骤:

1. Fork 项目
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

## 许可证

根据 MIT 许可证分发。详情请参见 `LICENSE` 文件。

## 联系

和林国际物流 - 123456789@qq.com 