import React from 'react'
import { useAnimationControls, useInView } from 'framer-motion'

export const ANIMATION_PRESETS = {
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

export const parseTiming = (value, fallback) => {
  const parsed = Number.parseFloat(value)
  if (Number.isNaN(parsed)) return fallback
  return Math.max(0, parsed)
}

export const useViewportMotion = ({
  animationType = 'fade',
  animationDelay = '0.05',
  animationDuration = '0.7',
  amount = 0.3
} = {}) => {
  const sectionRef = React.useRef(null)
  const animationControls = useAnimationControls()
  const isInView = useInView(sectionRef, {
    once: true,
    amount,
    margin: '0px 0px -10% 0px'
  })

  React.useEffect(() => {
    if (isInView) {
      animationControls.start('visible')
    }
  }, [isInView, animationControls])

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

  const motionProps = getMotionConfig(animationType, animationDelay, animationDuration)

  return {
    sectionRef,
    motionProps,
    getMotionConfig
  }
}
