import React from 'react'
import { FiPlus, FiMinus, FiTrash2, FiChevronLeft } from 'react-icons/fi'
import CircularProgress from '@mui/material/CircularProgress'

const IMAGE_BASE = process.env.NEXT_PUBLIC_LIARA_IMAGE_URL || ''

const resolveImageSrc = (item) => {
  const raw =
    item?.image ||
    item?.mainImage ||
    item?.thumbnail ||
    item?.images?.[0] ||
    null

  if (!raw) return null
  if (/^https?:\/\//i.test(raw)) return raw

  const normalizedBase = IMAGE_BASE.endsWith('/')
    ? IMAGE_BASE.slice(0, -1)
    : IMAGE_BASE
  const normalizedPath = raw.startsWith('/') ? raw : `/${raw}`
  return `${normalizedBase}${normalizedPath}`
}

const CartItem = ({
  item,
  lowStock,
  lineTotal,
  qty,
  itemId,
  isLoading,
  isAnyLoading,
  runAction,
  increaseQuantity,
  decreaseQuantity,
}) => {
  const imageSrc = resolveImageSrc(item)

  return (
    <li className="py-5 flex gap-4">
                {/* تصویر */}
                <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100" />
                  )}
                </div>

                {/* اطلاعات */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm danaMed text-gray-800 line-clamp-2 leading-6">
                      {item.name}
                    </h3>
                    <button type="button" className="text-xs text-blue-500 hover:underline whitespace-nowrap flex items-center gap-0.5">
                      مشاهده محصول
                      <FiChevronLeft size={14} />
                    </button>
                  </div>

                  {lowStock && (
                    <p className="text-xs text-red-500 mt-1">
                      {qty.toLocaleString('fa-IR')} عدد بیشتر نمانده
                    </p>
                  )}

                  <div className="flex items-end justify-between mt-3">
                    {/* قیمت */}
                    <div className="text-sm danaBold text-gray-900">
                      {Math.floor(lineTotal).toLocaleString('fa-IR')}
                      <span className="text-xs text-gray-500 danaMed mr-1">تومان</span>
                    </div>

                    {/* کنترل تعداد */}
                    <div className="flex items-center gap-1.5 border border-gray-200 rounded-lg p-1">
                      {/* + */}
                      <button
                        type="button"
                        onClick={() =>
                          runAction(itemId, 'inc', () =>
                            increaseQuantity?.(item.productId, item.variantId)
                          )
                        }
                        disabled={isAnyLoading}
                        className="w-7 h-7 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-blue-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                      >
                        {isLoading(itemId, 'inc') ? (
                          <CircularProgress
                            size={12}
                            thickness={5}
                            sx={{ color: '#3b82f6' }}
                          />
                        ) : (
                          <FiPlus size={14} />
                        )}
                      </button>

                      {/* تعداد */}
                      <span className="w-7 text-center text-sm danaBold text-gray-900">
                        {qty.toLocaleString('fa-IR')}
                      </span>

                      {/* − / حذف */}
                      <button
                        type="button"
                        onClick={() =>
                          runAction(itemId, 'dec', () =>
                            decreaseQuantity?.(item.productId, item.variantId)
                          )
                        }
                        disabled={isAnyLoading}
                        className="w-7 h-7 flex items-center justify-center rounded-md text-gray-500 hover:bg-red-50 hover:text-red-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                      >
                        {isLoading(itemId, 'dec') ? (
                          <CircularProgress
                            size={12}
                            thickness={5}
                            sx={{ color: '#ef4444' }}
                          />
                        ) : qty > 1 ? (
                          <FiMinus size={14} />
                        ) : (
                          <FiTrash2 size={14} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
    </li>
  )
}

export default CartItem