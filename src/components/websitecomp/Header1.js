"use client"
import { AuthContext } from '@/context/AuthContext'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useState, useEffect, useRef } from 'react'
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
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 }
  },
  slideRight: {
    hidden: { opacity: 0, x: -28 },
    visible: { opacity: 1, x: 0 }
  },
  slideLeft: {
    hidden: { opacity: 0, x: 28 },
    visible: { opacity: 1, x: 0 }
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1 }
  },
  blurUp: {
    hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
  }
}

const Header1 = ({ 
  width = '100',
  alignment = 'center',
  searchBarWidth = '50',
  searchBarWidthMobile = '100',
  headerWidthMobile = '100',
  logoWidth = '50',
  logoHeight = '50',
  logoWidthMobile = '40',
  logoHeightMobile = '40',
  headerMinHeight = '64',
  headerMinHeightMobile = '56',
  cartItemsCount = 0,
  handleUserLogin,
  handleLogout = false,
  activeMerchant = false,
  sectionAnimationType = 'fade',
  sectionAnimationDelay = '0.03',
  sectionAnimationDuration = '0.5',
  headerAnimationType = 'slideDown',
  headerAnimationDelay = '0.08',
  headerAnimationDuration = '0.55',
  mobileHeaderAnimationType = 'slideUp',
  mobileHeaderAnimationDelay = '0.12',
  mobileHeaderAnimationDuration = '0.55',
  mobileSearchAnimationType = 'fade',
  mobileSearchAnimationDelay = '0.16',
  mobileSearchAnimationDuration = '0.5'
}) => {
  const normalizedHeaderAnimationType = headerAnimationType === 'slideDown' ? 'slideUp' : headerAnimationType
  const [searchValue, setSearchValue] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const {user} = useContext(AuthContext)
  const router = useRouter()
  const sectionRef = useRef(null)
  const animationControls = useAnimationControls()
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
    margin: '0px 0px -10% 0px'
  })

  useEffect(() => {
    if (isInView) {
      animationControls.start('visible')
    }
  }, [isInView, animationControls])

  useEffect(() => {
    setIsMobile(window?.innerWidth < 768)
    const handleResize = () => setIsMobile(window?.innerWidth < 768)
    window?.addEventListener('resize', handleResize)
    return () => window?.removeEventListener('resize', handleResize)
  }, [])

  // تابع برای تبدیل ایمن مقادیر عددی
  const safeParseInt = (value, defaultValue = 50) => {
    const parsed = parseInt(value)
    return isNaN(parsed) ? defaultValue : parsed
  }

  const merchantLogo = activeMerchant?.merchant?.storeImage || activeMerchant?.storeImage
  console.log('44',activeMerchant);

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
        duration: parseTiming(durationValue, 0.55),
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const sectionMotion = getMotionConfig(sectionAnimationType, sectionAnimationDelay, sectionAnimationDuration)
  const headerMotion = getMotionConfig(normalizedHeaderAnimationType, headerAnimationDelay, headerAnimationDuration)
  const mobileHeaderMotion = getMotionConfig(mobileHeaderAnimationType, mobileHeaderAnimationDelay, mobileHeaderAnimationDuration)
  const mobileSearchMotion = getMotionConfig(mobileSearchAnimationType, mobileSearchAnimationDelay, mobileSearchAnimationDuration)
  

  return (
    <motion.div
      ref={sectionRef}
      style={{ display: 'flex', justifyContent: alignment === 'center' ? 'center' : alignment === 'flex-end' ? 'flex-end' : 'flex-start' }}
      {...sectionMotion}
    >
      <motion.header
        className="sticky top-0 z-100 bg-white border-b border-gray-200" 
        style={{ 
          width: isMobile ? `${parseFloat(headerWidthMobile) || 100}%` : `${parseFloat(width) || 100}%`
        }}
        {...headerMotion}
      >
        {/* Desktop Header */}
        <div 
          className="hidden md:flex mx-auto items-center justify-between w-full"
          style={{ minHeight: `${safeParseInt(headerMinHeight, 64)}px` }}
        >
          <div className='flex items-center w-[70%]'> 
            {/* Logo Container */}
            <div className="relative" style={{ width: `${safeParseInt(logoWidth, 50)}px`, height: `${safeParseInt(logoHeight, 50)}px` }}>
              <Image 
                src={process.env.NEXT_PUBLIC_LIARA_IMAGE_URL + merchantLogo} 
                alt="Store Logo" 
                width={safeParseInt(logoWidth, 50)} 
                height={safeParseInt(logoHeight, 50)}
                className="absolute inset-0 object-cover"
              />
            </div>

            {/* Search Bar */}
            <div 
              className="flex items-center bg-gray-100 border border-gray-300 rounded-lg px-4 mr-5"
              style={{ width: `${parseFloat(searchBarWidth) || 50}%` }}
            >
              <input
                type="text"
                placeholder="جستجوی محصول ، دسته بندی و .."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="flex-1 bg-transparent dana py-3 text-sm text-gray-800 placeholder-gray-500 outline-none"
              />
              <button className="flex items-center text-gray-600 hover:text-gray-900 p-1 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Right Actions - Desktop */}
          <div className="flex items-center justify-end w-[30%]">
            {/* Account Icon */}
            <div 
            onClick={() => user?router.push("/dashboard/userprofile"):handleUserLogin()}
            className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600 hover:text-gray-900 transition-colors">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>

            {/* Cart */}
            <Link href={"/cart"} className="relative cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600 hover:text-gray-900 transition-colors">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {cartItemsCount}
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Header */}
        <motion.div
          className="md:hidden flex items-center justify-between w-full px-5 border-b border-gray-200"
          style={{ minHeight: `${safeParseInt(headerMinHeightMobile, 56)}px` }}
          {...mobileHeaderMotion}
        >
          {/* Logo Container */}
          <div className="relative" style={{ width: `${safeParseInt(logoWidthMobile, 40)}px`, height: `${safeParseInt(logoHeightMobile, 40)}px` }}>
            <Image 
              src={process.env.NEXT_PUBLIC_LIARA_IMAGE_URL + user?.storeImage} 
              alt="Store Logo" 
              width={safeParseInt(logoWidthMobile, 40)} 
              height={safeParseInt(logoHeightMobile, 40)}
              className="absolute inset-0 object-cover"
            />
          </div>

          {/* Mobile Right Actions */}
          <div className="flex items-center justify-end gap-3">
            {/* Account Icon */}
            <div 
            onClick={() => user?router.push("/dashboard/userprofile"):handleUserLogin()}
            className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600 hover:text-gray-900 transition-colors">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>

            {/* Mobile Cart */}
            <Link href={"/cart"} className="relative cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600 hover:text-gray-900 transition-colors">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                3
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Mobile Search Bar - Full Width at Bottom */}
        <motion.div className="md:hidden w-full px-5 py-3 bg-gray-50 border-t border-gray-200" {...mobileSearchMotion}>
          <div 
            className="flex items-center bg-white border border-gray-300 rounded-lg px-4"
            style={{ width: `${parseFloat(searchBarWidthMobile) || 100}%` }}
          >
            <input
              type="text"
              placeholder="جستجوی محصول ، دسته بندی و .."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="flex-1 bg-transparent dana py-3 text-sm text-gray-800 placeholder-gray-500 outline-none"
            />
            <button className="flex items-center text-gray-600 hover:text-gray-900 p-1 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>
        </motion.div>
      </motion.header>
    </motion.div>
  )
}

export default Header1