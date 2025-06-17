import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

// 导出配置
export const config = {
  // 服务器配置
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  
  // 数据库配置
  database: {
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/helinguoji',
  },
  
  // JWT配置
  jwt: {
    secret: process.env.JWT_SECRET || 'helinguoji-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  
  // 邮件配置
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : 587,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    from: process.env.EMAIL_FROM || 'noreply@helinguoji.com',
  },
  
  // 跨域配置
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  }
}; 