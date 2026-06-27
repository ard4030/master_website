'use client'

import React from 'react'

function formatPrice(price) {
  return new Intl.NumberFormat('fa-IR').format(price)
}

const FALLBACK_PRODUCTS = [
  {
    id: 101,
    title: 'گوشی اقتصادی Z1',
    category: 'mobile',
    price: 9200000,
    image: '/assets/images/shiping/post.webp',
    stock: 11
  },
  {
    id: 102,
    title: 'ایرپاد مدل AirX',
    category: 'mobile',
    price: 1850000,
    image: '/assets/images/shiping/tipax.png',
    stock: 26
  },
  {
    id: 103,
    title: 'کفش روزمره Urban',
    category: 'fashion',
    price: 2790000,
    image: '/assets/images/shiping/zarrinpal.png',
    stock: 14
  },
  {
    id: 104,
    title: 'ساعت مینیمال G9',
    category: 'fashion',
    price: 4310000,
    image: '/assets/images/shiping/post.webp',
    stock: 8
  },
  {
    id: 105,
    title: 'چراغ مطالعه رومیزی',
    category: 'home',
    price: 760000,
    image: '/assets/images/shiping/tipax.png',
    stock: 33
  },
  {
    id: 106,
    title: 'جا ادویه شیشه ای 6 تایی',
    category: 'home',
    price: 540000,
    image: '/assets/images/shiping/zarrinpal.png',
    stock: 19
  }
]

const CategoryProducts = ({ catId, data = [] }) => {
  const apiProducts = Array.isArray(data) ? data : data?.products
//   const sourceProducts = Array.isArray(apiProducts) && apiProducts.length ? apiProducts : FALLBACK_PRODUCTS
  const sourceProducts = FALLBACK_PRODUCTS

  const products = sourceProducts.filter((item) => {
    // if (!catId) return true
    return String(item?.category || '').toLowerCase() === String(catId).toLowerCase()
  })

  if (!FALLBACK_PRODUCTS.length) {
    return <p className='text-sm text-gray-500'>محصولی برای این دسته‌بندی پیدا نشد.</p>
  }

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {FALLBACK_PRODUCTS.map((product) => (
        <div
          key={product.id}
          className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md'
        >
          <div className='mb-3 h-36 w-full overflow-hidden rounded-lg bg-gray-100'>
            <img
              src={product.image}
              alt={product.title}
              className='h-full w-full object-cover'
              loading='lazy'
            />
          </div>

          <h3 className='mb-2 line-clamp-2 text-base font-semibold text-gray-800'>{product.title}</h3>

          <p className='mb-2 text-sm text-gray-500'>موجودی: {product.stock}</p>

          <p className='text-lg font-bold text-emerald-600'>{formatPrice(product.price)} تومان</p>
        </div>
      ))}
    </div>
  )
}

export default CategoryProducts
