import { Request, Response } from 'express';
import User from '../models/User';
import { logger } from '../utils/logger';

/**
 * 用户控制器
 */
export const userController = {
  /**
   * 注册新用户
   * @param req 请求对象
   * @param res 响应对象
   */
  register: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      // 检查用户是否已存在
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: '该邮箱已被注册'
        });
      }

      // 创建新用户
      const user = new User({
        name,
        email,
        password
      });

      // 保存用户
      await user.save();

      // 生成JWT令牌
      const token = user.generateAuthToken();

      // 返回成功响应
      return res.status(201).json({
        success: true,
        message: '用户注册成功',
        token
      });
    } catch (error) {
      logger.error(`用户注册错误: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: '服务器错误，请稍后再试'
      });
    }
  },

  /**
   * 用户登录
   * @param req 请求对象
   * @param res 响应对象
   */
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      // 查找用户
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(401).json({
          success: false,
          message: '邮箱或密码不正确'
        });
      }

      // 验证密码
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: '邮箱或密码不正确'
        });
      }

      // 生成JWT令牌
      const token = user.generateAuthToken();

      // 返回成功响应
      return res.status(200).json({
        success: true,
        message: '登录成功',
        token
      });
    } catch (error) {
      logger.error(`用户登录错误: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: '服务器错误，请稍后再试'
      });
    }
  },

  /**
   * 获取当前用户信息
   * @param req 请求对象
   * @param res 响应对象
   */
  getCurrentUser: async (req: Request & { user?: { id: string } }, res: Response) => {
    try {
      // 查找用户
      const user = await User.findById(req.user?.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: '未找到用户'
        });
      }

      // 返回用户信息
      return res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      logger.error(`获取用户信息错误: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: '服务器错误，请稍后再试'
      });
    }
  }
}; 