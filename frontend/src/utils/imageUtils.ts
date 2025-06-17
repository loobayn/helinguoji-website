/**
 * 图片工具类
 * 用于在前端组件中方便地引用图片资源
 */

// 图片映射类型定义
interface ImageMap {
  [section: string]: {
    [key: string]: string;
  };
}

// 默认图片路径映射
const defaultImagePaths: ImageMap = {
  header: {
    logo: "/images/header/logo.png",
    flag_cn: "/images/header/flag_cn.png",
    flag_us: "/images/header/flag_us.png",
    icon_user: "/images/header/icon_user.png",
    icon_search: "/images/header/icon_search.png",
    icon_wechat: "/images/header/icon_wechat.png",
    icon_line: "/images/header/icon_line.png",
    icon_telegram: "/images/header/icon_telegram.png",
    icon_whatsapp: "/images/header/icon_whatsapp.png",
    qr_other: "/images/header/qr_other.png",
    qr_wechat: "/images/header/qr_wechat.png",
    qr_line: "/images/header/qr_line.png",
    qr_telegram: "/images/header/qr_telegram.png",
    qr_whatsapp: "/images/header/qr_whatsapp.png",
    icon_phone: "/images/header/icon_phone.png",
    icon_wechat_small: "/images/header/icon_wechat_small.png",
    icon_email: "/images/header/icon_email.png",
    icon_line_small: "/images/header/icon_line_small.png",
    icon_twitter: "/images/header/icon_twitter.png",
    icon_whatsapp_small: "/images/header/icon_whatsapp_small.png"
  },
  banner: {
    company_intro: "/videos/company_intro.mp4"
  },
  services: {
    air_freight: "/images/services/air_freight.jpg",
    sea_freight: "/images/services/sea_freight.jpg",
    lcl_shipping: "/images/services/lcl_shipping.jpg",
    customs_clearance: "/images/services/customs_clearance.jpg",
    pickup_service: "/images/services/pickup_service.jpg",
    insurance_service: "/images/services/insurance_service.jpg",
    one_stop_service: "/images/services/one_stop_service.jpg"
  },
  features: {
    fast_delivery: "/images/features/fast_delivery.jpg",
    mission_accomplished: "/images/features/mission_accomplished.jpg",
    professional: "/images/features/professional.jpg",
    trustworthy: "/images/features/trustworthy.jpg",
    peace_of_mind: "/images/features/peace_of_mind.jpg"
  },
  smart: {
    platform: "/images/smart/platform.jpg"
  },
  intelligent: {
    icon: "/images/intelligent/icon.png"
  },
  platform: {
    mobile: "/images/platform/mobile.png",
    desktop: "/images/platform/desktop.png"
  },
  logistics_partner: {
    service: "/images/logistics_partner/service.jpg"
  },
  case_studies: {
    case1: "/images/case_studies/case1.jpg",
    case2: "/images/case_studies/case2.jpg",
    case3: "/images/case_studies/case3.jpg",
    case4: "/images/case_studies/case4.jpg",
    case5: "/images/case_studies/case5.jpg",
    case6: "/images/case_studies/case6.jpg",
    case7: "/images/case_studies/case7.jpg",
    case8: "/images/case_studies/case8.jpg",
    case9: "/images/case_studies/case9.jpg"
  },
  brands: {
    brand1: "/images/brands/brand1.png",
    brand2: "/images/brands/brand2.png",
    brand3: "/images/brands/brand3.png",
    brand4: "/images/brands/brand4.png",
    brand5: "/images/brands/brand5.png",
    brand6: "/images/brands/brand6.png",
    brand7: "/images/brands/brand7.png",
    brand8: "/images/brands/brand8.png",
    brand9: "/images/brands/brand9.png",
    brand10: "/images/brands/brand10.png"
  },
  contact: {
    phone: "/images/contact/phone.png",
    wechat: "/images/contact/wechat.png",
    line: "/images/contact/line.png",
    whatsapp: "/images/contact/whatsapp.png",
    telegram: "/images/contact/telegram.png",
    twitter: "/images/contact/twitter.png"
  },
  footer: {
    logo: "/images/footer/logo.png"
  }
};

// 从生成的JSON文件中导入图片映射
let imageMap: ImageMap = {...defaultImagePaths};
let isMapLoaded = false;

// 初始化图片映射
const initImageMap = async (): Promise<void> => {
  try {
    const response = await fetch('/image_map.json');
    const loadedMap = await response.json();
    imageMap = {...defaultImagePaths, ...loadedMap};
    isMapLoaded = true;
    console.log('图片映射加载成功');
  } catch (error) {
    console.error('加载图片映射失败:', error);
  }
};

// 获取图片URL
const getImageUrl = (section: string, key: string): string => {
  if (!imageMap[section] || !imageMap[section][key]) {
    console.warn(`未找到图片: ${section}/${key}`);
    return '';
  }
  return imageMap[section][key];
};

// 图片部分的类型定义
export type ImageSection = 
  | 'header' 
  | 'banner' 
  | 'services' 
  | 'features' 
  | 'smart' 
  | 'intelligent' 
  | 'platform' 
  | 'logistics_partner' 
  | 'case_studies' 
  | 'brands' 
  | 'contact' 
  | 'footer';

/**
 * 获取特定部分的所有图片
 * @param section 图片部分
 * @returns 该部分的所有图片URL映射
 */
const getSectionImages = (section: ImageSection): Record<string, string> => {
  return imageMap[section] || {};
};

/**
 * 获取特定部分的图片URL列表
 * @param section 图片部分
 * @returns 该部分的所有图片URL数组
 */
const getSectionImageList = (section: ImageSection): string[] => {
  if (!imageMap[section]) {
    return [];
  }
  return Object.values(imageMap[section]);
};

// 导出工具函数
export const imageUtils = {
  initImageMap,
  getImageUrl,
  getSectionImages,
  getSectionImageList,
  isMapLoaded
};

export default imageUtils; 