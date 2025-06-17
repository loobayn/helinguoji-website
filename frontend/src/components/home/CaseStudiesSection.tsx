import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import type { Swiper as SwiperType } from 'swiper';

const CaseStudiesSection: React.FC = () => {
  const router = useRouter();
  const { locale } = router;
  const swiperRef = useRef<SwiperType>();
  const sliderRef = useRef<HTMLElement | null>(null);
  const isWheelThrottled = useRef(false);

  // Case studies data
  const caseStudies = [
    {
      image: '/images/cases/case-1.jpg',
      title: locale === 'en' ? 'Case Study 1' : '案例研究 1',
      description: locale === 'en' 
        ? 'This is a long description about the case study. This is a long description about the case study. This is a long description about the case study.' 
        : '这里有很长一段文案。这里有很长一段文案。这里有很长一段文案。'
    },
    {
      image: '/images/cases/case-2.jpg',
      title: locale === 'en' ? 'Case Study 2' : '案例研究 2',
      description: locale === 'en' 
        ? 'This is a long description about the case study. This is a long description about the case study. This is a long description about the case study.' 
        : '这里有很长一段文案。这里有很长一段文案。这里有很长一段文案。'
    },
    {
      image: '/images/cases/case-3.jpg',
      title: locale === 'en' ? 'Case Study 3' : '案例研究 3',
      description: locale === 'en' 
        ? 'This is a long description about the case study. This is a long description about the case study. This is a long description about the case study.' 
        : '这里有很长一段文案。这里有很长一段文案。这里有很长一段文案。'
    },
    {
      image: '/images/cases/case-4.jpg',
      title: locale === 'en' ? 'Case Study 4' : '案例研究 4',
      description: locale === 'en' 
        ? 'This is a long description about the case study. This is a long description about the case study. This is a long description about the case study.' 
        : '这里有很长一段文案。这里有很长一段文案。这里有很长一段文案。'
    },
    {
      image: '/images/cases/case-5.jpg',
      title: locale === 'en' ? 'Case Study 5' : '案例研究 5',
      description: locale === 'en' 
        ? 'This is a long description about the case study. This is a long description about the case study. This is a long description about the case study.' 
        : '这里有很长一段文案。这里有很长一段文案。这里有很长一段文案。'
    },
    {
      image: '/images/cases/case-6.jpg',
      title: locale === 'en' ? 'Case Study 6' : '案例研究 6',
      description: locale === 'en' 
        ? 'This is a long description about the case study. This is a long description about the case study. This is a long description about the case study.' 
        : '这里有很长一段文案。这里有很长一段文案。这里有很长一段文案。'
    },
    {
      image: '/images/cases/case-7.jpg',
      title: locale === 'en' ? 'Case Study 7' : '案例研究 7',
      description: locale === 'en' 
        ? 'This is a long description about the case study. This is a long description about the case study. This is a long description about the case study.' 
        : '这里有很长一段文案。这里有很长一段文案。这里有很长一段文案。'
    },
    {
      image: '/images/cases/case-8.jpg',
      title: locale === 'en' ? 'Case Study 8' : '案例研究 8',
      description: locale === 'en' 
        ? 'This is a long description about the case study. This is a long description about the case study. This is a long description about the case study.' 
        : '这里有很长一段文案。这里有很长一段文案。这里有很长一段文案。'
    },
    {
      image: '/images/cases/case-9.jpg',
      title: locale === 'en' ? 'Case Study 9' : '案例研究 9',
      description: locale === 'en' 
        ? 'This is a long description about the case study. This is a long description about the case study. This is a long description about the case study.' 
        : '这里有很长一段文案。这里有很长一段文案。这里有很长一段文案。'
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
    
    console.log(`🖱️ CaseStudies Wheel event - deltaX: ${e.deltaX.toFixed(2)}`);
    
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
    <section className="mb-[150px]" ref={sliderRef}>
      <div className="flex flex-col items-center">
      <Swiper
          slidesPerView="auto"
          spaceBetween={16}
        centeredSlides={true}
        loop={true}
          loopAdditionalSlides={2}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.case-studies-pagination',
          bulletClass: 'carousel-dot',
          bulletActiveClass: 'active',
        }}
        modules={[Pagination, Autoplay]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
          className="w-full h-[660px]"
          style={{
            overflow: 'visible'
          }}
      >
        {caseStudies.map((caseStudy, index) => (
            <SwiperSlide key={index} style={{ width: 'auto', height: '660px' }}>
            <div 
                className="h-[660px] relative"
              style={{ 
                  width: '1260px',
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${caseStudy.image})`,
                backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  padding: '39px 0 0 52px'
              }}
            >
                <div className="text-white">
                  <h3 className="text-[26px] font-bold mb-4 text-left">{caseStudy.title}</h3>
                  <p className="text-[17px] max-w-[800px] text-left">{caseStudy.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
        <div className="case-studies-pagination flex justify-center mt-8" style={{ gap: '14px' }}></div>
      </div>
    </section>
  );
};

export default CaseStudiesSection; 