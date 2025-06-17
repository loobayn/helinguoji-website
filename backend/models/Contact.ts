import mongoose, { Document, Schema } from 'mongoose';

// 联系表单接口
export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  submittedAt: Date;
}

// 联系表单模式
const ContactSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, '请提供姓名'],
    trim: true
  },
  email: {
    type: String,
    required: [true, '请提供电子邮箱'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, '请提供电话号码'],
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: [true, '请提供留言内容'],
    trim: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// 创建并导出联系表单模型
export default mongoose.model<IContact>('Contact', ContactSchema); 