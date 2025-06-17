import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface MenuModalProps {
  onClose: () => void;
  onSocialClick: (type: string) => void;
  isBlurred?: boolean;
  isClosing: boolean;
}

const MenuModal: React.FC<MenuModalProps> = ({ onClose, onSocialClick, isBlurred = false, isClosing }) => {
  const router = useRouter();
  const { pathname, locale } = router;
  const [menuHeight, setMenuHeight] = useState('calc(100vh - 26px)');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // 计算菜单高度
  useEffect(() => {
    const updateHeight = () => {
      const windowHeight = window.innerHeight;
      setMenuHeight(`${windowHeight - 26}px`);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const menuItems = [
    { name: locale === 'en' ? 'Home' : '首页', path: '/' },
    { name: locale === 'en' ? 'Company Profile' : '公司简介', path: '/about' },
    { name: locale === 'en' ? 'Services' : '业务介绍', path: '/services' },
    { name: locale === 'en' ? 'News' : '企业资讯', path: '/news' },
    { name: locale === 'en' ? 'Case Studies' : '合作案例', path: '/cases' },
    { name: locale === 'en' ? 'Self-Service' : '自助服务', path: '/self-service' },
    { name: locale === 'en' ? 'Contact Us' : '联系我们', path: '/contact' },
  ];

  const handleLanguageSwitch = (newLocale: string) => {
    router.push(pathname, router.asPath, { locale: newLocale });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div 
      ref={modalRef}
      className={`fixed bg-white z-50 m-[0_0_13px_13px] p-0 ${
        isClosing ? 'animate-slideOutLeftFade' : 'animate-slideInRightFade'
      } rounded-[5px] overflow-y-auto overflow-x-hidden flex flex-col`}
      style={{ 
        height: menuHeight, 
        width: '460px',
        top: '13px',
        left: '0',
        backdropFilter: isBlurred ? 'blur(10px)' : 'none',
        opacity: isBlurred ? 0.7 : 1,
        animationFillMode: 'forwards'
      }}
    >
      {/* 主要内容区域 - 内边距25px 21px */}
      <div className="px-[21px] pt-[25px] pb-0 flex-grow">
        <div className="flex items-center cursor-pointer mb-[28px]" onClick={handleClose}>
          <div className="text-primary text-base">
            <span className="inline-block w-[14px] h-[14px] relative">
              <span className="absolute w-[1px] h-[14px] bg-primary transform rotate-45 top-0 left-1/2"></span>
              <span className="absolute w-[1px] h-[14px] bg-primary transform -rotate-45 top-0 left-1/2"></span>
            </span>
            <span className="ml-[10px] tracking-[0.12em]">
              {locale === 'en' ? 'Close' : '关闭'}
            </span>
          </div>
        </div>

        <div className="border-t border-divider my-[28px_0_12px_0]"></div>

        <nav>
          <ul>
            {menuItems.map((item, index) => (
              <li 
                key={index} 
                className={`py-4 ${index === 0 ? 'pt-[16px]' : ''}`}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link href={item.path} onClick={handleClose}>
                  <div className="flex justify-between items-center">
                    <span 
                      className={`text-base tracking-[0.05em] transition-colors duration-300 ${
                        pathname === item.path ? 'text-primary' : 
                        hoveredItem === index ? 'text-primary' : 'text-button'
                      }`}
                    >
                      {item.name}
                    </span>
                    <div 
                      className={`relative w-[6px] h-[13px] transition-colors duration-300 ${
                        pathname === item.path ? 'text-primary' : 
                        hoveredItem === index ? 'text-primary' : 'text-button'
                      }`}
                    >
                      <div
                        className={`absolute top-1/2 left-0 w-[6px] h-[6px] border-t-[1px] border-r-[1px] transform -translate-y-1/2 rotate-45 ${
                          pathname === item.path ? 'border-primary' : 
                          hoveredItem === index ? 'border-primary' : 'border-button'
                        }`}
                      ></div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-divider mt-[12px]"></div>

        <div className="mt-[47px] mb-5 text-primary">
          {locale === 'en' ? 'Need help?' : '需要帮助？'}
        </div>

        <div className="text-primary">
          020-13512345678
        </div>

        <div className="border-t border-divider mt-[47px]"></div>

        <div className="flex mt-[47px] space-x-[18px]">
          {['wechat', 'line', 'whatsapp', 'telegram'].map((type) => (
            <div 
              key={type}
              className="cursor-pointer"
              onClick={() => onSocialClick(type)}
            >
              <div className="relative w-9 h-9">
                <Image 
                  src={`/images/icons/${type}.png`}
                  alt={type.charAt(0).toUpperCase() + type.slice(1)} 
                  fill 
                  style={{ objectFit: 'contain' }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 语言切换区域 - 底部固定，距离底部15px */}
      <div className="mt-auto mb-[15px] mx-auto">
        <div className="language-switcher">
          <div 
            className={`language-option ${locale === 'zh' ? 'active' : ''}`}
            onClick={() => handleLanguageSwitch('zh')}
          >
            中文
          </div>
          <div 
            className={`language-option ${locale === 'en' ? 'active' : ''}`}
            onClick={() => handleLanguageSwitch('en')}
          >
            English
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuModal; 