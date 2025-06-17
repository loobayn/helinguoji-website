import { Request, Response } from 'express';
import Contact from '../models/Contact';
import { logger } from '../utils/logger';

/**
 * 联系表单控制器
 */
export const contactController = {
  /**
   * 提交联系表单
   * @param req 请求对象
   * @param res 响应对象
   */
  submitContactForm: async (req: Request, res: Response) => {
    try {
      const { name, email, phone, company, message } = req.body;

      // 验证必填字段
      if (!name || !email || !phone || !message) {
        return res.status(400).json({
          success: false,
          message: '请填写所有必填字段'
        });
      }

      // 创建新的联系表单记录
      const newContact = new Contact({
        name,
        email,
        phone,
        company,
        message,
        submittedAt: new Date()
      });

      // 保存到数据库
      await newContact.save();

      // 返回成功响应
      return res.status(201).json({
        success: true,
        message: '联系表单提交成功',
        data: newContact
      });
    } catch (error) {
      logger.error(`联系表单提交错误: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: '服务器错误，请稍后再试'
      });
    }
  },

  /**
   * 获取所有联系表单提交
   * @param req 请求对象
   * @param res 响应对象
   */
  getAllContactSubmissions: async (req: Request, res: Response) => {
    try {
      const contacts = await Contact.find().sort({ submittedAt: -1 });

      return res.status(200).json({
        success: true,
        count: contacts.length,
        data: contacts
      });
    } catch (error) {
      logger.error(`获取联系表单错误: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: '服务器错误，请稍后再试'
      });
    }
  }
}; 