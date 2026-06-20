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
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
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
const Slider3 = ({
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

  // ── ریسپانسیو با Tailwind و breakpoints سوایپر ──
  const containerPadCls = "py-6 px-4 md:py-8 md:px-6 lg:py-10 lg:px-10";
  const swiperBreakpoints = {
    0: { slidesPerView: 1.35, spaceBetween: 0 },
    768: { slidesPerView: 2.4, spaceBetween: 0 },
    1024: { slidesPerView: 4, spaceBetween: 0 },
  };

  const sectionMotion = getMotionConfig(sectionAnimationType, sectionAnimationDelay, sectionAnimationDuration);
  const headerMotion = getMotionConfig(headerAnimationType, headerAnimationDelay, headerAnimationDuration);
  const sliderMotion = getMotionConfig(sliderAnimationType, sliderAnimationDelay, sliderAnimationDuration);
  const getCardMotion = (index) =>
    getMotionConfig(
      cardsAnimationType,
      cardsAnimationDelay,
      cardsAnimationDuration,
      parseTiming(cardsAnimationStagger, 0.07) * index
    );

  const CardSlider = (product, discountPercent, oldPrice, index) => {
    const author =
      product.author ||
      product.subtitle ||
      product.brand ||
      product.writer ||
      "";

    return (
      <motion.div {...getCardMotion(index)} className="h-full">
      <Link
        href={getProductLink(product)}
        onClick={(e) => {
          if (isDragging) e.preventDefault();
        }}
        className="block h-full"
      >
        <div className="bg-white border-l border-gray-200 h-full flex flex-col">
          {/* تصویر محصول */}
          <div className="w-full bg-white px-4 pt-4 pb-3 flex items-center justify-center">
            <div className="w-full aspect-3/4 flex items-center justify-center overflow-hidden">
              {(product.image || product.mainImage) && (
                <img
                  src={getImageUrl(product.mainImage || product.image)}
                  alt={product.name || product.title}
                  className="max-w-full max-h-full object-contain"
                  draggable={false}
                />
              )}
            </div>
          </div>

          {/* عنوان و نویسنده */}
          <div className="px-4 pb-3 flex-1 flex flex-col justify-start">
            <h3
              className="text-sm md:text-[15px] danaBold leading-7 line-clamp-1"
              style={{ color: largeTextColor }}
            >
              {product.name || product.title}
            </h3>
            {author ? (
              <p
                className="text-xs md:text-sm danaBold mt-1 line-clamp-1"
                style={{ color: smallTextColor }}
              >
                {author}
              </p>
            ) : null}
          </div>

          {/* نوار قیمت */}
          <div
            className="px-4 py-3 border-t border-gray-200 flex items-end justify-between gap-2"
            dir="rtl"
          >
            {/* سمت راست: قیمت قدیم + بج درصد */}
            <div className="flex flex-col items-start gap-1 min-w-0">
              {oldPrice ? (
                <p className="text-xs danaBold text-gray-400 line-through leading-none">
                  {formatPrice(oldPrice)}
                </p>
              ) : (
                <span className="h-3" />
              )}
              {formatPercentFa(discountPercent) ? (
                <span
                  className="inline-flex h-6 min-w-12 px-2 rounded-md items-center justify-center text-white text-xs danaBold"
                  style={{ backgroundColor: "#e15656" }}
                >
                  {formatPercentFa(discountPercent)}
                </span>
              ) : null}
            </div>

            {/* سمت چپ: قیمت اصلی + آیکون تومان */}
            <div className="flex items-center gap-1 leading-none">
              <span
                className="text-[20px] md:text-[22px] danaBold"
                style={{ color: priceColor }}
              >
                {product.price ? formatPrice(product.price) : "۰"}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 24"
                className="w-12 h-5 md:w-14 md:h-6"
                aria-label="تومان"
                role="img"
              >
                <text
                  x="32"
                  y="17"
                  textAnchor="middle"
                  direction="rtl"
                  unicodeBidi="plaintext"
                  fill={priceColor}
                  fontSize="16"
                  fontFamily="dana-bold, Vazirmatn, sans-serif"
                  fontWeight="700"
                >
                  تومان
                </text>
              </svg>
            </div>
          </div>
        </div>
      </Link>
      </motion.div>
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
      <div className={`max-w-7xl mx-auto ${containerPadCls}`}>
        {(title || subtitle || titleIcon) && (
          <motion.div className="flex items-center gap-2 mb-5" {...headerMotion}>
            {titleIcon ? <span className="text-lg">{titleIcon}</span> : null}
            <h2 className="text-lg md:text-xl danaBold" style={{ color: largeTextColor }}>
              {title}
            </h2>
            {subtitle ? (
              <p className="text-sm danaBold" style={{ color: smallTextColor }}>
                {subtitle}
              </p>
            ) : null}
          </motion.div>
        )}

        <motion.div className="relative p-1" {...sliderMotion}>
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white shadow-lg"
            style={{ backgroundColor: "#000" }}
            aria-label="قبلی"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white shadow-lg"
            style={{ backgroundColor: "#000" }}
            aria-label="بعدی"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="mx-7 md:mx-6 rounded-[22px] shadow-sm overflow-hidden">
            <Swiper
              key="swp-basic-3"
              modules={[Navigation, Autoplay, FreeMode]}
              spaceBetween={0}
              slidesPerView={1.35}
              breakpoints={swiperBreakpoints}
              freeMode={{ enabled: true, sticky: false }}
              grabCursor={true}
              loop={products.length > 4}
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
                  product.oldPrice || product.old_price || product.previousPrice || "";
                const discountPercent =
                  product.discountPercent || product.discount || product.discount_percentage || 0;

                return (
                  <SwiperSlide key={product.id || product._id}>
                    {CardSlider(product, discountPercent, oldPrice, index)}
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

export default Slider3;
