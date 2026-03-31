'use client'

import React, { useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

/**
 * اسلایدر بنر (Hero) شبیه عکس
 * - اسلایدها خودکار عوض می‌شوند
 * - کل بنر لینک‌دار است
 *
 * @param {Array} data - برای حالت manual: آرایه محصولات انتخاب شده از سایت‌بیلدر
 * @param {String} dataSourceType - manual | category | discounted
 * @param {String} discountText - متن تخفیف (مثال: "تخفیف تا 70%")
 * @param {String} headline - تیتر اصلی
 * @param {String} buttonText - متن دکمه
 * @param {Number} autoplayDelay - تاخیر اتوپلی (ms)
 */
const HeroBannerSwiper = ({
  data = null,
  dataSourceType = 'manual',
  discountText = 'تخفیف تا 70%',
  headline = 'پوشاک، محصولات آرایشی،\nلوازم ورزشی و زیورآلات طلا',
  buttonText = 'خرید',
  autoplayDelay = 4500
}) => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const swiperRef = useRef(null)

  const getImageUrl = (imagePath) => {
    if (!imagePath) return ''
    if (imagePath.startsWith('http')) return imagePath
    return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${imagePath}`
  }

  const sampleSlides = useMemo(
    () => [
      {
        id: 1,
        image:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&h=520&fit=crop',
        href: '#',
        discountText: 'تخفیف تا 70%',
        headline: 'پوشاک، محصولات آرایشی،\nلوازم ورزشی و زیورآلات طلا',
        buttonText: 'خرید'
      },
      {
        id: 2,
        image:
          'https://images.unsplash.com/photo-1512511708753-3150cd98c9d5?w=1600&h=520&fit=crop',
        href: '#',
        discountText: 'تخفیف ویژه',
        headline: 'منتخب‌های جذاب\nبرای خرید امروز',
        buttonText: 'مشاهده'
      },
      {
        id: 3,
        image:
          'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1600&h=520&fit=crop',
        href: '#',
        discountText: 'پیشنهاد شگفت‌انگیز',
        headline: 'کالاهای محبوب\nبا قیمت عالی',
        buttonText: 'خرید'
      }
    ],
    []
  )

  const slides = useMemo(() => {
    // اگر در سایت‌بیلدر دستی محصول انتخاب شده باشد، از همان استفاده کن
    if (dataSourceType === 'manual' && Array.isArray(data) && data.length > 0) {
      // data ممکنه محصول باشه (object) یا اسلاید سفارشی. هر دو را پشتیبانی می‌کنیم.
      return data.map((item, index) => {
        const image = item.mainImage || item.image || item.thumbnail
        const href = item.href || item.link || (item._id || item.id ? `/product/${item._id || item.id}` : '#')
        return {
          id: item._id || item.id || index,
          image: getImageUrl(image),
          href,
          discountText: item.discountText || discountText,
          headline: item.headline || item.title || item.name || headline,
          buttonText: item.buttonText || buttonText
        }
      })
    }

    // حالت‌های دیگر فعلاً با نمونه پر می‌شوند (مثل سایر کامپوننت‌ها)
    return sampleSlides.map((s) => ({
      ...s,
      discountText,
      headline,
      buttonText
    }))
  }, [data, dataSourceType, discountText, headline, buttonText, sampleSlides])

  useEffect(() => {
    const swiper = swiperRef.current
    if (!swiper || !prevRef.current || !nextRef.current) return

    swiper.params.navigation.prevEl = prevRef.current
    swiper.params.navigation.nextEl = nextRef.current

    // Swiper sometimes needs re-init when refs become available
    if (swiper.navigation) {
      swiper.navigation.destroy()
      swiper.navigation.init()
      swiper.navigation.update()
    }
  }, [slides.length])

  const renderSlideOverlayLink = (href, label) => {
    if (!href) return null
    if (href.startsWith('/')) {
      return (
        <Link
          href={href}
          aria-label={label}
          className="absolute inset-0 z-10"
        />
      )
    }

    return (
      <a
        href={href}
        aria-label={label}
        className="absolute inset-0 z-10"
      />
    )
  }

  return (
    <section className="w-full bg-white">
      <style jsx global>{`
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

      <div className="w-full">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          loop={slides.length > 1}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          autoplay={
            slides.length > 1
              ? {
                  delay: Number(autoplayDelay) || 4500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true
                }
              : false
          }
          pagination={{ clickable: true }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          className="hero-banner-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-65 sm:h-70 md:h-60 lg:h-80 overflow-hidden">
                {/* لینک کل بنر */}
                {renderSlideOverlayLink(slide.href, String(slide.headline || 'بنر'))}

                {/* تصویر تمام صفحه */}
                {slide.image ? (
                  <img
                    src={slide.image}
                    alt={String(slide.headline || 'بنر')}
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-200" />
                )}

                {/* لایه برای خوانایی متن */}
                <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/10 to-transparent" />

                {/* متن روی تصویر - سمت چپ */}
                <div className="absolute justify-center inset-y-0 left-0 w-full md:w-[30%] flex items-center p-6 md:p-10 z-20 pointer-events-none" dir="rtl">
                  <div className="text-right max-w-xl">
                    <p className="text-gray-100 drop-shadow-2xl danaMed text-base sm:text-lg md:text-xl">
                      {slide.discountText}
                    </p>

                    <h3 className="text-gray-100 drop-shadow-2xl danaBold text-xl sm:text-3xl md:text-4xl leading-relaxed whitespace-pre-line mb-6">
                      {slide.headline}
                    </h3>

                    <div className="flex justify-start">
                      <span className="inline-flex items-center justify-center rounded-full bg-gray-800 text-white px-10 py-2 text-sm danaBold">
                        {slide.buttonText}
                      </span>
                    </div>
                  </div>
                </div>

                {/* دکمه‌های ناوبری - پایین راست */}
                <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2 pointer-events-auto">
                  <button
                    ref={prevRef}
                    type="button"
                    className="w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center"
                    aria-label="قبلی"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 18L9 12L15 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <button
                    ref={nextRef}
                    type="button"
                    className="w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center"
                    aria-label="بعدی"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default HeroBannerSwiper
