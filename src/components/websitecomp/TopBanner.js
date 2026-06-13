'use client'

import React from 'react'
import Link from 'next/link'
import { motion, useAnimationControls, useInView } from 'framer-motion'

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

const TopBanner = ({
  viewport = 'auto',
  imageUrl = '1754571019-burger.webp',
  title = 'تخفیف ویژه تابستانه',
  subtitle = 'بهترین محصولات با ارسال سریع و قیمت رقابتی',
  primaryButtonText = 'مشاهده محصولات',
  primaryButtonLink = '#',
  secondaryButtonText = 'مشاهده دسته بندی ها',
  secondaryButtonLink = '#',
  overlayOpacity = '0.45',
  height = '420',
  heightMobile = '300',
  titleColor = '#ffffff',
  subtitleColor = '#f3f4f6',
  primaryButtonBg = '#f97316',
  primaryButtonTextColor = '#ffffff',
  secondaryButtonBg = 'transparent',
  secondaryButtonTextColor = '#ffffff',
  secondaryButtonBorderColor = '#ffffff',
  bgPosition = 'center',
  animationEnabled = 'false',
  sectionAnimationType = 'fade',
  sectionAnimationDelay = '0.05',
  sectionAnimationDuration = '0.75',
  titleAnimationType = 'slideUp',
  titleAnimationDelay = '0.15',
  titleAnimationDuration = '0.7',
  subtitleAnimationType = 'fade',
  subtitleAnimationDelay = '0.25',
  subtitleAnimationDuration = '0.7',
  buttonsAnimationType = 'zoomIn',
  buttonsAnimationDelay = '0.35',
  buttonsAnimationDuration = '0.65'
}) => {
  const sectionRef = React.useRef(null)
  const animationControls = useAnimationControls()
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.35,
    margin: '0px 0px -10% 0px'
  })

  React.useEffect(() => {
    if (isInView) {
      animationControls.start('visible')
    }
  }, [isInView, animationControls])

  const isMobile = viewport === 'mobile'
  const isDesktop = viewport === 'desktop'
  const isAnimationEnabled = animationEnabled === true || animationEnabled === 'true'

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/assets/images/test.png'
    if (imagePath.startsWith('http')) return imagePath
    return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}uploads/${imagePath}`
  }

  const parsedOpacity = parseFloat(overlayOpacity)
  const safeOpacity = Number.isNaN(parsedOpacity)
    ? 0.45
    : Math.min(Math.max(parsedOpacity, 0), 0.9)

  const parsedDesktopHeight = parseFloat(height)
  const parsedMobileHeight = parseFloat(heightMobile)
  const safeDesktopHeight = Number.isNaN(parsedDesktopHeight) ? 420 : parsedDesktopHeight
  const safeMobileHeight = Number.isNaN(parsedMobileHeight) ? 300 : parsedMobileHeight
  const currentHeight = isMobile
    ? `${safeMobileHeight}px`
    : isDesktop
      ? `${safeDesktopHeight}px`
      : `clamp(${safeMobileHeight}px, 55vw, ${safeDesktopHeight}px)`

  const parseTiming = (value, fallback) => {
    const parsed = Number.parseFloat(value)
    if (Number.isNaN(parsed)) return fallback
    return Math.max(0, parsed)
  }

  const getMotionConfig = (type, delayValue, durationValue) => {
    const normalizedType = isAnimationEnabled ? type : 'none'
    const preset = ANIMATION_PRESETS[normalizedType] || ANIMATION_PRESETS.fade
    return {
      initial: 'hidden',
      animate: animationControls,
      variants: preset,
      transition: {
        delay: parseTiming(delayValue, 0),
        duration: parseTiming(durationValue, 0.75),
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const sectionMotion = getMotionConfig(sectionAnimationType, sectionAnimationDelay, sectionAnimationDuration)
  const titleMotion = getMotionConfig(titleAnimationType, titleAnimationDelay, titleAnimationDuration)
  const subtitleMotion = getMotionConfig(subtitleAnimationType, subtitleAnimationDelay, subtitleAnimationDuration)
  const buttonsMotion = getMotionConfig(buttonsAnimationType, buttonsAnimationDelay, buttonsAnimationDuration)

  return (
    <section ref={sectionRef} className="w-full px-2 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-5">
      <motion.div
        className="relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl"
        style={{
          minHeight: currentHeight,
          backgroundImage: `url(${getImageUrl(imageUrl)})`,
          backgroundSize: 'cover',
          backgroundPosition: bgPosition,
          backgroundRepeat: 'no-repeat'
        }}
        {...sectionMotion}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `rgba(0, 0, 0, ${safeOpacity})` }}
        />

        <div className="relative z-10 flex min-h-[inherit] items-center justify-center px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-14">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <motion.h2
              className={`${isMobile ? 'text-3xl' : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'} danaBold leading-tight`}
              style={{ color: titleColor }}
              {...titleMotion}
            >
              {title}
            </motion.h2>

            <motion.p
              className={`${isMobile ? 'mt-3 text-sm leading-6' : 'mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-6 sm:leading-7'} danaMed max-w-2xl`}
              style={{ color: subtitleColor }}
              {...subtitleMotion}
            >
              {subtitle}
            </motion.p>

            <motion.div className={`mt-6 sm:mt-7 flex ${isMobile ? 'w-full flex-col gap-3' : 'w-full sm:w-auto flex-col sm:flex-row gap-3 sm:gap-4'}`} {...buttonsMotion}>
              <Link
                href={primaryButtonLink || '#'}
                className="w-full sm:w-auto text-center rounded-lg px-5 sm:px-7 py-2.5 sm:py-3 text-sm sm:text-base danaBold transition-all hover:opacity-90"
                style={{
                  backgroundColor: primaryButtonBg,
                  color: primaryButtonTextColor
                }}
              >
                {primaryButtonText}
              </Link>

              <Link
                href={secondaryButtonLink || '#'}
                className="w-full sm:w-auto text-center rounded-lg border px-5 sm:px-7 py-2.5 sm:py-3 text-sm sm:text-base danaBold transition-all hover:bg-white/10"
                style={{
                  backgroundColor: secondaryButtonBg,
                  color: secondaryButtonTextColor,
                  borderColor: secondaryButtonBorderColor
                }}
              >
                {secondaryButtonText}
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default TopBanner