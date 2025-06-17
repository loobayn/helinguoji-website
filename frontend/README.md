# 和林国际物流网站前端

这是和林国际物流公司官方网站的前端部分。

## 技术栈

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- i18next

## 项目结构

```
frontend/
├── public/               # 静态资源
│   ├── images/           # 图片资源
│   │   ├── header/       # 页头图片
│   │   ├── services/     # 服务图片
│   │   ├── features/     # 特点图片
│   │   └── ...           # 其他图片目录
│   ├── videos/           # 视频资源
│   └── image_map.json    # 图片映射文件
├── src/                  # 源代码
│   ├── components/       # 组件
│   │   ├── home/         # 首页组件
│   │   └── modals/       # 模态框组件
│   ├── layouts/          # 布局组件
│   ├── pages/            # 页面
│   ├── styles/           # 样式
│   └── utils/            # 工具函数
└── ...                   # 配置文件
```

## 安装与设置

1. 安装依赖:

```bash
npm install
```

2. 启动开发服务器:

```bash
npm run dev
```

3. 在浏览器中访问 `http://localhost:3000`

## 图片资源管理

本项目使用自动化的图片管理系统，所有图片和视频资源都按照功能区域进行分类和命名。

### 图片映射

所有图片资源都通过 `image_map.json` 文件进行映射，该文件在项目启动时自动加载。

### 使用图片工具类

在组件中使用图片时，应该通过 `imageUtils` 工具类来获取图片URL，而不是硬编码路径。

```tsx
import imageUtils from '@/utils/imageUtils';

// 获取单个图片URL
const logo = imageUtils.getImageUrl('header', 'logo');

// 在组件中使用
<Image src={logo} alt="Logo" />

// 获取某个部分的所有图片
const allServiceImages = imageUtils.getSectionImages('services');

// 获取某个部分的图片URL列表
const brandImageList = imageUtils.getSectionImageList('brands');
```

### 图片部分分类

图片按照以下部分进行分类：

1. `header` - 页头图片（logo、国旗、图标等）
2. `banner` - Banner区域视频
3. `services` - 公司业务图片
4. `features` - 公司特点图片
5. `smart` - 智能化特点图片
6. `intelligent` - 智能化图标
7. `platform` - 平台展示图片
8. `logistics_partner` - 物流好拍档图片
9. `case_studies` - 合作案例图片
10. `brands` - 合作品牌logo
11. `contact` - 联系方式图标
12. `footer` - 页脚图片

## 多语言支持

网站支持中文和英文两种语言，使用 i18next 进行国际化。

## 构建生产版本

```bash
npm run build
```

## 启动生产服务器

```bash
npm start
``` 