"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, FreeMode } from "swiper/modules";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { formatPrice } from "@/utils/functions";

/**
 * کامپوننت محصولات لغزنده - استایل ساده
 * @param {Array} data - آرایه محصولات سفارشی یا شناسه‌های دسته‌بندی
 * @param {String} dataSourceType - نوع منبع داده ('category', 'discounted', 'manual')
 * @param {String} title - عنوان بخش محصولات
 * @param {String} subtitle - زیرعنوان بخش محصولات
 * @param {String} description - توضیحات بخش
 */
const Slider1 = ({
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
}) => {
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

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="w-full overflow-hidden dana"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto py-6 px-4 md:py-8 md:px-6 lg:py-10 lg:px-10">
        {(title || subtitle || titleIcon) && (
          <div className="flex items-center gap-2 mb-5">
            {titleIcon ? <span className="text-lg">{titleIcon}</span> : null}
            <h2 className="text-lg md:text-xl danaBold" style={{ color: largeTextColor }}>
              {title}
            </h2>
            {subtitle ? (
              <p className="text-sm danaBold" style={{ color: smallTextColor }}>
                {subtitle}
              </p>
            ) : null}
          </div>
        )}

        <div className="relative p-1">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute right-7 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white shadow-lg"
            style={{ backgroundColor: "#f00687" }}
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
            className="absolute left-7 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white shadow-lg"
            style={{ backgroundColor: "#f00687" }}
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

          <div className="mx-7 md:mx-12 rounded-[22px] shadow-sm overflow-hidden">
            <Swiper
              modules={[Navigation, Autoplay, FreeMode]}
              spaceBetween={0}
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
              {products.map((product) => {
                const oldPrice =
                  product.oldPrice || product.old_price || product.previousPrice || "";
                const discountPercent =
                  product.discountPercent || product.discount || product.discount_percentage || 0;

                return (
                  <SwiperSlide key={product.id || product._id}>
                    <Link
                      href={getProductLink(product)}
                      onClick={(e) => {
                        if (isDragging) e.preventDefault();
                      }}
                      className="block"
                    >
                      <div className="bg-white border-l-1 border-gray-200 p-3 md:p-4 ">
                        <div className="w-full aspect-square rounded-2xl overflow-hidden mb-3
                         flex items-center justify-center">
                          {(product.image || product.mainImage) && (
                            <img
                              src={getImageUrl(product.mainImage || product.image)}
                              alt={product.name || product.title}
                              className="w-[85%] h-[85%] object-contain"
                              draggable={false}
                            />
                          )}
                        </div>

                        <h3
                          className="text-sm md:text-[15px] danaBold text-center leading-7 mb-3 line-clamp-1"
                          style={{ color: largeTextColor }}
                        >
                          {product.name || product.title}
                        </h3>

                        <div className="flex pt-4 items-end grid grid-cols-12 justify-between gap-2 border-t-1 pt-2 border-gray-300" dir="rtl">
                          
                            <div className="text-right col-span-4 grid flex flex-col items-end gap-1">
                              {formatPercentFa(discountPercent) ? (
                                <span
                                  className="inline-flex h-7 min-w-12 px-3 rounded-full items-center justify-center text-white text-sm italic danaBold"
                                  style={{ backgroundColor: "#6f2bd8", fontStyle: "italic" }}
                                >
                                  {formatPercentFa(discountPercent)}
                                </span>
                              ) : null}
                              {oldPrice ? (
                                <p className="text-xs danaBold text-[#c97b7b] line-through decoration-2 decoration-[#e15656]">
                                  {formatPrice(oldPrice)}
                                </p>
                              ) : null}
                            </div>
                          
                          <div className="text-left col-span-8 flex flex-wrap items-end gap-1">
                            <div className="leading-none w-full">
                              <span className="text-[24px] md:text-[24px] danaBold" style={{ color: priceColor }}>
                                {product.price ? formatPrice(product.price) : "۰"}
                              </span>
                            </div>
                            <span className="text-sm w-full danaBold mt-1 inline-block" style={{ color: smallTextColor }}>
                              تومان
                            </span>
                          </div>



                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider1;
