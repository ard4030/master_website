'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useViewportMotion } from './animationUtils'

// آیکون‌های SVG حرفه‌ای
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.29h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.96-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.92 16.92z"/>
  </svg>
)
const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)
const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)
const ChevronLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6"/>
  </svg>
)

const Footer2 = ({
  bgColor = '#1f2937',
  textColor = '#d1d5db',
  brandName = 'برند شما',
  brandDesc = 'ما با افتخار بهترین محصولات را به شما ارائه می‌دهیم.',
  phone = '', email = '', address = '',
  copyright = 'تمامی حقوق محفوظ است.',
  quickLink1Text = 'صفحه اصلی', quickLink1Href = '/',
  quickLink2Text = 'محصولات',     quickLink2Href = '/products',
  quickLink3Text = 'دسته‌بندی‌ها',  quickLink3Href = '/categories',
  quickLink4Text = '',             quickLink4Href = '',
  quickLink5Text = '',             quickLink5Href = '',
  trustLogos = [],
  logo1Src = '', logo1Link = '#',
  logo2Src = '', logo2Link = '#',
  logo3Src = '', logo3Link = '#',
  logo4Src = '', logo4Link = '#',
  logo5Src = '', logo5Link = '#',
  largeTextColor = '#111827',
  smallTextColor = '#111827',
  animationEnabled = 'false',
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
    if (!src) return '/assets/images/test.png'
    if (src.startsWith('http')) return src
    return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${src}`
  }

  const legacyTrustLogos = [
    { src: logo1Src, link: logo1Link },
    { src: logo2Src, link: logo2Link },
    { src: logo3Src, link: logo3Link },
    { src: logo4Src, link: logo4Link },
    { src: logo5Src, link: logo5Link },
  ].filter(l => l.src)

  const normalizedTrustLogos = Array.isArray(trustLogos)
    ? trustLogos
        .map((item) => {
          if (typeof item === 'string') return { src: item, link: '#' }
          return {
            src: item?.src || item?.logo || item?.image || item?.imageUrl || item?.url || item?.path || '',
            link: item?.link || item?.href || '#'
          }
        })
        .filter((item) => item.src)
    : []

  const quickLinks = [
    { text: quickLink1Text, href: quickLink1Href },
    { text: quickLink2Text, href: quickLink2Href },
    { text: quickLink3Text, href: quickLink3Href },
    { text: quickLink4Text, href: quickLink4Href },
    { text: quickLink5Text, href: quickLink5Href },
  ].filter(l => l.text && l.href)

  const accentColor = 'rgba(255,255,255,0.15)'
  const sectionMotion = motionProps
  const wrapperPadCls = 'px-4 md:px-8 py-10 md:py-14'
  const colsGridCls = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
  const colsGapCls = 'gap-8 md:gap-12'
  const sectionGapCls = 'gap-4'
  const brandTitleCls = 'text-xl'
  const descTextCls = 'text-sm leading-7'
  const headingCls = 'text-base'
  const bodyTextCls = 'text-sm'
  const quickLinkTextCls = 'text-sm'
  const trustSectionSpacing = 'pb-4'
  const trustGridCls = 'gap-4 grid-cols-8'
  const logoBoxSizeCls = 'col-span-2 sm:col-span-1'
  const resolvedLargeTextColor = largeTextColor || textColor
  const resolvedSmallTextColor = smallTextColor || textColor
  const resolvedTrustLogos = [...normalizedTrustLogos, ...legacyTrustLogos].filter((item) => item?.src)
  const isMobile = false
  const isAnimationEnabled = animationEnabled === true || animationEnabled === 'true'
  const appliedSectionMotion = isAnimationEnabled ? sectionMotion : {}

  return (
    <motion.footer ref={sectionRef} dir="rtl" style={{ backgroundColor: bgColor, color: textColor }} className="dana w-full" {...appliedSectionMotion}>
      <div className={`max-w-7xl mx-auto ${wrapperPadCls}`}>
        <div className={`grid ${colsGridCls} ${colsGapCls} ${isMobile ? 'mb-7' : 'mb-10'}`}>

          {/* ستون اول: برند + لوگوها */}
          <div className={`flex flex-col ${sectionGapCls}`}>
            <h3 className={`danaBold ${brandTitleCls}`} style={{ color: resolvedLargeTextColor }}>{brandName}</h3>
            <p className={`${descTextCls} danaMed`} style={{ color: resolvedSmallTextColor, opacity: 0.85 }}>{brandDesc}</p>

          </div>

          {/* ستون دوم: تماس */}
          <div className={`flex flex-col ${sectionGapCls}`}>
            <h4 className={`danaBold ${headingCls}`} style={{ color: resolvedLargeTextColor }}>تماس با ما</h4>
            <div className={`flex flex-col gap-3 ${bodyTextCls} danaMed`} style={{ color: resolvedSmallTextColor, opacity: 0.9 }}>
              {phone && (
                <div className="flex items-center gap-2.5">
                  <span className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                    <PhoneIcon />
                  </span>
                  <span>{phone}</span>
                </div>
              )}
              {email && (
                <div className="flex items-center gap-2.5">
                  <span className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                    <EmailIcon />
                  </span>
                  <span dir="ltr">{email}</span>
                </div>
              )}
              {address && (
                <div className="flex items-start gap-2.5">
                  <span className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5" style={{ backgroundColor: accentColor }}>
                    <MapPinIcon />
                  </span>
                  <span className="leading-6">{address}</span>
                </div>
              )}
              {!phone && !email && !address && (
                <p style={{ color: resolvedSmallTextColor, opacity: 0.5 }} className="text-xs">اطلاعات تماس وارد نشده</p>
              )}
            </div>
          </div>

          {/* ستون سوم: دسترسی سریع */}
          <div className={`flex flex-col ${sectionGapCls}`}>
            <h4 className={`danaBold ${headingCls}`} style={{ color: resolvedLargeTextColor }}>دسترسی سریع</h4>
            <div className="flex flex-col gap-1">
              {quickLinks.length > 0 ? quickLinks.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className={`flex items-center gap-2 ${quickLinkTextCls} danaMed py-1.5 transition-all group`}
                  style={{ color: resolvedSmallTextColor, opacity: 0.9 }}
                >
                  <span className="shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                    <ChevronLeftIcon />
                  </span>
                  <span className="group-hover:opacity-100 transition-opacity">{item.text}</span>
                </Link>
              )) : (
                <p style={{ color: resolvedSmallTextColor, opacity: 0.5 }} className="text-xs danaMed">لینکی تعریف نشده</p>
              )}
            </div>
          </div>

        </div>

        <div className={`w-full ${trustSectionSpacing}`}>
            {resolvedTrustLogos.length > 0 && (
              <div className={`grid ${trustGridCls} items-stretch justify-start mt-1`}>
                {resolvedTrustLogos.map((logo, i) => (
                  <a
                    key={i}
                    href={logo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center rounded-xl p-2 min-w-14 min-h-14 transition-all hover:scale-105 ${logoBoxSizeCls}`}
                    style={{ backgroundColor: accentColor }}
                  >
                    <img
                      src={getImageUrl(logo.src)}
                      alt={`trust-logo-${i + 1}`}
                      className="w-full h-full max-h-28 object-contain rounded-md"
                    />
                  </a>
                ))}
              </div>
            )}
        </div>

        {/* خط جداکننده + کپی‌رایت */}
        <div className="border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <p className="text-xs danaMed text-center" style={{ color: resolvedSmallTextColor, opacity: 0.65 }}>{copyright}</p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer2


