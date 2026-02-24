'use client'

import React from 'react'
import Link from 'next/link'

/**
 * سکشن معرفی (شبیه تصویر) - فارسی و قابل تنظیم
 * - چیدمان دو ستونه (چپ متن / راست رنگ یا پنل رنگی)
 * - دو کارت تصویری پایین که قابل تعویض هستند
 *
 * @param {String} brandText - متن برند/لوگو بالا
 * @param {String} title - تیتر اصلی
 * @param {String} description - توضیحات کوتاه
 * @param {String} ctaText - متن دکمه بالا
 * @param {String} ctaLink - لینک دکمه بالا
 * @param {String} sectionBackgroundColor - کلاس Tailwind رنگ زمینه کل سکشن
 * @param {String} accentBackgroundColor - کلاس Tailwind رنگ پنل سمت راست
 * @param {String} card1ImageUrl - تصویر کارت اول
 * @param {String} card1Text - متن کارت اول
 * @param {String} card2ImageUrl - تصویر کارت دوم
 * @param {String} card2Text - متن کارت دوم
 */
const SplitShowcase = ({
  brandText = 'برند شما',
  title = 'تقویت برندها.\nساختن اعتبار.',
  description = 'ما با شما همکاری می‌کنیم تا داستان‌های جذاب بسازید و ارزش‌های برندتان را بهتر نشان دهید.',
  ctaText = 'شروع گفتگو',
  ctaLink = '#',
  sectionBackgroundColor = 'bg-gray-100',
  accentBackgroundColor = 'bg-rose-500',
  card1ImageUrl = 'https://images.unsplash.com/photo-1529421308418-eab98863cee1?w=1200&h=900&fit=crop',
  card1Text = 'سنسور',
  card2ImageUrl = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=900&fit=crop',
  card2Text = 'قطعات'
}) => {
  const getImageUrl = (imagePath) => {
    if (!imagePath) return ''
    if (imagePath.startsWith('http')) return imagePath
    return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${imagePath}`
  }

  const cards = [
    {
      id: 1,
      imageUrl: getImageUrl(card1ImageUrl),
      text: card1Text
    }
  ]

  return (
    <section className={`w-full ${sectionBackgroundColor}`}>
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-12 md:py-16">
        <div className="relative rounded-2xl bg-white ">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* سمت چپ: متن */}
            <div className="pl-16" dir="rtl">
              <div className="flex items-center justify-between mb-10">
                <span className="text-sm danaMed text-gray-900">{brandText}</span>

              </div>

              <h2 className="text-gray-900 danaBold text-2xl sm:text-4xl leading-relaxed whitespace-pre-line">
                {title}
              </h2>

              {description ? (
                <p className="mt-6 text-gray-600 danaMed text-sm sm:text-base leading-7 max-w-xl">
                  {description}
                </p>
              ) : null}

                {ctaText ? (
                  <Link
                    href={ctaLink || '#'}
                    className="pointer-events-auto mt-6 inline-flex items-center justify-center rounded-md bg-gray-900 text-white px-4 py-2 text-md danaBold"
                  >
                    {ctaText}
                  </Link>
                ) : null}

            </div>

            {/* سمت راست: پنل رنگی */}
            <div className={`relative min-h-65 sm:min-h-80 lg:min-h-full ${accentBackgroundColor}`}>

            </div>
          </div>

          {/* کارت‌های پایین */}
          <div className=" absolute w-full top-[5%] left-[5%] z-10">
            <div className="pointer-events-none absolute inset-x-0 -top-12 md:-top-16 flex justify-center">
              <div className="pointer-events-auto w-full flex justify-end">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className="relative w-[50%]  rounded-xl  aspect-4/3 "
                  >

                    {card.text ? (
                      <div className="absolute top-0 left-0" dir="rtl">
                        <p className="text-white danaBold text-lg sm:text-xl drop-shadow-sm">
                          {card.text}
                        </p>
                      </div>
                    ) : null}

                    {card.imageUrl ? (
                      <img
                        src={card.imageUrl}
                        alt={String(card.text || 'تصویر')}
                        className="absolute top-6 right-10 w-full h-full object-cover"
                        draggable={false}
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            {/* فاصله برای اینکه کارت‌ها روی سکشن بنشینند */}
            <div className="h-16 md:h-20" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SplitShowcase
