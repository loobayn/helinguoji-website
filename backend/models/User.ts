import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

// 用户接口
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAuthToken(): string;
}

// 用户模式
const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, '请提供姓名'],
    trim: true
  },
  email: {
    type: String,
    required: [true, '请提供电子邮箱'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      '请提供有效的电子邮箱'
    ]
  },
  password: {
    type: String,
    required: [true, '请提供密码'],
    minlength: [6, '密码至少需要6个字符'],
    select: false
  },
  role: {
    type: String,
    enum: ['admin', 'staff', 'user'],
    default: 'user'
  }
}, {
  timestamps: true
});

// 保存前加密密码
UserSchema.pre('save', async function(next) {
  const user = this;

  // 只有在密码被修改时才重新加密
  if (!user.isModified('password')) return next();

  try {
    // 生成盐
    const salt = await bcrypt.genSalt(10);
    
    // 加密密码
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// 比较密码
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// 生成JWT令牌
UserSchema.methods.generateAuthToken = function(): string {
  return jwt.sign(
    { id: this._id },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
};

// 创建并导出用户模型
export default mongoose.model<IUser>('User', UserSchema); 