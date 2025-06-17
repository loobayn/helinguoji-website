import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface ContactModalProps {
  onClose: () => void;
  onSocialClick: (type: string) => void;
  isClosing: boolean;
}

const ContactModal: React.FC<ContactModalProps> = ({ onClose, onSocialClick, isClosing }) => {
  const router = useRouter();
  const { locale } = router;
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalHeight, setModalHeight] = useState('calc(100vh - 26px)');

  // 计算模态框高度，与MenuModal保持一致
  useEffect(() => {
    const updateHeight = () => {
      const windowHeight = window.innerHeight;
      setModalHeight(`${windowHeight - 26}px`);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const contactItems = [
    {
      icon: '/images/icons/icon-wechat.png',
      text: locale === 'en' ? 'WeChat Contact Us' : '微信 联系我们',
      type: 'wechat'
    },
    {
      icon: '/images/icons/icon-line.png',
      text: locale === 'en' ? 'LINE Contact Us' : 'LINE 联系我们',
      type: 'line'
    },
    {
      icon: '/images/icons/icon-whatsapp.png',
      text: locale === 'en' ? 'WHATSAPP Contact Us' : 'WHATSAPP 联系我们',
      type: 'whatsapp'
    },
    {
      icon: '/images/icons/icon-twitter.png',
      text: locale === 'en' ? 'Twitter Contact Us' : 'Twitter 联系我们',
      type: 'telegram'
    },
    {
      icon: '/images/icons/icon-email.png',
      text: locale === 'en' ? 'Message Us 123456789@qq.com' : '给我们留言 123456789@qq.com',
      type: 'email'
    },
    {
      icon: '/images/icons/icon-phone.png',
      text: locale === 'en' ? 'Call Us +86 13512345678' : '致电我们 +86 13512345678',
      type: 'phone'
    }
  ];

  return (
    <div 
      ref={modalRef}
      className={`fixed bg-white z-50 m-[0_13px_13px_0] p-[0_0_0_38px] ${
        isClosing ? 'animate-slideOutRight' : 'animate-slideInRight'
      } rounded-[5px] overflow-y-auto overflow-x-hidden`}
      style={{
        height: modalHeight,
        width: '500px',
        top: '13px',
        right: '0',
        animationFillMode: 'forwards'
      }}
    >
      <div 
        className="absolute top-[13px] right-[13px] w-12 h-12 bg-darkbutton rounded-full flex items-center justify-center cursor-pointer"
        onClick={onClose}
      >
        <div className="relative w-[14px] h-[14px]">
          <span className="absolute w-[1px] h-[14px] bg-white transform rotate-45 top-0 left-1/2"></span>
          <span className="absolute w-[1px] h-[14px] bg-white transform -rotate-45 top-0 left-1/2"></span>
        </div>
      </div>

      <div className="pt-[50px]">
        <h2 className="text-2xl font-bold text-primary tracking-[0.1em]">
          {locale === 'en' ? 'Contact Us' : '联系我们'}
        </h2>

        <p className="text-base text-primary tracking-[0.025em] mt-[38px]">
          {locale === 'en' 
            ? 'Whatever your needs, Helinguoji consultants are happy to help you' 
            : '无论您有何需求，和林国际咨询顾问都很乐意为您提供帮助'}
        </p>

        <div className="mt-[50px] space-y-[50px]">
          {contactItems.map((item, index) => (
            <div 
              key={index}
              className="flex items-center cursor-pointer"
              onClick={() => {
                if (['wechat', 'line', 'whatsapp', 'telegram'].includes(item.type)) {
                  onSocialClick(item.type);
                }
              }}
            >
              <div className="relative w-5 h-5 mr-[14px]">
                <Image
                  src={item.icon}
                  alt={item.type}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <span className="text-primary font-bold underline tracking-[0.05em]">
                {item.text}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-divider mt-[55px]"></div>

        <p className="text-base text-primary my-[28px] whitespace-pre-line">
          {locale === 'en' 
            ? 'Monday to Saturday, 9am to 6pm\n(China Standard Time GMT+8)' 
            : '周一至周六，上午9点至晚上6点\n（中国标准时间GMT+8）'}
        </p>

        <div className="border-t border-divider"></div>

        <p className="text-base font-bold text-primary mt-[44px]">
          {locale === 'en' ? 'Do you need further assistance?' : '您需要进一步帮助吗？'}
        </p>

        <Link href="/contact">
          <p className="text-lg font-bold text-primary mt-[38px] cursor-pointer underline">
            {locale === 'en' ? 'Contact Us' : '联系我们'}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ContactModal; 