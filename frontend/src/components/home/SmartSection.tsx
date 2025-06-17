import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const SmartSection: React.FC = () => {
  const router = useRouter();
  const { locale } = router;

  return (
    <section className="w-full relative">
      <div 
        className="w-full h-auto bg-cover bg-center"
        style={{ backgroundImage: `url('/images/smart/smart-platform.jpg')` }}
      >
        <img 
          src="/images/smart/smart-platform.jpg" 
          alt="Smart Platform" 
          className="w-full h-auto invisible" // Used for proper sizing
        />
        
        <div className="absolute inset-0 flex flex-col">
          {/* First content block */}
          <div className="ml-[118px] mt-[142px] text-white">
            <h2 className="text-[80px] font-bold mb-[30px] whitespace-pre-line" style={{ lineHeight: '90px' }}>
                {locale === 'en' 
                  ? 'Your global business, a good partner for cross-border logistics.' 
                : '您的全球生意，\n跨境物流的好拍档。'}
            </h2>
            
            <p className="text-[17px] max-w-[800px] whitespace-pre-line" style={{ lineHeight: '30px' }}>
              {locale === 'en' 
                ? 'We are not just transporters, but strategic collaborators of your supply chain. From first-mile collection to last-mile delivery, from data visibility to risk coverage, with technology as the spear and service as the shield, we help you penetrate the cross-border fog and win globally!' 
                : '我们不仅是运输者，更是您供应链的战略协作者。\n从首公里揽收到最后一公里配送，从数据可视到风险兜底，\n以技术为矛，以服务为盾，助您穿透跨境迷雾，赢在全球！'}
            </p>
            
            <Link href="/self-service">
              <p className="text-[17px] underline mt-4 cursor-pointer">
                {locale === 'en' ? 'Consult now to get an exclusive logistics partner.' : '即刻咨询，获取专属物伙伴。'}
              </p>
            </Link>
          </div>
          </div>
          
        {/* Second content block - positioned at bottom with 150px from bottom, centered in 1260px container */}
        <div className="absolute bottom-[150px] left-1/2 transform -translate-x-1/2 w-full max-w-[1260px]">
          <div className="text-white px-4">
            <h2 className="text-[56px] font-bold mb-[30px] whitespace-pre-line" style={{ lineHeight: '66px' }}>
                {locale === 'en' 
                  ? 'Intelligent service: full chain controllability, transparent service.' 
                : '智能化服务:\n全链路可控，透明化服务。'}
            </h2>
            
            <p className="text-[17px] max-w-[800px] whitespace-pre-line" style={{ lineHeight: '30px' }}>
              {locale === 'en' 
                ? 'Blockchain visualization tracking real-time monitors cargo location and customs clearance status, with automatic warning for abnormal situations, reducing cargo damage rate to below 0.1%. The intelligent customs clearance engine integrates a database of 300+ national customs rules, and the "BC same warehouse" mode in Ningbo bonded warehouse achieves 30-minute express customs clearance, avoiding policy fluctuation risks.' 
                : '区块链可视化追踪\n实时监控货物位置及清关状态，异常情况自动预警，货损率降至0.1%以下。\n智能通关引擎\n集成300+国海关规则数据库，宁波保税仓"BC同仓"模式实现30分钟极速清关，规避政策波动风险。'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartSection; 