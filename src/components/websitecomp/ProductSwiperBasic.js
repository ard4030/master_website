"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, FreeMode } from "swiper/modules";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, useAnimationControls, useInView } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { formatPrice } from "@/utils/functions";

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
const ProductsSwiperBasic = ({
  bgColor = "#ffffff",
  largeTextColor = "#111827",
  smallTextColor = "#6b7280",
  priceColor = "#0d9488",
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

  // تابع کمکی برای تبدیل URL تصویر
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${imagePath}`;
  };

  // لینک محصول
  const getProductLink = (product) => {
    const id = product._id || product.id;
    return `/product/${id}`;
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
      badge: false,
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
      badge: false,
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
      badge: false,
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
      badge: false,
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
      badge: false,
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

  const maxSlidesPerView = 4;
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

  return (
    <motion.div
      ref={sectionRef}
      style={{ backgroundColor: bgColor }}
      className="w-full overflow-hidden dana"
      dir="rtl"
      {...sectionMotion}
    >
      <div className="max-w-7xl mx-auto py-6 px-3 md:py-8 md:px-4 lg:py-10 lg:px-6">
        {/* Header */}
        <motion.div className="flex items-center justify-between mb-6" {...headerMotion}>
          {/* Title */}
          <div className="flex items-center gap-2">
            {titleIcon && <span className="text-2xl">{titleIcon}</span>}
            <h2 className="text-xl font-bold" style={{ color: largeTextColor }}>
              {title}
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Products Swiper */}
        <motion.div {...sliderMotion}>
          <Swiper
            modules={[Navigation, Autoplay, FreeMode]}
            spaceBetween={16}
            slidesPerView={1.5}
            breakpoints={{
              768: { slidesPerView: 2.5 },
              1024: { slidesPerView: maxSlidesPerView },
            }}
            freeMode={{ enabled: true, sticky: false }}
            grabCursor={true}
            loop={products.length > maxSlidesPerView}
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
            {products.map((product, index) => (
              <SwiperSlide key={product.id || product._id}>
                <motion.div {...getCardMotion(index)}>
                  <Link
                    href={getProductLink(product)}
                    onClick={(e) => {
                      if (isDragging) e.preventDefault();
                    }}
                    className="block group"
                  >
                    <div className="border border-gray-200 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:border-gray-300 bg-white relative overflow-hidden">
                  {/* Product Image */}
                  <div className="w-full aspect-square rounded-lg overflow-hidden mb-4 flex items-center justify-center bg-gray-50">
                    {(product.image || product.mainImage) && (
                      <img
                        src={getImageUrl(product.mainImage || product.image)}
                        alt={product.name || product.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        draggable={false}
                      />
                    )}
                  </div>

                  {/* Add to Cart Button - shows on hover */}
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2 whitespace-nowrap shadow-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                        />
                      </svg>
                      <span>افزودن به سبد خرید</span>
                    </button>
                  </div>

                  {/* Product Info */}
                  <h3
                    className="text-sm font-medium text-center leading-6 mb-3 line-clamp-2 min-h-12"
                    style={{ color: largeTextColor }}
                  >
                    {product.name || product.title}
                  </h3>

                  {/* Price */}
                  <div className="text-center">
                    <span
                      className="text-base font-bold"
                      style={{ color: priceColor }}
                    >
                      {product.price ? formatPrice(product.price) : "۰"}
                    </span>
                    <span
                      className="text-xs mr-1"
                      style={{ color: priceColor }}
                    >
                      تومان
                    </span>
                  </div>
                    </div>
                  </Link>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductsSwiperBasic;
