import express from 'express';
import { inquiryController } from '../controllers/inquiryController';

const router = express.Router();

/**
 * @route POST /api/inquiry
 * @desc 提交询价表单
 * @access Public
 */
router.post('/', inquiryController.submitInquiry);

/**
 * @route GET /api/inquiry
 * @desc 获取所有询价表单
 * @access Private
 */
router.get('/', inquiryController.getAllInquiries);

/**
 * @route GET /api/inquiry/:id
 * @desc 获取单个询价表单
 * @access Private
 */
router.get('/:id', inquiryController.getInquiryById);

export default router; 