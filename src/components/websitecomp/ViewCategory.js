'use client'

import React from 'react'
import Link from 'next/link'
import { motion, useAnimationControls, useInView } from 'framer-motion'

// ─── پریست‌های انیمیشن (هماهنگ با AboutMe.js) ─────────────────────
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
  slideDown: {
    hidden: { opacity: 0, y: -36 },
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

const ANIMATION_OPTIONS = [
  { value: 'none', label: 'بدون انیمیشن' },
  { value: 'fade', label: 'محو شدن' },
  { value: 'slideUp', label: 'حرکت از پایین' },
  { value: 'slideDown', label: 'حرکت از بالا' },
  { value: 'slideRight', label: 'حرکت از راست' },
  { value: 'slideLeft', label: 'حرکت از چپ' },
  { value: 'zoomIn', label: 'بزرگ‌نمایی' },
  { value: 'blurUp', label: 'بلور + حرکت' }
]

// ─── Schema (قابل تنظیم در سایت‌بیلدر) ───────────────────────────
export const viewCategorySchema = {
  name: 'نمایش دسته‌بندی (کارت تصویری)',
  fields: [
    { key: 'bgColor', label: 'رنگ پس‌زمینه بخش', type: 'color', default: '#ffffff' },
    { key: 'textColor', label: 'رنگ متن کارت‌ها', type: 'color', default: '#ffffff' },
    {
      key: 'showOverlay',
      label: 'لایه تیرگی روی تصویر',
      type: 'select',
      options: [
        { value: 'yes', label: 'فعال' },
        { value: 'no', label: 'غیرفعال (بدون پس‌زمینه)' }
      ],
      default: 'yes'
    },
    { key: 'overlayColor', label: 'رنگ روی تصویر (تیرگی)', type: 'color', default: '#000000' },
    {
      key: 'overlayOpacity',
      label: 'شدت تیرگی روی تصویر',
      type: 'select',
      options: [
        { value: '0', label: 'بدون تیرگی' },
        { value: '0.15', label: 'خیلی کم' },
        { value: '0.3', label: 'کم' },
        { value: '0.45', label: 'متوسط' },
        { value: '0.6', label: 'زیاد' }
      ],
      default: '0.3'
    },
    {
      key: 'fontFamily',
      label: 'فونت متن کارت‌ها',
      type: 'select',
      options: [
        { value: 'danaBold', label: 'دانا (Bold)' },
        { value: 'dana', label: 'دانا (Regular)' },
        { value: 'danaMed', label: 'دانا (Medium)' },
        { value: 'vazirBold', label: 'وزیر (Bold)' },
        { value: 'vazir', label: 'وزیر (Regular)' },
        { value: 'vazirMed', label: 'وزیر (Medium)' },
        { value: 'mitra', label: 'میترا' },
        { value: 'mitra2', label: 'میترا ۲' },
        { value: 'mitra3', label: 'میترا ۳' },
        { value: 'mitra4', label: 'میترا ۴' }
      ],
      default: 'danaBold'
    },
    {
      key: 'fontSize',
      label: 'اندازه متن کارت‌ها',
      type: 'select',
      options: [
        { value: 'text-sm', label: 'کوچک' },
        { value: 'text-base', label: 'متوسط' },
        { value: 'text-lg', label: 'بزرگ' },
        { value: 'text-xl', label: 'خیلی بزرگ' },
        { value: 'text-2xl', label: 'فوق بزرگ' }
      ],
      default: 'text-xl'
    },
    {
      key: 'cardHeight',
      label: 'ارتفاع کارت‌ها',
      type: 'select',
      options: [
        { value: 'h-40', label: 'کوتاه' },
        { value: 'h-56', label: 'متوسط' },
        { value: 'h-72', label: 'بلند' },
        { value: 'h-96', label: 'خیلی بلند' }
      ],
      default: 'h-56'
    },
    {
      key: 'gap',
      label: 'فاصله بین کارت‌ها',
      type: 'select',
      options: [
        { value: 'gap-2', label: 'فشرده' },
        { value: 'gap-3', label: 'کم' },
        { value: 'gap-4', label: 'متوسط' },
        { value: 'gap-6', label: 'زیاد' }
      ],
      default: 'gap-4'
    },
    {
      key: 'cardAnimationType',
      label: 'نوع انیمیشن کارت‌ها',
      type: 'select',
      options: ANIMATION_OPTIONS,
      default: 'slideUp'
    },
    {
      key: 'cardAnimationDuration',
      label: 'مدت انیمیشن کارت‌ها (ثانیه)',
      type: 'select',
      options: [
        { value: '0.3', label: 'خیلی سریع' },
        { value: '0.5', label: 'سریع' },
        { value: '0.7', label: 'متوسط' },
        { value: '0.9', label: 'آرام' },
        { value: '1.2', label: 'خیلی آرام' }
      ],
      default: '0.6'
    },
    {
      key: 'cardAnimationStagger',
      label: 'فاصله زمانی بین کارت‌ها (Stagger)',
      type: 'select',
      options: [
        { value: '0', label: 'بدون فاصله (همزمان)' },
        { value: '0.05', label: 'خیلی کم' },
        { value: '0.1', label: 'کم' },
        { value: '0.15', label: 'متوسط' },
        { value: '0.25', label: 'زیاد' }
      ],
      default: '0.1'
    },
    {
      key: 'cardAnimationDelay',
      label: 'تاخیر اولیه (ثانیه)',
      type: 'select',
      options: [
        { value: '0', label: 'بدون تاخیر' },
        { value: '0.1', label: 'خیلی کم' },
        { value: '0.2', label: 'کم' },
        { value: '0.4', label: 'متوسط' },
        { value: '0.6', label: 'زیاد' }
      ],
      default: '0.1'
    },
    {
      key: 'items',
      label: 'آیتم‌های دسته‌بندی',
      type: 'slides',
      hiddenFields: ['description', 'buttonText'],
      itemWidthOptions: [
        { value: '25', label: '۲۵٪ (چهار ستون)' },
        { value: '50', label: '۵۰٪ (دو ستون)' }
      ],
      defaultItemWidth: '25',
      default: [
        { title: 'انگشتر',      link: '#', imageUrl: '', width: '25' },
        { title: 'گردنبند',     link: '#', imageUrl: '', width: '25' },
        { title: 'گوشواره',     link: '#', imageUrl: '', width: '25' },
        { title: 'دستبند',      link: '#', imageUrl: '', width: '25' },
        { title: 'محصولات نقره', link: '#', imageUrl: '', width: '50' },
        { title: 'ساعت',         link: '#', imageUrl: '', width: '50' }
      ]
    }
  ]
}

// ─── کمک‌تابع: تبدیل عرض درصدی به col-span ──────────────────────
// در حالت دسکتاپ از grid ۴ ستونه و در موبایل از grid ۲ ستونه استفاده می‌کنیم.
// آیتم 25% در موبایل نصف عرض (col-span-1 از 2) و در دسکتاپ یک‌چهارم می‌گیرد.
// آیتم 50% در موبایل تمام عرض (col-span-2 از 2) و در دسکتاپ نصف می‌گیرد.
const widthClassMapDesktop = {
  '25':  'col-span-1 sm:col-span-1 md:col-span-1',
  '50':  'col-span-2 sm:col-span-2 md:col-span-2',
  '75':  'col-span-2 sm:col-span-2 md:col-span-3',
  '100': 'col-span-2 sm:col-span-2 md:col-span-4'
}

// در پیش‌نمایش موبایلِ بیلدر (viewport='mobile') همیشه گرید ۲ ستونه نمایش می‌دهیم.
const widthClassMapMobile = {
  '25':  'col-span-1',
  '50':  'col-span-2',
  '75':  'col-span-2',
  '100': 'col-span-2'
}

const cardHeightResponsiveMap = {
  'h-40': 'h-auto md:h-40',
  'h-56': 'h-auto md:h-56',
  'h-72': 'h-auto md:h-72',
  'h-96': 'h-auto md:h-96'
}

const getImageUrl = (imagePath) => {
  if (!imagePath || typeof imagePath !== 'string') return ''
  if (imagePath.startsWith('http')) return imagePath
  return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL || ''}${imagePath}`
}

const parseTiming = (value, fallback) => {
  const parsed = Number.parseFloat(value)
  if (Number.isNaN(parsed)) return fallback
  return Math.max(0, parsed)
}

// ─── کامپوننت اصلی ──────────────────────────────────────────────
const ViewCategory = ({
  viewport = 'desktop',
  bgColor = '#ffffff',
  textColor = '#ffffff',
  showOverlay = 'yes',
  overlayColor = '#000000',
  overlayOpacity = '0.3',
  fontFamily = 'danaBold',
  fontSize = 'text-xl',
  cardHeight = 'h-56',
  gap = 'gap-4',
  cardAnimationType = 'slideUp',
  cardAnimationDuration = '0.6',
  cardAnimationStagger = '0.1',
  cardAnimationDelay = '0.1',
  items
}) => {
  const list = Array.isArray(items) && items.length > 0 ? items : []
  const isMobilePreview = viewport === 'mobile'

  const sectionRef = React.useRef(null)
  const animationControls = useAnimationControls()
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.15,
    margin: '0px 0px -10% 0px'
  })

  React.useEffect(() => {
    if (isInView) {
      animationControls.start('visible')
    }
  }, [isInView, animationControls])

  const preset = ANIMATION_PRESETS[cardAnimationType] || ANIMATION_PRESETS.slideUp
  const baseDelay = parseTiming(cardAnimationDelay, 0)
  const stagger = parseTiming(cardAnimationStagger, 0)
  const duration = parseTiming(cardAnimationDuration, 0.6)

  // پدینگ ریسپانسیو: در موبایلِ واقعی هم کم می‌شود، در viewport='mobile' بیلدر هم.
  const wrapperPad = isMobilePreview
    ? 'px-3 py-6'
    : 'px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10'

  // ساختار گرید: در viewport بیلدر موبایل ثابت ۲ ستونه، در غیر این صورت ریسپانسیو واقعی.
  const gridCols = isMobilePreview
    ? 'grid grid-cols-2'
    : 'grid grid-cols-2 md:grid-cols-4'

  const widthMap = isMobilePreview ? widthClassMapMobile : widthClassMapDesktop

  // در موبایل ارتفاع از خود تصویر می‌آید تا فضای اضافه نداشته باشیم.
  const responsiveCardHeight = cardHeightResponsiveMap[cardHeight] || 'h-auto md:h-56'

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden"
      style={{ backgroundColor: bgColor }}
      dir="rtl"
    >
      <div className={`mx-auto max-w-7xl ${wrapperPad}`}>
        <div className={`${gridCols} ${gap}`}>
          {list.map((item, idx) => {
            const width = String(item?.width ?? '25')
            const widthCls = widthMap[width] || widthMap['25']
            const href = item?.link || '#'
            const imgUrl = getImageUrl(item?.imageUrl)
            const label = item?.title || ''

            return (
              <motion.div
                key={`${label}-${idx}`}
                className={widthCls}
                initial="hidden"
                animate={animationControls}
                variants={preset}
                transition={{
                  delay: baseDelay + idx * stagger,
                  duration,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <Link
                  href={href}
                  className={`relative block ${responsiveCardHeight} w-full rounded-xl sm:rounded-2xl overflow-hidden group bg-gray-200`}
                >
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt={label || 'category'}
                      className="relative md:absolute md:inset-0 w-full h-auto md:h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                      draggable={false}
                    />
                  ) : (
                    <div className="relative md:absolute md:inset-0 w-full aspect-4/3 md:aspect-auto md:h-full bg-linear-to-br from-gray-300 to-gray-400" />
                  )}

                  {/* لایه تیرگی روی تصویر - فقط وقتی showOverlay فعال باشد */}
                  {showOverlay !== 'no' && (
                    <div
                      className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-90"
                      style={{
                        backgroundColor: overlayColor,
                        opacity: Number(overlayOpacity) || 0
                      }}
                    />
                  )}

                  {/* متن کارت */}
                  {label && (
                    <div className="absolute inset-0 flex items-center justify-center px-2 sm:px-3">
                      <span
                        className={`${fontFamily} ${fontSize} text-center drop-shadow-sm transition-transform duration-300 group-hover:scale-105`}
                        style={{ color: textColor }}
                      >
                        {label}
                      </span>
                    </div>
                  )}
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ViewCategory
