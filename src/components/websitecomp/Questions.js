'use client'

import React, { useMemo, useState } from 'react'
import { AnimatePresence, motion, useAnimationControls, useInView } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'

const ANIMATION_PRESETS = {
  none: {
    hidden: { opacity: 1 },
    visible: { opacity: 1 }
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  fadeUp: {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0 }
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

const Questions = ({
  viewport = 'desktop',
  badgeText = 'سوالات متداول',
  title = 'پاسخ سوالاتی که دنبال آن هستید اینجاست',
  subtitle = 'پاسخ سریع به سوالات شما درباره سرویس و اتوماسیون هوشمند',
  sectionBg = '#03060d',
  itemBg = '#080c14',
  titleColor = '#f8fafc',
  subtitleColor = '#cbd5e1',
  questionColor = '#f3f4f6',
  answerColor = '#b7c2d4',
  smallTextColor = '',
  iconColor = '#e5e7eb',
  itemRadius = '10',
  allowMultipleOpen = 'false',
  q1 = 'این سرویس چگونه به افزایش فروش من کمک می کند؟',
  a1 = 'با خودکارسازی فرآیندهای بازاریابی، پاسخ دهی سریع تر به مشتریان و تحلیل هوشمند داده ها، فرصت های فروش بهتر شناسایی می شود و نرخ تبدیل افزایش پیدا می کند.',
  q2 = 'آیا راه اندازی اولیه پیچیده است؟',
  a2 = 'خیر. فرآیند راه اندازی مرحله به مرحله طراحی شده و تیم پشتیبانی در تمام مراحل کنار شماست. در اکثر کسب وکارها استقرار اولیه در زمان کوتاهی انجام می شود.',
  q3 = 'آیا بدون دانش فنی هم می توان از این سیستم استفاده کرد؟',
  a3 = 'بله. پنل کاربری ساده و قابل فهم است و بیشتر تنظیمات بدون نیاز به برنامه نویسی انجام می شود.',
  q4 = 'چه نوع کسب وکارهایی می توانند از این راهکار استفاده کنند؟',
  a4 = 'فروشگاه های اینترنتی، شرکت های خدماتی، استارتاپ ها و مجموعه های سازمانی می توانند متناسب با نیاز خود از این سرویس استفاده کنند.',
  q5 = 'چه نوع پشتیبانی ارائه می دهید؟',
  a5 = 'پشتیبانی شامل راهنمایی راه اندازی، پاسخگویی آنلاین، بررسی خطاها و ارائه پیشنهاد برای بهبود عملکرد سیستم است.',
  animationEnabled = 'false',
  sectionAnimationType = 'fadeUp',
  sectionAnimationDelay = '0',
  sectionAnimationDuration = '0.8',
  headerAnimationType = 'fadeUp',
  headerAnimationDelay = '0.08',
  headerAnimationDuration = '0.7',
  itemAnimationType = 'slideUp',
  itemAnimationDelay = '0.14',
  itemAnimationDuration = '0.62',
  answerAnimationType = 'fade',
  answerAnimationDelay = '0',
  answerAnimationDuration = '0.35'
}) => {
  const sectionRef = React.useRef(null)
  const animationControls = useAnimationControls()
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.25,
    margin: '0px 0px -10% 0px'
  })

  React.useEffect(() => {
    if (isInView) {
      animationControls.start('visible')
    }
  }, [isInView, animationControls])

  const [openIndexes, setOpenIndexes] = useState([])
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

  const sectionMotion = getMotionConfig(sectionAnimationType, sectionAnimationDelay, sectionAnimationDuration)
  const headerMotion = getMotionConfig(headerAnimationType, headerAnimationDelay, headerAnimationDuration)
  const badgeMotion = getMotionConfig(headerAnimationType, headerAnimationDelay, headerAnimationDuration, 0.04)
  const titleMotion = getMotionConfig(headerAnimationType, headerAnimationDelay, headerAnimationDuration, 0.1)
  const subtitleMotion = getMotionConfig(headerAnimationType, headerAnimationDelay, headerAnimationDuration, 0.16)
  const itemMotion = (index) => getMotionConfig(itemAnimationType, itemAnimationDelay, itemAnimationDuration, index * 0.08)
  const answerMotion = getMotionConfig(answerAnimationType, answerAnimationDelay, answerAnimationDuration)

  const faqItems = useMemo(
    () => [
      { question: q1, answer: a1 },
      { question: q2, answer: a2 },
      { question: q3, answer: a3 },
      { question: q4, answer: a4 },
      { question: q5, answer: a5 }
    ].filter((item) => item.question && item.answer),
    [q1, a1, q2, a2, q3, a3, q4, a4, q5, a5]
  )

  const isMobile = viewport === 'mobile'
  const multiple = String(allowMultipleOpen).toLowerCase() === 'true'
  const radius = Number.parseFloat(itemRadius)
  const safeRadius = Number.isNaN(radius) ? 10 : radius

  const resolveColor = (value, fallback) => {
    const raw = String(value ?? '').trim()
    if (!raw) return fallback
    const isHex = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(raw)
    const isRgb = /^rgba?\([^)]*\)$/i.test(raw)
    const isHsl = /^hsla?\([^)]*\)$/i.test(raw)
    const isCssVar = /^var\(--[^)]+\)$/i.test(raw)
    const isNamed = /^[a-z]+$/i.test(raw)
    return isHex || isRgb || isHsl || isCssVar || isNamed ? raw : fallback
  }

  const fallbackAnswerColor = resolveColor(smallTextColor, '#b7c2d4')
  const resolvedAnswerColor = resolveColor(answerColor, fallbackAnswerColor)
  console.log('Resolved answer color:', resolvedAnswerColor,answerColor)
  const answerTextColorClass = `text-[${resolvedAnswerColor}]`

  const toggleItem = (index) => {
    const isOpen = openIndexes.includes(index)
    if (multiple) {
      setOpenIndexes((prev) => (isOpen ? prev.filter((i) => i !== index) : [...prev, index]))
      return
    }

    setOpenIndexes(isOpen ? [] : [index])
  }

  return (
    <motion.section ref={sectionRef} className="w-full px-3 py-8 md:px-6 md:py-12" style={{ backgroundColor: sectionBg }} {...sectionMotion}>
      <div className="mx-auto max-w-5xl" dir="rtl">
        <motion.div className="mb-7 flex flex-col items-center text-center md:mb-10" {...headerMotion}>
          <motion.span
            className="rounded-lg px-3 py-1 text-sm danaMed"
            style={{ color: subtitleColor }}
            {...badgeMotion}
          >
            {badgeText}
          </motion.span>
          <motion.h2
            className={`${isMobile ? 'mt-4 text-3xl leading-10' : 'mt-5 text-5xl leading-tight'} danaBold max-w-3xl`}
            style={{ color: titleColor }}
            {...titleMotion}
          >
            {title}
          </motion.h2>
          <motion.p className="mt-4 text-base danaMed" style={{ color: subtitleColor }} {...subtitleMotion}>
            {subtitle}
          </motion.p>
        </motion.div>

        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndexes.includes(index)
            return (
              <motion.div
                key={index}
                className="overflow-hidden"
                style={{
                  borderRadius: `${safeRadius}px`,
                  backgroundColor: itemBg
                }}
                {...itemMotion(index)}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-right md:px-5"
                >
                  <span className="text-base danaMed" style={{ color: questionColor }}>
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    className="text-lg"
                    style={{ color: iconColor }}
                  >
                    
                  <FiChevronDown
                    className={`text-lg transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    style={{ color: iconColor }}
                  />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                        <p className={`text-sm px-6 pb-4 leading-8 danaMed ${answerTextColorClass}`} style={{color:answerColor}}>
                          {item.answer}
                        </p>

                  ) : null}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}

export default Questions