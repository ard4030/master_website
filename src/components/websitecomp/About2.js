'use client'

import React from 'react'
import Link from 'next/link'
import { motion, useAnimationControls, useInView } from 'framer-motion'
import Image from 'next/image'

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

const About2 = ({
  sectionBg = '#02060d',
  cardBg = '#040912',
  imageUrl = 'https://images.unsplash.com/photo-1584178733733-680eeb6f2dd8?auto=format&fit=crop&w=1200&q=80',
  imageOverlayOpacity = '0.25',
  brandText = 'Logoipsum',
  title = 'AI-driven forecasting cut inventory waste by 40% for TrailForge',
  description = 'TrailForge, a suitcase brand, faced stock issues and inefficiencies. Our AI forecasting optimized inventory and production cycles, helping them save costs and deliver faster.',
  impactTitle = 'Impact:',
  impact1 = '40% Less Inventory Waste',
  impact2 = '35% Faster Production',
  impact3 = '20% More Accurate Forecasting',
  impact4 = '25% Faster Fulfillment',
  ctaText = 'DRAG TO EXPLORE',
  ctaLink = '#',
  titleColor = '#f5f7fb',
  textColor = '#c8d0dd',
  accentColor = '#ffffff',
  cardRadius = '20',
  imageRadius = '14',
  sectionMaxWidth = '1200',
  imageAnimationType = 'slideRight',
  imageAnimationDelay = '0.05',
  imageAnimationDuration = '0.75',
  contentAnimationType = 'none',
  contentAnimationDelay = '0',
  contentAnimationDuration = '0.6',
  brandAnimationType = 'slideUp',
  brandAnimationDelay = '0.2',
  brandAnimationDuration = '0.65',
  titleAnimationType = 'slideUp',
  titleAnimationDelay = '0.3',
  titleAnimationDuration = '0.7',
  descriptionAnimationType = 'fade',
  descriptionAnimationDelay = '0.45',
  descriptionAnimationDuration = '0.7',
  impactAnimationType = 'slideLeft',
  impactAnimationDelay = '0.55',
  impactAnimationDuration = '0.7',
  ctaAnimationType = 'zoomIn',
  ctaAnimationDelay = '0.75',
  ctaAnimationDuration = '0.65'
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

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/assets/images/test.png'
    if (imagePath.startsWith('http')) return imagePath
    return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}uploads/${imagePath}`
  }

  const overlay = Number.parseFloat(imageOverlayOpacity)
  const safeOverlay = Number.isNaN(overlay) ? 0.25 : Math.max(0, Math.min(overlay, 0.85))
  const parsedCardRadius = Number.parseFloat(cardRadius)
  const safeCardRadius = Number.isNaN(parsedCardRadius) ? 20 : parsedCardRadius
  const parsedImageRadius = Number.parseFloat(imageRadius)
  const safeImageRadius = Number.isNaN(parsedImageRadius) ? 14 : parsedImageRadius
  const parsedSectionMax = Number.parseFloat(sectionMaxWidth)
  const safeSectionMax = Number.isNaN(parsedSectionMax) ? 1200 : parsedSectionMax

  const impacts = [impact1, impact2, impact3, impact4].filter(Boolean)

  const parseTiming = (value, fallback) => {
    const parsed = Number.parseFloat(value)
    if (Number.isNaN(parsed)) return fallback
    return Math.max(0, parsed)
  }

  const getMotionConfig = (type, delayValue, durationValue) => {
    const preset = ANIMATION_PRESETS[type] || ANIMATION_PRESETS.fade
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

  const imageMotion = getMotionConfig(imageAnimationType, imageAnimationDelay, imageAnimationDuration)
  const contentMotion = getMotionConfig(contentAnimationType, contentAnimationDelay, contentAnimationDuration)
  const brandMotion = getMotionConfig(brandAnimationType, brandAnimationDelay, brandAnimationDuration)
  const titleMotion = getMotionConfig(titleAnimationType, titleAnimationDelay, titleAnimationDuration)
  const descriptionMotion = getMotionConfig(descriptionAnimationType, descriptionAnimationDelay, descriptionAnimationDuration)
  const impactMotion = getMotionConfig(impactAnimationType, impactAnimationDelay, impactAnimationDuration)
  const ctaMotion = getMotionConfig(ctaAnimationType, ctaAnimationDelay, ctaAnimationDuration)

  return (
    <section ref={sectionRef} className="w-full px-3 py-6 md:px-6 md:py-10" style={{ backgroundColor: sectionBg }}>
      <div className="mx-auto" style={{ maxWidth: `${safeSectionMax}px` }}>
        <div
          className="relative overflow-hidden border border-white/10 p-4 sm:p-5 lg:p-7"
          style={{
            backgroundColor: cardBg,
            borderRadius: `${safeCardRadius}px`
          }}
        >
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-12">
            <motion.div
              className="relative col-span-1 min-h-65 md:col-span-6 md:min-h-90"
              {...imageMotion}
            >
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  borderRadius: `${safeImageRadius}px`
                }}
              >
                <Image
                  src={getImageUrl(imageUrl)}
                  alt={brandText || 'about image'}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: `rgba(0, 0, 0, ${safeOverlay})` }}
                />
              </div>
            </motion.div>

            <motion.div
              className="col-span-1 flex flex-col justify-center md:col-span-6"
              {...contentMotion}
            >
              <motion.p className="danaBold text-lg" style={{ color: accentColor }} {...brandMotion}>
                {brandText}
              </motion.p>

              <motion.h2
                className="mt-3 text-2xl leading-9 danaBold sm:mt-4 sm:text-3xl sm:leading-[1.4]"
                style={{ color: titleColor }}
                {...titleMotion}
              >
                {title}
              </motion.h2>

              <motion.p
                className="mt-3 text-sm leading-7 danaMed sm:mt-4 sm:text-base sm:leading-8"
                style={{ color: textColor }}
                {...descriptionMotion}
              >
                {description}
              </motion.p>

              <motion.p className="mt-5 danaBold text-lg" style={{ color: titleColor }} {...impactMotion}>
                {impactTitle}
              </motion.p>

              <motion.ul className="mt-3 list-disc space-y-2 pr-5" style={{ color: titleColor }} {...impactMotion}>
                {impacts.map((item, index) => (
                  <li key={index} className="danaMed text-base">
                    {item}
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          </div>

          <motion.div className="mt-6 flex items-center justify-center" {...ctaMotion}>
            <Link
              href={ctaLink || '#'}
              className="inline-flex items-center gap-3 text-sm tracking-wide transition-opacity hover:opacity-80"
              style={{ color: accentColor }}
            >
              <span>{'<-'}</span>
              <span className="danaBold">{ctaText}</span>
              <span>{'->'}</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About2

