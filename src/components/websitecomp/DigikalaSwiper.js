'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useAnimationControls, useInView } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'

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
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
  }
}

const DigikalaSwiper = ({
  data = null,
  dataSourceType = 'manual',
  title = 'برترین های کاسیو',
  viewAllText = 'مشاهده همه',
  viewAllLink = '#',
  bgColor = '#ffffff',
  largeTextColor = '#111827',
  smallTextColor = '#111827',
  autoplayDelay = '5',
  enableAutoplay = 'true',
  cardAnimationType = 'fade',
  cardAnimationDelay = '0',
  cardAnimationDuration = '0.5',
  headerAnimationType = 'slideUp',
  headerAnimationDelay = '0.1',
  headerAnimationDuration = '0.65',
  titleAnimationType = 'slideRight',
  titleAnimationDelay = '0.2',
  titleAnimationDuration = '0.7',
  viewAllAnimationType = 'slideLeft',
  viewAllAnimationDelay = '0.25',
  viewAllAnimationDuration = '0.7',
  swiperAnimationType = 'fade',
  swiperAnimationDelay = '0.3',
  swiperAnimationDuration = '0.8',
  navAnimationType = 'zoomIn',
  navAnimationDelay = '0.4',
  navAnimationDuration = '0.65'
}) => {
  const autoplayDelayMs = (parseInt(autoplayDelay) || 5) * 1000
  const pathName = usePathname()
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef(null)
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const swiperRef = useRef(null)
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

  const getImageUrl = (imagePath) => {
    if (!imagePath) return ''
    if (String(imagePath).startsWith('http')) return imagePath
    return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${imagePath}`
  }

  const sampleProducts = useMemo(
    () => [
      {
        id: 1,
        name: 'ساعت مچی دیجیتال کاسیو مدل A700WEVG-9ADF',
        image:
          '8a30c904ea07e074b57dd361030872c8465731a9_1653250408.webp',
        price: 12497000,
        oldPrice: 15240000,
        discountPercent: 18,
        badgeText: 'پیشنهاد شگفت‌انگیز',
        shippingText: 'ارسال سریع',
        rating: 4.6,
        ratingCount: 12
      },
      {
        id: 2,
        name: 'ساعت مچی دیجیتال مردانه کاسیو مدل G-B001MVB-8DR',
        image:
          '77c6fef632053dfb55688d83f45c5c30fcff5ec0_1716454946.webp',
        price: 38984000,
        oldPrice: 48990000,
        discountPercent: 20,
        badgeText: 'فروش ویژه',
        shippingText: 'ارسال سریع',
        rating: 4.3,
        ratingCount: 5
      },
      {
        id: 3,
        name: 'ساعت مچی عقربه‌ای مردانه کاسیو مدل EQB-2000DB-1ADR',
        image:
          'ae59fab854669a4975c4a390f37899489c2c99c7_1722847338.webp',
        price: 87996000,
        oldPrice: 109995000,
        discountPercent: 20,
        badgeText: 'فروش ویژه',
        shippingText: 'ارسال سریع',
        rating: 4.8,
        ratingCount: 4
      },
      {
        id: 4,
        name: 'ساعت مچی دیجیتال مردانه کاسیو مدل GPR-H1000-9DR',
        image:
          'b2d0a98d0c0a42c9af5645136fe0cfc0b47263d9_1731491794.webp',
        price: 110624000,
        oldPrice: 138280000,
        discountPercent: 20,
        badgeText: 'فروش ویژه',
        shippingText: 'ارسال سریع',
        rating: 4.0,
        ratingCount: 2
      },
      {
        id: 5,
        name: 'ساعت مچی عقربه‌ای مردانه کاسیو مدل GST-B100D-1A',
        image:
          '6d019e9e2a70a740853bc4159c687f587ff85342_1758982163.webp',
        price: 79200000,
        oldPrice: 99000000,
        discountPercent: 20,
        badgeText: 'فروش ویژه',
        shippingText: 'ارسال سریع',
        rating: 4.8,
        ratingCount: 4
      },
      {
        id: 6,
        name: 'ساعت مچی دیجیتال مردانه کاسیو مدل GBD-H2000-1ADR',
        image:
          '6d019e9e2a70a740853bc4159c687f587ff85342_1758982163.webp',
        price: 87912000,
        oldPrice: 109890000,
        discountPercent: 20,
        badgeText: 'فروش ویژه',
        shippingText: 'ارسال سریع',
        rating: 4.5,
        ratingCount: 1
      },
      {
        id: 7,
        name: 'ساعت مچی دیجیتال کاسیو مدل A168WG-9WDF',
        image:
          '6d019e9e2a70a740853bc4159c687f587ff85342_1758982163.webp',
        price: 15450000,
        oldPrice: 19312500,
        discountPercent: 20,
        badgeText: 'فروش ویژه',
        shippingText: 'ارسال سریع',
        rating: 4.7,
        ratingCount: 9
      }
    ],
    []
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  let products = sampleProducts
  if (dataSourceType === 'manual' && Array.isArray(data) && data.length > 0) {
    if (typeof data[0] === 'object' && (data[0].id || data[0]._id)) {
      products = data
    }
  } else if (dataSourceType === 'category' && Array.isArray(data) && data.length > 0) {
    products = sampleProducts
  } else if (dataSourceType === 'discounted') {
    products = sampleProducts.filter((p) => p.discountPercent)
  }

  // خارج از سایت‌بیلدر، اگر دیتا آماده پاس داده شد همان را نمایش بده
  // نکته: برای جلوگیری از hydration mismatch، این شرط را فقط بعد از mount اعمال می‌کنیم.
  if (mounted && pathName !== '/newsitebuilder' && Array.isArray(data) && data.length > 0) {
    products = data
  }

  useEffect(() => {
    const swiper = swiperRef.current
    if (!swiper || !prevRef.current || !nextRef.current) return

    swiper.params.navigation.prevEl = prevRef.current
    swiper.params.navigation.nextEl = nextRef.current

    if (swiper.navigation) {
      swiper.navigation.destroy()
      swiper.navigation.init()
      swiper.navigation.update()
    }
  }, [products.length])

  const normalizeDigitsToEn = (raw) => {
    if (raw === null || raw === undefined) return ''
    return String(raw)
      .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
      .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
  }

  const parseNumberish = (value) => {
    if (value === null || value === undefined) return null
    if (typeof value === 'number') return Number.isFinite(value) ? value : null
    const cleaned = normalizeDigitsToEn(value)
      .replace(/[,٬\s]/g, '')
      .trim()
    if (!cleaned) return null
    const num = Number(cleaned)
    return Number.isFinite(num) ? num : null
  }

  const addCommas = (numStr) => {
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const toPersianDigits = (raw) => {
    return String(raw).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])
  }

  const formatNumberFa = (value) => {
    const num = parseNumberish(value)
    if (num === null) return value === null || value === undefined ? '' : String(value)

    const sign = num < 0 ? '-' : ''
    const abs = Math.abs(num)

    // keep up to one decimal for ratings; otherwise integer formatting
    const hasDecimal = !Number.isInteger(abs)
    const fixed = hasDecimal ? abs.toFixed(1) : String(Math.trunc(abs))
    const [intPart, decPart] = fixed.split('.')
    const withCommas = addCommas(intPart)
    const joined = decPart ? `${withCommas}.${decPart}` : withCommas
    return toPersianDigits(`${sign}${joined}`)
  }

  const renderLink = (href, className, children, ariaLabel) => {
    if (!href) return <span className={className}>{children}</span>
    if (String(href).startsWith('/')) {
      return (
        <Link href={href} className={className} aria-label={ariaLabel}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} className={className} aria-label={ariaLabel}>
        {children}
      </a>
    )
  }

  const getProductHref = (product) => {
    return (
      product?.href ||
      product?.link ||
      ((product?._id || product?.id) ? `/product/${product._id || product.id}` : '#')
    )
  }

  const ProductCard = ({ product, index }) => {
    const href = getProductHref(product)
    const productName = product?.name || product?.title || 'محصول'
    const badgeText = product?.badgeText
    const price = product?.price
    const oldPrice = product?.oldPrice
    const discountPercent = product?.discountPercent
    const rating = product?.rating
    const ratingCount = product?.ratingCount
    const shippingText = product?.shippingText
    const image = product?.mainImage || product?.image

    return renderLink(
      href,
      'block h-full',
      <div className="h-full px-4 py-4 border-l border-gray-100">
        <div className="h-5 mb-2 text-center">
          {badgeText ? <span className="text-red-500 danaBold text-sm">{badgeText}</span> : null}
        </div>

        <div className="flex items-center justify-center h-40 md:h-44 mb-3">
          {image ? (
            <img
              src={getImageUrl(image)}
              alt={String(productName)}
              className="max-h-full w-auto object-contain"
              draggable={false}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 rounded" />
          )}
        </div>

        <h3 className="text-sm danaMed text-gray-800 leading-6 line-clamp-2 min-h-12">
          {productName}
        </h3>

        <div className="mt-2 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1 text-gray-500">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7H16V17H3V7Z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M16 10H20L22 12V17H16V10Z" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M7 17.5C7 18.8807 5.88071 20 4.5 20C3.11929 20 2 18.8807 2 17.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M22 17.5C22 18.8807 20.8807 20 19.5 20C18.1193 20 17 18.8807 17 17.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="danaMed">{shippingText || 'ارسال سریع'}</span>
          </div>

          {rating ? (
            <div className="flex items-center gap-1 text-gray-700">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="text-yellow-400"
              >
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
              </svg>
              <span className="danaBold">{formatNumberFa(rating)}</span>
              {ratingCount ? (
                <span className="text-gray-400 danaMed">({formatNumberFa(ratingCount)})</span>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="mt-3 flex items-end justify-between">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
              <span className="text-base danaBold text-gray-900">{price ? formatNumberFa(price) : '۰'}</span>
              <span className="text-xs text-gray-500 danaMed">تومان</span>
            </div>
            {oldPrice ? (
              <span className="text-xs text-gray-400 line-through danaMed">{formatNumberFa(oldPrice)}</span>
            ) : null}
          </div>

          {discountPercent ? (
            <span className="shrink-0 bg-red-500 text-white danaBold text-xs rounded-full px-2 py-1">
              {formatNumberFa(discountPercent)}%
            </span>
          ) : null}
        </div>
      </div>,
      String(productName)
    )
  }

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
        duration: parseTiming(durationValue, 0.75),
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const cardMotion = getMotionConfig(cardAnimationType, cardAnimationDelay, cardAnimationDuration)
  const headerMotion = getMotionConfig(headerAnimationType, headerAnimationDelay, headerAnimationDuration)
  const titleMotion = getMotionConfig(titleAnimationType, titleAnimationDelay, titleAnimationDuration)
  const viewAllMotion = getMotionConfig(viewAllAnimationType, viewAllAnimationDelay, viewAllAnimationDuration)
  const swiperMotion = getMotionConfig(swiperAnimationType, swiperAnimationDelay, swiperAnimationDuration)
  const navMotion = getMotionConfig(navAnimationType, navAnimationDelay, navAnimationDuration)

  return (
    <section ref={sectionRef} className="w-full" dir="rtl" style={{backgroundColor: bgColor}}>
      <style>{`
        .digikala-swiper .swiper-button-next,
        .digikala-swiper .swiper-button-prev {
          display: none;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <motion.div className="bg-white border border-gray-200 rounded-2xl overflow-hidden" {...cardMotion}>
          {/* Header */}
          <motion.div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-gray-100" {...headerMotion}>
            <motion.div className="flex items-center gap-3" {...titleMotion}>
              <h2 className="text-base md:text-lg danaBold" style={{color: largeTextColor}}>{title}</h2>
              <span className="w-10 h-0.5 bg-red-500" />
            </motion.div>
            <motion.div {...viewAllMotion}>
              {renderLink(
                viewAllLink,
                'text-sm danaMed text-red-500 hover:text-red-600',
                viewAllText,
                String(viewAllText || 'مشاهده همه')
              )}
            </motion.div>
          </motion.div>

          {/* Swiper */}
          <motion.div className="relative" {...swiperMotion}>
            {!mounted ? (
              <div className="flex overflow-hidden">
                {products.slice(0, 4).map((product, index) => (
                  <div key={product?._id || product?.id || index} className="w-1/2 sm:w-1/3 md:w-1/4 shrink-0">
                    <ProductCard product={product} index={index} />
                  </div>
                ))}
              </div>
            ) : (
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={0}
                slidesPerView={2}
                breakpoints={{
                  480: { slidesPerView: 3 },
                  768: { slidesPerView: 4 },
                  1024: { slidesPerView: 5 },
                  1280: { slidesPerView: 5 }
                }}
                loop={products.length > 7}
                autoplay={enableAutoplay === 'true' ? { delay: autoplayDelayMs, disableOnInteraction: false } : false}
                navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper
                }}
                className="digikala-swiper"
              >
                {products.map((product, index) => (
                  <SwiperSlide key={product?._id || product?.id || index}>
                    <ProductCard product={product} index={index} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            {/* Navigation buttons */}
            <motion.button
              ref={prevRef}
              type="button"
              aria-label="قبلی"
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow border border-gray-200 absolute left-3 top-1/2 -translate-y-1/2 z-10"
              {...navMotion}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>

            <motion.button
              ref={nextRef}
              type="button"
              aria-label="بعدی"
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow border border-gray-200 absolute right-3 top-1/2 -translate-y-1/2 z-10"
              {...navMotion}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default DigikalaSwiper