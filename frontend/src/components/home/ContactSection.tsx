import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import type { Swiper as SwiperType } from 'swiper';

const ContactSection: React.FC = () => {
  const router = useRouter();
  const { locale } = router;
  const swiperRef = useRef<SwiperType>();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isWheelThrottled = useRef(false);

  // Contact methods
  const contactMethods = [
    {
      icon: '/images/contact/contact-phone.png',
      title: locale === 'en' ? 'Phone Contact' : '电话联系',
      description: locale === 'en' 
        ? 'With powerful service, help your business to the next level.' 
        : '以强大服务，助你业务更上一层楼。'
    },
    {
      icon: '/images/contact/contact-wechat.png',
      title: locale === 'en' ? 'WeChat Contact' : '微信联系',
      description: locale === 'en' 
        ? 'With powerful service, help your business to the next level.' 
        : '以强大服务，助你业务更上一层楼。'
    },
    {
      icon: '/images/contact/contact-line.png',
      title: locale === 'en' ? 'LINE Contact' : 'LINE联系',
      description: locale === 'en' 
        ? 'With powerful service, help your business to the next level.' 
        : '以强大服务，助你业务更上一层楼。'
    },
    {
      icon: '/images/contact/contact-whatsapp.png',
      title: locale === 'en' ? 'WhatsApp Contact' : 'WhatsApp联系',
      description: locale === 'en' 
        ? 'With powerful service, help your business to the next level.' 
        : '以强大服务，助你业务更上一层楼。'
    },
    {
      icon: '/images/contact/contact-telegram.png',
      title: locale === 'en' ? 'Telegram Contact' : 'Telegram联系',
      description: locale === 'en' 
        ? 'With powerful service, help your business to the next level.' 
        : '以强大服务，助你业务更上一层楼。'
    },
    {
      icon: '/images/contact/contact-twitter.png',
      title: locale === 'en' ? 'Twitter Contact' : 'Twitter联系',
      description: locale === 'en' 
        ? 'With powerful service, help your business to the next level.' 
        : '以强大服务，助你业务更上一层楼。'
    }
  ];

  // 处理鼠标滚轮事件 - 专注于左右滑动
  const handleWheel = useCallback((e: WheelEvent) => {
    // 如果正在节流期间，忽略这次滚动
    if (isWheelThrottled.current) {
      return;
    }
    
    // 检查是否主要是水平滚动
    // 如果垂直滚动比水平滚动大得多，忽略整个事件
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) * 2) {
      return;
    }
    
    // 水平滚动方向检测 - 需要足够明显的水平滚动
    if (Math.abs(e.deltaX) < 5) {
      return; // 忽略微小的水平滚动
    }
    
    // 阻止默认滚动行为
    e.preventDefault();
    
    // 激活节流
    isWheelThrottled.current = true;
    
    console.log(`🖱️ Contact Wheel event - deltaX: ${e.deltaX.toFixed(2)}`);
    
    // 根据滚动方向决定切换方向
    if (e.deltaX > 0) {
      // 向右滑动，切换到下一个
      swiperRef.current?.slideNext();
    } else {
      // 向左滑动，切换到上一个
      swiperRef.current?.slidePrev();
    }
    
    // 设置节流时间，防止快速连续触发
    setTimeout(() => {
      isWheelThrottled.current = false;
    }, 600);
  }, []);
  
  // 添加和移除鼠标滚轮事件监听
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      // 使用passive: false允许preventDefault()
      slider.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    return () => {
      if (slider) {
        slider.removeEventListener('wheel', handleWheel);
      }
    };
  }, [handleWheel]);

  return (
    <section className="bg-lightbg responsive-section-padding">
      <div className="responsive-container">
        <h2 className="responsive-title-xl text-primary responsive-margin-bottom">
          {locale === 'en' ? 'Every route can be connected, all-round escort.' : '路路可贯通，全方位护航。'}
        </h2>
        
        <div className="flex flex-col" ref={sliderRef}>
          <div className="flex-grow overflow-visible w-full">
            <Swiper
              slidesPerView="auto"
              spaceBetween={20}
              className="contact-swiper"
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              modules={[Navigation]}
              style={{ 
                overflow: 'visible',
                width: '100%',
                marginLeft: 0
              }}
            >
              {contactMethods.map((method, index) => (
                <SwiperSlide key={index} className="!w-[280px] sm:!w-[320px] md:!w-[360px] lg:!w-[405px]">
                  <div className="contact-card responsive-card">
                    <div className="flex flex-col">
                      <div className="relative w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] lg:w-[35px] lg:h-[35px] mb-[10px] sm:mb-[12px]">
                        <Image 
                          src={method.icon} 
                          alt={method.title} 
                          fill
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                      
                      <div>
                        <h3 className="responsive-title-md font-bold mb-[6px] sm:mb-[7px]">{method.title}</h3>
                        <p className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px]">{method.description}</p>
                      </div>
                    </div>
                    
                    {/* 右下角圆形按钮 */}
                    <div className="absolute bottom-[16px] right-[16px] w-[30px] h-[30px] sm:bottom-[18px] sm:right-[18px] sm:w-[32px] sm:h-[32px] md:bottom-[20px] md:right-[20px] md:w-[34px] md:h-[34px] lg:w-[36px] lg:h-[36px] bg-[#1d1d1f] rounded-full flex items-center justify-center">
                      <div className="relative w-[12px] h-[12px] sm:w-[13px] sm:h-[13px] md:w-[14px] md:h-[14px] lg:w-[15px] lg:h-[15px]">
                        <span className="absolute top-1/2 left-0 w-full h-[2px] sm:h-[2.5px] md:h-[2.5px] lg:h-[3px] bg-white rounded-full transform -translate-y-1/2"></span>
                        <span className="absolute top-0 left-1/2 w-[2px] sm:w-[2.5px] md:w-[2.5px] lg:w-[3px] h-full bg-white rounded-full transform -translate-x-1/2"></span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="flex justify-end space-x-[8px] sm:space-x-[10px] mt-[30px] sm:mt-[40px] lg:mt-[50px]">
            <button 
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={isBeginning}
              className="flex items-center justify-center"
            >
              <Image 
                src="/images/icons/arrow-left.png" 
                alt="Previous" 
                width={30}
                height={30}
                className="object-contain w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] md:w-[34px] md:h-[34px] lg:w-[36px] lg:h-[36px]"
                style={{ opacity: isBeginning ? 0.5 : 1 }}
              />
            </button>
            <button 
              onClick={() => swiperRef.current?.slideNext()}
              disabled={isEnd}
              className="flex items-center justify-center"
            >
              <Image 
                src="/images/icons/arrow-right.png" 
                alt="Next" 
                width={30}
                height={30}
                className="object-contain w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] md:w-[34px] md:h-[34px] lg:w-[36px] lg:h-[36px]"
                style={{ opacity: isEnd ? 0.5 : 1 }}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 