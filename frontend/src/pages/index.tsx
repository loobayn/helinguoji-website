import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import scroll animation hook
import { useScrollAnimation, getAnimationStyles } from '@/hooks/useScrollAnimation';

// Components for each section
import BannerSection from '@/components/home/BannerSection';
import ServicesSection from '@/components/home/ServicesSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import SmartSection from '@/components/home/SmartSection';
import IntelligentSection from '@/components/home/IntelligentSection';
import PlatformSection from '@/components/home/PlatformSection';
import LogisticsPartnerSection from '@/components/home/LogisticsPartnerSection';
import CaseStudiesSection from '@/components/home/CaseStudiesSection';
import BrandsSection from '@/components/home/BrandsSection';
import ContactSection from '@/components/home/ContactSection';
import ScrollAnimationWrapper from '@/components/ScrollAnimationWrapper';

export default function Home() {
  const { t } = useTranslation('common');
  
  return (
    <div className="homepage">
      {/* Banner Section - 无动画，作为首屏内容 */}
      <BannerSection />
      
      {/* Services Section */}
      <ScrollAnimationWrapper delay={0}>
      <ServicesSection />
      </ScrollAnimationWrapper>
      
      {/* Features Section */}
      <ScrollAnimationWrapper delay={100}>
      <FeaturesSection />
      </ScrollAnimationWrapper>
      
      {/* Smart Section */}
      <ScrollAnimationWrapper delay={0} animationType="slideLeft">
      <SmartSection />
      </ScrollAnimationWrapper>
      
      {/* Intelligent Section */}
      <ScrollAnimationWrapper delay={100} animationType="slideRight">
      <IntelligentSection />
      </ScrollAnimationWrapper>
      
      {/* Platform Section */}
      <ScrollAnimationWrapper delay={0} animationType="scale">
      <PlatformSection />
      </ScrollAnimationWrapper>
      
      {/* Logistics Partner Section */}
      <ScrollAnimationWrapper delay={150}>
      <LogisticsPartnerSection />
      </ScrollAnimationWrapper>
      
      {/* Case Studies Section */}
      <ScrollAnimationWrapper delay={0} animationType="slideLeft">
      <CaseStudiesSection />
      </ScrollAnimationWrapper>
      
      {/* Brands Section */}
      <ScrollAnimationWrapper delay={100}>
      <BrandsSection />
      </ScrollAnimationWrapper>
      
      {/* Contact Section */}
      <ScrollAnimationWrapper delay={200}>
      <ContactSection />
      </ScrollAnimationWrapper>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'zh', ['common'])),
    },
  };
}; 