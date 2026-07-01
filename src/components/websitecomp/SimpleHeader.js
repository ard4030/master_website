"use client"
import React, { useState, useRef, useEffect, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useAnimationControls, useInView } from 'framer-motion'
import { FiSearch, FiChevronDown } from 'react-icons/fi'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { PiShoppingCartSimpleLight } from 'react-icons/pi'
import { TbLogin2 } from 'react-icons/tb'
import { AuthContext } from '@/context/AuthContext'
import { CartContext } from '@/context/CartContext'
import Login from '@/components/global/Login'
import { getImageUrl } from '@/utils/functions'
// import { getImageUrl } from '@/utils/functions'

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
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 }
  },
  slideDown: {
    hidden: { opacity: 0, y: -18 },
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  },
  blurUp: {
    hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
  }
}

export const simpleHeaderSchema = {
  name: 'هدر ساده',
  fields: [
    {
      key: 'bgColor',
      label: 'رنگ پس‌زمینه هدر',
      type: 'color',
      default: '#ffffff'
    },
    {
      key: 'logoImage',
      label: 'تصویر لوگو',
      type: 'image',
      placeholder: 'آپلود لوگو',
      default: ''
    },
    {
      key: 'storeName',
      label: 'متن لوگو',
      type: 'text',
      placeholder: 'مثال: منو کتاب',
      default: 'منو کتاب'
    },
    {
      key: 'showStoreName',
      label: 'نمایش متن لوگو',
      type: 'select',
      options: [
        { value: 'true', label: 'نمایش' },
        { value: 'false', label: 'مخفی' }
      ],
      default: 'true'
    },
    {
      key: 'logoTextColor',
      label: 'رنگ متن لوگو',
      type: 'color',
      default: '#ee1b24'
    },
    {
      key: 'navItemsColor',
      label: 'رنگ آیتم‌های منو',
      type: 'color',
      default: '#555560'
    },
    {
      key: 'navItems',
      label: 'آیتم‌های منو (با لینک)',
      type: 'linkList',
      buttonText: 'مدیریت آیتم‌های منو',
      modalTitle: 'مدیریت آیتم‌های منو',
      maxItems: 5,
      default: [
        { label: 'شگفت‌انگیزها', link: '#' },
        { label: 'سوپرمارکت', link: '#' },
        { label: 'پرفروش‌ترین‌ها', link: '#' },
        { label: 'درباره ما', link: '#' }
      ]
    },
    {
      key: 'categoryItems',
      label: 'دسته‌بندی محصولات (تو در تو + لینک)',
      type: 'categoryList',
      buttonText: 'مدیریت دسته‌بندی‌ها',
      modalTitle: 'مدیریت دسته‌بندی‌ها',
      maxItems: 10,
      maxSubItems: 10,
      default: [
        {
          label: 'موبایل و تبلت',
          link: '#',
          subcategories: [
            { label: 'گوشی موبایل', link: '#' },
            { label: 'تبلت', link: '#' }
          ]
        },
        {
          label: 'کالای دیجیتال',
          link: '#',
          subcategories: [
            { label: 'لپ‌تاپ و کامپیوتر', link: '#' },
            { label: 'هدفون و اسپیکر', link: '#' }
          ]
        }
      ]
    }
  ]
}

const navItems = [
  { label: 'شگفت‌انگیزها', link: '#' },
  { label: 'سوپرمارکت', link: '#' },
  { label: 'پرفروش‌ترین‌ها', link: '#' },
  { label: 'درباره ما', link: '#' },
]

const defaultCategoryItems = [
  {
    label: 'موبایل و تبلت',
    subcategories: [
      { label: 'گوشی موبایل', products: [] },
      { label: 'تبلت', products: [] },
      { label: 'لوازم جانبی موبایل', products: [] }
    ]
  },
  {
    label: 'کالای دیجیتال',
    subcategories: [
      { label: 'لپ‌تاپ و کامپیوتر', products: [] },
      { label: 'دوربین', products: [] },
      { label: 'هدفون و اسپیکر', products: [] }
    ]
  },
  {
    label: 'مد و پوشاک',
    subcategories: [
      { label: 'پوشاک زنانه', products: [] },
      { label: 'پوشاک مردانه', products: [] },
      { label: 'کفش', products: [] }
    ]
  },
  {
    label: 'کتاب و لوازم تحریر',
    subcategories: [
      { label: 'کتاب چاپی', products: [] },
      { label: 'کتاب صوتی', products: [] },
      { label: 'لوازم تحریر', products: [] }
    ]
  },
]

const SimpleHeader = ({
  bgColor = '#ffffff',
  logoImage = '',
  storeName = 'منو کتاب',
  showStoreName = 'true',
  logoTextColor = '#ee1b24',
  navItemsColor = '#555560',
  navAlignment = 'center',
  navItems: navItemsProp,
  categoryItems,
  menuBtnAnimationType = 'slideRight',
  menuBtnAnimationDelay = '0',
  menuBtnAnimationDuration = '0.45',
  logoAnimationType = 'slideRight',
  logoAnimationDelay = '0.05',
  logoAnimationDuration = '0.55',
  searchAnimationType = 'slideUp',
  searchAnimationDelay = '0.15',
  searchAnimationDuration = '0.55',
  actionsAnimationType = 'slideLeft',
  actionsAnimationDelay = '0.25',
  actionsAnimationDuration = '0.55',
  row2AnimationType = 'fade',
  row2AnimationDelay = '0.3',
  row2AnimationDuration = '0.5',
  categoriesAnimationType = 'slideRight',
  categoriesAnimationDelay = '0.35',
  categoriesAnimationDuration = '0.5',
  navLinksAnimationType = 'slideUp',
  navLinksAnimationDelay = '0.4',
  navLinksAnimationDuration = '0.45',
  navLinksAnimationStagger = '0.07',
  activeMerchant
}) => {
  const [searchValue, setSearchValue] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)
  const [activeSubcategoryIndex, setActiveSubcategoryIndex] = useState(null)
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false)
  const [mobileActiveCategory, setMobileActiveCategory] = useState(null)
  const [mobileActiveSubcategory, setMobileActiveSubcategory] = useState(null)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { user } = useContext(AuthContext) || {}
  const { cart } = useContext(CartContext) || {}
  const router = useRouter()
  const cartItemsCount = cart?.items?.reduce((total, item) => total + (item.quantity || 1), 0) || 0
  const handleUserLogin = () => {
    if (user) {
      router.push('/dashboard/userprofile')
    } else {
      setIsLoginOpen(true)
    }
  }
  const closeTimerRef = useRef(null)
  const sectionRef = useRef(null)
  const animationControls = useAnimationControls()
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
    margin: '0px 0px -5% 0px'
  })
  logoImage = getImageUrl(activeMerchant?.merchant?.storeImage) || logoImage
  // console.log("************** logoImage ",logoImage)

  useEffect(() => {
    if (isInView) {
      animationControls.start('visible')
    }
  }, [isInView, animationControls])

  const showStoreNameBool = showStoreName === true || showStoreName === 'true'
  const navLinks = Array.isArray(navItemsProp) && navItemsProp.length > 0
    ? navItemsProp
    : navItems
  const categories = Array.isArray(categoryItems) && categoryItems.length > 0
    ? categoryItems
    : defaultCategoryItems

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

  const menuBtnMotion = getMotionConfig(menuBtnAnimationType, menuBtnAnimationDelay, menuBtnAnimationDuration)
  const logoMotion = getMotionConfig(logoAnimationType, logoAnimationDelay, logoAnimationDuration)
  const searchMotion = getMotionConfig(searchAnimationType, searchAnimationDelay, searchAnimationDuration)
  const actionsMotion = getMotionConfig(actionsAnimationType, actionsAnimationDelay, actionsAnimationDuration)
  const row2Motion = getMotionConfig(row2AnimationType, row2AnimationDelay, row2AnimationDuration)
  const categoriesMotion = getMotionConfig(categoriesAnimationType, categoriesAnimationDelay, categoriesAnimationDuration)
  const navLinksBaseDelay = parseTiming(navLinksAnimationDelay, 0)
  const navLinksStagger = parseTiming(navLinksAnimationStagger, 0.07)

  const handleCategoriesEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setIsCategoriesOpen(true)
  }

  const handleCategoriesLeave = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    closeTimerRef.current = setTimeout(() => {
      setIsCategoriesOpen(false)
      closeTimerRef.current = null
    }, 3000)
  }

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  return (
    <header
      ref={sectionRef}
      className="w-full border-b border-[#e5e5ea] relative z-30 overflow-visible"
      dir="rtl"
      style={{ backgroundColor: bgColor }}
    >
      {/* ─── ردیف اول: لوگو + آیکون‌ها ─── */}
      <div className="mx-auto max-w-7xl px-3 py-2.5 md:px-6 md:py-3 lg:px-8">
        <div className="grid grid-cols-12 items-center gap-4 md:gap-3 lg:gap-5">

          {/* دکمه منوی همبرگری - فقط موبایل/تبلت */}
          <motion.button
            type="button"
            aria-label="منو"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="col-span-2 sm:col-span-1 shrink-0 w-9 h-9 flex items-center justify-center rounded-lg text-[#3a3a57] hover:bg-[#f5f5f7] transition-colors lg:hidden"
            {...menuBtnMotion}
          >
            <HiOutlineMenuAlt3 size={22} />
          </motion.button>

          {/* لوگو - راست‌ترین قسمت */}
          <motion.div className="col-span-7 sm:col-span-10 lg:col-span-6 flex items-center justify-center gap-1.5 md:gap-2" {...logoMotion}>
            {logoImage ? (
              <Link href={'/'} className="relative shrink-0 overflow-hidden rounded-full w-full h-9 md:w-11 md:h-11">
                <Image
                  src={logoImage}
                  alt={storeName || 'logo'}
                  fill
                  sizes="(min-width: 768px) 44px, 36px"
                  className="object-contain"
                />
              </Link>
            ) : (
              <Link href={'/'} className="relative shrink-0 w-9 h-9 md:w-11 md:h-11">
                <span
                  className="absolute inset-0 rounded-full border-4 md:border-[5px]"
                  style={{ borderColor: logoTextColor, borderBottomColor: 'transparent', transform: 'rotate(-45deg)' }}
                />
                <span
                  className="absolute rounded-full top-0.5 right-0.5 w-2.5 h-2.5 md:w-3.5 md:h-3.5"
                  style={{ backgroundColor: logoTextColor }}
                />
              </Link>
            )}
            {/* {showStoreNameBool && (
              <span
                className="danaBold leading-none text-xs md:text-2xl"
                style={{ color: logoTextColor }}
              >
                {storeName}
              </span>
            )} */}
          </motion.div>

          {/* سبد خرید + ورود - فقط دسکتاپ */}
          <motion.div className="hidden lg:col-span-5 col-span-1 lg:flex items-center justify-end gap-3 shrink-0" {...actionsMotion}>
            {/* آیکون سبد خرید */}
            <Link
              href="/cart"
              aria-label="سبد خرید"
              className="relative w-10 h-10 flex items-center justify-center text-[#3a3a57] hover:text-red-600 transition-colors"
            >
              <PiShoppingCartSimpleLight size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] danaBold rounded-full min-w-4.5 h-4.5 px-1 flex items-center justify-center border-2 border-white">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* جداکننده عمودی */}
            <span className="h-7 w-px bg-[#d8d8de]" />

            {/* دکمه ورود/ثبت‌نام */}
            <button
              type="button"
              onClick={handleUserLogin}
              className="flex items-center gap-2 h-10 px-4 rounded-xl border border-[#d8d8de] text-[#3a3a57] danaMed text-[14px] hover:border-[#9a9aa2] hover:bg-[#f5f5f7] transition-colors"
            >
              <TbLogin2 size={20} className="text-[#3a3a57]" />
              <span className="whitespace-nowrap">{user ? 'حساب کاربری' : 'ورود | ثبت‌نام'}</span>
            </button>
          </motion.div>

          {/* آیکون‌های سبد و جستجو - فقط موبایل/تبلت */}
          <div className="col-span-3 lg:hidden flex items-center justify-end gap-1.5 md:gap-2">
            <motion.div className="shrink-0" {...actionsMotion}>
              <Link
                href="/cart"
                aria-label="سبد خرید"
                className="relative w-9 h-9 flex items-center justify-center text-[#3a3a57]"
              >
                <PiShoppingCartSimpleLight size={22} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] danaBold rounded-full min-w-4 h-4 px-1 flex items-center justify-center border-2 border-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </motion.div>

            <motion.button
              type="button"
              aria-label="جستجو"
              aria-expanded={isSearchOpen}
              onClick={() => setIsSearchOpen((prev) => !prev)}
              className="shrink-0 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-lg text-[#3a3a57] hover:bg-[#f5f5f7] transition-colors"
              {...searchMotion}
            >
              <FiSearch size={20} />
            </motion.button>
          </div>

        </div>

        {/* نوار جستجو */}
        <AnimatePresence initial={false}>
          {isSearchOpen && (
            <motion.div
              className="pt-2"
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center bg-[#f0f0f2] text-[#9a9aa2] border border-transparent focus-within:border-[#c8c8d0] transition-colors h-10 gap-2 rounded-xl px-3 md:h-12 md:gap-3 md:rounded-2xl md:px-4">
                <FiSearch className="shrink-0 w-4.5 h-4.5 md:w-5 md:h-5" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="جستجو"
                  className="w-full bg-transparent outline-none danaMed placeholder:text-[#9a9aa2] text-right text-[13px] md:text-[16px]"
                  dir="rtl"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── جداکننده ─── */}
      <div className="border-t border-[#ebebf0]" />

      {/* ─── ردیف دوم: دسته‌بندی + لینک‌ها (فقط دسکتاپ) ─── */}
      <motion.div
        className="hidden lg:block mx-auto max-w-7xl px-4 py-2 md:px-6 lg:px-8 overflow-visible"
        {...row2Motion}
      >
        <div className="flex items-center gap-4">

            {/* دسته‌بندی کالاها با دراپ‌داون هاور */}
            <motion.div
              className="relative shrink-0"
              onMouseEnter={handleCategoriesEnter}
              onMouseLeave={handleCategoriesLeave}
              {...categoriesMotion}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={isCategoriesOpen}
                className="flex items-center shrink-0 text-[#3a3a57] danaBold gap-2 text-[15px] hover:text-red-600 transition-colors py-2"
              >
                <HiOutlineMenuAlt3 size={22} />
                <span>دسته‌بندی کالاها</span>
              </button>

              <AnimatePresence>
                {isCategoriesOpen && categories.length > 0 && (
                  <motion.div
                    className="absolute top-full right-0 z-50 pt-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div
                      className="flex bg-white rounded-xl border border-[#ebebf0] overflow-hidden min-w-180"
                      style={{ boxShadow: '0 20px 50px -10px rgba(0,0,0,0.25), 0 8px 20px -8px rgba(0,0,0,0.15)' }}
                    >
                    {/* پنل دسته‌های اصلی */}
                    <div className="w-56 bg-[#fafafc] py-2 max-h-105 overflow-y-auto">
                      {categories.map((cat, idx) => {
                        const isActive = idx === activeCategoryIndex
                        return (
                          <button
                            type="button"
                            key={`${cat.label}-${idx}`}
                            onClick={() => {
                              setActiveCategoryIndex(idx)
                              setActiveSubcategoryIndex(null)
                            }}
                            aria-expanded={isActive}
                            className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 danaMed text-[13px] text-right transition-colors ${
                              isActive
                                ? 'bg-white text-red-600 border-r-2 border-red-500'
                                : 'text-[#3a3a57] hover:bg-white hover:text-red-600'
                            }`}
                          >
                            <span>{cat.label}</span>
                            {Array.isArray(cat.subcategories) && cat.subcategories.length > 0 && (
                              <span className="text-[#9a9aa2] text-xs">›</span>
                            )}
                          </button>
                        )
                      })}
                    </div>

                    {/* پنل زیردسته‌ها */}
                    <div className="w-56 bg-[#f5f5f7] py-3 px-3 max-h-105 overflow-y-auto">
                      {(() => {
                        const active = categories[activeCategoryIndex]
                        const subs = Array.isArray(active?.subcategories) ? active.subcategories : []
                        if (subs.length === 0) {
                          return (
                            <p className="text-[12px] danaMed text-[#9a9aa2] text-center py-6">
                              زیردسته‌ای ثبت نشده
                            </p>
                          )
                        }
                        return (
                          <div className="flex flex-col gap-1">
                            <p className="text-[12px] danaBold text-[#3a3a57] mb-2 pb-2 border-b border-[#ebebf0]">
                              {active?.label}
                            </p>
                            {subs.map((sub, idx) => {
                              const isSubActive = idx === activeSubcategoryIndex
                              const productCount = Array.isArray(sub.products) ? sub.products.length : 0
                              return (
                                <button
                                  type="button"
                                  key={`${sub.label}-${idx}`}
                                  onClick={() => setActiveSubcategoryIndex(isSubActive ? null : idx)}
                                  aria-expanded={isSubActive}
                                  className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg danaMed text-[13px] text-right transition-colors ${
                                    isSubActive
                                      ? 'bg-white text-red-600'
                                      : 'text-[#555560] hover:bg-white hover:text-red-600'
                                  }`}
                                >
                                  <span>{sub.label}</span>
                                  <span className="text-[10px] text-[#9a9aa2]">{productCount}</span>
                                </button>
                              )
                            })}
                          </div>
                        )
                      })()}
                    </div>

                    {/* پنل محصولات زیردسته انتخاب‌شده */}
                    <div className="flex-1 bg-white py-3 px-4 max-h-105 overflow-y-auto min-w-56">
                      {(() => {
                        const active = categories[activeCategoryIndex]
                        const subs = Array.isArray(active?.subcategories) ? active.subcategories : []
                        const activeSub = activeSubcategoryIndex !== null ? subs[activeSubcategoryIndex] : null
                        if (!activeSub) {
                          return (
                            <p className="text-[12px] danaMed text-[#9a9aa2] text-center py-6">
                              برای دیدن محصولات، یک زیردسته را انتخاب کنید
                            </p>
                          )
                        }
                        const products = Array.isArray(activeSub.products) ? activeSub.products : []
                        if (products.length === 0) {
                          return (
                            <div>
                              <p className="text-[12px] danaBold text-[#3a3a57] mb-2 pb-2 border-b border-[#ebebf0]">
                                {activeSub.label}
                              </p>
                              <p className="text-[12px] danaMed text-[#9a9aa2] text-center py-4">
                                محصولی ثبت نشده
                              </p>
                            </div>
                          )
                        }
                        return (
                          <div className="flex flex-col gap-1">
                            <p className="text-[12px] danaBold text-[#3a3a57] mb-2 pb-2 border-b border-[#ebebf0]">
                              {activeSub.label}
                            </p>
                            {products.map((p, idx) => {
                              const title = typeof p === 'string' ? p : (p?.title || p?.name || p?.label || '—')
                              const link = typeof p === 'object' ? (p?.link || p?.url || '#') : '#'
                              return (
                                <a
                                  key={`${title}-${idx}`}
                                  href={link}
                                  className="px-3 py-2 rounded-lg danaMed text-[12px] text-[#555560] hover:bg-[#f5f5f7] hover:text-red-600 transition-colors"
                                >
                                  {title}
                                </a>
                              )
                            })}
                          </div>
                        )
                      })()}
                    </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* لینک‌های ناوبری */}
            <div
              className={`flex-1 flex items-center whitespace-nowrap gap-1 ${
                navAlignment === 'center' ? 'justify-center' :
                navAlignment === 'left' ? 'justify-end' :
                'justify-start'
              }`}
            >
              {navLinks.map((item, index) => {
                const itemMotion = getMotionConfig(
                  navLinksAnimationType,
                  navLinksBaseDelay + index * navLinksStagger,
                  navLinksAnimationDuration
                )
                return (
                  <React.Fragment key={`${item.label}-${index}`}>
                    {index > 0 && (
                      <span className="w-px bg-[#d8d8de] shrink-0 h-5 mx-1" />
                    )}
                    <motion.a
                      href={item.link || '#'}
                      className="flex items-center danaMed rounded-lg hover:bg-[#f5f5f7] transition-colors gap-1.5 text-[14px] px-2 py-1"
                      style={{ color: navItemsColor }}
                      {...itemMotion}
                    >
                      <span>{item.label}</span>
                    </motion.a>
                  </React.Fragment>
                )
              })}
            </div>

        </div>
      </motion.div>

      {/* ─── کشوی منو در موبایل/تبلت ─── */}
      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.div
            key="mobile-drawer"
            className="absolute top-full right-0 left-0 z-30 border-t border-[#ebebf0] bg-white shadow-lg lg:hidden overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-3 py-3 flex flex-col gap-1">

            {/* دسته‌بندی کالاها (آکاردئون اصلی) */}
            <button
              type="button"
              onClick={() => setIsMobileCategoriesOpen((prev) => !prev)}
              aria-expanded={isMobileCategoriesOpen}
              className="flex items-center justify-between gap-2 text-[#3a3a57] danaBold text-[14px] px-2 py-2 rounded-lg hover:bg-[#f5f5f7] transition-colors text-right"
            >
              <span className="flex items-center gap-2">
                <HiOutlineMenuAlt3 size={18} />
                <span>دسته‌بندی کالاها</span>
              </span>
              <FiChevronDown
                size={16}
                className={`transition-transform text-[#9a9aa2] ${isMobileCategoriesOpen ? 'rotate-180' : 'rotate-0'}`}
              />
            </button>

            {/* لیست دسته‌ها (فقط در صورت باز بودن آکاردئون اصلی) */}
            {isMobileCategoriesOpen && (
              <div className="flex flex-col pr-2 border-r border-[#ebebf0] mr-2 mt-1">
                {categories.map((cat, idx) => {
                  const isCatOpen = mobileActiveCategory === idx
                  const hasSubs = Array.isArray(cat.subcategories) && cat.subcategories.length > 0
                  return (
                    <div key={`${cat.label}-${idx}`} className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => {
                          setMobileActiveCategory(isCatOpen ? null : idx)
                          setMobileActiveSubcategory(null)
                        }}
                        aria-expanded={isCatOpen}
                        className="flex items-center justify-between gap-2 text-[#3a3a57] danaBold text-[13px] px-2 py-2 rounded-lg hover:bg-[#f5f5f7] transition-colors text-right"
                      >
                        <span>{cat.label}</span>
                        {hasSubs && (
                          <FiChevronDown
                            size={14}
                            className={`transition-transform text-[#9a9aa2] ${isCatOpen ? 'rotate-180' : 'rotate-0'}`}
                          />
                        )}
                      </button>
                      {isCatOpen && hasSubs && (
                        <div className="flex flex-col pr-3 border-r border-[#ebebf0] mr-2 mt-1 mb-1">
                          {cat.subcategories.map((sub, sIdx) => {
                            const isSubOpen = mobileActiveSubcategory === sIdx
                            const products = Array.isArray(sub.products) ? sub.products : []
                            return (
                              <div key={`${sub.label}-${sIdx}`} className="flex flex-col">
                                <button
                                  type="button"
                                  onClick={() => setMobileActiveSubcategory(isSubOpen ? null : sIdx)}
                                  aria-expanded={isSubOpen}
                                  className="flex items-center justify-between gap-2 text-[#555560] danaMed text-[12px] px-2 py-1.5 rounded-lg hover:bg-[#f5f5f7] hover:text-red-600 transition-colors text-right"
                                >
                                  <span>{sub.label}</span>
                                  <span className="flex items-center gap-1">
                                    <span className="text-[10px] text-[#9a9aa2]">{products.length}</span>
                                    {products.length > 0 && (
                                      <FiChevronDown
                                        size={12}
                                        className={`transition-transform text-[#9a9aa2] ${isSubOpen ? 'rotate-180' : 'rotate-0'}`}
                                      />
                                    )}
                                  </span>
                                </button>
                                {isSubOpen && products.length > 0 && (
                                  <div className="flex flex-col pr-3 border-r border-[#ebebf0] mr-2 my-1">
                                    {products.map((p, pIdx) => {
                                      const title = typeof p === 'string' ? p : (p?.title || p?.name || p?.label || '—')
                                      const link = typeof p === 'object' ? (p?.link || p?.url || '#') : '#'
                                      return (
                                        <a
                                          key={`${title}-${pIdx}`}
                                          href={link}
                                          onClick={() => setIsMenuOpen(false)}
                                          className="text-[#7a7a85] danaMed text-[11px] px-2 py-1 rounded-lg hover:bg-[#f5f5f7] hover:text-red-600 transition-colors"
                                        >
                                          {title}
                                        </a>
                                      )
                                    })}
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            <span className="h-px bg-[#ebebf0] my-1" />

            {/* لینک‌های ناوبری */}
            {navLinks.map((item, idx) => (
              <a
                key={`${item.label}-${idx}`}
                href={item.link || '#'}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 danaMed text-[13px] px-2 py-2 rounded-lg hover:bg-[#f5f5f7] transition-colors"
                style={{ color: navItemsColor }}
              >
                <span>{item.label}</span>
              </a>
            ))}

            <span className="h-px bg-[#ebebf0] my-1" />

            {/* دکمه ورود/حساب کاربری (موبایل) */}
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false)
                handleUserLogin()
              }}
              className="flex items-center gap-2 danaMed text-[13px] text-[#3a3a57] px-2 py-2 rounded-lg hover:bg-[#f5f5f7] transition-colors text-right"
            >
              <TbLogin2 size={18} className="text-[#3a3a57]" />
              <span>{user ? 'حساب کاربری' : 'ورود | ثبت‌نام'}</span>
            </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* مودال ورود */}
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} loginMode="user" />
    </header>
  )
}

export default SimpleHeader
