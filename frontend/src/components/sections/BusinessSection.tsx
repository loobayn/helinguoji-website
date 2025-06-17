import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const BusinessSection: React.FC = () => {
  const router = useRouter();
  const { locale } = router;
  const [activeTab, setActiveTab] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const businessTabs = [
    {
      id: 'logistics',
      title: locale === 'en' ? 'Logistics' : '物流服务',
      description: locale === 'en' ? 'Global logistics solutions for your business.' : '为您的业务提供全球物流解决方案。',
      image: '/images/business/logistics.jpg',
      icon: '/images/icons/logistics-icon.png',
    },
    {
      id: 'customs',
      title: locale === 'en' ? 'Customs Clearance' : '通关服务',
      description: locale === 'en' ? 'Efficient customs clearance services.' : '高效的通关服务。',
      image: '/images/business/customs.jpg',
      icon: '/images/icons/customs-icon.png',
    },
    {
      id: 'warehousing',
      title: locale === 'en' ? 'Warehousing' : '仓储服务',
      description: locale === 'en' ? 'Secure storage and inventory management.' : '安全的存储和库存管理。',
      image: '/images/business/warehousing.jpg',
      icon: '/images/icons/warehousing-icon.png',
    },
    {
      id: 'distribution',
      title: locale === 'en' ? 'Distribution' : '配送服务',
      description: locale === 'en' ? 'Fast and reliable distribution network.' : '快速可靠的配送网络。',
      image: '/images/business/distribution.jpg',
      icon: '/images/icons/distribution-icon.png',
    },
    {
      id: 'technology',
      title: locale === 'en' ? 'Technology' : '技术服务',
      description: locale === 'en' ? 'Advanced technology for logistics management.' : '先进的物流管理技术。',
      image: '/images/business/technology.jpg',
      icon: '/images/icons/technology-icon.png',
    },
    {
      id: 'consulting',
      title: locale === 'en' ? 'Consulting' : '咨询服务',
      description: locale === 'en' ? 'Professional logistics consulting services.' : '专业的物流咨询服务。',
      image: '/images/business/consulting.jpg',
      icon: '/images/icons/consulting-icon.png',
    },
  ];

  const handleTabChange = (index: number) => {
    if (isAnimating || index === activeTab) return;
    setIsAnimating(true);
    setActiveTab(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handlePrevTab = () => {
    if (isAnimating) return;
    const newIndex = activeTab === 0 ? businessTabs.length - 1 : activeTab - 1;
    handleTabChange(newIndex);
  };

  const handleNextTab = () => {
    if (isAnimating) return;
    const newIndex = activeTab === businessTabs.length - 1 ? 0 : activeTab + 1;
    handleTabChange(newIndex);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevTab();
      } else if (e.key === 'ArrowRight') {
        handleNextTab();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeTab, isAnimating]);

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-4xl font-bold text-center mb-8">
          {locale === 'en' ? 'Explore Our Services' : '了解我们的服务'}
        </h2>

        {/* Navigation tabs (Apple style) */}
        <div className="flex justify-center mb-12 relative">
          <div className="flex overflow-x-auto py-4 scrollbar-hide max-w-full">
            <div className="flex space-x-8 px-4">
              {businessTabs.map((tab, index) => (
                <div 
                  key={tab.id}
                  className={`flex flex-col items-center cursor-pointer transition-all duration-300 min-w-[120px] ${
                    activeTab === index ? 'opacity-100 scale-105' : 'opacity-60 hover:opacity-80'
                  }`}
                  onClick={() => handleTabChange(index)}
                >
                  <div className="w-16 h-16 mb-4 relative">
                    <Image
                      src={tab.icon || `/images/icons/default-icon.png`}
                      alt={tab.title}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <h3 className={`text-base font-medium text-center ${
                    activeTab === index ? 'text-primary' : 'text-gray-500'
                  }`}>
                    {tab.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation arrows */}
          <button 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 w-10 h-10 rounded-full shadow-lg flex items-center justify-center z-10 hover:bg-white transition-colors"
            onClick={handlePrevTab}
            aria-label="Previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          <button 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 w-10 h-10 rounded-full shadow-lg flex items-center justify-center z-10 hover:bg-white transition-colors"
            onClick={handleNextTab}
            aria-label="Next"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Content section */}
        <div className="relative overflow-hidden" ref={contentRef}>
          <div className="relative h-[600px]">
            {businessTabs.map((tab, index) => (
              <div 
                key={tab.id}
                className={`absolute inset-0 flex flex-col md:flex-row transition-all duration-500 ${
                  activeTab === index 
                    ? 'opacity-100 translate-x-0 z-10' 
                    : index < activeTab 
                      ? 'opacity-0 -translate-x-full z-0' 
                      : 'opacity-0 translate-x-full z-0'
                }`}
              >
                {/* Left side content */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">{tab.title}</h3>
                  <p className="text-lg md:text-xl mb-8">{tab.description}</p>
                  <button className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors self-start">
                    {locale === 'en' ? 'Learn more' : '了解更多'}
                  </button>
                </div>
                
                {/* Right side image */}
                <div className="w-full md:w-1/2 h-[300px] md:h-auto relative">
                  <Image
                    src={tab.image}
                    alt={tab.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {businessTabs.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeTab === index ? 'bg-primary w-8' : 'bg-gray-300'
              }`}
              onClick={() => handleTabChange(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessSection; 