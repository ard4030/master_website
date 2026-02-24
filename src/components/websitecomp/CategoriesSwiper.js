'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

/**
 * کامپوننت دسته‌بندی‌های لغزنده
 * @param {String} title - عنوان بخش
 * @param {Array} categories - آرایه دسته‌بندی‌ها شامل {name, image}
 * @param {String} backgroundColor - رنگ زمینه
 */
const CategoriesSwiper = ({
  title = 'خرید بر اساس دسته‌بندی',
  categories = [
    {
      id: 1,
      name: 'طلا',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'مد و پوشاک',
      image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'آرایشی بهداشتی',
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'لوازم خانگی برقی',
      image: 'https://images.unsplash.com/photo-1574707267537-b85fab00c069?w=300&h=300&fit=crop'
    },
    {
      id: 5,
      name: 'خانه و آشپزخانه',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop'
    },
    {
      id: 6,
      name: 'گالی دیجیتال',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'
    },
    {
      id: 7,
      name: 'لپ تاپ',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop'
    },
    {
      id: 8,
      name: 'موبایل',
      image: 'https://images.unsplash.com/photo-1511707267537-b85fab00c069?w=300&h=300&fit=crop'
    },
    {
      id: 9,
      name: 'اسباب بازی، کودک و نوزاد',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop'
    },
    {
      id: 10,
      name: 'سوپر مارکت آنلاین',
      image: 'https://images.unsplash.com/photo-1553531088-d34b3fe76ebc?w=300&h=300&fit=crop'
    },
    {
      id: 11,
      name: 'کالا هدیه و کیفیت کارت',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&h=300&fit=crop'
    },
    {
      id: 12,
      name: 'ورزش و سفر',
      image: 'https://images.unsplash.com/photo-1461053409491-811de8da47db?w=300&h=300&fit=crop'
    },
    {
      id: 13,
      name: 'کتاب و هنر',
      image: 'https://images.unsplash.com/photo-1507842072343-583f20270319?w=300&h=300&fit=crop'
    },
    {
      id: 14,
      name: 'ابزارات و تجهیزات',
      image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=300&h=300&fit=crop'
    },
    {
      id: 15,
      name: 'سلامت و پزشکی',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300&h=300&fit=crop'
    }
  ],
  backgroundColor = 'bg-white'
}) => {
  // تابع کمکی برای تبدیل URL تصویر
  const getImageUrl = (imagePath) => {
    if (!imagePath) return ''
    if (imagePath.startsWith('http')) return imagePath
    return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${imagePath}`
  }

  return (
    <div className={`w-full ${backgroundColor} py-8 md:py-12`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Title */}
        {title && (
          <h2 className="text-2xl md:text-3xl danaBold text-gray-900 mb-8 text-center md:text-right">
            {title}
          </h2>
        )}

        {/* Categories Swiper */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            480: {
              slidesPerView: 3,
              spaceBetween: 12
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 16
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 20
            },
            1280: {
              slidesPerView: 8,
              spaceBetween: 20
            }
          }}
          navigation
          loop={categories.length > 8}
          className="w-full"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <div className="flex flex-col items-center text-center cursor-pointer group">
                {/* Category Image */}
                <div className="w-full aspect-square bg-gray-100 rounded-full overflow-hidden mb-3 md:mb-4 flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                  {category.image && (
                    <img
                      src={getImageUrl(category.image)}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  )}
                </div>

                {/* Category Name */}
                <p className="text-xs md:text-sm danaMed text-gray-700 leading-relaxed line-clamp-2">
                  {category.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default CategoriesSwiper
