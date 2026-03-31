'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/**
 * کامپوننت محصولات
 * @param {Array} data - آرایه محصولات سفارشی یا شناسه‌های دسته‌بندی
 * @param {String} dataSourceType - نوع منبع داده ('category', 'discounted', 'manual')
 * @param {String} title - عنوان بخش محصولات
 * @param {String} subtitle - زیرعنوان بخش محصولات
 */
const Products1 = ({ 
  data = null, 
  dataSourceType = 'manual',
  title = 'نان های خاص و شیرین',
  subtitle = 'محصولات منتخب ما برای شما'
}) => {

  const pathName = usePathname()

  // تابع کمکی برای تبدیل URL تصویر
  const getImageUrl = (imagePath) => {
    if (!imagePath) return ''
    if (imagePath.startsWith('http')) return imagePath
    return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${imagePath}`
  }
  const defaultProducts = [
    {
      id: 1,
      name: 'کروسان بسته ای',
      price: '۱۵۰،۰۰۰',
      image: 'https://images.unsplash.com/photo-1585080201735-aaf6afb32e14?w=300&h=300&fit=crop',
      rating: 5,
      badge: true,
      href: '/products/1'
    },
    {
      id: 2,
      name: 'کوکی شکلاتی',
      price: '۸۰،۰۰۰',
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=300&fit=crop',
      rating: 5,
      badge: false,
      href: '/products/2'
    },
    {
      id: 3,
      name: 'شیرینی پالم زمینی',
      price: '۹۸،۰۰۰',
      image: 'https://images.unsplash.com/photo-1502365692655-904a2c86d647?w=300&h=300&fit=crop',
      rating: 5,
      badge: true,
      href: '/products/3'
    },
    {
      id: 4,
      name: 'رول دارچینی',
      price: '۱۱۰،۰۰۰',
      image: 'https://images.unsplash.com/photo-1618453479662-92362e249bb0?w=300&h=300&fit=crop',
      rating: 5,
      badge: false,
      href: '/products/4'
    },
    {
      id: 5,
      name: 'شیرینی پرتقالی خوشمزه',
      price: '۹۰،۰۰۰',
      image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&h=300&fit=crop',
      rating: 5,
      badge: false,
      href: '/products/5'
    },
    {
      id: 6,
      name: 'کروسان با شکلات',
      price: '۱۲۰،۰۰۰',
      image: 'https://images.unsplash.com/photo-1586985272359-3ef73141d3a1?w=300&h=300&fit=crop',
      rating: 5,
      badge: false,
      href: '/products/6'
    },
    {
      id: 7,
      name: 'کروسان وک شکلاتی',
      price: '۱۲۰،۰۰۰',
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db97?w=300&h=300&fit=crop',
      rating: 5,
      badge: true,
      href: '/products/7'
    },
    {
      id: 8,
      name: 'پیراشکی شکلاتی',
      price: '۶۵،۰۰۰',
      image: 'https://images.unsplash.com/photo-1568571933382-74d440642117?w=300&h=300&fit=crop',
      rating: 5,
      badge: true,
      href: '/products/8'
    }
  ]

  // منطق انتخاب محصولات بر اساس dataSourceType و data
  let products = defaultProducts

  if (dataSourceType === 'manual' && data && Array.isArray(data) && data.length > 0) {
    // اگر دستی است و data آرایه‌ای از محصولات است
    if (typeof data[0] === 'object' && data[0].id) {
      products = data
    }
  } else if (dataSourceType === 'category' && data && Array.isArray(data) && data.length > 0) {
    // اگر دسته‌بندی است و data آرایه‌ای از category ids است
    // می‌تونیم محصولات را فیلتر کنیم بر اساس دسته‌بندی
    // فعلا تمام محصولات را نمایش می‌دهی
    products = defaultProducts
  } else if (dataSourceType === 'discounted') {
    // محصولات با badge (تخفیفدار)
    products = defaultProducts.filter(p => p.badge)
  }

  if(pathName !== '/newsitebuilder') products = data

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl danaBold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-gray-600 danaMed text-lg">
            {subtitle}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <div
              key={product.id || product._id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden bg-gray-100 h-64 flex items-center justify-center">
                {product.badge && (
                  <div className="absolute top-3 right-3 z-10 bg-green-500 text-white w-12 h-12 flex items-center justify-center transform rotate-45">
                    <span className="transform -rotate-45 text-sm danaBold">⭐</span>
                  </div>
                )}

                
                {product.image || product.mainImage && (
                  <img
                    src={getImageUrl(product.mainImage || product.image)}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                {/* Product Name */}
                <h3 className="text-base danaBold text-gray-900 mb-3 line-clamp-2">
                  {product.name}
                </h3>

                {/* Rating */}
                {/* <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                  <span className="text-xs text-gray-500 danaMed mr-1">(۶۸)</span>
                </div> */}

                {/* Description */}
                <p className="text-xs text-gray-600 danaMed mb-4 line-clamp-2">
                  {product.shortDescription || 'بدون توضیحات'}  
                </p>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg danaBold text-gray-900">
                    {parseInt(product.price).toLocaleString('fa-IR') }
                  </span>
                  <span className="text-xs text-gray-500 danaMed">تومان</span>
                </div>

                {/* Add to Cart Button */}
                <Link
                  href={product.href || `/product/${product.id || product._id}`}
                  className="w-full px-4 py-2 border-2 border-orange-400 text-orange-400 rounded-lg danaBold text-sm hover:bg-orange-50 transition-colors text-center block"
                >
                  افزودن به سبد خرید
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`w-10 h-10 rounded-full border-2 danaBold text-sm transition-colors ${
                page === 1
                  ? 'border-orange-400 bg-orange-400 text-white'
                  : 'border-gray-300 text-gray-600 hover:border-orange-400'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products1
