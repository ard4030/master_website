'use client'

import React from 'react'
import { MdShoppingCart } from 'react-icons/md'

/**
 * کامپوننت محصولات 2
 * @param {Array} data - آرایه محصولات سفارشی
 * @param {String} dataSourceType - نوع منبع داده ('manual')
 * @param {String} backgroundColor - رنگ پس‌زمینه
 * @param {String} width - عرض کامپوننت (درصد)
 * @param {String} alignment - تراز‌بندی (center یا flex-start)
 * @param {String} sortButtonBgColor - رنگ پس‌زمینه دکمه‌ها
 * @param {String} sortButtonActiveBgColor - رنگ پس‌زمینه دکمه فعال
 * @param {String} sortButtonTextColor - رنگ متن دکمه‌ها
 * @param {String} sortButtonActiveTextColor - رنگ متن دکمه فعال
 * @param {String} cartButtonBgColor - رنگ پس‌زمینه دکمه سبد
 * @param {String} cartButtonTextColor - رنگ متن دکمه سبد
 * @param {String} cartButtonHoverBgColor - رنگ پس‌زمینه دکمه در hover * @param {String} imageWidth - عرض عکس (درصد)
 * @param {String} imageHeight - ارتفاع عکس (پیکسل) */
const Products2 = ({ 
  data = null,
  dataSourceType = 'manual',
  backgroundColor = '#f3f4f6',
  width = '100',
  alignment = 'center',
  sortButtonBgColor = '#fed7aa',
  sortButtonActiveBgColor = '#f97316',
  sortButtonTextColor = '#374151',
  sortButtonActiveTextColor = '#ffffff',
  cartButtonBgColor = '#f97316',
  cartButtonTextColor = '#ffffff',
  cartButtonHoverBgColor = '#ea580c',
  imageWidth = '100',
  imageHeight = '192',
  imageAlignment = 'center',
  imageObjectFit = 'cover'
}) => {
  const filters = [
    { label: 'ارزانترین', value: 'cheapest' },
    { label: 'گرانترین', value: 'expensive' },
    { label: 'محبوب‌ترین', value: 'popular' },
    { label: 'جدیدترین', value: 'newest' },
    { label: 'قدیمی‌ترین', value: 'oldest' },
  ]

  const [sortBy, setSortBy] = React.useState('popular')

  // استفاده از داده‌های ارسال شده یا محصولات پیش‌فرض
  const defaultProducts = [
    {
      id: 1,
      name: 'HP Spectre x360',
      code: 'HP-242-ABC',
      price: '۱,۲۹۹,۹۹۹',
      image: process.env.NEXT_PUBLIC_LIARA_IMAGE_URL + 'fzlDt17j4Xi3VH6g.jpg',
      badge: 'محبوب',
      showBadge: true
    },
    {
      id: 2,
      name: 'ASUS ExpertBook B5',
      code: 'CF-345-TTL',
      price: '۲۵۶,۹۹۹',
      image: process.env.NEXT_PUBLIC_LIARA_IMAGE_URL + 'fzlDt17j4Xi3VH6g.jpg',
      badge: null,
      showBadge: false
    },
    {
      id: 3,
      name: 'Dell XPS 13',
      code: 'DL-456-XYZ',
      price: '۹۹۹,۹۹۹',
      image: process.env.NEXT_PUBLIC_LIARA_IMAGE_URL + 'fzlDt17j4Xi3VH6g.jpg',
      badge: null,
      showBadge: false
    },
    {
      id: 4,
      name: 'Lenovo ThinkPad X1',
      code: 'CP-456-DEF',
      price: '۱,۱۹۹,۰۰۰',
      image: process.env.NEXT_PUBLIC_LIARA_IMAGE_URL + 'fzlDt17j4Xi3VH6g.jpg',
      badge: null,
      showBadge: false
    }
  ]

  // تابع کمکی برای تبدیل URL تصویر
  const getImageUrl = (imagePath) => {
    if (!imagePath) return ''
    if (imagePath.startsWith('http')) return imagePath
    return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${imagePath}`
  }

  // استفاده از داده‌های ارسال شده یا پیش‌فرض
  const products = Array.isArray(data) && data.length > 0 ? data : defaultProducts

  return (
    <div className="py-8" style={{ backgroundColor, display: 'flex', justifyContent: alignment === 'center' ? 'center' : 'flex-start' }}>
      <div style={{ width: `${width}%` }} className="px-4">
        {/* Header */}
        <div className="mb-8">
          {/* Sort By Buttons */}
          <div className="flex justify-start gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSortBy(filter.value)}
                style={{
                  backgroundColor: sortBy === filter.value ? sortButtonActiveBgColor : sortButtonBgColor,
                  color: sortBy === filter.value ? sortButtonActiveTextColor : sortButtonTextColor
                }}
                className="px-4 py-2 rounded-2xl whitespace-nowrap danaMed text-sm transition-colors hover:opacity-80"
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {/* Product Image Container */}
              <div 
                className="relative  overflow-hidden"
                style={{
                  width: '100%',
                  height: `${imageHeight}px`,
                  display: 'flex',
                  justifyContent: imageAlignment === 'flex-start' ? 'flex-start' : imageAlignment === 'flex-end' ? 'flex-end' : 'center',
                  alignItems: 'center'
                }}
              >
                <img
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  style={{
                    width: `${imageWidth}%`,
                    height: '100%',
                    objectFit: imageObjectFit
                  }}
                  className="hover:scale-105 transition-transform"
                />
                
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs danaBold">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                {/* Product Name */}
                <h3 className="text-sm danaBold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>

                {/* Product Code */}
                {product.code && (
                  <p className="text-xs danaMed text-gray-500 mb-3">
                    {product.code}
                  </p>
                )}

                {/* Price */}
                <div className="mb-4">
                  <p className="text-lg danaBold text-gray-900">
                    {product.price}
                    <span className="text-xs danaMed text-gray-600 mr-1">تومان</span>
                  </p>
                  <p className="text-xs danaMed text-gray-500">
                    (شامل مالیات)
                  </p>
                </div>

                {/* Add to Cart Button */}
                <button 
                  style={{
                    backgroundColor: cartButtonBgColor,
                    color: cartButtonTextColor
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = cartButtonHoverBgColor}
                  onMouseLeave={(e) => e.target.style.backgroundColor = cartButtonBgColor}
                  className="w-full text-white py-2 rounded-lg danaBold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MdShoppingCart size={20} />
                  اضافه به سبد خرید
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products2