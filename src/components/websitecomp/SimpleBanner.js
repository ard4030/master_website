'use client'

import Image from 'next/image'
import React from 'react'

/**
 * کامپوننت بنر ساده
 * @param {String} imageUrl - آدرس تصویر
 * @param {Number} width - عرض (درصد، مثال: 80)
 * @param {Number} height - ارتفاع (پیکسل، مثال: 200)
 * @param {Number} radius - گرد‌کردن گوشه‌ها (پیکسل، مثال: 10)
 * @param {Number} marginTop - فاصله از بالا (پیکسل، مثال: 10)
 * @param {Number} marginBottom - فاصله از پایین (پیکسل، مثال: 20)
 * @param {String} alignment - تراز‌بندی (center یا flex-start)
 * @param {String} objectFit - نحوه نمایش تصویر (cover, contain, fill, etc)
 * @param {String} backgroundColor - رنگ پس‌زمینه (مثال: #ffffff)
 */
const SimpleBanner = ({
  imageUrl = 'Screenshot 2026-05-12 220759.png',
  width = '100',
  height = '200',
  radius = '10',
  marginTop = '0',
  marginBottom = '0',
  alignment = 'center',
  objectFit = 'cover',
  backgroundColor = 'transparent'
}) => {
  // تابع کمکی برای تبدیل URL تصویر
  const getImageUrl = (imagePath) => {
    if (!imagePath) return ''
    if (imagePath.startsWith('http')) return imagePath
    return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${imagePath}`
  }

  // تابع برای تبدیل عرض (بر اساس درصد)
  const getWidthValue = (w) => {
    if (typeof w === 'string') {
      const num = parseFloat(w)
      return `${num}%`
    }
    return `${w}%`
  }

  // تبدیل مقادیر عددی به px
  const numHeight = typeof height === 'string' ? parseFloat(height) : height
  const numRadius = typeof radius === 'string' ? parseFloat(radius) : radius
  const numMarginTop = typeof marginTop === 'string' ? parseFloat(marginTop) : marginTop
  const numMarginBottom = typeof marginBottom === 'string' ? parseFloat(marginBottom) : marginBottom

  // تنظیمات محاذاه
  const containerStyles = {
    display: 'flex',
    justifyContent: alignment === 'center' ? 'center' : 'flex-start',
    paddingTop: `${numMarginTop}px`,
    paddingBottom: `${numMarginBottom}px`,
    backgroundColor: backgroundColor
  }

  const bannerStyles = {
    position: 'relative',
    width: getWidthValue(width),
    height: `${numHeight}px`,
    borderRadius: `${numRadius}px`,
    overflow: 'hidden'
  }

  return (
    <div style={containerStyles}>
      <div style={bannerStyles}>
        <Image 
          alt='بنر'
          fill
          src={getImageUrl(imageUrl)}
          style={{ objectFit: objectFit }}
        />
      </div>
    </div>
  )
}

export default SimpleBanner