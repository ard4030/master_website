'use client';
import React, { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { usePathname } from 'next/navigation';
import { motion, useAnimationControls, useInView } from 'framer-motion'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ViewPrice from '../global/other/ViewPrice';
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
 * کامپوننت محصولات لغزنده
 * @param {Array} data - آرایه محصولات سفارشی یا شناسه‌های دسته‌بندی
 * @param {String} dataSourceType - نوع منبع داده ('category', 'discounted', 'manual')
 * @param {String} title - عنوان بخش محصولات
 * @param {String} subtitle - زیرعنوان بخش محصولات
 */
const ProductSwp2 = ({ 
  data = null,
  dataSourceType = 'manual',
  title = 'برگر های خاص و خوشمزه',
  subtitle = 'محصولات منتخب ما برای شما',
  bgColor = '#ffffff',
  largeTextColor = '#111827',
  smallTextColor = '#6b7280',
  autoplayDelay = '5',
  enableAutoplay = 'true',
  sectionAnimationType = 'fade',
  sectionAnimationDelay = '0.05',
  sectionAnimationDuration = '0.7',
  sliderAnimationType = 'slideUp',
  sliderAnimationDelay = '0.15',
  sliderAnimationDuration = '0.7',
  cardAnimationType = 'zoomIn',
  cardAnimationDelay = '0.22',
  cardAnimationDuration = '0.62',
  cardAnimationStagger = '0.08'
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

  const getMotionConfig = (type, delayValue, durationValue, extraDelay = 0) => {
    const preset = ANIMATION_PRESETS[type] || ANIMATION_PRESETS.fade
    return {
      initial: 'hidden',
      animate: animationControls,
      variants: preset,
      transition: {
        delay: parseTiming(delayValue, 0) + extraDelay,
        duration: parseTiming(durationValue, 0.7),
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const sectionMotion = getMotionConfig(sectionAnimationType, sectionAnimationDelay, sectionAnimationDuration)
  const sliderMotion = getMotionConfig(sliderAnimationType, sliderAnimationDelay, sliderAnimationDuration)
  const getCardMotion = (index) =>
    getMotionConfig(
      cardAnimationType,
      cardAnimationDelay,
      cardAnimationDuration,
      parseTiming(cardAnimationStagger, 0.08) * index
    )

  const autoplayDelayMs = (parseInt(autoplayDelay) || 5) * 1000
  const pathName = usePathname()
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  // تابع کمکی برای تبدیل URL تصویر
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/assets/images/test.png'
    if (imagePath.startsWith('http')) return imagePath
    return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${imagePath}`
  }

  const sampleProducts = [
    {
      id: 1,
      price: '۸۹۹',
      name: 'برگر پلیشی خوشمزه',
      title: 'برگر پلیشی خوشمزه',
      description: 'برگر پلیشی محبوب و خوشمزه ما با کیفیت بسیار بالا و طعم فوق‌العاده برای شما و خانواده تهیه شده است. این محصول با بهترین مواد اولیه ساخته شده است.',
      image: '/assets/images/burger.jpg',
      mainImage: '/assets/images/burger.jpg',
      badge: 'محصول اصل'
    },
    {
      id: 2,
      price: '۱۲۹۹',
      name: 'پیتزای خوشمزه',
      title: 'پیتزای خوشمزه',
      description: 'پیتزای خوشمزه و مرغوب ما با بهترین مواد اولیه و دستور پخت سنتی برای رضایت شما تهیه می‌شود. طعم فوق‌العاده و کیفیت عالی در هر لقمه.',
      image: '/assets/images/pizza.jpg',
      mainImage: '/assets/images/pizza.jpg',
      badge: 'تازه روز'
    },
    {
      id: 3,
      price: '۱۵۹۹',
      name: 'پاستای لذیذ',
      title: 'پاستای لذیذ',
      description: 'پاستای سالم و لذیذ با سس خاص و مواد غذایی درجه یک برای تغذیه خاصی شما تهیه شده است. این غذای ایتالیایی را با طعم دلخواه تجربه کنید.',
      image: '/assets/images/pasta.jpg',
      mainImage: '/assets/images/pasta.jpg',
      badge: 'پریمیوم'
    },
  ];

  // منطق انتخاب محصولات بر اساس dataSourceType و data
  let products = sampleProducts;

  if (dataSourceType === 'manual' && data && Array.isArray(data) && data.length > 0) {
    // اگر دستی است و data آرایه‌ای از محصولات است
    if (typeof data[0] === 'object' && (data[0].id || data[0]._id)) {
      products = data
    }
  } else if (dataSourceType === 'category' && data && Array.isArray(data) && data.length > 0) {
    // اگر دسته‌بندی است و data آرایه‌ای از category ids است
    // می‌تونیم محصولات را فیلتر کنیم بر اساس دسته‌بندی
    // فعلا تمام محصولات را نمایش می‌دهی
    products = sampleProducts
  } else if (dataSourceType === 'discounted') {
    // محصولات با badge (تخفیفدار)
    products = sampleProducts.filter(p => p.badge)
  }

  if(pathName !== '/newsitebuilder') products = data || sampleProducts

  return (
    <motion.div ref={sectionRef} className="w-full py-10 px-10 dana" dir="rtl" style={{backgroundColor: bgColor}} {...sectionMotion}>
      <motion.div className="relative" {...sliderMotion}>
        {/* دکمه قبلی */}
        <button
          ref={prevRef}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 border border-gray-200 shadow flex items-center justify-center text-gray-600 hover:bg-black hover:text-white hover:border-black transition-all duration-200"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
        {/* دکمه بعدی */}
        <button
          ref={nextRef}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 border border-gray-200 shadow flex items-center justify-center text-gray-600 hover:bg-black hover:text-white hover:border-black transition-all duration-200"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current
            swiper.params.navigation.nextEl = nextRef.current
          }}
          loop={products.length >= 2}
          autoplay={enableAutoplay === 'true' ? { delay: autoplayDelayMs, disableOnInteraction: false } : false}
        >
          {products.map((product, index) => (
            <SwiperSlide key={product.id || product._id}>
              <motion.div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-14 px-10 md:px-20 py-10 md:py-14 bg-linear-to-br from-blue-50 via-yellow-50 to-orange-100 rounded-3xl min-h-80 md:min-h-96" dir="rtl" {...getCardMotion(index)}>
                {/* بخش متن */}
                <div className="flex flex-col justify-center flex-1 w-full md:w-auto">
                  {/* قیمت */}
                  <div className="flex items-baseline gap-1.5 mb-3">
                    <span className="text-3xl md:text-2xl font-bold tracking-tight leading-none" style={{color: smallTextColor}}>
                      {formatPrice(product.price)}
                      
                    </span>
                    <span className="text-xs font-light" style={{color: smallTextColor}}>تومان</span>
                  </div>
                  {/* خط جداکننده */}
                  <div className="w-8 h-0.5 bg-black/80 mb-3 rounded-full" />
                  {/* عنوان محصول */}
                  <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-3" style={{color: largeTextColor}}>
                    {product.name || product.title}
                  </h2>
                  {/* توضیحات */}
                  <p className="text-xs md:text-sm leading-relaxed max-w-xs mb-6 line-clamp-3" style={{color: smallTextColor}}>
                    {product.description || product.shortDescription || 'بدون توضیحات'}
                  </p>
                  {/* دکمه خرید */}
                  <Link href={product.href || `/product/${product.id || product._id}`}>
                    <button className="w-fit px-8 py-2.5 dana border border-black rounded-full bg-transparent text-sm font-bold text-gray-600 tracking-widest transition-all duration-300 hover:bg-black hover:text-white">
                      خرید کنید
                    </button>
                  </Link>
                </div>
                {/* بخش تصویر */}
                <div className="relative flex items-center justify-center flex-1 w-full md:w-auto h-56 md:h-80" dir="rtl">
                  {product.badge && (
                    <div className="absolute top-3 left-3 w-20 h-20 md:w-24 md:h-24 border-2 border-black rounded-full bg-white flex items-center justify-center font-bold text-xs text-black text-center p-2 z-10 shadow-md">
                      {product.badge}
                    </div>
                  )}
                  {(product.image || product.mainImage) && (
                    <Image
                      src={getImageUrl(product.mainImage || product.image)}
                      alt={product.name || product.title}
                      width={2000}
                      height={2000}
                      className="max-w-full max-h-full rounded-md object-contain"
                    />
                  )}
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </motion.div>
  )
}

export default ProductSwp2

