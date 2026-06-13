'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useViewportMotion } from './animationUtils'

/**
 * کامپوننت بنر ساده
 * @param {String} imageUrl - آدرس تصویر
 * @param {Number} width - عرض (درصد، مثال: 80)
 * @param {Number} height - ارتفاع دسکتاپ (پیکسل، مثال: 200)
 * @param {Number} heightMobile - ارتفاع موبایل (پیکسل، مثال: 150)
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
  heightMobile = '150',
  radius = '10',
  marginTop = '0',
  marginBottom = '0',
  alignment = 'center',
  objectFit = 'cover',
  backgroundColor = 'transparent',
  sectionAnimationType = 'fade',
  sectionAnimationDelay = '0.05',
  sectionAnimationDuration = '0.7'
}) => {
  const [isMobile, setIsMobile] = useState(false)
  const { sectionRef, motionProps } = useViewportMotion({
    animationType: sectionAnimationType,
    animationDelay: sectionAnimationDelay,
    animationDuration: sectionAnimationDuration,
    amount: 0.2
  })

  useEffect(() => {
    setIsMobile(window?.innerWidth < 768)
    const handleResize = () => setIsMobile(window?.innerWidth < 768)
    window?.addEventListener('resize', handleResize)
    return () => window?.removeEventListener('resize', handleResize)
  }, [])
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
  const numHeightMobile = typeof heightMobile === 'string' ? parseFloat(heightMobile) : heightMobile
  const numRadius = typeof radius === 'string' ? parseFloat(radius) : radius
  const numMarginTop = typeof marginTop === 'string' ? parseFloat(marginTop) : marginTop
  const numMarginBottom = typeof marginBottom === 'string' ? parseFloat(marginBottom) : marginBottom

  // استفاده از ارتفاع موبایلی یا دسکتاپی بر اساس screen size
  const currentHeight = isMobile ? numHeightMobile : numHeight

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
    height: `${currentHeight}px`,
    borderRadius: `${numRadius}px`,
    overflow: 'hidden'
  }

  return (
    <motion.div ref={sectionRef} style={containerStyles} {...motionProps}>
      <div style={bannerStyles}>
        <Image 
          alt='بنر'
          fill
          src={getImageUrl(imageUrl)}
          style={{ objectFit: objectFit }}
        />
      </div>
    </motion.div>
  )
}

export default SimpleBanner