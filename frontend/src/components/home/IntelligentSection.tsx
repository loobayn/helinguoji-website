import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const IntelligentSection: React.FC = () => {
  const router = useRouter();
  const { locale } = router;

  return (
    <section className="my-[150px]">
      {/* 版心容器 */}
      <div style={{ maxWidth: '1680px' }} className="mx-auto">
        {/* 渐变描边框 */}
        <div className="relative w-[1260px] h-[660px] rounded-[28px] flex flex-col items-center mx-auto">
          {/* 最外层裁切容器 */}
          <div 
            className="absolute inset-0 rounded-[28px] z-10"
            style={{ 
              overflow: 'hidden'
            }}
          >
            {/* 第一个模糊框 - 1px模糊 */}
            <div 
              className="absolute inset-0 rounded-[28px]"
              style={{ 
                filter: 'blur(1px)'
              }}
            >
              {/* 内层渐变描边 */}
          <div 
                className="absolute inset-0 rounded-[28px]"
                style={{ 
                  background: 'linear-gradient(41deg, #bb64ff, #f28, #ff8b00 28%, #f2416b, #e750de 60%, #0096ff, #bb64ff) border-box',
                  WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  border: '3px solid rgba(0, 0, 0, 0)'
                }}
              ></div>
            </div>
            
            {/* 第二个模糊框 - 7px模糊 */}
            <div 
              className="absolute inset-0 rounded-[28px]"
              style={{ 
                filter: 'blur(7px)'
              }}
            >
              {/* 新的模糊渐变描边 */}
              <div 
                className="absolute inset-0 rounded-[28px]"
            style={{ 
              background: 'linear-gradient(41deg, #bb64ff, #f28, #ff8b00 28%, #f2416b, #e750de 60%, #0096ff, #bb64ff) border-box',
              WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
                  border: '8px solid rgba(0, 0, 0, 0)'
            }}
          ></div>
            </div>
          </div>
          
          {/* 内容 */}
          <div className="relative z-30 flex flex-col items-center justify-center h-full">
            {/* 图标 */}
            <div className="w-[76px] mb-[33px]">
              <Image 
                src="/images/intelligent/icon.png" 
                alt="Intelligent Icon" 
                width={76}
                height={76}
                style={{ objectFit: 'contain' }}
              />
            </div>
            
            {/* 标题 */}
            <h2 
              className="text-[80px] font-bold text-center whitespace-pre-line"
              style={{ 
                background: 'linear-gradient(97deg, #0096FF, #BB64FF 42%, #F2416B 74%, #EB7500)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '90px'
              }}
            >
              {locale === 'en' 
                ? 'With powerful technology\nhelp your business reach new heights' 
                : '以强大技术\n助你业务更上一层楼'}
            </h2>
            
            {/* 配文1 */}
            <p className="text-[17px] text-[#86868b] text-center my-[33px]">
              {locale === 'en' 
                ? 'Cross-border logistics full chain solution, making global trade smooth and unobstructed' 
                : '跨境物流全链路解决方案，让全球贸易畅通无阻'}
            </p>
            
            {/* 配文2 */}
            <p className="text-[21px] text-[#86868b] text-center max-w-[900px] px-4 whitespace-pre-line">
              {locale === 'en' 
                ? 'Helinguoji will implant a personalized intelligent system that can provide ' 
                : '和林国际将植入个人化智能系统，能根据你的个人使用习惯为你提供\n'}
              <span className="text-[#1d1d1f]">
                {locale === 'en' 
                  ? 'customized services, transparent services, and assistance in handling various affairs' 
                  : '定制化服务，透明化服务，处理各种事务'}
              </span>
              {locale === 'en' ? ', ' : '上提供协助，'}
              <span className="text-[#1d1d1f]">
                {locale === 'en' 
                  ? 'making everything simpler and easier.' 
                  : '让一切更简单轻松。'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntelligentSection; 