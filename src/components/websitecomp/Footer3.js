'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useViewportMotion } from './animationUtils'

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.29h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.96-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.92 16.92z" />
  </svg>
)

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const Footer3 = ({
  bgColor = '#f5f5f5',
  textColor = '#444444',
  titleColor = '#222222',
  sectionBg = '#ffffff',
  copyright = 'تمام حقوق این وب سایت متعلق به ابزار محسین است',
  mapSrc = '',
  mapAlt = 'نقشه',
  mapLink = '',
  quickLink1Text = 'صفحه اصلی', quickLink1Href = '/',
  quickLink2Text = 'راهنمای خرید', quickLink2Href = '/guide',
  quickLink3Text = 'روش های پرداخت', quickLink3Href = '/payment',
  quickLink4Text = 'درباره ما', quickLink4Href = '/about',
  quickLink5Text = 'تماس با ما', quickLink5Href = '/contact',
  address = 'آدرس شما',
  email = '',
  phone1 = '',
  phone2 = '',
  trustLogo1Src = '', trustLogo1Link = '#',
  trustLogo2Src = '', trustLogo2Link = '#',
  trustLogo3Src = '', trustLogo3Link = '#',
  trustLogo4Src = '', trustLogo4Link = '#',
  trustLogo5Src = '', trustLogo5Link = '#',
  sectionAnimationType = 'fade',
  sectionAnimationDelay = '0.05',
  sectionAnimationDuration = '0.7'
}) => {
  const { sectionRef, motionProps } = useViewportMotion({
    animationType: sectionAnimationType,
    animationDelay: sectionAnimationDelay,
    animationDuration: sectionAnimationDuration,
    amount: 0.2
  })

  const getImageUrl = (src) => {
    if (!src) return ''
    if (src.startsWith('http')) return src
    return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${src}`
  }

  const quickLinks = [
    { text: quickLink1Text, href: quickLink1Href },
    { text: quickLink2Text, href: quickLink2Href },
    { text: quickLink3Text, href: quickLink3Href },
    { text: quickLink4Text, href: quickLink4Href },
    { text: quickLink5Text, href: quickLink5Href },
  ].filter((item) => item.text && item.href)

  const trustLogos = [
    { src: trustLogo1Src, href: trustLogo1Link },
    { src: trustLogo2Src, href: trustLogo2Link },
    { src: trustLogo3Src, href: trustLogo3Link },
    { src: trustLogo4Src, href: trustLogo4Link },
    { src: trustLogo5Src, href: trustLogo5Link },
  ].filter((item) => item.src)

  const renderAnyLink = (item, className = '') => {
    if (item.href.startsWith('/')) {
      return (
        <Link href={item.href} className={className}>
          {item.text}
        </Link>
      )
    }

    return (
      <a href={item.href} className={className} target="_blank" rel="noopener noreferrer">
        {item.text}
      </a>
    )
  }

  return (
    <motion.footer ref={sectionRef} dir="rtl" className="w-full dana" style={{ backgroundColor: bgColor }} {...motionProps}>
      <div className="max-w-7xl mx-auto px-3 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
        <div
          className="rounded-[18px] border overflow-hidden"
          style={{ backgroundColor: sectionBg, borderColor: 'rgba(0,0,0,0.08)' }}
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-5 lg:grid-cols-[1.1fr_3fr] lg:gap-8">
            <div className="h-full min-h-65 border-l" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
              {mapSrc ? (
                mapLink ? (
                  <a href={mapLink} target="_blank" rel="noopener noreferrer" className="block h-full">
                    <img src={getImageUrl(mapSrc)} alt={mapAlt} className="h-full w-full object-cover" />
                  </a>
                ) : (
                  <img src={getImageUrl(mapSrc)} alt={mapAlt} className="h-full w-full object-cover" />
                )
              ) : (
                <div className="h-full w-full flex items-center justify-center text-sm danaMed" style={{ color: '#8a8a8a' }}>
                  تصویر نقشه تنظیم نشده
                </div>
              )}
            </div>

            <div className="p-5 md:p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
                <div className="flex flex-col gap-4">
                  <h3 className="danaBold text-lg" style={{ color: titleColor }}>ارتباط با ما</h3>
                  <div className="flex flex-col gap-2.5 text-sm danaMed" style={{ color: textColor }}>
                    <p className="leading-7">{address || 'آدرس تنظیم نشده'}</p>
                    {email && (
                      <a href={`mailto:${email}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity" dir="ltr">
                        <EmailIcon />
                        <span>{email}</span>
                      </a>
                    )}
                    {phone1 && (
                      <a href={`tel:${phone1}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity" dir="ltr">
                        <PhoneIcon />
                        <span>{phone1}</span>
                      </a>
                    )}
                    {phone2 && (
                      <a href={`tel:${phone2}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity" dir="ltr">
                        <LocationIcon />
                        <span>{phone2}</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="danaBold text-lg" style={{ color: titleColor }}>دسترسی سریع</h3>
                  <div className="flex flex-col gap-2 text-sm danaMed" style={{ color: textColor }}>
                    {quickLinks.length > 0 ? quickLinks.map((item, index) => (
                      <div key={index}>{renderAnyLink(item, 'hover:opacity-80 transition-opacity')}</div>
                    )) : (
                      <p className="text-xs" style={{ color: '#9b9b9b' }}>لینکی ثبت نشده</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="danaBold text-lg" style={{ color: titleColor }}>نماد تضمین</h3>
                  <div className="grid grid-cols-2 gap-3 justify-center md:justify-start">
                    {trustLogos.length > 0 ? trustLogos.map((logo, index) => (
                      <a
                        key={index}
                        href={logo.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-27.5 h-27.5 rounded-xl border p-2 flex items-center justify-center bg-white"
                        style={{ borderColor: 'rgba(0,0,0,0.1)' }}
                      >
                        <img src={getImageUrl(logo.src)} alt={`trust-${index + 1}`} className="max-w-full max-h-full object-contain" />
                      </a>
                    )) : (
                      <p className="text-xs danaMed col-span-2" style={{ color: '#9b9b9b' }}>نماد اعتماد ثبت نشده</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs danaMed mt-4" style={{ color: '#8f8f8f' }}>
          {copyright}
        </p>
      </div>
    </motion.footer>
  )
}

export default Footer3