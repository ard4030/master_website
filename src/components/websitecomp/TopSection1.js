'use client'

import React from 'react'
import Link from 'next/link'

/**
 * کامپوننت بخش بالایی
 * @param {String} subtitle - زیرعنوان
 * @param {String} title - عنوان اصلی
 * @param {String} description - توضیحات
 * @param {String} imageUrl - آدرس تصویر
 * @param {String} ctaText - متن دکمه اصلی
 * @param {String} ctaLink - لینک دکمه اصلی
 * @param {String} secondaryCtaText - متن دکمه ثانویه
 * @param {String} secondaryCtaLink - لینک دکمه ثانویه
 */
const TopSection1 = ({
  subtitle = 'ارز ونه های محدود برای خت بیو ...',
  title = 'وقتشه نووت را آنلاین بخری!',
  description = 'بهترین کیفیت، طعم و تازگی در یک جا. سفارش کنید و در کمتر از 2 ساعت دریافت کنید.',
  imageUrl = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=500&fit=crop',
  ctaText = 'مشاهده کن',
  ctaLink = '#',
  secondaryCtaText = 'اطلاعات بیش‌تر',
  secondaryCtaLink = '#'
}) => {
  // تابع کمکی برای تبدیل URL تصویر
  const getImageUrl = (imagePath) => {
    if (!imagePath) return ''
    if (imagePath.startsWith('http')) return imagePath
    return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${imagePath}`
  }
  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12 px-6 md:px-12">
          {/* Left Content - Text Section */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Subtitle */}
            <div className="text-sm text-orange-500 danaMed tracking-wider">
              {subtitle}
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl danaBold text-gray-900 leading-tight">
              {title}
            </h1>

            {/* Description */}
            <p className="text-gray-600 danaMed text-base leading-relaxed">
              {description}
            </p>

            {/* CTAs */}
            <div className="flex gap-4 pt-4">
              <Link
                href={ctaLink}
                className="px-8 py-3 bg-orange-500 text-white rounded-lg danaBold hover:bg-orange-600 transition-colors"
              >
                {ctaText}
              </Link>
              <Link
                href={secondaryCtaLink}
                className="px-8 py-3 border-2 border-orange-500 text-orange-500 rounded-lg danaBold hover:bg-orange-50 transition-colors"
              >
                {secondaryCtaText}
              </Link>
            </div>
          </div>

          {/* Right Content - Image Section */}
          <div className="flex justify-center">
            <img
              src={getImageUrl(imageUrl)}
              alt={title}
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopSection1
