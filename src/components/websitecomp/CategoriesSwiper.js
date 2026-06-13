'use client'

import React, { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import { motion, useAnimationControls, useInView } from 'framer-motion'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'


const ANIMATION_PRESETS = {
  none: {
    hidden: { opacity: 1 },
    visible: { opacity: 1 }
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0 }
  },
  slideRight: {
    hidden: { opacity: 0, x: -42 },
    visible: { opacity: 1, x: 0 }
  },
  slideLeft: {
    hidden: { opacity: 0, x: 42 },
    visible: { opacity: 1, x: 0 }
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1 }
  },
  blurUp: {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
  }
}

/**
 * کامپوننت دسته‌بندی‌های لغزنده
 * @param {String} title - عنوان بخش
 * @param {Array} categories - آرایه دسته‌بندی‌ها شامل {name, image}
 * @param {String} backgroundColor - رنگ زمینه
 */
const CategoriesSwiper = ({
  title = 'خرید بر اساس دسته‌بندی',
  categories = [
    {
      id: 1,
      name: 'طلا',
      image: '09a98a13c782e12a245930b4515d243b17734a33_1740299441.jpg'
    },
    {
      id: 2,
      name: 'مد و پوشاک',
      image: 'b3d4eaefebe67ab8d849296ea2e7e113cde8094c_1740299538.jpg'
    },
    {
      id: 3,
      name: 'آرایشی بهداشتی',
      image: '09a98a13c782e12a245930b4515d243b17734a33_1740299441.jpg'
    },
    {
      id: 4,
      name: 'لوازم خانگی برقی',
      image: '09a98a13c782e12a245930b4515d243b17734a33_1740299441.jpg'
    },
    {
      id: 5,
      name: 'خانه و آشپزخانه',
      image: '09a98a13c782e12a245930b4515d243b17734a33_1740299441.jpg'
    },
    {
      id: 6,
      name: 'گالی دیجیتال',
      image: '09a98a13c782e12a245930b4515d243b17734a33_1740299441.jpg'
    },
    {
      id: 7,
      name: 'لپ تاپ',
      image: '09a98a13c782e12a245930b4515d243b17734a33_1740299441.jpg'
    },
    {
      id: 8,
      name: 'موبایل',
      image: '09a98a13c782e12a245930b4515d243b17734a33_1740299441.jpg'
    },
    {
      id: 9,
      name: 'اسباب بازی، کودک و نوزاد',
      image: '09a98a13c782e12a245930b4515d243b17734a33_1740299441.jpg'
    },
    {
      id: 10,
      name: 'سوپر مارکت آنلاین',
      image: '09a98a13c782e12a245930b4515d243b17734a33_1740299441.jpg'
    },
    {
      id: 11,
      name: 'کالا هدیه و کیفیت کارت',
      image: '09a98a13c782e12a245930b4515d243b17734a33_1740299441.jpg'
    },
    {
      id: 12,
      name: 'ورزش و سفر',
      image: '09a98a13c782e12a245930b4515d243b17734a33_1740299441.jpg'
    },
    {
      id: 13,
      name: 'کتاب و هنر',
      image: '09a98a13c782e12a245930b4515d243b17734a33_1740299441.jpg'
    },
    {
      id: 14,
      name: 'ابزارات و تجهیزات',
      image: '09a98a13c782e12a245930b4515d243b17734a33_1740299441.jpg'
    },
    {
      id: 15,
      name: 'سلامت و پزشکی',
      image: '09a98a13c782e12a245930b4515d243b17734a33_1740299441.jpg'
    }
  ],
  backgroundColor = 'bg-white',
  bgColor = '#ffffff',
  largeTextColor = '#111827',
  smallTextColor = '#111827',
  autoplayDelay = '5',
  enableAutoplay = 'true',
  sectionAnimationType = 'fade',
  sectionAnimationDelay = '0.05',
  sectionAnimationDuration = '0.7',
  containerAnimationType = 'fade',
  containerAnimationDelay = '0.05',
  containerAnimationDuration = '0.65',
  titleAnimationType = 'slideUp',
  titleAnimationDelay = '0.14',
  titleAnimationDuration = '0.65',
  swiperAnimationType = 'slideUp',
  swiperAnimationDelay = '0.2',
  swiperAnimationDuration = '0.7',
  cardAnimationType = 'zoomIn',
  cardAnimationDelay = '0.12',
  cardAnimationDuration = '0.6',
  cardAnimationStagger = '0.06'
}) => {
  const autoplayDelayMs = (parseInt(autoplayDelay) || 5) * 1000
  const sectionRef = useRef(null)
  const animationControls = useAnimationControls()
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.25,
    margin: '0px 0px -10% 0px'
  })

  useEffect(() => {
    if (isInView) {
      animationControls.start('visible')
    }
  }, [isInView, animationControls])

  const parseTiming = (value, fallback) => {
    const parsed = Number.parseFloat(value)
    if (Number.isNaN(parsed)) return fallback
    return Math.max(0, parsed)
  }
  // تابع کمکی برای تبدیل URL تصویر
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/assets/images/test.png'
    if (imagePath.startsWith('http')) return imagePath
    return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${imagePath}`
  }

  const getMotionConfig = (type, delayValue, durationValue, extraDelay = 0) => {
    const preset = ANIMATION_PRESETS[type] || ANIMATION_PRESETS.fade
    return {
      initial: 'hidden',
      animate: animationControls,
      variants: preset,
      transition: {
        delay: parseTiming(delayValue, 0) + extraDelay,
        duration: parseTiming(durationValue, 0.75),
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const sectionMotion = getMotionConfig(sectionAnimationType, sectionAnimationDelay, sectionAnimationDuration)
  const containerMotion = getMotionConfig(containerAnimationType, containerAnimationDelay, containerAnimationDuration)
  const titleMotion = getMotionConfig(titleAnimationType, titleAnimationDelay, titleAnimationDuration)
  const swiperMotion = getMotionConfig(swiperAnimationType, swiperAnimationDelay, swiperAnimationDuration)
  const getCardMotion = (index) =>
    getMotionConfig(
      cardAnimationType,
      cardAnimationDelay,
      cardAnimationDuration,
      parseTiming(cardAnimationStagger, 0.06) * index
    )

  return (
    <motion.div ref={sectionRef} className="w-full py-8 md:py-12" style={{backgroundColor: bgColor}} {...sectionMotion}>
      <motion.div className="max-w-7xl mx-auto px-4 md:px-6" {...containerMotion}>
        {/* Title */}
        {title && (
          <motion.h2 className="text-2xl md:text-3xl danaBold mb-8 text-center md:text-right" style={{color: largeTextColor}} {...titleMotion}>
            {title}
          </motion.h2>
        )}

        {/* Categories Swiper */}
        <motion.div {...swiperMotion}>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            480: {
              slidesPerView: 3,
              spaceBetween: 12
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 16
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 20
            },
            1280: {
              slidesPerView: 8,
              spaceBetween: 20
            }
          }}
          navigation
          loop={categories.length > 8}
          autoplay={enableAutoplay === 'true' ? { delay: autoplayDelayMs, disableOnInteraction: false } : false}
          className="w-full"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={category.id}>
              <motion.div className="flex flex-col items-center text-center cursor-pointer group" {...getCardMotion(index)}>
                {/* Category Image */}
                <div className="w-full aspect-square bg-gray-100 rounded-full overflow-hidden mb-3 md:mb-4 flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                  {category.image && (
                    <img
                      src={getImageUrl(category.image)}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  )}
                </div>

                {/* Category Name */}
                <p className="text-xs md:text-sm danaMed text-gray-700 leading-relaxed line-clamp-2">
                  {category.name}
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default CategoriesSwiper


