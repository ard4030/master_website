'use client';
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { usePathname } from 'next/navigation';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import Link from 'next/link';
import Image from 'next/image';
// import ViewPrice from '../global/other/ViewPrice';
import { formatPrice } from '@/utils/functions';

/**
 * کامپوننت محصولات لغزنده
 * @param {Array} data - آرایه محصولات سفارشی یا شناسه‌های دسته‌بندی
 * @param {String} dataSourceType - نوع منبع داده ('category', 'discounted', 'manual')
 * @param {String} title - عنوان بخش محصولات
 * @param {String} subtitle - زیرعنوان بخش محصولات
 */
const ProductSwp2 = ({ 
  data = null,
  dataSourceType = 'manual',
  title = 'برگر های خاص و خوشمزه',
  subtitle = 'محصولات منتخب ما برای شما'
}) => {
  const pathName = usePathname()
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  // تابع کمکی برای تبدیل URL تصویر
  const getImageUrl = (imagePath) => {
    if (!imagePath) return ''
    if (imagePath.startsWith('http')) return imagePath
    return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${imagePath}`
  }

  const sampleProducts = [
    {
      id: 1,
      price: '۸۹۹',
      name: 'برگر پلیشی خوشمزه',
      title: 'برگر پلیشی خوشمزه',
      description: 'برگر پلیشی محبوب و خوشمزه ما با کیفیت بسیار بالا و طعم فوق‌العاده برای شما و خانواده تهیه شده است. این محصول با بهترین مواد اولیه ساخته شده است.',
      image: '/assets/images/burger.jpg',
      mainImage: '/assets/images/burger.jpg',
      badge: 'محصول اصل'
    },
    {
      id: 2,
      price: '۱۲۹۹',
      name: 'پیتزای خوشمزه',
      title: 'پیتزای خوشمزه',
      description: 'پیتزای خوشمزه و مرغوب ما با بهترین مواد اولیه و دستور پخت سنتی برای رضایت شما تهیه می‌شود. طعم فوق‌العاده و کیفیت عالی در هر لقمه.',
      image: '/assets/images/pizza.jpg',
      mainImage: '/assets/images/pizza.jpg',
      badge: 'تازه روز'
    },
    {
      id: 3,
      price: '۱۵۹۹',
      name: 'پاستای لذیذ',
      title: 'پاستای لذیذ',
      description: 'پاستای سالم و لذیذ با سس خاص و مواد غذایی درجه یک برای تغذیه خاصی شما تهیه شده است. این غذای ایتالیایی را با طعم دلخواه تجربه کنید.',
      image: '/assets/images/pasta.jpg',
      mainImage: '/assets/images/pasta.jpg',
      badge: 'پریمیوم'
    },
  ];

  // منطق انتخاب محصولات بر اساس dataSourceType و data
  let products = sampleProducts;

  if (dataSourceType === 'manual' && data && Array.isArray(data) && data.length > 0) {
    // اگر دستی است و data آرایه‌ای از محصولات است
    if (typeof data[0] === 'object' && (data[0].id || data[0]._id)) {
      products = data
    }
  } else if (dataSourceType === 'category' && data && Array.isArray(data) && data.length > 0) {
    // اگر دسته‌بندی است و data آرایه‌ای از category ids است
    // می‌تونیم محصولات را فیلتر کنیم بر اساس دسته‌بندی
    // فعلا تمام محصولات را نمایش می‌دهی
    products = sampleProducts
  } else if (dataSourceType === 'discounted') {
    // محصولات با badge (تخفیفدار)
    products = sampleProducts.filter(p => p.badge)
  }

  if(pathName !== '/newsitebuilder') products = data || sampleProducts

  return (
    <div className="w-full py-10 px-10 dana" dir="rtl">
      <div className="relative">
        {/* دکمه قبلی */}
        <button
          ref={prevRef}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 border border-gray-200 shadow flex items-center justify-center text-gray-600 hover:bg-black hover:text-white hover:border-black transition-all duration-200"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
        {/* دکمه بعدی */}
        <button
          ref={nextRef}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 border border-gray-200 shadow flex items-center justify-center text-gray-600 hover:bg-black hover:text-white hover:border-black transition-all duration-200"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current
            swiper.params.navigation.nextEl = nextRef.current
          }}
          loop={true}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id || product._id}>
              <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-14 px-10 md:px-20 py-10 md:py-14 bg-linear-to-br from-blue-50 via-yellow-50 to-orange-100 rounded-3xl min-h-80 md:min-h-96" dir="rtl">
                {/* بخش متن */}
                <div className="flex flex-col justify-center flex-1 w-full md:w-auto">
                  {/* قیمت */}
                  <div className="flex items-baseline gap-1.5 mb-3">
                    <span className="text-3xl md:text-2xl font-bold text-gray-600 tracking-tight leading-none">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs text-gray-500 font-light">تومان</span>
                  </div>
                  {/* خط جداکننده */}
                  <div className="w-8 h-0.5 bg-black/80 mb-3 rounded-full" />
                  {/* عنوان محصول */}
                  <h2 className="text-3xl md:text-4xl font-bold text-black leading-snug mb-3">
                    {product.name || product.title}
                  </h2>
                  {/* توضیحات */}
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-xs mb-6 line-clamp-3">
                    {product.description || product.shortDescription || 'بدون توضیحات'}
                  </p>
                  {/* دکمه خرید */}
                  <Link href={product.href || `/product/${product.id || product._id}`}>
                    <button className="w-fit px-8 py-2.5 dana border border-black rounded-full bg-transparent text-sm font-bold text-gray-600 tracking-widest transition-all duration-300 hover:bg-black hover:text-white">
                      خرید کنید
                    </button>
                  </Link>
                </div>
                {/* بخش تصویر */}
                <div className="relative flex items-center justify-center flex-1 w-full md:w-auto h-56 md:h-80" dir="rtl">
                  {product.badge && (
                    <div className="absolute top-3 left-3 w-20 h-20 md:w-30 md:h-30 border-2 border-black rounded-full bg-white flex items-center justify-center font-bold text-xs text-black text-center p-2 z-10 shadow-md">
                      {product.badge}
                    </div>
                  )}
                  {(product.image || product.mainImage) && (
                    <Image
                      src={getImageUrl(product.mainImage || product.image)}
                      alt={product.name || product.title}
                      width={2000}
                      height={2000}
                      className="max-w-full max-h-full rounded-md object-contain"
                    />
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default ProductSwp2