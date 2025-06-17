import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface FeatureSlide {
  id: number;
  image: string;
  title: string;
  description: string;
  isVideo?: boolean;
  duration?: number;
}

const FeaturesSection: React.FC = () => {
  const router = useRouter();
  const { locale } = router;
  
  const [currentSlide, setCurrentSlide] = useState(0); // 这个索引是相对于原始slides数组的
  const [actualTranslateIndex, setActualTranslateIndex] = useState(5); // 实际的translate索引，从中间数组开始（5个slides）
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [enableTransition, setEnableTransition] = useState(true); // 控制是否启用过渡动画
  const sliderRef = useRef<HTMLDivElement | null>(null); // 轮播容器引用，用于添加滚轮事件
  const isWheelThrottled = useRef(false); // 用于节流滚轮事件
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const slides: FeatureSlide[] = [
    {
      id: 1,
      image: '/images/features/feature-speed.jpg',
      title: '让世界通达，更快一步。',
      description: '跨境物流，不止是运输，更是连接世界的桥梁。我们致力于用科技与服务打破国界的距离，为中国制造提供更广阔的世界舞台。我们相信，"快一步"，才能领先一步。',
      duration: 5000
    },
    {
      id: 2,
      image: '/images/features/feature-mission.jpg',
      title: '每一次跨越，只为使命必达。',
      description: '20+年跨境物流经验，服务全球超过120个国家和地区。',
      duration: 5000
    },
    {
      id: 3,
      image: '/images/features/feature-professional.jpg',
      title: '每一次跨越，只为使命必达。',
      description: '不必出门，物流已在路上。专业上门提货，准时、安全、高效。',
      duration: 5000
    },
    {
      id: 4,
      image: '/images/features/feature-trustworthy.jpg',
      title: '值得更强大的物流伙伴。',
      description: '从采购对接到终端配送，构建一体化跨境供应链系统，助力品牌出海。',
      duration: 5000
    },
    {
      id: 5,
      image: '/images/features/feature-reliable.jpg',
      title: '全程追踪，放心交付。',
      description: '从您手中到我们仓库，每一环节均可视化监控，保障每一票货物安全。',
      duration: 5000
    }
  ];

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const currentDuration = slides[currentSlide].duration || 5000;
    let startTime = Date.now();
    const endTime = startTime + currentDuration;

    timerRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      const newProgress = Math.min((elapsed / currentDuration) * 100, 100);
      
      setProgress(newProgress);
      
      if (now >= endTime) {
        goToNextSlide();
      }
    }, 50);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      stopTimer();
    } else {
      startTimer();
    }
    setIsPlaying(!isPlaying);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setActualTranslateIndex(index + slides.length); // 始终使用中间数组
    setProgress(0);
    stopTimer();
    
    if (isPlaying) {
      startTimer();
    }
  };

  const goToNextSlide = () => {
    const nextSlide = (currentSlide + 1) % slides.length;
    setCurrentSlide(nextSlide);
    
    // 递增actualTranslateIndex
    setActualTranslateIndex(prev => {
      const next = prev + 1;
      
      // 当到达第三组时，需要重置到第二组
      if (next >= slides.length * 2) {
        // 延迟重置，等动画完成
        setTimeout(() => {
          setEnableTransition(false);
          setActualTranslateIndex(slides.length); // 重置到第二组开始
          setTimeout(() => setEnableTransition(true), 50);
        }, 500);
      }
      
      return next;
    });
  };

  useEffect(() => {
    if (isPlaying) {
      startTimer();
    }
    
    return () => {
      stopTimer();
    };
  }, [currentSlide, isPlaying]);

  // 添加样式确保轮播容器正确显示
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      .features-section .overflow-visible {
        overflow: visible !important;
      }
      .features-section .flex-shrink-0 {
        flex-shrink: 0 !important;
        min-width: 1680px !important;
        width: 1680px !important;
      }
      .features-section .slide-container {
        cursor: pointer;
      }

      /* slide-container 内边距 */
      .features-section .slide-container {
        padding: 39px 0 0 52px !important;
      }

      /* h3标题下边距 */
      .features-section h3 {
        margin-bottom: 10px !important;
      }
    `;
    document.head.appendChild(styleEl);
    
    return () => {
      if (document.head.contains(styleEl)) {
        document.head.removeChild(styleEl);
      }
    };
  }, []);
  
  // 点击板块控制播放/暂停
  const handleSlideClick = () => {
    togglePlayPause();
  };

  // 处理鼠标滚轮事件 - 专注于左右滑动
  const handleWheel = (e: WheelEvent) => {
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
    
    console.log(`🖱️ Wheel event - deltaX: ${e.deltaX.toFixed(2)}`);
    
    // 根据滚动方向决定切换方向
    if (e.deltaX > 0) {
      // 向右滑动，切换到下一个
      goToNextSlide();
    } else {
      // 向左滑动，切换到上一个
      const prevSlide = (currentSlide - 1 + slides.length) % slides.length;
      goToSlide(prevSlide);
    }
    
    // 设置节流时间，防止快速连续触发
    setTimeout(() => {
      isWheelThrottled.current = false;
    }, 600);
  };
  
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
  }, [currentSlide]);

  return (
    <section className="features-section responsive-section-padding">
      <div className="responsive-container">
        <div className="flex flex-col">
          {/* 标题部分 */}
          <div className="w-full flex items-center responsive-margin-bottom">
            <div className="text-left">
              <h2 className="responsive-title-xl font-bold text-[#1d1d1f] whitespace-pre-line">
                让物流，不止于送达。{'\n'}
                全链路可控，路路显实力。
              </h2>
            </div>
          </div>

          {/* 轮播内容 */}
          <div className="w-full overflow-visible relative" ref={sliderRef}>
            <div 
              className={`flex ${enableTransition ? 'transition-transform duration-500 ease-in-out' : ''}`}
              style={{ 
                transform: `translateX(${-(actualTranslateIndex * (1680 + 20))}px)`,
                gap: '20px',
                width: 'fit-content'
              }}
            >
              {/* 渲染3个循环的slides数组以实现无限循环效果 */}
                             {[...slides, ...slides, ...slides].map((slide, index) => {
                 const slideIndex = index % slides.length;
                 const isActive = index === actualTranslateIndex;
                
                return (
                <div 
                    key={`${slide.id}-${Math.floor(index / slides.length)}`}
                    className="flex-shrink-0"
                    style={{ width: '1680px' }}
                >
                  <div 
                      className="w-[1680px] h-[740px] rounded-[28px] p-[52px_0_0_72px] text-white relative overflow-hidden slide-container"
                      onClick={handleSlideClick}
                  >
                    {slide.isVideo ? (
                      <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover"
                        src={slide.image}
                          autoPlay={isActive && isPlaying}
                        muted
                        loop={false}
                        playsInline
                      />
                    ) : (
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                          priority={isActive}
                          quality={90}
                      />
                    )}
                    
                      {/* 移除遮罩层，让图片显示原始效果 */}
                    
                    {/* 文字内容 */}
                    <div className="relative z-10">
                      <h3 className="text-[26px] font-bold mb-[20px]">{slide.title}</h3>
                      <p className="text-[17px] max-w-[800px]">{slide.description}</p>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </div>

          {/* 控制按钮 */}
          <div className="flex items-center justify-center mt-[50px]">
            {/* 播放/暂停按钮 */}
            <button 
              className="w-[56px] h-[56px] bg-[#efeff2] rounded-full flex items-center justify-center mx-[7px]"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <div className="flex">
                  <div className="w-[6px] h-[18px] bg-[#1d1d1f] rounded-[2px] mx-[2px]"></div>
                  <div className="w-[6px] h-[18px] bg-[#1d1d1f] rounded-[2px] mx-[2px]"></div>
                </div>
              ) : (
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-[#1d1d1f] border-b-[10px] border-b-transparent ml-[3px]"></div>
              )}
            </button>

            {/* 轮播指示器 */}
            <div className="h-[56px] bg-[#efeff2] rounded-[28px] px-[16px] mx-[7px] flex items-center">
              {slides.map((slide, index) => (
                <div 
                  key={slide.id}
                  className="relative mx-[8px]"
                  onClick={() => goToSlide(index)}
                >
                  {currentSlide === index ? (
                    <div className="w-[48px] h-[8px] rounded-[4px] bg-[#717174] relative overflow-hidden cursor-pointer">
                      <div 
                        className="absolute top-0 left-0 h-full bg-[#1d1d1f] rounded-[4px]" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  ) : (
                    <div className="w-[8px] h-[8px] rounded-full bg-[#717174] cursor-pointer"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 