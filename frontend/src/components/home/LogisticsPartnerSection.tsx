import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const LogisticsPartnerSection: React.FC = () => {
  const router = useRouter();
  const { locale } = router;

  // Statistics data
  const stats = [
    {
      title: locale === 'en' ? 'Cumulative number of customers served' : '累计服务客户数',
      value: '89225'
    },
    {
      title: locale === 'en' ? 'Average annual container shipments' : '平均每年运送标箱量',
      value: '42806'
    },
    {
      title: locale === 'en' ? 'Average annual air freight tonnage' : '平均每年空运送吨量',
      value: '32680'
    }
  ];

  // Features data
  const features = [
    {
      title: locale === 'en' ? 'Full empowerment, worry-free and hassle-free.' : '全程赋能，省心省事。',
      description: locale === 'en' 
        ? 'From door-to-door pickup, customs declaration, to international transportation, overseas warehousing and delivery, Helinguoji opens up every link of cross-border for you, truly realizing one-stop logistics solution. One partner, handling all links.' 
        : '从上门提货、清关报关，到国际运输、海外仓储与派送，\n和林为您打通跨境每一环，真正实现物流一站式解决。\n一个合作方，搞定所有环节。'
    },
    {
      title: locale === 'en' ? 'Safety, cannot be compromised.' : '安全性，不容有失。',
      description: locale === 'en' 
        ? 'Every shipment is a trust, and Helinguoji protects it with rigorous processes and intelligent systems. Multiple security inspection mechanisms, real-time location tracking, automatic abnormal warning, keeping your goods under control and safe delivery. Not just doing our best, but ensuring no mistakes.' 
        : '每一票货物都是信任托付，和林用严谨流程与智能系统双重守护。\n多重安检机制、实时定位追踪、异常自动预警，让您的货物全程在控、安全到手。\n不是尽力而为，而是绝不出错。'
    }
  ];

  return (
    <section className="logistics-partner-section mt-[150px]">
      <div className="relative w-full">
        <Image 
          src="/images/logistics/logistics-partner.jpg" 
          alt="Logistics Partner" 
          width={1920}
          height={800}
          style={{ width: '100%', height: 'auto' }}
        />
        
      </div>
      
      {/* 移到图片下方的内容，使用1260px版心 */}
      <div className="max-w-[1260px] mx-auto mt-[130px]">
        <h2 className="text-[80px] font-bold text-primary mb-[130px]">
                {locale === 'en' ? 'Cross-border logistics good partner.' : '跨境物流好拍档。'}
              </h2>
              
        <div className="flex flex-col">
                {stats.map((stat, index) => (
            <div key={index} className="mb-[130px]">
                    <p className="text-[26px] font-bold text-primary">{stat.title}</p>
                    <p className="text-[120px] font-bold gradient-text">{stat.value}</p>
                  </div>
                ))}
              </div>
              
        <div className="flex relative mb-[150px]">
          {/* 左侧内容 */}
                     <div className="w-[439px] mr-[68px]">
             <h3 className="text-[26px] font-bold text-primary">{features[0].title}</h3>
             <div className="border-t border-[#cececf] mt-[41px] mb-[48px]"></div>
             <p className="text-[17px] text-primary whitespace-pre-line">{features[0].description}</p>
                  </div>
           
           {/* 右侧内容 */}
           <div className="flex-1 relative">
             <div className="absolute w-[840px] left-0">
               <h3 className="text-[26px] font-bold text-primary">{features[1].title}</h3>
               <div className="border-t border-[#cececf] mt-[41px] mb-[48px]"></div>
               <p className="text-[17px] text-primary whitespace-pre-line">{features[1].description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogisticsPartnerSection; 