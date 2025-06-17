import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const BannerSection: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { locale } = router;
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('自动播放失败:', error);
      });
    }
  }, []);

  // 处理文本换行，但"跨境物流，全在掌握。"不换行
  const formatSubtitle = (text: string) => {
    if (locale === 'zh' && !text.includes('跨境物流，全在掌握')) {
      // 在"60+国际航线触达全球"之前不换行
      const breakPoint = text.indexOf('60+国际航线触达全球');
      if (breakPoint !== -1) {
        const firstPart = text.substring(0, breakPoint);
        const secondPart = text.substring(breakPoint);
        return (
          <>
            {firstPart}
            <br />
            {secondPart}
          </>
        );
      }
    }
    return text;
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* 视频背景 */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/company_intro.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        
        {/* 视频遮罩 */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      {/* 内容 - 响应式容器 */}
      <div className="relative z-10 responsive-container h-full flex flex-col justify-center items-center text-white">
        <motion.h1 
          className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] font-bold text-center px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t('banner.title')}
        </motion.h1>
        
        <motion.p 
          className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] mt-[30px] sm:mt-[40px] lg:mt-[52px] text-center font-normal px-4 max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {formatSubtitle(t('banner.subtitle'))}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-[60px] sm:bottom-[80px] lg:bottom-[110px]"
        >
          <button 
            className="border border-white rounded-[5px] text-white transition duration-300 backdrop-blur-sm w-[140px] h-[44px] sm:w-[150px] sm:h-[48px] lg:w-[162px] lg:h-[52px]"
          >
            <span className="text-[14px] sm:text-[15px] lg:text-[16px]">
            {t('banner.cta')}
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BannerSection; 