'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

/**
 * اسلایدر بنر (Hero) - محتوا کاملاً دستی از طریق سایت‌بیلدر
 *
 * @param {Array}  slides        - آرایه اسلایدها: [{ imageUrl, title, description, buttonText, link }]
 * @param {Number} autoplayDelay - تاخیر اتوپلی (ms)
 */
const HeroBannerSwiper = ({
  slides: slidesProp = null,
  autoplayDelay = '5',
  enableAutoplay = 'true',
  textPosition = 'left',
  bgColor = '#ffffff',
  largeTextColor = '#111827',
  smallTextColor = '#111827'
}) => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const swiperRef = useRef(null)

  const getImageUrl = (imagePath) => {
    if (!imagePath) return ''
    if (imagePath.startsWith('http')) return imagePath
    return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${imagePath}`
  }

  const defaultSlides = [
    {
      imageUrl: 'slider.jpg',
      title: 'پوشاک، محصولات آرایشی،\nلوازم ورزشی و زیورآلات طلا',
      description: 'تخفیف تا 70%',
      buttonText: 'خرید',
      link: '#'
    }
  ]

  const slides = Array.isArray(slidesProp) && slidesProp.length > 0 ? slidesProp : defaultSlides

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
  }, [slides.length])

  const renderOverlayLink = (href, label) => {
    if (!href) return null
    if (href.startsWith('/')) {
      return <Link href={href} aria-label={label} className="absolute inset-0 z-10" />
    }
    return <a href={href} aria-label={label} className="absolute inset-0 z-10" />
  }

  return (
    <section className="w-full" style={{backgroundColor: bgColor}}>
      <style>{`
        .hero-banner-swiper .swiper-pagination {
          bottom: 18px;
        }
        .hero-banner-swiper .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          opacity: 0.4;
          background: #111827;
          margin: 0 5px !important;
        }
        .hero-banner-swiper .swiper-pagination-bullet-active {
          width: 18px;
          border-radius: 9999px;
          opacity: 0.9;
        }
        .hero-banner-swiper .swiper-button-next,
        .hero-banner-swiper .swiper-button-prev {
          display: none;
        }
      `}</style>

      <div className="relative w-full">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          loop={slides.length > 1}
          onSwiper={(swiper) => { swiperRef.current = swiper }}
          autoplay={
            slides.length > 1 && enableAutoplay === 'true'
              ? { delay: (Number(autoplayDelay) || 5) * 1000, disableOnInteraction: false, pauseOnMouseEnter: true }
              : false
          }
          pagination={{ clickable: true }}
          navigation={{ prevEl: null, nextEl: null }}
          className="hero-banner-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-96 sm:h-70 md:h-60 lg:h-100 overflow-hidden">
                {renderOverlayLink(slide.link, String(slide.title || 'بنر'))}

                {slide.imageUrl ? (
                  <img
                    src={getImageUrl(slide.imageUrl)}
                    alt={String(slide.title || 'بنر')}
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-200" />
                )}

                <div className={`absolute inset-0 ${textPosition === 'right' ? 'bg-linear-to-l' : 'bg-linear-to-r'} from-black/50 via-black/10 to-transparent`} />

                <div className={`absolute justify-center inset-y-0 w-full md:w-[40%] flex items-center p-6 md:p-10 z-20 pointer-events-none ${textPosition === 'right' ? 'right-0' : 'left-0'}`} dir="rtl">
                  <div className="text-right max-w-xl w-full overflow-hidden">
                    {slide.description && (
                      <p className="text-gray-100 drop-shadow-2xl danaMed text-base sm:text-lg md:text-xl truncate">
                        {slide.description}
                      </p>
                    )}

                    {slide.title && (
                      <h3 className="text-gray-100 drop-shadow-2xl danaBold text-xl sm:text-3xl md:text-4xl leading-tight mb-6 line-clamp-3 overflow-hidden">
                        {slide.title}
                      </h3>
                    )}

                    {slide.buttonText && (
                      <div className="flex justify-start">
                        <span className="inline-flex items-center justify-center rounded-full bg-gray-800 text-white px-10 py-2 text-sm danaBold truncate max-w-full">
                          {slide.buttonText}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* دکمه‌های ناوبری - ثابت روی کل اسلایدر */}
        <div className="hidden sm:flex absolute bottom-4 right-4 z-30 px-6 items-center gap-2">
          <button
            ref={prevRef}
            type="button"
            className="w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center"
            aria-label="قبلی"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); swiperRef.current?.slidePrev() }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

          </button>

          <button
            ref={nextRef}
            type="button"
            className="w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center"
            aria-label="بعدی"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); swiperRef.current?.slideNext() }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroBannerSwiper
