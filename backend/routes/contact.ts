import express from 'express';
import { contactController } from '../controllers/contactController';

const router = express.Router();

/**
 * @route POST /api/contact
 * @desc 提交联系表单
 * @access Public
 */
router.post('/', contactController.submitContactForm);

/**
 * @route GET /api/contact
 * @desc 获取所有联系表单提交
 * @access Private
 */
router.get('/', contactController.getAllContactSubmissions);

export default router; 