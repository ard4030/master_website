'use client'

import React from 'react'
import Link from 'next/link'
import { motion, useAnimationControls, useInView } from 'framer-motion'
import { ANIMATION_PRESETS, parseTiming } from './animationUtils'

// ─── Schema (قابل تنظیم در سایت‌بیلدر) ───────────────────────────
export const viewCatGlassSchema = {
  name: 'نمایش دسته‌بندی (کارت تصویری)',
  fields: [
    { key: 'bgColor', label: 'رنگ پس‌زمینه بخش', type: 'color', default: '#ffffff' },
    { key: 'cardBgColor', label: 'رنگ پس‌زمینه کارت', type: 'color', default: '#f3f4f6' },
    { key: 'titleColor', label: 'رنگ عنوان کارت', type: 'color', default: '#111827' },
    { key: 'ctaText', label: 'متن دکمه (CTA)', type: 'text', default: 'مشاهده محصول' },
    { key: 'ctaColor', label: 'رنگ متن دکمه (CTA)', type: 'color', default: '#6b7280' },
    {
      key: 'imagePosition',
      label: 'جایگاه تصویر',
      type: 'select',
      options: [
        { value: 'right', label: 'تصویر سمت راست / متن سمت چپ' },
        { value: 'left', label: 'تصویر سمت چپ / متن سمت راست' }
      ],
      default: 'right'
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
    },
    {
      key: 'animationEditor',
      label: 'انیمیشن بخش‌ها',
      type: 'animationEditor',
      buttonText: '🎬 تنظیم انیمیشن + پیش‌نمایش',
      editorConfig: {
        previewType: 'viewCatGlass',
        title: 'تنظیم انیمیشن کارت‌های دسته‌بندی',
        subtitle: 'انیمیشن کل بخش و انیمیشن هر کارت (با تاخیر پلکانی) را جداگانه تنظیم کنید.',
        sections: [
          { keyPrefix: 'sectionAnimation', label: 'کل بخش',  hint: 'انیمیشن ورودی کل سکشن' },
          { keyPrefix: 'itemAnimation',    label: 'هر کارت', hint: 'انیمیشن کارت‌ها به صورت پلکانی (stagger)' }
        ]
      }
    }
  ]
}

// ─── نگاشت عرض آیتم به col-span در grid ریسپانسیو ───────────────────
// موبایل: تک‌ستونه | sm: دوستونه | md+ : چهارستونه
const widthClassMap = {
  '25':  'col-span-1 sm:col-span-1 md:col-span-1',
  '50':  'col-span-1 sm:col-span-2 md:col-span-2',
  '75':  'col-span-1 sm:col-span-2 md:col-span-3',
  '100': 'col-span-1 sm:col-span-2 md:col-span-4'
}

// ─── نگاشت‌های ریسپانسیو برای ارتفاع، اندازه فونت و فاصله ───────────
const cardHeightMap = {
  'h-40': 'h-32 sm:h-36 md:h-40',
  'h-56': 'h-40 sm:h-48 md:h-56',
  'h-72': 'h-48 sm:h-60 md:h-72',
  'h-96': 'h-56 sm:h-72 md:h-96'
}

const fontSizeMap = {
  'text-sm':   'text-xs sm:text-sm',
  'text-base': 'text-sm sm:text-base',
  'text-lg':   'text-sm sm:text-base md:text-lg',
  'text-xl':   'text-base sm:text-lg md:text-xl',
  'text-2xl':  'text-lg sm:text-xl md:text-2xl'
}

const gapMap = {
  'gap-2': 'gap-2',
  'gap-3': 'gap-2 sm:gap-3',
  'gap-4': 'gap-3 sm:gap-4',
  'gap-6': 'gap-3 sm:gap-4 md:gap-6'
}

const getImageUrl = (imagePath) => {
  if (!imagePath || typeof imagePath !== 'string') return ''
  if (imagePath.startsWith('http')) return imagePath
  return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL || ''}${imagePath}`
}

// ─── کامپوننت اصلی ──────────────────────────────────────────────
const ViewCatGlass = ({
  bgColor = '#ffffff',
  cardBgColor = '#f3f4f6',
  titleColor = '#111827',
  ctaText = 'مشاهده محصول',
  ctaColor = '#6b7280',
  imagePosition = 'right',
  fontFamily = 'danaBold',
  fontSize = 'text-xl',
  cardHeight = 'h-56',
  gap = 'gap-4',
  items,
  // ─── انیمیشن ───
  animationEnabled = 'false',
  sectionAnimationType = 'fade',
  sectionAnimationDelay = '0',
  sectionAnimationDuration = '0.8',
  itemAnimationType = 'slideUp',
  itemAnimationDelay = '0.1',
  itemAnimationDuration = '0.6'
}) => {
  const list = Array.isArray(items) && items.length > 0 ? items : []
  const isAnimationEnabled = animationEnabled === true || animationEnabled === 'true'

  // ─── کنترل انیمیشن ورود به ویوپورت ───
  const sectionRef = React.useRef(null)
  const animationControls = useAnimationControls()
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
    margin: '0px 0px -10% 0px'
  })

  React.useEffect(() => {
    if (isInView) animationControls.start('visible')
  }, [isInView, animationControls])

  const getMotionConfig = (type, delayValue, durationValue, extraDelay = 0) => {
    if (!isAnimationEnabled) return { initial: false, animate: false }
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

  const sectionMotion = getMotionConfig(
    sectionAnimationType,
    sectionAnimationDelay,
    sectionAnimationDuration
  )
  const itemMotion = (index) =>
    getMotionConfig(
      itemAnimationType,
      itemAnimationDelay,
      itemAnimationDuration,
      index * 0.08
    )

  // ─── کلاس‌های ریسپانسیو ───
  const cardHeightCls = cardHeightMap[cardHeight] || cardHeightMap['h-56']
  const fontSizeCls   = fontSizeMap[fontSize]     || fontSizeMap['text-xl']
  const gapCls        = gapMap[gap]               || gapMap['gap-4']

  // در RTL: order-1 → راست ، order-2 → چپ
  const imageOrderCls = imagePosition === 'left' ? 'order-2' : 'order-1'
  const textOrderCls  = imagePosition === 'left' ? 'order-1' : 'order-2'

  return (
    <section
      ref={sectionRef}
      className="w-full"
      style={{ backgroundColor: bgColor }}
      dir="rtl"
    >
      <motion.div
        className="mx-auto max-w-7xl px-3 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10"
        {...sectionMotion}
      >
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 ${gapCls}`}>
          {list.map((item, idx) => {
            const width = String(item?.width ?? '25')
            const widthCls = widthClassMap[width] || widthClassMap['25']
            const href = item?.link || '#'
            const imgUrl = getImageUrl(item?.imageUrl)
            const label = item?.title || ''

            return (
              <motion.div key={`${label}-${idx}`} className={widthCls} {...itemMotion(idx)}>
                <Link
                  href={href}
                  className={`relative ${cardHeightCls} w-full rounded-2xl overflow-hidden group grid grid-cols-12 items-center transition-shadow duration-300 hover:shadow-lg`}
                  style={{ backgroundColor: cardBgColor }}
                >
                  {/* ستون متن */}
                  <div
                    className={`h-full col-span-7 sm:col-span-6 flex flex-col justify-center items-start gap-1.5 sm:gap-2 p-2 sm:p-3 min-w-0 ${textOrderCls}`}
                  >
                    {label && (
                      <span
                        className={`${fontFamily} ${fontSizeCls} leading-tight line-clamp-2`}
                        style={{ color: titleColor }}
                      >
                        {label}
                      </span>
                    )}

                    {ctaText && (
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] sm:text-xs ${fontFamily} whitespace-nowrap`}
                        style={{ color: ctaColor }}
                      >
                        <span>{ctaText}</span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="sm:w-4 sm:h-4 transition-transform duration-300 group-hover:-translate-x-1"
                        >
                          <path
                            d="M15 18L9 12L15 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                  </div>

                  {/* ستون تصویر */}
                  <div
                    className={`h-full w-full col-span-5 sm:col-span-6 flex items-center justify-center ${imageOrderCls}`}
                  >
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={label || 'category'}
                        loading="lazy"
                        className="max-h-full max-w-full p-2 object-contain transition-transform duration-500 group-hover:scale-105"
                        draggable={false}
                      />
                    ) : (
                      <div className="w-full h-full" />
                    )}
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

export default ViewCatGlass
