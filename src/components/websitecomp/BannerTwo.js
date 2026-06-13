'use client';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { motion, useAnimationControls, useInView } from 'framer-motion'
import { FaImage } from 'react-icons/fa6';

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

const BannerTwo = ({
  displayType = '2',
  banner1='',
  link1='',
  banner2='',
  link2='',
  banner3='',
  link3='',
  banner4='',
  link4='',
  containerAnimationType = 'fade',
  containerAnimationDelay = '0.05',
  containerAnimationDuration = '0.65',
  cardAnimationType = 'zoomIn',
  cardAnimationDelay = '0.12',
  cardAnimationDuration = '0.6',
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
    return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${imagePath}`
  }

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

  const allCards = [
    { id: 1, imageUrl: banner1 ? getImageUrl(banner1) : banner1, href: link1 },
    { id: 2, imageUrl: banner2 ? getImageUrl(banner2) : banner2, href: link2 },
    { id: 3, imageUrl: banner3 ? getImageUrl(banner3) : banner3, href: link3 },
    { id: 4, imageUrl: banner4 ? getImageUrl(banner4) : banner4, href: link4 },
  ]

  const is1 = displayType === '1'
  const is4 = displayType === '4'
  const cards = is1 ? allCards.slice(0, 1) : is4 ? allCards : allCards.slice(0, 2)
  const gridClass = is1
    ? 'grid grid-cols-1 gap-0'
    : is4
      ? 'grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4'
      : 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8'

  const aspectClass = is1 ? 'aspect-[3/1] md:aspect-[4/1]' : 'aspect-2/1'
  const containerMotion = getMotionConfig(containerAnimationType, containerAnimationDelay, containerAnimationDuration)

  return (
    <motion.div ref={sectionRef} className={`${gridClass} max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-4 bg-white`} {...containerMotion}>
      {cards.map((item, index) => {
        const cardMotion = getMotionConfig(
          cardAnimationType,
          parseTiming(cardAnimationDelay, 0.12) + index * 0.08,
          cardAnimationDuration
        )

        return (
        <motion.div key={item.id} className='col-span-1' {...cardMotion}>
          <Link href={item.href || '#'}>
          {item.imageUrl
            ? <Image src={item.imageUrl} width={1600} alt='image' height={450} className={`w-full ${aspectClass} object-cover rounded-lg bg-gray-50`} />
            : <div className={`w-full rounded-lg bg-gray-200 ${aspectClass} flex justify-center items-center`}><FaImage /></div>
          }
          </Link>
        </motion.div>
      )})}
    </motion.div>
  )
}

export default BannerTwo

