'use client'

import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { FiMinus, FiPackage, FiPlus, FiTrash2 } from 'react-icons/fi'
import CircularProgress from '@mui/material/CircularProgress'
import ModalLayoutPro from '@/components/global/ModalLayout/ModalLayoutPro'
import { CartContext } from '@/context/CartContext'
import { isCart } from '@/utils/functions'

const IMAGE_BASE = process.env.NEXT_PUBLIC_LIARA_IMAGE_URL || ''

const resolveProductId = (item) => {
  return item?._id || item?.productId || item?.id || item?.product?._id || item?.product?.id || null
}

const resolveProductName = (item) => {
  return item?.name || item?.productName || item?.title || item?.product?.name || 'محصول پیشنهادی'
}

const resolveImageSrc = (item) => {
  const raw = item?.image || item?.mainImage || item?.thumbnail || item?.images?.[0] || item?.product?.image || ''
  if (!raw) return ''
  if (/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(raw)) return raw

  const normalizedBase = IMAGE_BASE.endsWith('/') ? IMAGE_BASE.slice(0, -1) : IMAGE_BASE
  const normalizedPath = raw.startsWith('/') ? raw : `/${raw}`
  return `${normalizedBase}${normalizedPath}`
}

const products = [
  {
    "_id": "6a0dbac759dac255e54b2546",
    "name": "ترازوی دیجیتال er45",
    "slug": "er45",
    "shortDescription": "توضیح کوتاه",
    "price": 1290000,
    "mainImage": "https://c992009.parspack.net/merchant/6996fe6df900e181d09af198/17792846703401775593099_513005405.webp",
    "galleryImages": [
      "https://c992009.parspack.net/merchant/6996fe6df900e181d09af198/17792846643351775593100_9279130802.webp"
    ]
  },
  {
    "_id": "6a1ab55b59dac255e54b3f23",
    "name": "کتاب از دو که حرف میزنم",
    "slug": "product-1780135322956-nytu5h",
    "shortDescription": "کتاب «کتابفروشی موریساکی» نوشته ساتوشی یاگیساوا، یک رمان دلنشین و ....",
    "price": 780000,
    "mainImage": "https://c992009.parspack.net/merchant/6996fe6df900e181d09af198/1780132874968225x330.jpg",
    "galleryImages": []
  },
  {
    "_id": "6a1ab5a659dac255e54b3f8c",
    "name": "کتاب روز ها در کافه ترونکا",
    "slug": "product-1780135367624-bg08li",
    "shortDescription": "کتاب «کتابفروشی موریساکی» نوشته ساتوشی یاگیساوا، یک رمان دلنشین و ....",
    "price": 780000,
    "mainImage": "https://c992009.parspack.net/merchant/6996fe6df900e181d09af198/17801328690477bb374392e8f471fbbe907c3b9cfabc9.webp",
    "galleryImages": [
      "https://c992009.parspack.net/merchant/6996fe6df900e181d09af198/1780132872308225x330a.jpg"
    ]
  },
  {
    "_id": "6a1ab62d59dac255e54b401e",
    "name": "کتاب روز ها در کافه ترونکا (کپی)",
    "slug": "product-1780135469242-m70mld",
    "shortDescription": "کتاب «کتابفروشی موریساکی» نوشته ساتوشی یاگیساوا، یک رمان دلنشین و ....",
    "price": 780000,
    "mainImage": "https://c992009.parspack.net/merchant/6996fe6df900e181d09af198/1780132872308225x330a.jpg",
    "galleryImages": [
      "https://c992009.parspack.net/merchant/6996fe6df900e181d09af198/1780132872308225x330a.jpg"
    ]
  }
]

export const SuggestionsModal = ({ productList = [], nextStep, open = true, onClose }) => {

  // const items = Array.isArray(productList) ? productList : []

  const { cart, setShowSuggestions, addToCart, increaseQuantity, decreaseQuantity } = useContext(CartContext)
  
  const [items, setItems] = useState([])
  const [loadingState, setLoadingState] = useState({ productId: null, action: null })
  
  const getItemsList = async () => {
    // const res = await apiRequest('/','',{});
    const res = products;
    setItems(res);
    return res

  }

  useEffect(() => {
    getItemsList();
  }, [])

  const runNextStep = () => {
    if (typeof nextStep === 'function') {
        setShowSuggestions(false);
        nextStep()
    }
  }

  const withItemLoading = async (productId, action, fn) => {
    try {
      setLoadingState({ productId, action })
      await fn()
    } finally {
      setLoadingState({ productId: null, action: null })
    }
  }

  const getCartItem = (productId) => {
    return isCart({
      productId,
      variantId: null,
      isVariants: false,
      items: cart?.items,
    })
  }

  const addedToCart = async (dataItem) => {
    await withItemLoading(dataItem?._id, 'add', () =>
      addToCart({
        _id: dataItem._id,
      })
    )
  }

  const handleIncrease = async (productId) => {
    await withItemLoading(productId, 'inc', () => increaseQuantity(productId, null))
  }

  const handleDecrease = async (productId) => {
    await withItemLoading(productId, 'dec', () => decreaseQuantity(productId, null))
  }

  const closeModal = () => {
    if (typeof onClose === 'function') {
      onClose()
      return
    }
    runNextStep()
  }

  const headerContent = (
    <div className="flex items-center justify-between" dir="rtl">
      <h3 className="danaBold text-base md:text-lg text-gray-900">شاید به این محصولات هم نیاز داشته باشید</h3>
      <span className="text-xs danaMed text-gray-500">{items.length.toLocaleString('fa-IR')} محصول</span>
    </div>
  )

  const footerContent = (
    <div className="grid grid-cols-2 gap-2" dir="rtl">
      <button
        type="button"
        onClick={runNextStep}
        className="h-11 rounded-xl border border-gray-300 text-gray-700 danaMed text-sm hover:bg-gray-50 transition"
      >
        ادامه خرید
      </button>
      <button
        type="button"
        onClick={runNextStep}
        className="h-11 rounded-xl bg-gray-900 text-white danaMed text-sm hover:bg-black transition"
      >
        نیازی ندارم
      </button>
    </div>
  )

  return (
    <ModalLayoutPro
      isOpen={open}
      handleClose={closeModal}
      widthModal={620}
      heightModal="78vh"
      headerContent={headerContent}
      footerContent={footerContent}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3" dir="rtl">
        {items.length === 0 ? (
          <div className="md:col-span-2 rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500 danaMed text-sm">
            محصول پیشنهادی برای نمایش وجود ندارد.
          </div>
        ) : (
          items.map((item, index) => {
            const productId = resolveProductId(item)
            const productName = resolveProductName(item)
            const imageSrc = resolveImageSrc(item)
            const productHref = productId ? `/product/${productId}` : '/product'
            const productPrice = Number(item?.price || item?.finalPrice || item?.product?.price || 0)
            const cartItem = productId ? getCartItem(productId) : null
            const isThisItemLoading = loadingState.productId === productId

            return (
              <div
                key={`${productId || 'suggestion'}-${index}`}
                className="group rounded-2xl border border-gray-200 bg-white p-3 hover:shadow-sm transition"
              >
                <Link
                  href={productHref}
                  onClick={runNextStep}
                  className="flex gap-3 items-start"
                >
                  <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                    {imageSrc ? (
                      <img src={imageSrc} alt={productName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <FiPackage size={18} />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="danaBold text-sm text-gray-900 line-clamp-2">{productName}</p>
                    <p className="danaMed text-xs text-gray-500 mt-1">مشاهده محصول</p>
                    {productPrice > 0 ? (
                      <p className="danaBold text-sm text-gray-900 mt-2">
                        {Math.floor(productPrice).toLocaleString('fa-IR')}
                        <span className="danaMed text-[11px] text-gray-500 mr-1">تومان</span>
                      </p>
                    ) : null}
                  </div>
                </Link>

                {cartItem ? (
                  <div className="flex items-center justify-between gap-2 mt-3" dir="ltr">
                    <button
                      type="button"
                      onClick={() => handleDecrease(cartItem.productId)}
                      disabled={isThisItemLoading}
                      className="w-10 h-10 flex items-center justify-center border border-red-300 rounded-lg text-red-500 hover:bg-red-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isThisItemLoading && loadingState.action === 'dec' ? (
                        <CircularProgress size={16} thickness={5} sx={{ color: '#ef4444' }} />
                      ) : cartItem.quantity > 1 ? (
                        <FiMinus size={17} />
                      ) : (
                        <FiTrash2 size={17} />
                      )}
                    </button>

                    <div className="flex-1 h-10 flex items-center justify-center border border-gray-300 rounded-lg text-base danaMed text-gray-900">
                      {Number(cartItem.quantity || 0).toLocaleString('fa-IR')}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleIncrease(cartItem.productId)}
                      disabled={isThisItemLoading}
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isThisItemLoading && loadingState.action === 'inc' ? (
                        <CircularProgress size={16} thickness={5} sx={{ color: '#6b7280' }} />
                      ) : (
                        <FiPlus size={17} />
                      )}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => addedToCart(item)}
                    disabled={isThisItemLoading}
                    className="w-full mt-3 h-10 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 danaMed text-sm hover:bg-blue-100 transition disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isThisItemLoading && loadingState.action === 'add' ? (
                      <CircularProgress size={18} thickness={4.5} sx={{ color: '#1d4ed8' }} />
                    ) : (
                      'افزودن'
                    )}
                  </button>
                )}
              </div>
            )
          })
        )}
      </div>
    </ModalLayoutPro>
  )
}
