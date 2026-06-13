'use client';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion'
import { useViewportMotion } from './animationUtils'

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
  dataSourceType = 'manual',
  sectionAnimationType = 'fade',
  sectionAnimationDelay = '0.05',
  sectionAnimationDuration = '0.7'
}) => {
  const { sectionRef, motionProps } = useViewportMotion({
    animationType: sectionAnimationType,
    animationDelay: sectionAnimationDelay,
    animationDuration: sectionAnimationDuration,
    amount: 0.2
  })

  return (
    <motion.div ref={sectionRef} style={{backgroundColor: bgColor}} {...motionProps}>
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
    </motion.div>
  )
}

export default ProductSwiper