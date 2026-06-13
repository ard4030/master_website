'use client'
import React from 'react'
import { motion, useAnimationControls, useInView } from 'framer-motion'
import {
  FaTruck, FaShieldHalved, FaTag, FaHeadset,
  FaStar, FaHeart, FaGift, FaRocket, FaLock,
  FaThumbsUp, FaCircleCheck, FaBolt
} from 'react-icons/fa6'

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

const iconMap = {
  truck:       <FaTruck size={28} />,
  shield:      <FaShieldHalved size={28} />,
  tag:         <FaTag size={26} />,
  headset:     <FaHeadset size={28} />,
  star:        <FaStar size={26} />,
  heart:       <FaHeart size={26} />,
  gift:        <FaGift size={26} />,
  rocket:      <FaRocket size={26} />,
  lock:        <FaLock size={26} />,
  thumbsup:    <FaThumbsUp size={26} />,
  check:       <FaCircleCheck size={26} />,
  bolt:        <FaBolt size={26} />,
}

const AboutUs = ({
  item1Text, item1Desc, item1Icon, item1Color,
  item2Text, item2Desc, item2Icon, item2Color,
  item3Text, item3Desc, item3Icon, item3Color,
  item4Text, item4Desc, item4Icon, item4Color,
    sectionAnimationType = 'fade',
    sectionAnimationDelay = '0.05',
    sectionAnimationDuration = '0.7',
    cardAnimationType = 'slideUp',
    cardAnimationDelay = '0.12',
    cardAnimationDuration = '0.65',
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

        const sectionMotion = getMotionConfig(sectionAnimationType, sectionAnimationDelay, sectionAnimationDuration)

    const properties = [
        {
            text: item1Text || 'ارسال سریع و امن',
            desc: item1Desc || 'سفارش شما در کوتاه‌ترین زمان ممکن، سالم و ایمن به دستتان می‌رسد',
            icon: iconMap[item1Icon] || iconMap.truck,
            color: item1Color || 'from-blue-500 to-blue-700',
        },
        {
            text: item2Text || 'اصالت کالا',
            desc: item2Desc || 'تمام محصولات دارای ضمانت اصالت و گارانتی معتبر هستند',
            icon: iconMap[item2Icon] || iconMap.shield,
            color: item2Color || 'from-sky-400 to-blue-600',
        },
        {
            text: item3Text || 'بهترین قیمت',
            desc: item3Desc || 'با مقایسه قیمت‌ها مطمئن باشید بهترین پیشنهاد را از ما دریافت می‌کنید',
            icon: iconMap[item3Icon] || iconMap.tag,
            color: item3Color || 'from-blue-600 to-indigo-700',
        },
        {
            text: item4Text || 'پشتیبانی ۲۴ ساعته',
            desc: item4Desc || 'تیم پشتیبانی ما در تمام ساعات شبانه‌روز آماده پاسخگویی به شماست',
            icon: iconMap[item4Icon] || iconMap.headset,
            color: item4Color || 'from-indigo-500 to-blue-700',
        },
    ]

  return (
    
    <motion.section ref={sectionRef} className='w-full bg-white ' {...sectionMotion}>
    <div className='block sm:flex bg-white border-t border-b font-medium dana border-gray-200 justify-between items-center max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8'>
        {
            properties.map((item,index) => {
                const itemMotion = getMotionConfig(
                  cardAnimationType,
                  parseTiming(cardAnimationDelay, 0.12) + index * 0.08,
                  cardAnimationDuration
                )

                return(
                    <motion.div key={index} className='text-center px-5' {...itemMotion}>
                        <div className='w-full flex mb-4 justify-center items-center'>
                            <div className={`bg-linear-to-br ${item.color} text-white rounded-2xl w-16 h-16 flex items-center justify-center shadow-md`}>
                                {item?.icon}
                            </div>
                        </div>
                        <span className='mb-1.5 block font-medium text-gray-800'>{item?.text}</span>
                        <p className='text-[12px] text-gray-400 leading-relaxed'>
                            {item?.desc}
                        </p>
                    </motion.div>
                )
            })}
    </div>
    </motion.section>
  )
}

export default AboutUs