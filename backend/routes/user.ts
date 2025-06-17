import express from 'express';
import { userController } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = express.Router();

/**
 * @route POST /api/users/register
 * @desc 注册新用户
 * @access Public
 */
router.post('/register', userController.register);

/**
 * @route POST /api/users/login
 * @desc 用户登录
 * @access Public
 */
router.post('/login', userController.login);

/**
 * @route GET /api/users/me
 * @desc 获取当前用户信息
 * @access Private
 */
router.get('/me', auth, userController.getCurrentUser);

export default router; 