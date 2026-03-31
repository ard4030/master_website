'use client'

import React, { useState } from 'react'
import Link from 'next/link'

/**
 * کامپوننت بخش درباره من
 * @param {String} subtitle - زیرعنوان
 * @param {String} title - عنوان اصلی
 * @param {String} description - توضیحات
 * @param {String} imageUrl - آدرس تصویر
 * @param {String} ctaText - متن دکمه اصلی
 * @param {String} ctaLink - لینک دکمه اصلی
 * @param {String} secondaryCtaText - متن دکمه ثانویه
 * @param {String} secondaryCtaLink - لینک دکمه ثانویه
 */
const AboutMe = ({
  subtitle = '100% html5 bootstrap templates Made by colorib.com',
  title = 'a Designer',
  description = 'با تجربه بیش از 10 سال در طراحی و توسعه، من به تیم‌ها کمک می‌کنم تا محصولات فوق‌العاده بسازند.',
  imageUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=700&fit=crop',
  ctaText = 'VIEW PORTFOLIO',
  ctaLink = '#',
  secondaryCtaText = 'با من تماس بگیرید',
  secondaryCtaLink = '#'
}) => {
  const [activeSlide, setActiveSlide] = useState(0)

  // تابع کمکی برای تبدیل URL تصویر
  const getImageUrl = (imagePath) => {
    if (!imagePath) return ''
    if (imagePath.startsWith('http')) return imagePath
    return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${imagePath}`
  }

  return (
    <div className="w-full bg-white overflow-hidden dana">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-screen lg:min-h-96">
          {/* Left Content - Text Section */}
          <div className="flex flex-col justify-center space-y-6 px-6 sm:px-8 md:px-12 py-12 md:py-20 order-2 lg:order-1">
            {/* Subtitle */}
            <div className="text-sm text-gray-600 tracking-wider font-light leading-relaxed max-w-sm">
              {subtitle}
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight">
              {title}
            </h1>

            {/* Description - Hidden on small screens if not needed */}
            {description && (
              <p className="text-gray-600 text-base leading-relaxed max-w-md hidden md:block">
                {description}
              </p>
            )}

            {/* CTA Button */}
            <div className="flex items-center gap-6 pt-4">
              <Link
                href={ctaLink}
                className="px-6 md:px-8 py-3 border-2 border-black text-black rounded-md font-semibold hover:bg-black hover:text-white transition-colors duration-300 text-sm md:text-base tracking-wider"
              >
                {ctaText}
              </Link>
              
              {/* Navigation Dots */}
              <div className="flex items-center gap-3">
                {[0, 1, 2].map((dot) => (
                  <button
                    key={dot}
                    onClick={() => setActiveSlide(dot)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeSlide === dot 
                        ? 'bg-black w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Slide ${dot + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Image Section */}
          <div className="flex justify-center items-center h-96 lg:h-screen order-1 lg:order-2 bg-white">
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              {imageUrl && (
                <img
                  src={getImageUrl(imageUrl)}
                  alt={title}
                  className="w-full h-full object-cover lg:object-contain"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutMe