'use client';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { usePathname } from 'next/navigation';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import Link from 'next/link';

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
    <div className="w-full py-10  px-10 dana" dir="rtl">
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        loop={true}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id || product._id}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 px-8 md:px-20 py-12 md:py-16 bg-gradient-to-br from-blue-50 via-yellow-50 to-orange-100 rounded-3xl min-h-96 md:min-h-96" dir="rtl">
              <div className="flex flex-col justify-center flex-1 w-full md:w-auto">
                <div className="text-2xl md:text-3xl font-semibold text-black mb-3 tracking-wider">
                  تومان {parseInt(product.price || 0).toLocaleString('fa-IR')}
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 md:mb-6 leading-tight">
                  {product.name || product.title}
                </h2>
                <p className="text-sm md:text-base text-gray-700 mb-7 md:mb-8 leading-relaxed max-w-sm">
                  {product.description || product.shortDescription || 'بدون توضیحات'}
                </p>
                <Link
                href={product.href || `/product/${product.id || product._id}`}
                >
                <button className="w-fit px-10 py-3 md:py-4 border-2 border-black rounded-full bg-transparent text-xs md:text-sm font-bold text-black tracking-widest transition-all duration-300 hover:bg-black hover:text-white">
                  خرید کنید
                </button>
                </Link>
              </div>
              <div className="relative flex items-center justify-center flex-1 w-full md:w-auto h-64 md:h-96" dir="rtl">
                {product.badge && (
                  <div className="absolute top-4 md:top-6 left-4 md:left-6 w-24 h-24 md:w-28 md:h-28 border-3 border-black rounded-full bg-white flex items-center justify-center font-bold text-xs text-black text-center p-2 md:p-3 z-10 shadow-lg">
                    {product.badge}
                  </div>
                )}
                {(product.image || product.mainImage) && (
                  <img 
                    src={getImageUrl(product.mainImage || product.image)} 
                    alt={product.name || product.title} 
                    className="max-w-full max-h-full object-contain" 
                  />
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ProductSwp2