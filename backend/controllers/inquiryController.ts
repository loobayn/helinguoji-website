import { Request, Response } from 'express';
import Inquiry from '../models/Inquiry';
import { logger } from '../utils/logger';

/**
 * 询价表单控制器
 */
export const inquiryController = {
  /**
   * 提交询价表单
   * @param req 请求对象
   * @param res 响应对象
   */
  submitInquiry: async (req: Request, res: Response) => {
    try {
      const { 
        name, 
        email, 
        phone, 
        company, 
        fromLocation, 
        toLocation, 
        cargoType, 
        weight, 
        volume, 
        shipmentDate, 
        additionalInfo 
      } = req.body;

      // 验证必填字段
      if (!name || !email || !phone || !fromLocation || !toLocation || !cargoType) {
        return res.status(400).json({
          success: false,
          message: '请填写所有必填字段'
        });
      }

      // 创建新的询价表单记录
      const newInquiry = new Inquiry({
        name,
        email,
        phone,
        company,
        fromLocation,
        toLocation,
        cargoType,
        weight,
        volume,
        shipmentDate,
        additionalInfo,
        status: '待处理',
        submittedAt: new Date()
      });

      // 保存到数据库
      await newInquiry.save();

      // 返回成功响应
      return res.status(201).json({
        success: true,
        message: '询价表单提交成功',
        data: newInquiry
      });
    } catch (error) {
      logger.error(`询价表单提交错误: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: '服务器错误，请稍后再试'
      });
    }
  },

  /**
   * 获取所有询价表单
   * @param req 请求对象
   * @param res 响应对象
   */
  getAllInquiries: async (req: Request, res: Response) => {
    try {
      const inquiries = await Inquiry.find().sort({ submittedAt: -1 });

      return res.status(200).json({
        success: true,
        count: inquiries.length,
        data: inquiries
      });
    } catch (error) {
      logger.error(`获取询价表单错误: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: '服务器错误，请稍后再试'
      });
    }
  },

  /**
   * 获取单个询价表单
   * @param req 请求对象
   * @param res 响应对象
   */
  getInquiryById: async (req: Request, res: Response) => {
    try {
      const inquiry = await Inquiry.findById(req.params.id);

      if (!inquiry) {
        return res.status(404).json({
          success: false,
          message: '未找到该询价表单'
        });
      }

      return res.status(200).json({
        success: true,
        data: inquiry
      });
    } catch (error) {
      logger.error(`获取单个询价表单错误: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: '服务器错误，请稍后再试'
      });
    }
  }
}; 