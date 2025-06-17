import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, Virtual } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import type { Swiper as SwiperType } from 'swiper';

const ServicesSection: React.FC = () => {
  const router = useRouter();
  const { locale } = router;
  const swiperRef = useRef<SwiperType>();
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isWheelThrottled = useRef(false);
  
  // 使用播放序列数组实现来回播放
  const playSequence = [0, 1, 2, 3, 4, 3, 2, 1]; // 来回播放序列
  const currentSequenceIndexRef = useRef(0);

  // Service items data
  const serviceItems = [
    {
      image: '/images/services/service-air.jpg',
      description: locale === 'en' 
        ? 'Direct air freight to foreign countries, with partner companies responsible for delivery in destination countries' 
        : '通过航空包舱直运国外，由合作\n公司负责目的国派送',
      title: locale === 'en' ? 'International Air Freight' : '国际空运',
      link: '/services/air'
    },
    {
      image: '/images/services/service-sea.jpg',
      description: locale === 'en' 
        ? 'Entrusting shipping companies to transport goods between ports in different countries and regions' 
        : '委托船公司在不同国家和地区的\n港口之间运送货物',
      title: locale === 'en' ? 'International Sea Freight' : '国际海运',
      link: '/services/sea'
    },
    {
      image: '/images/services/service-lcl.jpg',
      description: locale === 'en' 
        ? 'International specialized logistics services for small items' 
        : '针对小件物品提供的国际专线\n物流服务',
      title: locale === 'en' ? 'LCL Shipping' : '散货拼柜',
      link: '/services/lcl'
    },
    {
      image: '/images/services/service-customs.jpg',
      description: locale === 'en' 
        ? 'Process of handling various customs procedures required for import and export goods' 
        : '为进出口货物办理海关规定的\n各项手续的流程',
      title: locale === 'en' ? 'Professional Customs Clearance' : '专业清关',
      link: '/services/customs'
    },
    {
      image: '/images/services/service-pickup.jpg',
      description: locale === 'en' 
        ? 'Door-to-door pickup service in Guangzhou, Foshan and other areas, with different pricing based on location' 
        : '广州、佛山等地可上门提货，地理\n位置不一样收费标准不一样',
      title: locale === 'en' ? 'Door-to-Door Pickup' : '上门提货',
      link: '/services/pickup'
    },
    {
      image: '/images/services/service-insurance.jpg',
      description: locale === 'en' 
        ? 'Insurance purchasing service, with negotiable compensation for cargo damage or loss' 
        : '代买保险业务，出现货损、丢失等情况，\n可根据情况协商理赔',
      title: locale === 'en' ? 'Insurance Service' : '保险服务',
      link: '/services/insurance'
    },
    {
      image: '/images/services/service-team.jpg',
      description: locale === 'en' 
        ? 'One-stop service for pickup/packing/loading/labeling/customs clearance, saving time and ensuring safe delivery' 
        : '提货/打包/装卸/贴标/清关\n一站式服务，省时省心，安全到货',
      title: locale === 'en' ? 'Professional Team' : '专业团队',
      link: '/services/team'
    },
  ];

  // 处理换行文本
  const formatText = (text: string) => {
    if (text.includes('\n')) {
      const parts = text.split('\n');
      return (
        <>
          {parts[0]}<br />{parts[1]}
        </>
      );
    }
    return text;
  };

  // 计算可见的板块数量
  const getVisibleSlidesCount = () => {
    return 3;
  };

  // 计算最后一个停止位置
  const getLastSlideIndex = () => {
    // 对于7个slides，应该在index 4时停止（显示5,6,7）
    return Math.max(0, serviceItems.length - getVisibleSlidesCount());
  };

  // 使用序列数组的自动轮播
  const startAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }

    autoplayIntervalRef.current = setInterval(() => {
      if (!swiperRef.current) return;

      // 获取当前序列中的下一个索引
      const nextSlideIndex = playSequence[currentSequenceIndexRef.current];
      
      console.log('⏰ Autoplay tick, sequence index:', currentSequenceIndexRef.current, 'slide index:', nextSlideIndex);
      
      // 移动到下一个slide
      swiperRef.current.slideTo(nextSlideIndex);
      
      // 更新序列索引，循环播放
      currentSequenceIndexRef.current = (currentSequenceIndexRef.current + 1) % playSequence.length;
      
      // 更新方向状态用于显示
      const currentPos = currentSequenceIndexRef.current;
      const prevPos = currentPos === 0 ? playSequence.length - 1 : currentPos - 1;
      if (playSequence[currentPos] > playSequence[prevPos]) {
        setSlideDirection('next');
      } else if (playSequence[currentPos] < playSequence[prevPos]) {
        setSlideDirection('prev');
      }
      
    }, 8000); // 8秒间隔
  }, []);

  // 停止自动轮播
  const stopAutoplay = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
  };

  // 组件挂载和卸载时启动/停止自动轮播
  useEffect(() => {
    startAutoplay();
    
    return () => {
      stopAutoplay();
    };
  }, [startAutoplay]);

  // 处理触摸事件
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!swiperRef.current) return;
    console.log('👆 Touch start:', e);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!swiperRef.current) return;
    console.log('👆 Touch move:', e);
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!swiperRef.current) return;
    console.log('👆 Touch end:', e);
  }, []);

  // 添加自定义样式到head
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      .services-swiper .swiper-wrapper {
        width: 100vw !important;
      }
      
      .services-swiper {
        margin-left: 0 !important;
        width: 100% !important;
        overflow: visible !important;
      }
      
      /* 确保第一个slide与版心左边对齐 */
      .services-swiper .swiper-slide-active {
        margin-left: 0 !important;
      }
      
      /* 响应式slide宽度 */
      .services-swiper .swiper-slide {
        width: 280px !important;
      }

      @media (min-width: 640px) {
        .services-swiper .swiper-slide {
          width: 320px !important;
        }
      }

      @media (min-width: 768px) {
        .services-swiper .swiper-slide {
          width: 360px !important;
        }
      }

      @media (min-width: 1024px) {
        .services-swiper .swiper-slide {
          width: 405px !important;
        }
      }

      /* 导航按钮透明度 */
      .services-swiper .swiper-button-disabled {
        opacity: 0.5 !important;
      }

      /* h3标题上边距 */
      .services-swiper h3 {
        margin-top: 9px !important;
      }

      /* service-card 响应式内边距 */
      .service-card {
        padding: 20px 16px 16px 20px !important;
      }

      @media (min-width: 640px) {
        .service-card {
          padding: 24px 18px 18px 24px !important;
        }
      }

      @media (min-width: 768px) {
        .service-card {
          padding: 28px 18px 18px 28px !important;
        }
      }

      @media (min-width: 1024px) {
        .service-card {
          padding: 30px 20px 20px 30px !important;
        }
      }
    `;
    document.head.appendChild(styleEl);
    
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  // 手动绑定事件监听器
  useEffect(() => {
    const swiperContainer = document.querySelector('.services-swiper') as HTMLElement;
    if (swiperContainer) {
      // 添加触摸事件监听
      swiperContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
      swiperContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
      swiperContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
      
      // 组件卸载时移除事件监听
      return () => {
        swiperContainer.removeEventListener('touchstart', handleTouchStart);
        swiperContainer.removeEventListener('touchmove', handleTouchMove);
        swiperContainer.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  // 监听swiper的transform变化，检查是否到达-1275px位置


  // 添加调试日志
  useEffect(() => {
    console.log('slideDirection changed:', slideDirection);
  }, [slideDirection]);

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
    
    console.log(`🖱️ Services Wheel event - deltaX: ${e.deltaX.toFixed(2)}`);
    
    // 根据滚动方向决定切换方向
    if (e.deltaX > 0) {
      // 向右滑动，切换到下一个
      if (swiperRef.current && swiperRef.current.activeIndex < 4) {
        swiperRef.current.slideNext();
      }
    } else {
      // 向左滑动，切换到上一个
      if (swiperRef.current) {
        swiperRef.current.slidePrev();
      }
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
    <section className="responsive-section-padding">
      <div className="responsive-container">
        <div>
          <h2 className="responsive-title-xl text-primary responsive-margin-bottom">
            {locale === 'en' 
              ? 'Cross-border logistics, all at your fingertips.' 
              : '跨境物流，全在掌握。'}
          </h2>
        </div>

        <div className="flex flex-col" ref={sliderRef}>
          <div className="flex-grow overflow-visible w-full">
            <Swiper
              slidesPerView="auto"
              centeredSlides={false}
              initialSlide={0}
              spaceBetween={20}
              slideToClickedSlide={true}
              className="services-swiper"
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
                if (swiper) {
                  swiper.params.observer = true;
                  swiper.params.observeParents = true;
                  swiper.params.slidesPerGroup = 1;
                }
                // 初始化序列索引
                currentSequenceIndexRef.current = 0;
              }}
              onSlideChange={(swiper) => {
                const currentIndex = swiper.activeIndex;
                console.log('📍 Slide changed to index:', currentIndex, 'sequence index:', currentSequenceIndexRef.current);
              }}
              modules={[Navigation, Pagination, A11y, Autoplay, Virtual]}
              style={{ 
                overflow: 'visible',
                width: '100%',
                marginLeft: 0
              }}
            >
              {serviceItems.map((service, index) => (
                <SwiperSlide 
                  key={index}
                  className="!w-[280px] sm:!w-[320px] md:!w-[360px] lg:!w-[405px]"
                >
                  <div 
                    className="service-card group cursor-pointer w-[280px] h-[520px] sm:w-[320px] sm:h-[580px] md:w-[360px] md:h-[660px] lg:w-[405px] lg:h-[740px]"
                    onClick={() => router.push(service.link)}
                    style={{ 
                      backgroundImage: `url(${service.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="flex flex-col">
                      <p className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] tracking-[0.025em]">{formatText(service.description)}</p>
                      <h3 className="text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] font-bold mt-[14px]">{service.title}</h3>
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
              onClick={() => {
                if (swiperRef.current) {
                  setSlideDirection('prev');
                  swiperRef.current.slidePrev();
                  stopAutoplay();
                  startAutoplay();
                }
              }}
              className="flex items-center justify-center"
            >
              <Image 
                src="/images/icons/arrow-left.png" 
                alt="Previous" 
                width={30}
                height={30}
                className="object-contain w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] md:w-[34px] md:h-[34px] lg:w-[36px] lg:h-[36px]"
                style={{ opacity: 1 }}
              />
            </button>
            <button 
              onClick={() => {
                if (swiperRef.current) {
                  setSlideDirection('next');
                  swiperRef.current.slideNext();
                  stopAutoplay();
                  startAutoplay();
                }
              }}
              className="flex items-center justify-center"
            >
              <Image 
                src="/images/icons/arrow-right.png" 
                alt="Next" 
                width={30}
                height={30}
                className="object-contain w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] md:w-[34px] md:h-[34px] lg:w-[36px] lg:h-[36px]"
                style={{ opacity: 1 }}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;