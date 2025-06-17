import express from 'express';
import contactRoutes from './contact';
import inquiryRoutes from './inquiry';
import userRoutes from './user';

const router = express.Router();

// 健康检查路由
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: '和林国际物流API服务正常运行'
  });
});

// 用户路由
router.use('/users', userRoutes);

// 联系表单路由
router.use('/contact', contactRoutes);

// 询价表单路由
router.use('/inquiry', inquiryRoutes);

export default router; 