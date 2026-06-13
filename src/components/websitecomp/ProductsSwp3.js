'use client';
import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { usePathname } from 'next/navigation';
import { motion, useAnimationControls, useInView } from 'framer-motion'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { formatPrice } from '@/utils/functions';

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
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 }
  },
  slideRight: {
    hidden: { opacity: 0, x: -36 },
    visible: { opacity: 1, x: 0 }
  },
  slideLeft: {
    hidden: { opacity: 0, x: 36 },
    visible: { opacity: 1, x: 0 }
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 }
  },
  blurUp: {
    hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
  }
}

/**
 * کامپوننت محصولات لغزنده - استایل 3
 * @param {Array} data - آرایه محصولات سفارشی یا شناسه‌های دسته‌بندی
 * @param {String} dataSourceType - نوع منبع داده ('category', 'discounted', 'manual')
 * @param {String} title - عنوان بخش محصولات
 * @param {String} subtitle - زیرعنوان بخش محصولات
 * @param {String} description - توضیحات بخش
 */
const ProductsSwp3 = ({ 
  bgColor = '#1f2937',
  largeTextColor = '#111827',
  smallTextColor = '#6b7280',
  autoplayDelay = '5',
  enableAutoplay = 'true',
  data = null,
  dataSourceType = 'manual',
  title = 'بازار هفتر',
  subtitle = 'فروش ویژه پاییزه',
  description = 'بازار خرید و فروش هنر دستساخته ها و اشیای ارزشمند',
  sectionAnimationType = 'fade',
  sectionAnimationDelay = '0.05',
  sectionAnimationDuration = '0.7',
  contentAnimationType = 'slideRight',
  contentAnimationDelay = '0.18',
  contentAnimationDuration = '0.75',
  imageAnimationType = 'slideLeft',
  imageAnimationDelay = '0.2',
  imageAnimationDuration = '0.75',
  sliderAnimationType = 'blurUp',
  sliderAnimationDelay = '0.28',
  sliderAnimationDuration = '0.7'
}) => {
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

  const getMotionConfig = (type, delayValue, durationValue) => {
    const preset = ANIMATION_PRESETS[type] || ANIMATION_PRESETS.fade
    return {
      initial: 'hidden',
      animate: animationControls,
      variants: preset,
      transition: {
        delay: parseTiming(delayValue, 0),
        duration: parseTiming(durationValue, 0.7),
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const sectionMotion = getMotionConfig(sectionAnimationType, sectionAnimationDelay, sectionAnimationDuration)
  const contentMotion = getMotionConfig(contentAnimationType, contentAnimationDelay, contentAnimationDuration)
  const imageMotion = getMotionConfig(imageAnimationType, imageAnimationDelay, imageAnimationDuration)
  const sliderMotion = getMotionConfig(sliderAnimationType, sliderAnimationDelay, sliderAnimationDuration)

  const autoplayDelayMs = enableAutoplay === 'true' ? (parseInt(autoplayDelay) || 5) * 1000 : 0
  const pathName = usePathname()
  const [activeMainSlide, setActiveMainSlide] = useState(0)
  const [selectedProductIndex, setSelectedProductIndex] = useState(0)

  // تابع کمکی برای تبدیل URL تصویر
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/assets/images/test.png'
    if (imagePath.startsWith('http')) return imagePath
    return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${imagePath}`
  }

  const sampleProducts = [
    {
      id: 1,
      price: '۲۵۰۰۰',
      name: 'مسوری زائیه',
      title: 'مسوری زائیه',
      description: 'آثار هنری منحصربه‌فرد و زیبا',
      image: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=400&h=400&fit=crop',
      mainImage: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=400&h=400&fit=crop',
      badge: false
    },
    {
      id: 2,
      price: '۳۰۰۰۰',
      name: 'مسوری زائیه',
      title: 'مسوری زائیه',
      description: 'آثار هنری منحصربه‌فرد و زیبا',
      image: 'https://images.unsplash.com/photo-1577720643272-265f434e0521?w=400&h=400&fit=crop',
      mainImage: 'https://images.unsplash.com/photo-1577720643272-265f434e0521?w=400&h=400&fit=crop',
      badge: false
    },
    {
      id: 3,
      price: '۲۰۰۰۰',
      name: 'مسوری زائیه',
      title: 'مسوری زائیه',
      description: 'آثار هنری منحصربه‌فرد و زیبا',
      image: 'https://images.unsplash.com/photo-1578898657634-0ecd72b84b8c?w=400&h=400&fit=crop',
      mainImage: 'https://images.unsplash.com/photo-1578898657634-0ecd72b84b8c?w=400&h=400&fit=crop',
      badge: false
    },
    {
      id: 4,
      price: '۲۸۰۰۰',
      name: 'مسوری زائیه',
      title: 'مسوری زائیه',
      description: 'آثار هنری منحصربه‌فرد و زیبا',
      image: 'https://images.unsplash.com/photo-1577720643273-265f434e0521?w=400&h=400&fit=crop',
      mainImage: 'https://images.unsplash.com/photo-1577720643273-265f434e0521?w=400&h=400&fit=crop',
      badge: false
    },
    {
      id: 5,
      price: '۳۲۰۰۰',
      name: 'مسوری زائیه',
      title: 'مسوری زائیه',
      description: 'آثار هنری منحصربه‌فرد و زیبا',
      image: 'https://images.unsplash.com/photo-1578301978162-7aae4d755743?w=400&h=400&fit=crop',
      mainImage: 'https://images.unsplash.com/photo-1578301978162-7aae4d755743?w=400&h=400&fit=crop',
      badge: false
    },
  ];

  // منطق انتخاب محصولات بر اساس dataSourceType و data
  let products = sampleProducts;

  if (dataSourceType === 'manual' && data && Array.isArray(data) && data.length > 0) {
    if (typeof data[0] === 'object' && (data[0].id || data[0]._id)) {
      products = data
    }
  } else if (dataSourceType === 'category' && data && Array.isArray(data) && data.length > 0) {
    products = sampleProducts
  } else if (dataSourceType === 'discounted') {
    products = sampleProducts.filter(p => p.badge)
  }

  if(pathName !== '/newsitebuilder') products = data || sampleProducts

  const selectedProduct = products[selectedProductIndex];

  const handleProductClick = (index) => {
    setSelectedProductIndex(index);
  };

  return (
    <motion.div ref={sectionRef} style={{backgroundColor:bgColor}} className="w-full overflow-hidden dana" {...sectionMotion}>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="py-12 md:py-20 px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-6">
            {/* Left Content */}
            <motion.div className="flex flex-col justify-center space-y-6 text-right order-2 lg:order-1" dir="rtl" {...contentMotion}>
              <div className="text-sm tracking-wider" style={{color: smallTextColor}}>
                {subtitle}
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold leading-tight" style={{color: largeTextColor}}>
                {selectedProduct?.title || title}
              </h1>
              
              <p className="text-base leading-relaxed max-w-md" style={{color: smallTextColor}}>
                {selectedProduct?.description || description}
              </p>

              <div className="flex items-center gap-6 pt-4">
                <button className="px-6 py-2 rounded-full border-2 border-blue-600 bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <span>ثبت سفارش</span>
                  <span>←</span>
                </button>
                {selectedProduct?.price && (
                  <div className=" dana">
                    <span className="text-3xl md:text-2xl font-bold tracking-tight leading-none" style={{color: smallTextColor}}>
                      {formatPrice(selectedProduct.price)}
                    </span>
                    <span className="text-xs font-light" style={{color: smallTextColor}}>تومان</span>
                  </div>
                )}
              </div>

              {/* Decorative dots */}
              <div className="flex items-center gap-3 pt-4">
                <span className="text-gray-300">•</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-300">•</span>
              </div>
            </motion.div>

            {/* Right Content - Hero Image */}
            <motion.div className="flex justify-center items-center order-1 lg:order-2 relative h-96 md:h-full" {...imageMotion}>
              {selectedProduct && (selectedProduct.image || selectedProduct.mainImage) && (
                <img 
                  src={getImageUrl(selectedProduct.mainImage || selectedProduct.image)} 
                  alt={selectedProduct.name || selectedProduct.title} 
                  className="w-full h-full object-contain transition-all duration-300"
                />
              )}
            </motion.div>
          </div>

          {/* Products Grid Below */}
          <motion.div className="" {...sliderMotion}>
            <div className="text-right mb-8 text-sm" dir="rtl" style={{color: smallTextColor}}>محصولات مشابه</div>
            
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={3}
              breakpoints={{
                640: { slidesPerView: 4 },
                1024: { slidesPerView: 5 }
              }}
              navigation
              loop={products.length >= 6}
              autoplay={enableAutoplay === 'true' ? { delay: autoplayDelayMs, disableOnInteraction: false } : false}
              className="w-full"
            >
              {products.map((product, index) => (
                <SwiperSlide key={product.id || product._id}>
                  <div 
                    onClick={() => handleProductClick(index)}
                    className={`flex flex-col items-center text-center cursor-pointer transition-all duration-300 rounded-lg p-3 ${selectedProductIndex === index ? 'bg-blue-50 border-2 border-blue-500' : 'border-2 border-transparent hover:bg-gray-50'}`}
                    dir="rtl"
                  >
                    {/* Product Image */}
                    <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                      {(product.image || product.mainImage) && (
                        <img
                          src={getImageUrl(product.mainImage || product.image)}
                          alt={product.name || product.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>

                    {/* Product Info */}
                    <h3 className="text-sm font-semibold mb-2" style={{color: largeTextColor}}>
                      {product.name || product.title}
                    </h3>

                    <p className="text-xs text-gray-600 mb-2">
                      —
                    </p>

                    <p
                      className={`text-xs ${selectedProductIndex === index ? 'text-blue-600 font-semibold' : ''}`}
                      style={selectedProductIndex !== index ? {color: smallTextColor} : {}}
                    >
                      {product.price ? parseInt(product.price).toLocaleString('fa-IR') : '۰'} تومان
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductsSwp3

