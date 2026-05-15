'use client';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
const ProductSwiper = ({
  bgColor = '#ffffff',
  largeTextColor = '#111827',
  smallTextColor = '#6b7280',
  autoplayDelay = '5',
  title = 'محصولات',
  subtitle = 'محصولات منتخب',
  data = null,
  dataSourceType = 'manual'
}) => {
  return (
    <div style={{backgroundColor: bgColor}}>
        <div className='swiperParent'>
            <Swiper
                spaceBetween={50}
                slidesPerView={3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                >
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                </Swiper>
        </div>
    </div>
  )
}

export default ProductSwiper