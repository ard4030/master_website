'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

const DigikalaOfferSwiper = ({
  data = null,
  dataSourceType = 'manual',
  panelTitle = 'پیشنهاد\nشگفت\nانگیز',
  timerText = '۰۵ : ۰۸ : ۴۱',
  countdownSeconds = null,
  viewAllText = 'مشاهده همه',
  viewAllLink = '#'
}) => {
  const pathName = usePathname()
  const [mounted, setMounted] = useState(false)
  const [remainingSeconds, setRemainingSeconds] = useState(null)
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const swiperRef = useRef(null)

  const getImageUrl = (imagePath) => {
    if (!imagePath) return ''
    if (String(imagePath).startsWith('http')) return imagePath
    return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${imagePath}`
  }

  const sampleProducts = useMemo(
    () => [
      {
        id: 1,
        name: 'لپ تاپ 15.6 اینچی لنوو مدل IdeaPad Slim 3',
        image:
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&h=900&fit=crop',
        price: 52699000,
        oldPrice: 98199000,
        discountPercent: 32
      },
      {
        id: 2,
        name: 'لپ تاپ 15.6 اینچی اچ پی مدل Victus 15 FA2787NR',
        image:
          'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=900&h=900&fit=crop',
        price: 78499000,
        oldPrice: 91699000,
        discountPercent: 14
      },
      {
        id: 3,
        name: 'لپ تاپ 15.6 اینچی ایسر مدل Aspire 3 A325-45',
        image:
          'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=900&h=900&fit=crop',
        price: 87499000,
        oldPrice: 109995000,
        discountPercent: 20
      },
      {
        id: 4,
        name: 'جوراب مردانه آریان نخ باف مدل 51217 بسته 6 عددی',
        image:
          'https://images.unsplash.com/photo-1617953141905-b27fb1b0b8f1?w=900&h=900&fit=crop',
        price: 678000,
        oldPrice: 998000,
        discountPercent: 32
      },
      {
        id: 5,
        name: 'جوراب ساق بلند مردانه مدل 194 بسته 6 عددی',
        image:
          'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=900&h=900&fit=crop',
        price: 716000,
        oldPrice: 1989000,
        discountPercent: 64
      },
      {
        id: 6,
        name: 'جوراب ساق بلند مردانه مدل 111 بسته 3 عددی',
        image:
          'https://images.unsplash.com/photo-1520975869010-0c3a7f0fd0f5?w=900&h=900&fit=crop',
        price: 716000,
        oldPrice: 1989000,
        discountPercent: 64
      },
      {
        id: 7,
        name: 'جوراب ساق بلند مردانه مدل 397 بسته 3 عددی',
        image:
          'https://images.unsplash.com/photo-1520975861570-9b5f2d5d2c8a?w=900&h=900&fit=crop',
        price: 616000,
        oldPrice: 880000,
        discountPercent: 30
      }
    ],
    []
  )

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 0)
    return () => window.clearTimeout(id)
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

  // برای جلوگیری از hydration mismatch، این شرط را فقط بعد از mount اعمال می‌کنیم.
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
  }, [products.length, mounted])

  const normalizeDigitsToEn = (raw) => {
    if (raw === null || raw === undefined) return ''
    return String(raw)
      .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
      .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
  }

  const parseTimerToSeconds = (raw) => {
    const text = String(raw || '').trim()
    if (!text) return 0

    const cleaned = normalizeDigitsToEn(text)
      .replaceAll('：', ':')
      .replaceAll('٫', ':')
      .replaceAll('،', ':')

    const parts = cleaned
      .split(':')
      .map((p) => p.trim())
      .filter(Boolean)
      .slice(-3)

    const nums = parts.map((p) => {
      const n = Number(p)
      return Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0
    })

    let h = 0
    let m = 0
    let s = 0

    if (nums.length === 3) {
      ;[h, m, s] = nums
    } else if (nums.length === 2) {
      ;[m, s] = nums
    } else if (nums.length === 1) {
      ;[s] = nums
    }

    return h * 3600 + m * 60 + s
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

  const addCommas = (numStr) => numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const toPersianDigits = (raw) => String(raw).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])

  const formatNumberFa = (value) => {
    const num = parseNumberish(value)
    if (num === null) return value === null || value === undefined ? '' : String(value)

    const sign = num < 0 ? '-' : ''
    const abs = Math.abs(num)
    const fixed = Number.isInteger(abs) ? String(Math.trunc(abs)) : abs.toFixed(1)
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
    const image = product?.mainImage || product?.image
    const price = product?.price
    const oldPrice = product?.oldPrice
    const discountPercent = product?.discountPercent

    return renderLink(
      href,
      'block h-full',
      <div className="h-full bg-white px-4 py-4 border-l-2 border-red-500">
        <div className="flex items-center justify-center h-32 md:h-36 mb-3">
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

        <div className="mt-3 flex items-end justify-between">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
              <span className="text-base danaBold text-gray-900">
                {price ? formatNumberFa(price) : '۰'}
              </span>
              <span className="text-xs text-gray-500 danaMed">تومان</span>
            </div>
            {oldPrice ? (
              <span className="text-xs text-gray-400 line-through danaMed">
                {formatNumberFa(oldPrice)}
              </span>
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

  const startSeconds = useMemo(() => {
    if (countdownSeconds !== null && countdownSeconds !== undefined && String(countdownSeconds).trim() !== '') {
      const n = parseNumberish(countdownSeconds)
      return n !== null ? Math.max(0, Math.floor(n)) : parseTimerToSeconds(timerText)
    }
    return parseTimerToSeconds(timerText)
  }, [countdownSeconds, timerText])

  useEffect(() => {
    if (!mounted) return

    const initId = window.setTimeout(() => {
      setRemainingSeconds(startSeconds)
    }, 0)
    if (startSeconds <= 0) {
      return () => {
        window.clearTimeout(initId)
      }
    }

    const id = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev === null || prev === undefined) return 0
        if (prev <= 1) {
          window.clearInterval(id)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      window.clearTimeout(initId)
      window.clearInterval(id)
    }
  }, [mounted, startSeconds])

  const timerParts = useMemo(() => {
    // قبل از mount: نمایش کاملاً deterministic بر اساس startSeconds (SSR-safe)
    if (!mounted) {
      const total = typeof startSeconds === 'number' ? Math.max(0, startSeconds) : 0
      const h = Math.floor(total / 3600)
      const m = Math.floor((total % 3600) / 60)
      const s = total % 60

      const pad2 = (n) => (n < 10 ? `0${n}` : String(n))
      return [toPersianDigits(pad2(h)), toPersianDigits(pad2(m)), toPersianDigits(pad2(s))]
    }

    const total = typeof remainingSeconds === 'number' ? Math.max(0, remainingSeconds) : 0
    const h = Math.floor(total / 3600)
    const m = Math.floor((total % 3600) / 60)
    const s = total % 60

    const pad2 = (n) => (n < 10 ? `0${n}` : String(n))
    return [toPersianDigits(pad2(h)), toPersianDigits(pad2(m)), toPersianDigits(pad2(s))]
  }, [mounted, remainingSeconds, startSeconds])

  const renderTimerBox = (val, key) => {
    return (
      <div key={key} className="bg-white text-gray-900 rounded-lg px-2 py-1 danaBold text-sm min-w-9 text-center">
        {val}
      </div>
    )
  }

  return (
    <section className="w-full bg-white" dir="rtl">
      <style jsx global>{`
        .digikala-offer-swiper .swiper-button-next,
        .digikala-offer-swiper .swiper-button-prev {
          display: none;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="rounded-2xl overflow-hidden bg-red-500">
          <div className="flex pl-1">
            {/* Right panel */}
            <div className="w-40 sm:w-44 md:w-52 shrink-0 text-white flex flex-col items-center justify-between py-6 px-3">
              <div className="text-center">
                <h3 className="danaBold text-xl leading-8 whitespace-pre-line">
                  {panelTitle}
                </h3>
              </div>

              <div className="flex items-center gap-2" dir="ltr">
                {renderTimerBox(timerParts[0], 'h')}
                {renderTimerBox(timerParts[1], 'm')}
                {renderTimerBox(timerParts[2], 's')}
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16C24.7614 16 27 18.2386 27 21C27 23.7614 24.7614 26 22 26C19.2386 26 17 23.7614 17 21C17 18.2386 19.2386 16 22 16Z" fill="white" opacity="0.9" />
                    <path d="M42 38C44.7614 38 47 40.2386 47 43C47 45.7614 44.7614 48 42 48C39.2386 48 37 45.7614 37 43C37 40.2386 39.2386 38 42 38Z" fill="white" opacity="0.9" />
                    <path d="M18 48L46 16" stroke="white" strokeWidth="5" strokeLinecap="round" opacity="0.9" />
                  </svg>
                </div>

                {renderLink(
                  viewAllLink,
                  'danaBold text-sm flex items-center gap-2 hover:opacity-90',
                  <>
                    <span>{viewAllText}</span>
                    <span className="text-lg">‹</span>
                  </>,
                  String(viewAllText || 'مشاهده همه')
                )}
              </div>
            </div>

            {/* Products */}
            <div className="flex-1 relative py-4 pr-4">
              <div className="bg-white rounded-xl overflow-hidden">
                {!mounted ? (
                  <div className="flex overflow-hidden">
                    {products.slice(0, 4).map((p, idx) => (
                      <div key={p?._id || p?.id || idx} className="w-1/2 sm:w-1/3 md:w-1/4 shrink-0">
                        <ProductCard product={p} index={idx} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <Swiper
                    modules={[Navigation]}
                    spaceBetween={0}
                    slidesPerView={2}
                    breakpoints={{
                      480: { slidesPerView: 3 },
                      768: { slidesPerView: 3 },
                      1024: { slidesPerView: 4 },
                      1280: { slidesPerView: 4 }
                    }}
                    loop={products.length > 6}
                    navigation={{ prevEl: null, nextEl: null }}
                    onSwiper={(swiper) => {
                      swiperRef.current = swiper
                    }}
                    className="digikala-offer-swiper"
                  >
                    {products.map((p, idx) => (
                      <SwiperSlide key={p?._id || p?.id || idx}>
                        <ProductCard product={p} index={idx} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}

                <button
                  ref={prevRef}
                  type="button"
                  aria-label="قبلی"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow border border-gray-200 hidden md:flex items-center justify-center"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <button
                  ref={nextRef}
                  type="button"
                  aria-label="بعدی"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow border border-gray-200 hidden md:flex items-center justify-center"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DigikalaOfferSwiper