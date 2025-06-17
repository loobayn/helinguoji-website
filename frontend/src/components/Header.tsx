import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MenuModal from './modals/MenuModal';
import ContactModal from './modals/ContactModal';
import SocialModal from './modals/SocialModal';
import { useTranslation } from 'next-i18next';

// 使用直接路径替代imageUtils
const logo = "/images/header/logo.png";
const flagCn = "/images/header/flag_cn.png";
const flagUs = "/images/header/flag_us.png";
const iconUser = "/images/header/icon_user.png";
const iconSearch = "/images/header/icon_search.png";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [socialModalType, setSocialModalType] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [contactClosing, setContactClosing] = useState(false);
  const [socialClosing, setSocialClosing] = useState(false);
  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation('common');

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle modal open/close and body scroll lock
  useEffect(() => {
    const isAnyModalOpen = menuOpen || contactOpen || socialModalType;
    
    if (isAnyModalOpen) {
      // 只在第一次打开模态框时锁定滚动
      if (!document.body.hasAttribute('data-scroll-locked')) {
        document.body.setAttribute('data-scroll-locked', 'true');
        // 只阻止滚动，不改变页面位置
      document.body.style.overflow = 'hidden';
      }
    } else {
      // 恢复滚动
      if (document.body.hasAttribute('data-scroll-locked')) {
        // 简单地恢复滚动能力，不触碰滚动位置
      document.body.style.overflow = '';
        document.body.removeAttribute('data-scroll-locked');
      }
    }
  }, [menuOpen, contactOpen, socialModalType]);

  // 处理模态框打开和关闭的函数
  const handleModalOpen = (type: 'menu' | 'contact') => {
    if (type === 'menu') {
      setMenuOpen(true);
    } else {
      setContactOpen(true);
    }
  };

  // Handle social modal open
  const handleSocialModalOpen = (type: string) => {
    setSocialModalType(type);
  };

  // Handle social modal close
  const handleSocialModalClose = () => {
    setSocialClosing(true);
    // 使用requestAnimationFrame确保CSS动画有足够时间完成
    requestAnimationFrame(() => {
      setTimeout(() => {
        setSocialModalType(null);
        setSocialClosing(false);
      }, 300); // 确保与CSS动画持续时间一致
    });
  };

  // Handle menu close with animation
  const handleMenuClose = () => {
    setMenuClosing(true);
    // 使用requestAnimationFrame确保CSS动画有足够时间完成
    requestAnimationFrame(() => {
      setTimeout(() => {
        setMenuOpen(false);
        setMenuClosing(false);
      }, 300); // 确保与CSS动画持续时间一致
    });
  };

  // Handle contact close with animation
  const handleContactClose = () => {
    setContactClosing(true);
    // 使用requestAnimationFrame确保CSS动画有足够时间完成
    requestAnimationFrame(() => {
      setTimeout(() => {
        setContactOpen(false);
        setContactClosing(false);
      }, 300); // 确保与CSS动画持续时间一致
    });
  };



  // 计算模态框背景类名
  const getModalBgClass = (isOpen: boolean, isClosing: boolean) => 
    `fixed inset-0 z-60 transition-opacity duration-300 ${
      isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
    } ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`;

  // 模态框背景样式
  const modalBgStyle = {
    backdropFilter: 'blur(20px)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  };

  // 判断是否有模态框打开
  const isAnyModalOpen = menuOpen || contactOpen || socialModalType;

  return (
    <>
      {/* 导航栏模糊层 - 在模态框打开时覆盖导航栏 */}
      <div 
        className={`fixed top-0 left-0 right-0 h-88 z-55 transition-opacity duration-300 ${
          isAnyModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.3)'
        }}
      ></div>

      <header 
        className="header-fixed h-[70px] sm:h-[80px] lg:h-88 px-4 sm:px-8 md:px-12 lg:px-[57px] flex items-center justify-between z-50"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      >
        {/* Left section - Menu button */}
        <div className="flex items-center cursor-pointer" onClick={() => handleModalOpen('menu')}>
          <div className="flex flex-col">
            <span className="hamburger-line w-[14px] sm:w-[16px] h-[2px]"></span>
            <span className="hamburger-line w-[14px] sm:w-[16px] h-[2px] mt-[3px] sm:mt-[4px]"></span>
            <span className="hamburger-line w-[14px] sm:w-[16px] h-[2px] mt-[3px] sm:mt-[4px]"></span>
          </div>
          <span className="ml-[12px] sm:ml-[16px] lg:ml-[18px] text-[14px] sm:text-base text-primary tracking-[0.1em] hide-mobile">
            {locale === 'en' ? 'Menu' : '目录'}
          </span>
        </div>

        {/* Center section - Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/">
            <div className="relative w-[110px] h-[32px] sm:w-[125px] sm:h-[36px] lg:w-[141px] lg:h-[40px] cursor-pointer">
              <Image 
                src={logo} 
                alt="和林国际物流" 
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Right section - Contact, User, Search, Language */}
        <div className="flex items-center">
          <div 
            className="cursor-pointer text-[14px] sm:text-base text-primary tracking-[0.1em] hide-mobile"
            onClick={() => handleModalOpen('contact')}
          >
            {locale === 'en' ? 'Contact Us' : '联系我们'}
          </div>

          <Link href="/self-service">
            <div className="cursor-pointer ml-[20px] sm:ml-[28px] lg:ml-[34px] hide-mobile">
              <div className="relative w-[12px] h-[14px] sm:w-[14px] sm:h-[16px]">
                <Image 
                  src={iconUser} 
                  alt="User" 
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </Link>

          <Link href="/contact">
            <div className="cursor-pointer ml-[20px] sm:ml-[28px] lg:ml-[34px] hide-mobile">
              <div className="relative w-[14px] h-[14px] sm:w-[16px] sm:h-[16px]">
                <Image 
                  src={iconSearch} 
                  alt="Search" 
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </Link>

          <div 
            className="cursor-pointer ml-[16px] sm:ml-[24px] lg:ml-[34px]"
            onClick={() => {
              const newLocale = locale === 'en' ? 'zh' : 'en';
              router.push(router.pathname, router.asPath, { locale: newLocale });
            }}
          >
            <div className="relative w-[24px] h-auto sm:w-[28px]">
              <Image 
                src={locale === 'en' ? flagCn : flagUs} 
                alt={locale === 'en' ? "Chinese" : "English"} 
                width={28}
                height={locale === 'en' ? 19 : 15} // 保持国旗的原始宽高比
                className="w-[24px] sm:w-[28px] h-auto"
              />
            </div>
          </div>

          {/* 移动端联系按钮 */}
          <div 
            className="cursor-pointer ml-[16px] sm:ml-[20px] hide-desktop"
            onClick={() => handleModalOpen('contact')}
          >
            <div className="w-[18px] h-[18px] border border-primary rounded-full flex items-center justify-center">
              <span className="text-[10px] text-primary font-medium">联</span>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Modal with Apple-style blur effect */}
      <div 
        className={getModalBgClass(menuOpen, menuClosing)}
        style={modalBgStyle}
        onClick={handleMenuClose}
      ></div>
      <div className={`${menuOpen ? 'z-60' : '-z-10'}`}>
        {menuOpen && <MenuModal onClose={handleMenuClose} onSocialClick={handleSocialModalOpen} isBlurred={!!socialModalType} isClosing={menuClosing} />}
      </div>

      {/* Contact Modal with Apple-style blur effect */}
      <div 
        className={getModalBgClass(contactOpen, contactClosing)}
        style={modalBgStyle}
        onClick={handleContactClose}
      ></div>
      <div className={`${contactOpen ? 'z-60' : '-z-10'}`}>
        {contactOpen && <ContactModal onClose={handleContactClose} onSocialClick={handleSocialModalOpen} isClosing={contactClosing} />}
      </div>

      {/* Social Modal with Apple-style blur effect */}
      <div 
        className={getModalBgClass(!!socialModalType, socialClosing)}
        style={modalBgStyle}
        onClick={handleSocialModalClose}
      ></div>
      <div className={`${socialModalType ? 'z-100' : '-z-10'}`}>
        {socialModalType && <SocialModal type={socialModalType} onClose={handleSocialModalClose} isClosing={socialClosing} />}
      </div>
    </>
  );
};

export default Header; 