#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import shutil
import sys
from pathlib import Path

# 源图片目录
SOURCE_DIR = "/Users/bayn/Desktop/helinguoji/img"
# 目标目录（前端静态资源目录）
TARGET_DIR = "/Users/bayn/Desktop/helinguoji/helinguoji/frontend/public"

# 确保目标目录存在
def ensure_dir(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)
        print(f"创建目录: {directory}")

# 定义各个板块的目标子目录和文件映射
def get_section_mappings():
    return {
        # 板块一：页头
        "header": {
            "directory": "images/header",
            "files": {
                "logo.png": "1-1logo.png",  # 企业logo
                "flag_cn.png": "1-2国旗.png",  # 中国国旗
                "flag_us.png": "1-2国旗2.png",  # 美国国旗
                "icon_user.png": "用户.png",  # 用户图标
                "icon_search.png": "搜索.png",  # 搜索图标
                "icon_wechat.png": "微信.png",  # 微信图标
                "icon_line.png": "LINE.png",  # LINE图标
                "icon_telegram.png": "telegram.png",  # Telegram图标
                "icon_whatsapp.png": "whatsapp.png",  # WhatsApp图标
                "qr_other.png": "二维码-其他.png",  # 其他二维码
                "qr_wechat.png": "二维码-微信.png",  # 微信二维码
                "qr_line.png": "二维码-line.png",  # LINE二维码
                "qr_telegram.png": "二维码-telegram.png",  # Telegram二维码
                "qr_whatsapp.png": "二维码-whatsapp.png",  # WhatsApp二维码
                "icon_phone.png": "icon电话.png",  # 电话图标
                "icon_wechat_small.png": "icon微信.png",  # 微信小图标
                "icon_email.png": "icon邮箱.png",  # 邮箱图标
                "icon_line_small.png": "iconline.png",  # LINE小图标
                "icon_twitter.png": "iconTwitter.png",  # Twitter图标
                "icon_whatsapp_small.png": "iconWHATSAPP.png",  # WhatsApp小图标
            }
        },
        
        # 板块二：Banner区域
        "banner": {
            "directory": "videos",
            "files": {
                "company_intro.mp4": "banner.mp4",  # 企业简介视频
            }
        },
        
        # 板块三：公司业务
        "services": {
            "directory": "images/services",
            "files": {
                "air_freight.jpg": "2-1.jpg",  # 国际空运
                "sea_freight.jpg": "2-2.jpg",  # 国际海运
                "lcl_shipping.jpg": "2-3.jpg",  # 散货拼柜
                "customs_clearance.jpg": "2-4.jpg",  # 专业清关
                "pickup_service.jpg": "2-5.jpg",  # 上门提货
                "insurance_service.jpg": "2-6.jpg",  # 保险服务
                "one_stop_service.jpg": "2-7.jpg",  # 一站式服务
            }
        },
        
        # 板块四：公司特点
        "features": {
            "directory": "images/features",
            "files": {
                "fast_delivery.jpg": "3-1.jpg",  # 快速空运
                "mission_accomplished.jpg": "3-2.jpg",  # 使命必达
                "professional.jpg": "3-3.jpg",  # 专业
                "trustworthy.jpg": "3-4.jpg",  # 值得信赖
                "peace_of_mind.jpg": "3-5.jpg",  # 让用户放心
            }
        },
        
        # 板块五：智能化特点
        "smart": {
            "directory": "images/smart",
            "files": {
                "platform.jpg": "4-1.jpg",  # 智能化平台
            }
        },
        
        # 板块六：智能化
        "intelligent": {
            "directory": "images/intelligent",
            "files": {
                "icon.png": "5-1.png",  # 智能化图标
            }
        },
        
        # 板块七：平台展示
        "platform": {
            "directory": "images/platform",
            "files": {
                "mobile.png": "6-1.png",  # 手机端界面
                "desktop.png": "6-2.png",  # 电脑端界面
            }
        },
        
        # 板块八：物流好拍档
        "logistics_partner": {
            "directory": "images/logistics_partner",
            "files": {
                "service.jpg": "7-1.jpg",  # 服务图片
            }
        },
        
        # 板块九：合作案例
        "case_studies": {
            "directory": "images/case_studies",
            "files": {
                "case1.jpg": "8-1.jpg",  # 案例1
                "case2.jpg": "8-2.jpg",  # 案例2
                "case3.jpg": "8-3.jpg",  # 案例3
                "case4.jpg": "8-4.jpg",  # 案例4
                "case5.jpg": "8-5.jpg",  # 案例5
                "case6.jpg": "8-6.jpg",  # 案例6
                "case7.jpg": "8-7.jpg",  # 案例7
                "case8.jpg": "8-8.jpg",  # 案例8
                "case9.jpg": "8-9.jpg",  # 案例9
            }
        },
        
        # 板块十：合作大品牌
        "brands": {
            "directory": "images/brands",
            "files": {
                "brand1.png": "9-1.png",  # 品牌1
                "brand2.png": "9-2.png",  # 品牌2
                "brand3.png": "9-3.png",  # 品牌3
                "brand4.png": "9-4.png",  # 品牌4
                "brand5.png": "9-5.png",  # 品牌5
                "brand6.png": "9-6.png",  # 品牌6
                "brand7.png": "9-7.png",  # 品牌7
                "brand8.png": "9-8.png",  # 品牌8
                "brand9.png": "9-9.png",  # 品牌9
                "brand10.png": "9-10.png",  # 品牌10
            }
        },
        
        # 板块十一：联系方式
        "contact": {
            "directory": "images/contact",
            "files": {
                "phone.png": "10-1.png",  # 电话联系
                "wechat.png": "10-2.png",  # 微信联系
                "line.png": "10-3.png",  # LINE联系
                "whatsapp.png": "10-4.png",  # WhatsApp联系
                "telegram.png": "10-5.png",  # Telegram联系
                "twitter.png": "10-6.png",  # Twitter联系
            }
        },
        
        # 板块十二：页脚
        "footer": {
            "directory": "images/footer",
            "files": {
                "logo.png": "11-1和林logo.png",  # 页脚logo
            }
        }
    }

def process_images():
    """处理所有图片和视频文件"""
    section_mappings = get_section_mappings()
    
    # 确保目标目录存在
    ensure_dir(TARGET_DIR)
    
    # 处理每个板块
    for section, mapping in section_mappings.items():
        section_dir = os.path.join(TARGET_DIR, mapping["directory"])
        ensure_dir(section_dir)
        
        # 处理该板块的所有文件
        for new_name, old_name in mapping["files"].items():
            source_path = os.path.join(SOURCE_DIR, old_name)
            target_path = os.path.join(section_dir, new_name)
            
            # 检查源文件是否存在
            if os.path.exists(source_path):
                try:
                    # 复制文件到目标位置
                    shutil.copy2(source_path, target_path)
                    print(f"已复制: {old_name} -> {mapping['directory']}/{new_name}")
                except Exception as e:
                    print(f"复制失败: {old_name} -> {mapping['directory']}/{new_name}, 错误: {str(e)}")
            else:
                print(f"警告: 源文件不存在: {source_path}")
    
    print("\n图片和视频处理完成！")
    print(f"所有文件已复制到: {TARGET_DIR}")

def generate_image_map():
    """生成图片映射文件，供前端使用"""
    section_mappings = get_section_mappings()
    image_map = {}
    
    for section, mapping in section_mappings.items():
        image_map[section] = {}
        for new_name, _ in mapping["files"].items():
            image_path = f"/{mapping['directory']}/{new_name}"
            # 将文件名作为键（去掉扩展名）
            key = os.path.splitext(new_name)[0]
            image_map[section][key] = image_path
    
    # 将映射写入JSON文件
    import json
    image_map_path = os.path.join(TARGET_DIR, "image_map.json")
    with open(image_map_path, "w", encoding="utf-8") as f:
        json.dump(image_map, f, ensure_ascii=False, indent=2)
    
    print(f"图片映射文件已生成: {image_map_path}")

def main():
    """主函数"""
    print("开始处理图片和视频文件...")
    
    # 检查源目录是否存在
    if not os.path.exists(SOURCE_DIR):
        print(f"错误: 源目录不存在: {SOURCE_DIR}")
        sys.exit(1)
    
    # 处理图片
    process_images()
    
    # 生成图片映射
    generate_image_map()

if __name__ == "__main__":
    main() 