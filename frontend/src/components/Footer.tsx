import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Footer: React.FC = () => {
  const router = useRouter();
  const { locale } = router;

  // Footer top section items
  const topSectionItems = [
    {
      title: locale === 'en' ? 'Logistics Solutions' : '物流解决方案',
      description: locale === 'en' ? 'One-stop global logistics services' : '一站式全球物流服务',
      link: '/services'
    },
    {
      title: locale === 'en' ? 'Tracking System' : '追踪系统',
      description: locale === 'en' ? 'Real-time cargo tracking' : '实时货物追踪',
      link: '/self-service'
    },
    {
      title: locale === 'en' ? 'Customer Service' : '客户服务',
      description: locale === 'en' ? '24/7 professional support' : '24小时专业支持',
      link: '/contact'
    }
  ];

  // Footer links
  const companyLinks = [
    { name: locale === 'en' ? 'Your global business reliable partner' : '您的全球生意的可靠伙伴', link: '/about' }
  ];

  const serviceLinks = [
    { name: locale === 'en' ? 'International Air Freight' : '国际空运', link: '/services/air' },
    { name: locale === 'en' ? 'International Sea Freight' : '国际海运', link: '/services/sea' },
    { name: locale === 'en' ? 'LCL Shipping' : '散货拼柜', link: '/services/lcl' },
    { name: locale === 'en' ? 'Customs Clearance' : '清关', link: '/services/customs' },
    { name: locale === 'en' ? 'Pickup Service' : '上门提货', link: '/services/pickup' },
    { name: locale === 'en' ? 'Insurance Service' : '保险业务', link: '/services/insurance' }
  ];

  const customerLinks = [
    { name: locale === 'en' ? 'Management System' : '管理系统', link: '/self-service' },
    { name: locale === 'en' ? 'Tracking System' : '查询系统', link: '/self-service' },
    { name: locale === 'en' ? 'Feedback & Suggestions' : '建议&反馈', link: '/self-service' }
  ];

  const contactLinks = [
    { name: locale === 'en' ? 'Phone: +86 13512345678' : '电话：+86 13512345678', link: '/contact' },
    { name: locale === 'en' ? 'Email: 123456789@qq.com' : '邮箱：123456789@qq.com', link: '/contact' },
    { name: locale === 'en' ? 'WhatsApp: +852 6237 4787' : 'WhatsApp：+852 6237 4787', link: '/contact' }
  ];

  return (
    <footer className="bg-lightbg">
      <div className="container-custom p-[15px]">
        {/* Top section with three columns */}
        <div className="bg-white rounded-[28px] px-[25px]">
          <div className="flex">
            {topSectionItems.map((item, index) => (
              <React.Fragment key={index}>
                <Link href={item.link} className="flex-1 py-[30px] px-[40px]">
                  <div className="flex justify-between items-center h-[60px]">
                    <div>
                      <h3 className="text-base text-primary">{item.title}</h3>
                      <p className="text-base" style={{ color: '#86868b' }}>{item.description}</p>
                    </div>
                    <div 
                      className="relative w-[6px] h-[13px] transition-colors duration-300 text-primary"
                    >
                      <div
                        className="absolute top-1/2 left-0 w-[6px] h-[6px] border-t-[1px] border-r-[1px] transform -translate-y-1/2 rotate-45 border-primary"
                      ></div>
                    </div>
                  </div>
                </Link>
                {index < topSectionItems.length - 1 && (
                  <div className="flex items-center">
                    <div className="w-[1px] h-[50px]" style={{ backgroundColor: '#cececf' }}></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="border-t border-divider"></div>

          {/* Footer main content */}
          <div className="flex pb-[50px] pt-[50px]">
            {/* Logo and copyright */}
            <div className="mr-[115px] w-[420px]">
              <div className="relative w-[420px] h-[180px] mb-4 flex items-center justify-center">
                <Image 
                  src="/images/footer/footer-logo.png" 
                  alt="和林国际物流" 
                  width={206}
                  height={0}
                  style={{ height: 'auto' }} 
                />
              </div>
              <p className="text-sm ml-[20px]" style={{ color: '#86868b', lineHeight: '30px' }}>
                Copyright 和林国际物流 . <br />
                技术支持：高鼎科技 <br />
                备案：粤ICP备19049740号
              </p>
            </div>

            {/* Footer links */}
            <div className="flex flex-1 justify-end mr-[120px]">
              {/* Company */}
              <div className="ml-[140px]">
                <h4 className="text-xl font-medium text-primary mb-4">
                  {locale === 'en' ? 'Helinguoji' : '和林国际'}
                </h4>
                <ul className="space-y-2">
                  {companyLinks.map((link, index) => (
                    <li key={index}>
                      <Link 
                        href={link.link} 
                        className="footer-link text-base transition-colors duration-300" 
                        style={{ color: '#86868b' }}
                        onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#1D1D1F'}
                        onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#86868b'}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div className="ml-[140px]">
                <h4 className="text-xl font-medium text-primary mb-4">
                  {locale === 'en' ? 'Services' : '业务范围'}
                </h4>
                <ul className="space-y-2">
                  {serviceLinks.map((link, index) => (
                    <li key={index}>
                      <Link 
                        href={link.link} 
                        className="footer-link text-base transition-colors duration-300" 
                        style={{ color: '#86868b' }}
                        onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#1D1D1F'}
                        onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#86868b'}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Customer Service */}
              <div className="ml-[140px]">
                <h4 className="text-xl font-medium text-primary mb-4">
                  {locale === 'en' ? 'Customer Service' : '顾客服务'}
                </h4>
                <ul className="space-y-2">
                  {customerLinks.map((link, index) => (
                    <li key={index}>
                      <Link 
                        href={link.link} 
                        className="footer-link text-base transition-colors duration-300" 
                        style={{ color: '#86868b' }}
                        onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#1D1D1F'}
                        onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#86868b'}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="ml-[140px]">
                <h4 className="text-xl font-medium text-primary mb-4">
                  {locale === 'en' ? 'Contact Us' : '联系我们'}
                </h4>
                <ul className="space-y-2">
                  {contactLinks.map((link, index) => (
                    <li key={index}>
                      <Link 
                        href={link.link} 
                        className="footer-link text-base transition-colors duration-300" 
                        style={{ color: '#86868b' }}
                        onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#1D1D1F'}
                        onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#86868b'}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 