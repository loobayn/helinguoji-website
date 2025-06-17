import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface SocialModalProps {
  type: string;
  onClose: () => void;
  isClosing: boolean;
}

const SocialModal: React.FC<SocialModalProps> = ({ type, onClose, isClosing }) => {
  const router = useRouter();
  const { locale } = router;
  const modalRef = useRef<HTMLDivElement>(null);

  // Get modal content based on type
  const getModalContent = () => {
    let title = '';
    let qrCode = '';

    switch (type) {
      case 'wechat':
        title = locale === 'en' ? 'WeChat Scan' : '微信扫一扫';
        qrCode = '/images/header/qr_wechat.png';
        break;
      case 'line':
        title = locale === 'en' ? 'LINE Scan' : 'Line扫一扫';
        qrCode = '/images/header/qr_line.png';
        break;
      case 'whatsapp':
        title = locale === 'en' ? 'WhatsApp Scan' : 'Whatsapp扫一扫';
        qrCode = '/images/header/qr_whatsapp.png';
        break;
      case 'telegram':
        title = locale === 'en' ? 'Telegram Scan' : 'Telegram扫一扫';
        qrCode = '/images/header/qr_telegram.png';
        break;
      default:
        title = locale === 'en' ? 'Scan QR Code' : '扫一扫';
        qrCode = '/images/header/qr_wechat.png';
    }

    return { title, qrCode };
  };

  const { title, qrCode } = getModalContent();

  // Handle click inside modal to prevent propagation
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-container fixed inset-0 flex items-center justify-center" onClick={onClose}>
      <div 
        ref={modalRef}
        className={`w-[816px] h-390 bg-white rounded-[5px] flex items-center relative ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}
        onClick={handleModalClick}
        style={{
          animationFillMode: 'forwards'
        }}
      >
        <div 
          className="absolute top-5 right-5 w-9 h-9 bg-darkbutton rounded-full flex items-center justify-center cursor-pointer"
          onClick={onClose}
        >
          <div className="relative w-3 h-3">
            <span className="absolute w-[2px] h-3 bg-white transform rotate-45 top-0 left-1/2"></span>
            <span className="absolute w-[2px] h-3 bg-white transform -rotate-45 top-0 left-1/2"></span>
          </div>
        </div>

        {/* 内容区域，确保在关闭按钮下方 */}
        <div className="flex w-full pt-[60px] px-[76px] pb-[76px]">
          <div className="flex-1">
            <p className="text-base text-primary tracking-[0.025em]">
              {locale === 'en' 
                ? 'Whatever your needs, Helinguoji is happy to help you' 
                : '无论您有何需求，和林国际很乐意为您提供帮助'}
            </p>

            <h2 className="text-[56px] font-bold text-primary tracking-[0.025em] my-[24px_0_34px_0]">
              {title}
            </h2>

            <p className="text-base text-primary tracking-[0.025em]">
              {locale === 'en' 
                ? 'Monday to Saturday, 9am to 6pm (China Standard Time GMT+8)' 
                : '周一至周六，上午9点至晚上6点（中国标准时间GMT+8）'}
            </p>

            <Link href="/contact">
              <p className="text-base text-accent tracking-[0.025em] mt-[52px] cursor-pointer">
                {locale === 'en' ? 'More contact methods >' : '更多联系方式 >'}
              </p>
            </Link>
          </div>

          <div className="relative w-[242px] h-[242px] flex-shrink-0">
            <Image 
              src={qrCode} 
              alt={`${type} QR Code`} 
              fill 
              style={{ objectFit: 'contain' }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialModal; 