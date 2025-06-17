import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { logger } from '../utils/logger';

// 扩展Request接口，添加用户ID属性
interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

/**
 * 验证JWT令牌的中间件
 * @param req 请求对象
 * @param res 响应对象
 * @param next 下一个中间件函数
 */
export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  // 从请求头中获取令牌
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // 如果没有令牌，返回未授权错误
  if (!token) {
    return res.status(401).json({
      success: false,
      message: '未提供授权令牌，访问被拒绝'
    });
  }

  try {
    // 验证令牌
    const decoded = jwt.verify(token, config.jwt.secret) as { id: string };
    
    // 将用户ID添加到请求对象中
    req.user = {
      id: decoded.id
    };
    
    next();
  } catch (error) {
    logger.error(`认证错误: ${error.message}`);
    return res.status(401).json({
      success: false,
      message: '无效的令牌，访问被拒绝'
    });
  }
}; 