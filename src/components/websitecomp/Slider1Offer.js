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
const Slider1Offer = ({
  bgColor = "#f71d3f",
  shellBgColor = "#f7f7fb",
  panelBgStart = "#b10090",
  panelBgEnd = "#6f0aa2",
  largeTextColor = "#3f4462",
  smallTextColor = "#d7dbee",
  priceColor = "#43d787",
  badgeColor = "#ff2e49",
  footerBgStart = "#252a56",
  footerBgEnd = "#1f2348",
  panelTitleColor = "#ffffff",
  panelTextColor = "#f3d6ff",
  navBtnColor = "#f00687",
  autoplayDelay = "5",
  enableAutoplay = "false",
  data = null,
  dataSourceType = "manual",
  title = "حراج\nآخر فصل",
  subtitle = "تخفیف های باورنکردنی داس",
  viewAllText = "مشاهده همه",
  viewAllLink = "#",
  sectionAnimationType = "fade",
  sectionAnimationDelay = "0.05",
  sectionAnimationDuration = "0.7",
  panelAnimationType = "slideRight",
  panelAnimationDelay = "0.14",
  panelAnimationDuration = "0.72",
  sliderAnimationType = "slideLeft",
  sliderAnimationDelay = "0.18",
  sliderAnimationDuration = "0.72",
  cardAnimationType = "blurUp",
  cardAnimationDelay = "0.25",
  cardAnimationDuration = "0.65",
  cardAnimationStagger = "0.07",
}) => {
  const sectionRef = useRef(null);
  const animationControls = useAnimationControls();
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.25,
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

  const sectionMotion = getMotionConfig(
    sectionAnimationType,
    sectionAnimationDelay,
    sectionAnimationDuration,
  );
  const panelMotion = getMotionConfig(
    panelAnimationType,
    panelAnimationDelay,
    panelAnimationDuration,
  );
  const sliderMotion = getMotionConfig(
    sliderAnimationType,
    sliderAnimationDelay,
    sliderAnimationDuration,
  );
  const getCardMotion = (index) =>
    getMotionConfig(
      cardAnimationType,
      cardAnimationDelay,
      cardAnimationDuration,
      parseTiming(cardAnimationStagger, 0.07) * index,
    );

  const autoplayDelayMs =
    enableAutoplay === "true" ? (parseInt(autoplayDelay) || 5) * 1000 : 0;
  const pathName = usePathname();
  const swiperRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const formatPercentFa = (value) => {
    const num = Number(value);
    if (!Number.isFinite(num) || num <= 0) return "";
    return `${Math.round(num)}٪`;
  };

  const parseMultiLine = (text) =>
    String(text || "")
      .split("\n")
      .filter(Boolean);

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
    products = sampleProducts.filter(
      (p) => Number(p.discountPercent || p.discount || 0) > 0 || !!p.oldPrice,
    );
  }

  if (pathName !== "/newsitebuilder") products = data || sampleProducts;

  const desktopSlidesPerView = 3;

  return (
    <motion.div
      ref={sectionRef}
      style={{ backgroundColor: bgColor }}
      className="w-full overflow-hidden dana"
      dir="rtl"
      {...sectionMotion}
    >
      <div className="max-w-7xl mx-auto py-5 px-3 md:py-8 md:px-4 lg:py-10 lg:px-6">
        <div
          className="rounded-[42px] p-2 md:p-3 overflow-hidden"
          style={{ backgroundColor: shellBgColor }}
        >
          <div className="flex flex-col lg:grid lg:grid-cols-[280px_minmax(0,1fr)] rounded-[34px] overflow-hidden">
            <motion.aside
              className="px-5 py-6 md:px-8 md:py-10 flex flex-col lg:flex-col items-center justify-center text-center"
              style={{
                background: `linear-gradient(165deg, ${panelBgStart} 0%, ${panelBgEnd} 100%)`,
              }}
              {...panelMotion}
            >
              {/* موبایل: افقی — دسکتاپ: عمودی */}
              <div className="w-full flex flex-row lg:flex-col items-center justify-between lg:justify-center gap-4 lg:gap-0">
                <div className="flex flex-col items-start lg:items-center text-right lg:text-center">
                  <h2
                    className="danaBold text-2xl md:text-3xl lg:text-4xl leading-[1.45] whitespace-pre-line"
                    style={{ color: panelTitleColor }}
                  >
                    {parseMultiLine(title).join("\n")}
                  </h2>
                  <p
                    className="mt-2 lg:mt-5 danaBold text-sm"
                    style={{ color: panelTextColor }}
                  >
                    {subtitle}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => swiperRef.current?.slidePrev()}
                      className="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: navBtnColor }}
                      aria-label="قبلی"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => swiperRef.current?.slideNext()}
                      className="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: navBtnColor }}
                      aria-label="بعدی"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  </div>
                  <Link
                    href={viewAllLink || "#"}
                    className="inline-flex items-center justify-center border-2 rounded-full px-5 lg:px-8 h-9 lg:h-12 text-sm lg:text-base danaBold whitespace-nowrap"
                    style={{ color: "#ffffff", borderColor: "#ffffff" }}
                  >
                    {viewAllText}
                  </Link>
                </div>
              </div>

              <div
                className="hidden lg:block w-full h-px my-4"
                style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
              />
            </motion.aside>

            <motion.div className="p-3 md:p-4 lg:p-5 bg-white" {...sliderMotion}>
              <Swiper
                modules={[Navigation, Autoplay, FreeMode]}
                spaceBetween={14}
                slidesPerView={1.1}
                breakpoints={{
                  768: { slidesPerView: 2.1 },
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
                      <Link
                        href={getProductLink(product)}
                        onClick={(e) => {
                          if (isDragging) e.preventDefault();
                        }}
                        className="block"
                      >
                        <motion.div
                          style={{
                            background: `linear-gradient(145deg, ${footerBgStart} 0%, ${footerBgEnd} 100%)`,
                          }}
                          className="relative border border-[#9ea5be] rounded-[34px] pb-3 p-0.75 overflow-hidden"
                          {...getCardMotion(index)}
                        >
                          {formatPercentFa(discountPercent) ? (
                            <span
                              className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 h-8 rounded-full text-white text-sm danaBold inline-flex items-center justify-center"
                              style={{ backgroundColor: badgeColor }}
                            >
                              {formatPercentFa(discountPercent)}
                            </span>
                          ) : null}

                          <div className=" w-full flex-wrap rounded-[34px]
                           overflow-hidden bg-white flex items-center justify-center p-2">
                            {(product.image || product.mainImage) && (
                              <div className="w-full h-full p-4">
                                  <img
                                    src={getImageUrl(
                                      product.mainImage || product.image,
                                    )}
                                    alt={product.name || product.title}
                                    className="w-full h-full rounded-md object-contain"
                                    draggable={false}
                                  />
                                </div>
                            )}
                          <h3
                            className="text-[18px] w-full danaBold text-center leading-10 my-1 line-clamp-1 min-h-14"
                            style={{ color: largeTextColor }}
                          >
                            {product.name || product.title}
                          </h3>

                          </div>


                          <div
                            className="-mx-3 -mb-3 grid grid-cols-4 px-4 py-6 rounded-b-3xl"
                            style={{
                              background: `linear-gradient(145deg, ${footerBgStart} 0%, ${footerBgEnd} 100%)`,
                            }}
                          >
                            <div className="col-span-1">
                                <span className=" text-amber-100 line-through text-sm">123000</span>
                            </div>
                            <div className="flex col-span-3 items-start justify-between gap-2" dir="ltr">
                              <div className="flex flex-col items-start">
                                <span
                                  className="text-[25px] danaBold leading-none"
                                  style={{ color: priceColor }}
                                >
                                  {product.price ? formatPrice(product.price) : "۰"}
                                </span>
                                <span
                                  className="text-xs danaBold mt-1"
                                  style={{ color: smallTextColor }}
                                >
                                  تومان
                                </span>
                              </div>

                              {oldPrice ? (
                                <p className="text-sm danaBold text-[#f6e6b1] line-through decoration-2 decoration-[#e9bc59] pt-1">
                                  {formatPrice(oldPrice)}
                                </p>
                              ) : null}
                            </div>


                          </div>
                        </motion.div>
                      </Link>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Slider1Offer;
