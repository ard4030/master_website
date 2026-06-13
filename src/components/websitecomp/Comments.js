'use client'

import React from 'react'
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

const Comments = ({
  viewport = 'desktop',
  badgeText = 'نظرات مشتریان',
  title = 'چرا کسب وکارها عاشق راهکارهای هوش مصنوعی ما هستند',
  subtitle = 'نتایج واقعی از کسب وکارهای واقعی با اتوماسیون هوشمند',
  sectionBg = '#03060d',
  cardBg = '#070b14',
  cardBorder = '#1f2937',
  titleColor = '#f8fafc',
  subtitleColor = '#cbd5e1',
  cardTextColor = '#e5e7eb',
  cardMutedTextColor = '#a9b4c8',
  starColor = '#ffffff',
  cardRadius = '10',
  imageSize = '42',
  card1Rating = '5',
  card1Text = 'اتوماسیون هوشمند باعث شد کارهای تکراری ما حذف شود و تمرکز تیم روی رشد فروش قرار بگیرد. سرعت اجرای فرآیندها عالی شده است.',
  card1Name = 'علی رضایی',
  card1Role = 'مدیرعامل - تک فلو',
  card1Image = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
  card2Rating = '5',
  card2Text = 'با کمک AI، خطاهای دستی ما کمتر شد و دقت عملیات بالا رفت. حالا تیم روی کارهای مهم تر تمرکز می کند.',
  card2Name = 'سارا محمدی',
  card2Role = 'مدیر عملیات - نکسا',
  card2Image = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  card3Rating = '5',
  card3Text = 'تحلیل های هوشمند نرخ تبدیل ما را افزایش داد و تیم فروش دقیقا می داند چه زمانی با مشتری ارتباط بگیرد.',
  card3Name = 'داوود کاظمی',
  card3Role = 'مدیر فروش - گروث پیک',
  card3Image = 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=200&q=80',
  card4Rating = '5',
  card4Text = 'پشتیبانی مشتریان بسیار سریع تر شده و رضایت کاربران به شکل محسوسی بالا رفته است. تجربه بسیار خوبی داشتیم.',
  card4Name = 'امیلی ونگ',
  card4Role = 'مدیر موفقیت مشتری - ساپورت لایو',
  card4Image = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  animationEnabled = 'false',
  sectionAnimationType = 'fade',
  sectionAnimationDelay = '0',
  sectionAnimationDuration = '0.8',
  headerAnimationType = 'slideUp',
  headerAnimationDelay = '0.1',
  headerAnimationDuration = '0.8',
  cardAnimationType = 'zoomIn',
  cardAnimationDelay = '0.2',
  cardAnimationDuration = '0.75'
}) => {
  const sectionRef = React.useRef(null)
  const animationControls = useAnimationControls()
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.3,
    margin: '0px 0px -10% 0px'
  })

  React.useEffect(() => {
    if (isInView) {
      animationControls.start('visible')
    }
  }, [isInView, animationControls])

  const isMobile = viewport === 'mobile'
  const isTablet = viewport === 'tablet'
  const isAnimationEnabled = animationEnabled === true || animationEnabled === 'true'

  const parseTiming = (value, fallback) => {
    const parsed = Number.parseFloat(value)
    if (Number.isNaN(parsed)) return fallback
    return Math.max(0, parsed)
  }

  const getMotionConfig = (type, delayValue, durationValue, extraDelay = 0) => {
    if (!isAnimationEnabled) {
      return {
        initial: false,
        animate: false
      }
    }

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

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/assets/images/test.png'
    if (imagePath.startsWith('http')) return imagePath
    return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}uploads/${imagePath}`
  }

  const cardRadiusNum = Number.parseFloat(cardRadius)
  const safeCardRadius = Number.isNaN(cardRadiusNum) ? 10 : cardRadiusNum
  const imageSizeNum = Number.parseFloat(imageSize)
  const safeImageSize = Number.isNaN(imageSizeNum) ? 42 : imageSizeNum

  const cards = [
    {
      rating: card1Rating,
      text: card1Text,
      name: card1Name,
      role: card1Role,
      image: card1Image
    },
    {
      rating: card2Rating,
      text: card2Text,
      name: card2Name,
      role: card2Role,
      image: card2Image
    },
    {
      rating: card3Rating,
      text: card3Text,
      name: card3Name,
      role: card3Role,
      image: card3Image
    },
    {
      rating: card4Rating,
      text: card4Text,
      name: card4Name,
      role: card4Role,
      image: card4Image
    }
  ]

  const responsiveColumnsClass = isMobile
    ? 'grid-cols-1'
    : isTablet
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1 md:grid-cols-2'
  const titleSizeClass = isMobile
    ? 'text-2xl leading-9 sm:text-3xl sm:leading-10'
    : 'text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl'
  const sectionMotion = getMotionConfig(sectionAnimationType, sectionAnimationDelay, sectionAnimationDuration)
  const headerMotion = getMotionConfig(headerAnimationType, headerAnimationDelay, headerAnimationDuration)
  const badgeMotion = getMotionConfig(headerAnimationType, headerAnimationDelay, headerAnimationDuration, 0.04)
  const titleMotion = getMotionConfig(headerAnimationType, headerAnimationDelay, headerAnimationDuration, 0.1)
  const subtitleMotion = getMotionConfig(headerAnimationType, headerAnimationDelay, headerAnimationDuration, 0.16)
  const cardMotion = (index) => getMotionConfig(cardAnimationType, cardAnimationDelay, cardAnimationDuration, index * 0.08)

  return (
    <motion.section ref={sectionRef} className="w-full px-3 py-7 sm:px-4 sm:py-8 md:px-6 md:py-12" style={{ backgroundColor: sectionBg }} {...sectionMotion}>
      <div className="mx-auto max-w-7xl" dir="rtl">
        <motion.div className="mb-8 flex flex-col items-center text-center md:mb-12" {...headerMotion}>
          <motion.span
            className="rounded-lg border px-3 py-1 text-sm danaMed"
            style={{ borderColor: cardBorder, color: subtitleColor, backgroundColor: cardBg }}
            {...badgeMotion}
          >
            {badgeText}
          </motion.span>
          <motion.h2 className={`mt-5 max-w-4xl danaBold ${titleSizeClass}`} style={{ color: titleColor }} {...titleMotion}>
            {title}
          </motion.h2>
          <motion.p className="mt-3 max-w-2xl text-sm leading-7 danaMed sm:mt-4 sm:text-base" style={{ color: subtitleColor }} {...subtitleMotion}>
            {subtitle}
          </motion.p>
        </motion.div>

        <div className={`grid gap-3 sm:gap-4 ${responsiveColumnsClass}`}>
          {cards.map((item, index) => {
            const rawRating = Number.parseInt(item.rating, 10)
            const rating = Number.isNaN(rawRating) ? 5 : Math.min(Math.max(rawRating, 1), 5)

            return (
              <motion.article
                key={index}
                className="border p-5 md:p-6"
                style={{
                  borderColor: cardBorder,
                  borderRadius: `${safeCardRadius}px`,
                  background: `linear-gradient(135deg, ${cardBg} 0%, ${cardBg} 72%, rgba(96, 44, 255, 0.22) 100%)`
                }}
                {...cardMotion(index)}
              >
                <div className="mb-3 flex items-center gap-1 sm:mb-4">
                  {Array.from({ length: rating }).map((_, starIndex) => (
                    <span key={starIndex} style={{ color: starColor }} className="text-lg leading-none">★</span>
                  ))}
                </div>

                <p className="min-h-24 text-base leading-8 danaMed sm:min-h-28 sm:text-lg" style={{ color: cardTextColor }}>
                  "{item.text}"
                </p>

                <div className="mt-5 flex items-center gap-3">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    className="rounded-full object-cover"
                    style={{ width: `${safeImageSize}px`, height: `${safeImageSize}px` }}
                  />
                  <div>
                    <p className="text-base danaBold sm:text-lg" style={{ color: titleColor }}>{item.name}</p>
                    <p className="text-sm danaMed" style={{ color: cardMutedTextColor }}>{item.role}</p>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}

export default Comments

