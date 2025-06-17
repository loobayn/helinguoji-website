#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import shutil
from pathlib import Path

# 前端公共目录
PUBLIC_DIR = "/Users/bayn/Desktop/helinguoji/helinguoji/frontend/public"

# 创建目录函数
def ensure_dir(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)
        print(f"创建目录: {directory}")

# 复制文件函数
def copy_file(src, dst):
    try:
        shutil.copy2(src, dst)
        print(f"复制文件: {src} -> {dst}")
    except Exception as e:
        print(f"复制失败: {src} -> {dst}, 错误: {str(e)}")

# 重命名文件映射
file_mapping = {
    # 服务部分
    f"{PUBLIC_DIR}/images/services/air_freight.jpg": f"{PUBLIC_DIR}/images/services/service-air.jpg",
    f"{PUBLIC_DIR}/images/services/sea_freight.jpg": f"{PUBLIC_DIR}/images/services/service-sea.jpg",
    f"{PUBLIC_DIR}/images/services/lcl_shipping.jpg": f"{PUBLIC_DIR}/images/services/service-lcl.jpg",
    f"{PUBLIC_DIR}/images/services/customs_clearance.jpg": f"{PUBLIC_DIR}/images/services/service-customs.jpg",
    f"{PUBLIC_DIR}/images/services/pickup_service.jpg": f"{PUBLIC_DIR}/images/services/service-pickup.jpg",
    f"{PUBLIC_DIR}/images/services/insurance_service.jpg": f"{PUBLIC_DIR}/images/services/service-insurance.jpg",
    f"{PUBLIC_DIR}/images/services/one_stop_service.jpg": f"{PUBLIC_DIR}/images/services/service-team.jpg",
    
    # 特点部分
    f"{PUBLIC_DIR}/images/features/fast_delivery.jpg": f"{PUBLIC_DIR}/images/features/feature-speed.jpg",
    f"{PUBLIC_DIR}/images/features/mission_accomplished.jpg": f"{PUBLIC_DIR}/images/features/feature-mission.jpg",
    f"{PUBLIC_DIR}/images/features/professional.jpg": f"{PUBLIC_DIR}/images/features/feature-professional.jpg",
    f"{PUBLIC_DIR}/images/features/trustworthy.jpg": f"{PUBLIC_DIR}/images/features/feature-trustworthy.jpg",
    f"{PUBLIC_DIR}/images/features/peace_of_mind.jpg": f"{PUBLIC_DIR}/images/features/feature-reliable.jpg",
    
    # 智能化部分
    f"{PUBLIC_DIR}/images/smart/platform.jpg": f"{PUBLIC_DIR}/images/smart/smart-platform.jpg",
    f"{PUBLIC_DIR}/images/intelligent/icon.png": f"{PUBLIC_DIR}/images/smart/smart-icon.png",
    
    # 平台展示部分
    f"{PUBLIC_DIR}/images/platform/mobile.png": f"{PUBLIC_DIR}/images/platform/platform-mobile.png",
    f"{PUBLIC_DIR}/images/platform/desktop.png": f"{PUBLIC_DIR}/images/platform/platform-desktop.png",
    
    # 物流好拍档部分
    f"{PUBLIC_DIR}/images/logistics_partner/service.jpg": f"{PUBLIC_DIR}/images/logistics/logistics-partner.jpg",
    
    # 案例部分
    f"{PUBLIC_DIR}/images/case_studies/case1.jpg": f"{PUBLIC_DIR}/images/cases/case-1.jpg",
    f"{PUBLIC_DIR}/images/case_studies/case2.jpg": f"{PUBLIC_DIR}/images/cases/case-2.jpg",
    f"{PUBLIC_DIR}/images/case_studies/case3.jpg": f"{PUBLIC_DIR}/images/cases/case-3.jpg",
    f"{PUBLIC_DIR}/images/case_studies/case4.jpg": f"{PUBLIC_DIR}/images/cases/case-4.jpg",
    f"{PUBLIC_DIR}/images/case_studies/case5.jpg": f"{PUBLIC_DIR}/images/cases/case-5.jpg",
    f"{PUBLIC_DIR}/images/case_studies/case6.jpg": f"{PUBLIC_DIR}/images/cases/case-6.jpg",
    f"{PUBLIC_DIR}/images/case_studies/case7.jpg": f"{PUBLIC_DIR}/images/cases/case-7.jpg",
    f"{PUBLIC_DIR}/images/case_studies/case8.jpg": f"{PUBLIC_DIR}/images/cases/case-8.jpg",
    f"{PUBLIC_DIR}/images/case_studies/case9.jpg": f"{PUBLIC_DIR}/images/cases/case-9.jpg",
    
    # 品牌部分
    f"{PUBLIC_DIR}/images/brands/brand1.png": f"{PUBLIC_DIR}/images/brands/brand-1.png",
    f"{PUBLIC_DIR}/images/brands/brand2.png": f"{PUBLIC_DIR}/images/brands/brand-2.png",
    f"{PUBLIC_DIR}/images/brands/brand3.png": f"{PUBLIC_DIR}/images/brands/brand-3.png",
    f"{PUBLIC_DIR}/images/brands/brand4.png": f"{PUBLIC_DIR}/images/brands/brand-4.png",
    f"{PUBLIC_DIR}/images/brands/brand5.png": f"{PUBLIC_DIR}/images/brands/brand-5.png",
    f"{PUBLIC_DIR}/images/brands/brand6.png": f"{PUBLIC_DIR}/images/brands/brand-6.png",
    f"{PUBLIC_DIR}/images/brands/brand7.png": f"{PUBLIC_DIR}/images/brands/brand-7.png",
    f"{PUBLIC_DIR}/images/brands/brand8.png": f"{PUBLIC_DIR}/images/brands/brand-8.png",
    f"{PUBLIC_DIR}/images/brands/brand9.png": f"{PUBLIC_DIR}/images/brands/brand-9.png",
    f"{PUBLIC_DIR}/images/brands/brand10.png": f"{PUBLIC_DIR}/images/brands/brand-10.png",
    
    # 联系方式部分
    f"{PUBLIC_DIR}/images/contact/phone.png": f"{PUBLIC_DIR}/images/contact/contact-phone.png",
    f"{PUBLIC_DIR}/images/contact/wechat.png": f"{PUBLIC_DIR}/images/contact/contact-wechat.png",
    f"{PUBLIC_DIR}/images/contact/line.png": f"{PUBLIC_DIR}/images/contact/contact-line.png",
    f"{PUBLIC_DIR}/images/contact/whatsapp.png": f"{PUBLIC_DIR}/images/contact/contact-whatsapp.png",
    f"{PUBLIC_DIR}/images/contact/telegram.png": f"{PUBLIC_DIR}/images/contact/contact-telegram.png",
    f"{PUBLIC_DIR}/images/contact/twitter.png": f"{PUBLIC_DIR}/images/contact/contact-twitter.png",
    
    # 页脚部分
    f"{PUBLIC_DIR}/images/footer/logo.png": f"{PUBLIC_DIR}/images/footer/footer-logo.png",
    
    # 图标部分
    f"{PUBLIC_DIR}/images/header/icon_wechat.png": f"{PUBLIC_DIR}/images/icons/wechat.png",
    f"{PUBLIC_DIR}/images/header/icon_line.png": f"{PUBLIC_DIR}/images/icons/line.png",
    f"{PUBLIC_DIR}/images/header/icon_whatsapp.png": f"{PUBLIC_DIR}/images/icons/whatsapp.png",
    f"{PUBLIC_DIR}/images/header/icon_telegram.png": f"{PUBLIC_DIR}/images/icons/telegram.png",
    f"{PUBLIC_DIR}/images/header/icon_wechat_small.png": f"{PUBLIC_DIR}/images/icons/icon-wechat.png",
    f"{PUBLIC_DIR}/images/header/icon_line_small.png": f"{PUBLIC_DIR}/images/icons/icon-line.png",
    f"{PUBLIC_DIR}/images/header/icon_whatsapp_small.png": f"{PUBLIC_DIR}/images/icons/icon-whatsapp.png",
    f"{PUBLIC_DIR}/images/header/icon_email.png": f"{PUBLIC_DIR}/images/icons/icon-email.png",
    f"{PUBLIC_DIR}/images/header/icon_twitter.png": f"{PUBLIC_DIR}/images/icons/icon-twitter.png",
    f"{PUBLIC_DIR}/images/header/icon_phone.png": f"{PUBLIC_DIR}/images/icons/icon-phone.png"
}

def main():
    print("开始修复图片路径...")
    
    # 确保目标目录存在
    for dst_path in file_mapping.values():
        dst_dir = os.path.dirname(dst_path)
        ensure_dir(dst_dir)
    
    # 复制并重命名文件
    for src_path, dst_path in file_mapping.items():
        if os.path.exists(src_path):
            copy_file(src_path, dst_path)
        else:
            print(f"警告: 源文件不存在: {src_path}")
    
    print("图片路径修复完成！")

if __name__ == "__main__":
    main() 