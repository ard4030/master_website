"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, FreeMode } from "swiper/modules";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { formatPrice } from "@/utils/functions";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { motion, useAnimationControls, useInView } from "framer-motion";

const ANIMATION_PRESETS = {
  none: {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -36 },
    visible: { opacity: 1, x: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 36 },
    visible: { opacity: 1, x: 0 },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  blurUp: {
    hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
};

/**
 * کامپوننت محصولات لغزنده - استایل ساده
 * @param {Array} data - آرایه محصولات سفارشی یا شناسه‌های دسته‌بندی
 * @param {String} dataSourceType - نوع منبع داده ('category', 'discounted', 'manual')
 * @param {String} title - عنوان بخش محصولات
 * @param {String} subtitle - زیرعنوان بخش محصولات
 * @param {String} description - توضیحات بخش
 */

export const simpleSwiperSchema = {
    name : 'اسلایدر',
    fields: [
      { key: 'bgColor',        label: 'رنگ پس‌زمینه',     type: 'color', default: '#ffffff' },
      { key: 'largeTextColor', label: 'رنگ متن‌های بزرگ', type: 'color', default: '#111827' },
      { key: 'smallTextColor', label: 'رنگ متن‌های کوچک', type: 'color', default: '#6b7280' },
      { key: 'priceColor',     label: 'رنگ قیمت',         type: 'color', default: '#0d9488' },
      {
        key: 'enableAutoplay',
        label: 'اسلاید خودکار',
        type: 'select',
        options: [
          { value: 'true', label: 'فعال' },
          { value: 'false', label: 'غیرفعال' }
        ],
        default: 'false'
      },
      {
        key: 'autoplayDelay',
        label: 'زمان اسلاید خودکار (ثانیه)',
        type: 'text',
        placeholder: 'مثال: 5',
        default: '5'
      },
      {
        key: 'title',
        label: 'عنوان',
        type: 'text',
        placeholder: 'عنوان اسلایدر',
        default: 'ساعت مچی اورجینال'
      },
      {
        key: 'subtitle',
        label: 'زیرعنوان',
        type: 'text',
        placeholder: 'زیرعنوان اسلایدر',
        default: ''
      },
      {
        key: 'description',
        label: 'توضیحات',
        type: 'textarea',
        placeholder: 'توضیحات اسلایدر',
        default: ''
      },
      {
        key: 'titleIcon',
        label: 'آیکون عنوان',
        type: 'text',
        placeholder: 'مثال: ⌚',
        default: '⌚'
      },
      {
        key: 'dataSourceType',
        label: 'منبع داده',
        type: 'select',
        options: [
          { value: 'category', label: 'دسته‌بندی' },
          { value: 'discounted', label: 'تخفیفدار' },
          { value: 'manual', label: 'دستی' }
        ],
        default: 'manual'
      },
      {
        key: 'data',
        label: 'انتخاب داده',
        type: 'button',
        buttonText: 'انتخاب',
        default: null
      },
      {
        key: 'animationEditor',
        label: 'انیمیشن بخش ها',
        type: 'animationEditor',
        editor: 'slider1',
        buttonText: '🎬 تنظیم انیمیشن + پیش نمایش',
        editorConfig: {
          previewType: 'slider1',
          sections: [
            { keyPrefix: 'sectionAnimation', label: 'کل بخش', hint: 'انیمیشن کلی کامپوننت' },
            { keyPrefix: 'headerAnimation',  label: 'عنوان',  hint: 'انیمیشن عنوان و زیرعنوان' },
            { keyPrefix: 'sliderAnimation',  label: 'اسلایدر', hint: 'انیمیشن کانتینر اسلایدر' },
            { keyPrefix: 'cardsAnimation',   label: 'کارت‌ها', hint: 'انیمیشن کارت‌های محصول (با stagger)' }
          ]
        }
      }
    ]
  };

const SimpleSwiper = ({
  bgColor = "#f3f4f8",
  largeTextColor = "#30355a",
  smallTextColor = "#8d90a6",
  priceColor = "#28c76f",
  autoplayDelay = "5",
  enableAutoplay = "false",
  data = null,
  dataSourceType = "manual",
  title = "ساعت مچی اورجینال",
  subtitle = "",
  description = "",
  titleIcon = "⌚",
  sectionAnimationType = "fade",
  sectionAnimationDelay = "0",
  sectionAnimationDuration = "0.65",
  headerAnimationType = "slideUp",
  headerAnimationDelay = "0.12",
  headerAnimationDuration = "0.65",
  sliderAnimationType = "slideUp",
  sliderAnimationDelay = "0.2",
  sliderAnimationDuration = "0.7",
  cardsAnimationType = "blurUp",
  cardsAnimationDelay = "0.28",
  cardsAnimationDuration = "0.58",
  cardsAnimationStagger = "0.07",
}) => {
  const autoplayDelayMs =
    enableAutoplay === "true" ? (parseInt(autoplayDelay) || 5) * 1000 : 0;
  const pathName = usePathname();
  const swiperRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const sectionRef = useRef(null);
  const animationControls = useAnimationControls();
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
    margin: "0px 0px -10% 0px",
  });

  useEffect(() => {
    if (isInView) {
      animationControls.start("visible");
    }
  }, [isInView, animationControls]);

  const parseTiming = (value, fallback) => {
    const parsed = Number.parseFloat(value);
    if (Number.isNaN(parsed)) return fallback;
    return Math.max(0, parsed);
  };

  const getMotionConfig = (type, delayValue, durationValue, extraDelay = 0) => {
    const preset = ANIMATION_PRESETS[type] || ANIMATION_PRESETS.fade;
    return {
      initial: "hidden",
      animate: animationControls,
      variants: preset,
      transition: {
        delay: parseTiming(delayValue, 0) + extraDelay,
        duration: parseTiming(durationValue, 0.7),
        ease: [0.22, 1, 0.36, 1],
      },
    };
  };

  const formatPercentFa = (value) => {
    const num = Number(value);
    if (!Number.isFinite(num) || num <= 0) return "";
    return `${Math.round(num)}٪`;
  };

  // تابع کمکی برای تبدیل URL تصویر
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${imagePath}`;
  };

  // لینک محصول
  const getProductLink = (product) => {
    const id = product._id || product.id;
    return `/product/view/${id}`;
  };

  const sampleProducts = [
    {
      id: 1,
      price: "55500000",
      name: "ساعت سیکو مردانه کرنوگراف Seiko Chronograph SBTR041",
      title: "ساعت سیکو مردانه کرنوگراف Seiko Chronograph SBTR041",
      image:
        "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&h=400&fit=crop",
      mainImage:
        "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&h=400&fit=crop",
      oldPrice: "99000000",
      discountPercent: 35,
    },
    {
      id: 2,
      price: "59900000",
      name: "ساعت مردانه کرنوگراف سیکو Seiko Chronograph SBTR037",
      title: "ساعت مردانه کرنوگراف سیکو Seiko Chronograph SBTR037",
      image:
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
      mainImage:
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
      oldPrice: "99000000",
      discountPercent: 35,
    },
    {
      id: 3,
      price: "59900000",
      name: "ساعت مچی سیکو مردانه Seiko Chronograph SBTR035",
      title: "ساعت مچی سیکو مردانه Seiko Chronograph SBTR035",
      image:
        "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400&h=400&fit=crop",
      mainImage:
        "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400&h=400&fit=crop",
      oldPrice: "99000000",
      discountPercent: 35,
    },
    {
      id: 4,
      price: "37600000",
      name: "ساعت کرنوگراف سیکو مردانه Seiko Watch SBTR029",
      title: "ساعت کرنوگراف سیکو مردانه Seiko Watch SBTR029",
      image:
        "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400&h=400&fit=crop",
      mainImage:
        "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400&h=400&fit=crop",
      oldPrice: "99000000",
      discountPercent: 35,
    },
    {
      id: 5,
      price: "42000000",
      name: "ساعت مچی سیکو مردانه Seiko Presage SRPD37",
      title: "ساعت مچی سیکو مردانه Seiko Presage SRPD37",
      image:
        "https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=400&h=400&fit=crop",
      mainImage:
        "https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=400&h=400&fit=crop",
      oldPrice: "99000000",
      discountPercent: 35,
    },
  ];

  // منطق انتخاب محصولات بر اساس dataSourceType و data
  let products = sampleProducts;

  if (
    dataSourceType === "manual" &&
    data &&
    Array.isArray(data) &&
    data.length > 0
  ) {
    if (typeof data[0] === "object" && (data[0].id || data[0]._id)) {
      products = data;
    }
  } else if (
    dataSourceType === "category" &&
    data &&
    Array.isArray(data) &&
    data.length > 0
  ) {
    products = sampleProducts;
  } else if (dataSourceType === "discounted") {
    products = sampleProducts.filter((p) => p.badge);
  }

  if (pathName !== "/newsitebuilder") products = data || sampleProducts;

  const desktopSlidesPerView = 4;
  const sectionMotion = getMotionConfig(
    sectionAnimationType,
    sectionAnimationDelay,
    sectionAnimationDuration
  );
  const headerMotion = getMotionConfig(
    headerAnimationType,
    headerAnimationDelay,
    headerAnimationDuration
  );
  const sliderMotion = getMotionConfig(
    sliderAnimationType,
    sliderAnimationDelay,
    sliderAnimationDuration
  );
  const getCardMotion = (index) =>
    getMotionConfig(
      cardsAnimationType,
      cardsAnimationDelay,
      cardsAnimationDuration,
      parseTiming(cardsAnimationStagger, 0.07) * index
    );

  const CardSlider = (product, discountPercent, oldPrice) => {
    const hasDiscount = !!formatPercentFa(discountPercent);
    return (
      <Link
        href={getProductLink(product)}
        onClick={(e) => {
          if (isDragging) e.preventDefault();
        }}
        className="block group/card"
      >
        <div
          className="bg-white rounded-2xl overflow-hidden"
          style={{ border: "1px solid #ebebeb", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
        >
          {/* تصویر محصول */}
          <div className="w-full aspect-square flex items-center justify-center p-4 overflow-visible">
            {(product.image || product.mainImage) ? (
              <img
                src={getImageUrl(product.mainImage || product.image)}
                alt={product.name || product.title}
                className="w-full h-full object-contain transition-all duration-300 ease-out group-hover/card:-translate-y-3 group-hover/card:drop-shadow-[0_14px_10px_rgba(0,0,0,0.18)]"
                draggable={false}
              />
            ) : (
              <div className="w-full h-full rounded-xl bg-gray-50" />
            )}
          </div>

          {/* نام محصول */}
          <div className="px-3 pt-1 pb-2" dir="rtl">
            <h3
              className="text-[13px] danaBold text-right leading-6 line-clamp-2"
              style={{ color: largeTextColor, minHeight: "48px" }}
            >
              {product.name || product.title}
            </h3>
          </div>

          {/* بخش قیمت */}
          <div
            className="flex items-center justify-between px-3 pb-4 pt-1 gap-2"
            dir="rtl"
          >
            {/* بج تخفیف - سمت راست (اول در RTL) */}
            {hasDiscount ? (
              <div
                className="w-12 h-12 rounded-full flex flex-col items-center justify-center text-white danaBold shrink-0"
                style={{ backgroundColor: "#e84043" }}
              >
                <span className="text-[9px] leading-tight">٪</span>
                <span className="text-[15px] leading-tight">
                  {Math.round(Number(discountPercent))}
                </span>
              </div>
            ) : (
              <div className="w-12 h-12 shrink-0" />
            )}

            {/* قیمت‌ها - سمت چپ (دوم در RTL) */}
            <div className="flex flex-col items-end gap-1">
              {oldPrice ? (
                <p
                  className="text-xs danaBold text-gray-400 line-through"
                  style={{ textDecorationColor: "#bbb" }}
                >
                  {formatPrice(oldPrice)}{" "}
                  <span className="text-[10px]">تومان</span>
                </p>
              ) : null}
              <p
                className="danaBold text-[17px] leading-none"
                style={{ color: "#e84043" }}
              >
                {product.price ? formatPrice(product.price) : "۰"}{" "}
                <span className="text-xs" style={{ color: smallTextColor }}>
                  تومان
                </span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <motion.div
      ref={sectionRef}
      style={{ backgroundColor: bgColor }}
      className="w-full overflow-hidden dana"
      dir="rtl"
      {...sectionMotion}
    >
      <div className="max-w-7xl mx-auto py-6 px-4 md:py-8 md:px-6 lg:py-10 lg:px-10">
        {(title || subtitle || titleIcon) && (
          <motion.div className="flex items-center gap-2 mb-5" {...headerMotion}>
            {titleIcon ? <span className="text-lg">{titleIcon}</span> : null}
            <h2
              className="text-lg md:text-xl danaBold"
              style={{ color: largeTextColor }}
            >
              {title}
            </h2>
            {subtitle ? (
              <p className="text-sm danaBold" style={{ color: smallTextColor }}>
                {subtitle}
              </p>
            ) : null}
          </motion.div>
        )}

        <motion.div
          style={{ background: "#ffffff" }}
          className="relative p-1 py-8"
          {...sliderMotion}
        >
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20
              w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10
              rounded-full flex items-center justify-center
              bg-white/80 hover:bg-white shadow-md hover:shadow-lg
              transition-all duration-200 border border-gray-100"
            aria-label="قبلی"
          >
            <FaChevronRight className="text-gray-600 text-[11px] sm:text-[13px]" />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20
              w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10
              rounded-full flex items-center justify-center
              bg-white/80 hover:bg-white shadow-md hover:shadow-lg
              transition-all duration-200 border border-gray-100"
            aria-label="بعدی"
          >
            <FaChevronLeft className="text-gray-600 text-[11px] sm:text-[13px]" />
          </button>

          <div className="mx-9 sm:mx-11 md:mx-13 rounded-[22px] overflow-hidden">
            <Swiper
              modules={[Navigation, Autoplay, FreeMode]}
              spaceBetween={22}
              slidesPerView={1.35}
              breakpoints={{
                768: { slidesPerView: 2.4 },
                1024: { slidesPerView: desktopSlidesPerView },
              }}
              freeMode={{ enabled: true, sticky: false }}
              grabCursor={true}
              loop={products.length > desktopSlidesPerView}
              autoplay={
                enableAutoplay === "true"
                  ? { delay: autoplayDelayMs, disableOnInteraction: false }
                  : false
              }
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSliderMove={() => setIsDragging(true)}
              onTouchEnd={() => setTimeout(() => setIsDragging(false), 100)}
              className="w-full"
              dir="rtl"
            >
              {products.map((product, index) => {
                const oldPrice =
                  product.oldPrice ||
                  product.old_price ||
                  product.previousPrice ||
                  "";
                const discountPercent =
                  product.discountPercent ||
                  product.discount ||
                  product.discount_percentage ||
                  0;

                return (
                  <SwiperSlide key={product.id || product._id}>
                    <motion.div {...getCardMotion(index)}>
                      {CardSlider(product, discountPercent, oldPrice)}
                    </motion.div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SimpleSwiper;
