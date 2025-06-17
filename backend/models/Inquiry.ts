import mongoose, { Document, Schema } from 'mongoose';

// 询价表单接口
export interface IInquiry extends Document {
  name: string;
  email: string;
  phone: string;
  company?: string;
  fromLocation: string;
  toLocation: string;
  cargoType: string;
  weight?: number;
  volume?: number;
  shipmentDate?: Date;
  additionalInfo?: string;
  status: string;
  submittedAt: Date;
}

// 询价表单模式
const InquirySchema: Schema = new Schema({
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
  fromLocation: {
    type: String,
    required: [true, '请提供起始地点'],
    trim: true
  },
  toLocation: {
    type: String,
    required: [true, '请提供目的地点'],
    trim: true
  },
  cargoType: {
    type: String,
    required: [true, '请提供货物类型'],
    trim: true
  },
  weight: {
    type: Number
  },
  volume: {
    type: Number
  },
  shipmentDate: {
    type: Date
  },
  additionalInfo: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ['待处理', '处理中', '已完成', '已取消'],
    default: '待处理'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// 创建并导出询价表单模型
export default mongoose.model<IInquiry>('Inquiry', InquirySchema); 