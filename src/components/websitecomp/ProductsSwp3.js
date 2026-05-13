'use client';
import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { usePathname } from 'next/navigation';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

// Import Swiper styles
import 'swiper/css';

/**
 * کامپوننت محصولات لغزنده - استایل 3
 * @param {Array} data - آرایه محصولات سفارشی یا شناسه‌های دسته‌بندی
 * @param {String} dataSourceType - نوع منبع داده ('category', 'discounted', 'manual')
 * @param {String} title - عنوان بخش محصولات
 * @param {String} subtitle - زیرعنوان بخش محصولات
 * @param {String} description - توضیحات بخش
 */
const ProductsSwp3 = ({ 
  data = null,
  dataSourceType = 'manual',
  title = 'بازار هفتر',
  subtitle = 'فروش ویژه پاییزه',
  description = 'بازار خرید و فروش هنر دستساخته ها و اشیای ارزشمند'
}) => {
  const pathName = usePathname()
  const [activeMainSlide, setActiveMainSlide] = useState(0)
  const [selectedProductIndex, setSelectedProductIndex] = useState(0)
  const swiperRef = useRef(null)

  // تابع کمکی برای تبدیل URL تصویر
  const getImageUrl = (imagePath) => {
    if (!imagePath) return ''
    if (imagePath.startsWith('http')) return imagePath
    return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${imagePath}`
  }

  const sampleProducts = [
    {
      id: 1,
      price: '۲۵۰۰۰',
      name: 'مسوری زائیه',
      title: 'مسوری زائیه',
      description: 'آثار هنری منحصربه‌فرد و زیبا',
      image: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=400&h=400&fit=crop',
      mainImage: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=400&h=400&fit=crop',
      badge: false
    },
    {
      id: 2,
      price: '۳۰۰۰۰',
      name: 'مسوری زائیه',
      title: 'مسوری زائیه',
      description: 'آثار هنری منحصربه‌فرد و زیبا',
      image: 'https://images.unsplash.com/photo-1577720643272-265f434e0521?w=400&h=400&fit=crop',
      mainImage: 'https://images.unsplash.com/photo-1577720643272-265f434e0521?w=400&h=400&fit=crop',
      badge: false
    },
    {
      id: 3,
      price: '۲۰۰۰۰',
      name: 'مسوری زائیه',
      title: 'مسوری زائیه',
      description: 'آثار هنری منحصربه‌فرد و زیبا',
      image: 'https://images.unsplash.com/photo-1578898657634-0ecd72b84b8c?w=400&h=400&fit=crop',
      mainImage: 'https://images.unsplash.com/photo-1578898657634-0ecd72b84b8c?w=400&h=400&fit=crop',
      badge: false
    },
    {
      id: 4,
      price: '۲۸۰۰۰',
      name: 'مسوری زائیه',
      title: 'مسوری زائیه',
      description: 'آثار هنری منحصربه‌فرد و زیبا',
      image: 'https://images.unsplash.com/photo-1577720643273-265f434e0521?w=400&h=400&fit=crop',
      mainImage: 'https://images.unsplash.com/photo-1577720643273-265f434e0521?w=400&h=400&fit=crop',
      badge: false
    },
    {
      id: 5,
      price: '۳۲۰۰۰',
      name: 'مسوری زائیه',
      title: 'مسوری زائیه',
      description: 'آثار هنری منحصربه‌فرد و زیبا',
      image: 'https://images.unsplash.com/photo-1578301978162-7aae4d755743?w=400&h=400&fit=crop',
      mainImage: 'https://images.unsplash.com/photo-1578301978162-7aae4d755743?w=400&h=400&fit=crop',
      badge: false
    },
  ];

  // منطق انتخاب محصولات بر اساس dataSourceType و data
  let products = sampleProducts;

  if (dataSourceType === 'manual' && data && Array.isArray(data) && data.length > 0) {
    if (typeof data[0] === 'object' && (data[0].id || data[0]._id)) {
      products = data
    }
  } else if (dataSourceType === 'category' && data && Array.isArray(data) && data.length > 0) {
    products = sampleProducts
  } else if (dataSourceType === 'discounted') {
    products = sampleProducts.filter(p => p.badge)
  }

  if(pathName !== '/newsitebuilder') products = data || sampleProducts

  const selectedProduct = products[selectedProductIndex];

  const handleProductClick = (index) => {
    setSelectedProductIndex(index);
  };

  return (
    <div className="w-full bg-white overflow-hidden dana">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="py-12 md:py-20 px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-6">
            {/* Left Content */}
            <div className="flex flex-col justify-center space-y-6 text-right order-2 lg:order-1" dir="rtl">
              <div className="text-sm text-gray-600 tracking-wider">
                {subtitle}
              </div>
              
              <h1 className="text-3xl md:text-6xl font-bold text-black leading-tight">
                {selectedProduct?.title || title}
              </h1>
              
              <p className="text-gray-600 text-base leading-relaxed max-w-md">
                {selectedProduct?.description || description}
              </p>

              <div className="flex items-center gap-6">
                <button className="px-6 py-2 rounded-full border-2 border-blue-600 bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <span>فروشنده شو</span>
                  <span>←</span>
                </button>
                {selectedProduct?.price && (
                  <div className="text-lg font-bold text-blue-600">
                    {parseInt(selectedProduct.price).toLocaleString('fa-IR')} تومان
                  </div>
                )}
              </div>

            </div>

            {/* Right Content - Hero Image */}
            <div className="flex justify-center items-center order-1 lg:order-2 relative h-96 md:h-full">
              {selectedProduct && (selectedProduct.image || selectedProduct.mainImage) && (
                <img 
                  src={getImageUrl(selectedProduct.mainImage || selectedProduct.image)} 
                  alt={selectedProduct.name || selectedProduct.title} 
                  className="w-full h-full object-contain transition-all duration-300"
                />
              )}
            </div>
          </div>

          {/* Products Grid Below */}
          <div className="mt-4 md:mt-10">
            <div className="text-right mb-8 text-sm text-gray-600" dir="rtl">
               محصولات دیگر:
            </div>
            
            <div className="relative">
              {/* دکمه قبلی */}
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute right-[-5] top-1/2 -translate-y-1/2 z-10 -mr-3 flex items-center justify-center bg-gray-100 hover:bg-gray-300 text-black rounded-full shadow-md transition-all duration-200 hover:scale-105 w-6 h-6 md:w-8 md:h-8"
                aria-label="قبلی"
              >
                <HiChevronRight className="w-3 h-3 md:w-4 md:h-4 text-black shrink-0" />
              </button>

              {/* دکمه بعدی */}
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute left-[-5] top-1/2 -translate-y-1/2 z-10 -ml-3 flex items-center justify-center bg-gray-100 hover:bg-gray-300 text-black rounded-full shadow-md transition-all duration-200 hover:scale-105 w-6 h-6 md:w-8 md:h-8"
                aria-label="بعدی"
              >
                <HiChevronLeft className="w-3 h-3 md:w-4 md:h-4 text-black shrink-0" />
              </button>

            <Swiper
              onSwiper={(swiper) => { swiperRef.current = swiper }}
              spaceBetween={12}
              slidesPerView={2.5}
              breakpoints={{
                640: { slidesPerView: 4 },
                1024: { slidesPerView: 5 }
              }}
              loop={true}
              className="w-full px-1"
            >
              {products.map((product, index) => (
                <SwiperSlide key={product.id || product._id}>
                  <div 
                    onClick={() => handleProductClick(index)}
                    className={`flex flex-col items-center text-center cursor-pointer transition-all duration-300 rounded-lg p-3 ${selectedProductIndex === index ? 'bg-blue-50 border-2 border-blue-500' : 'border-2 border-transparent hover:bg-gray-50'}`}
                    dir="rtl"
                  >
                    {/* Product Image */}
                    <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                      {(product.image || product.mainImage) && (
                        <img
                          src={getImageUrl(product.mainImage || product.image)}
                          alt={product.name || product.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>

                    {/* Product Info */}
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                      {product.name || product.title}
                    </h3>

                    <p className="text-xs text-gray-600 mb-2">
                      —
                    </p>

                    <p className={`text-xs ${selectedProductIndex === index ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                      {product.price ? parseInt(product.price).toLocaleString('fa-IR') : '۰'} تومان
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsSwp3