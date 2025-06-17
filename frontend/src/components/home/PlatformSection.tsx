import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const PlatformSection: React.FC = () => {
  const router = useRouter();
  const { locale } = router;

  return (
    <section className="overflow-visible">
      <div className="container-custom overflow-visible">
        <div className="max-w-[1260px] mx-auto overflow-visible relative">
        <h2 className="text-[80px] font-bold text-primary whitespace-pre-line" style={{ lineHeight: '90px' }}>
          {locale === 'en' 
            ? 'Carefully designed,\nbringing changes everywhere.' 
            : '精心设计，\n处处带来改变。'}
        </h2>
        
        <p className="text-[17px] text-primary mt-[30px] mb-[150px] max-w-[800px]">
          {locale === 'en' 
            ? 'What you value is equally important to Helinguoji. We will continuously develop new features to help users solve problems, strengthen control over personal data, and create various built-in auxiliary functions to make it more convenient for users.' 
            : '你所看重的，对和林国际同样事关重大。我们会不断开发新功能，以帮助用户解决问题，助你加强对个人数据的掌控；并打造各种内置辅助功能，让用户更便捷的使用。'}
        </p>
        
        <div className="flex relative" style={{ overflow: 'visible', width: '100vw', marginLeft: 'calc(50% - 50vw)' }}>
          <div style={{ width: 'calc(50vw - 630px)', minWidth: '0' }}></div>
          {/* 左侧区域 */}
          <div className="w-[439px] mr-[68px] flex-shrink-0">
            <div className="relative w-[439px] h-[895px]">
            <Image 
              src="/images/platform/platform-mobile.png" 
              alt="Mobile Platform" 
              fill
              style={{ objectFit: 'contain' }}
            />
        </div>
        
        <div className="mt-[100px]">
              <h3 className="text-[26px] font-bold text-primary whitespace-pre-line">
              {locale === 'en' 
                ? 'Intelligent driven logistics,\ninnovative connecting the world.' 
                  : '智能驱动物流，创新连接世界。'}
            </h3>
              
              <div className="border-t border-[#cececf] mt-[41px] mb-[48px]"></div>
              
              <p className="text-[17px] text-primary max-w-[800px] whitespace-pre-line">
                {locale === 'en' 
                  ? 'Helinguoji reshapes traditional logistics with technology. Systematic management + AI algorithm enhancement accelerates every response to shipping needs, speeding up cross-border efficiency and upgrading customer experience.' 
                  : '和林用科技重塑传统物流。\n系统化管理+AI算法加持，加速每一次响应出货需求，为跨境效率提速，为客户体验升级。'}
              </p>
            </div>
          </div>
          
          {/* 右侧区域 - 与左侧相邻布局 */}
          <div className="flex-1 relative min-h-[995px]" style={{ overflow: 'visible' }}>
            {/* 桌面图片 - 高度895px，宽度按比例缩放，允许超出 */}
            <div className="absolute top-0 left-0">
              <img 
                src="/images/platform/platform-desktop.png" 
                alt="Desktop Platform" 
                style={{ 
                  height: '895px',
                  width: 'auto'
                }}
                className="block"
              />
        </div>
        
            <div className="absolute w-[840px] top-[995px] left-0">
          <h3 className="text-[26px] font-bold text-primary">
            {locale === 'en' 
              ? '24-hour dynamic synchronization, control the entire transportation process.' 
              : '24小时动态同步，掌控运输全流程。'}
          </h3>
          
              <div className="border-t border-[#cececf] mt-[41px] mb-[48px]"></div>
          
              <p className="text-[17px] text-primary max-w-[800px] whitespace-pre-line">
            {locale === 'en' 
              ? 'Whether it\'s the starting point or the destination, every transportation trajectory is under control. Real-time location updates, abnormal reminders, signature confirmation... keep your package always in sight, safe and verifiable. Because visibility brings peace of mind.' 
                  : '无论是起点还是终点，每一段运输轨迹都在掌握之中。\n实时位置更新、异常提醒、签收确认……让您的包裹始终在视线内，安全有据可依。\n因为看得见，才更安心。'}
          </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformSection; 