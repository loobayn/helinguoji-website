import React from 'react';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';

const BrandsSection: React.FC = () => {
  const router = useRouter();
  const { locale } = router;

  // Brand logos
  const brands = [
    { image: '/images/brands/brand-1.png', name: 'DHL' },
    { image: '/images/brands/brand-2.png', name: 'YANG MING' },
    { image: '/images/brands/brand-3.png', name: 'SITC' },
    { image: '/images/brands/brand-4.png', name: 'MAERSK' },
    { image: '/images/brands/brand-5.png', name: 'HangKong' },
    { image: '/images/brands/brand-6.png', name: 'Brand 6' },
    { image: '/images/brands/brand-7.png', name: 'Brand 7' },
    { image: '/images/brands/brand-8.png', name: 'Brand 8' },
    { image: '/images/brands/brand-9.png', name: 'Brand 9' },
    { image: '/images/brands/brand-10.png', name: 'Brand 10' },
  ];

  return (
    <section className="container-custom mb-[150px]">
      <Swiper
        slidesPerView="auto"
        spaceBetween={20}
        loop={true}
        loopAdditionalSlides={3}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        modules={[Autoplay]}
        className="brands-swiper"
        style={{
          overflow: 'visible'
        }}
      >
        {brands.map((brand, index) => (
          <SwiperSlide key={index} style={{ width: 'auto' }}>
            <div className="relative h-[57px] w-auto mr-[50px]">
              <Image 
                src={brand.image} 
                alt={brand.name} 
                height={57}
                width={120}
                style={{ objectFit: 'contain', height: '57px', width: 'auto' }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BrandsSection; 