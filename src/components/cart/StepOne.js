'use client'

import React, { useContext, useState } from 'react'
import { CartContext } from '@/context/CartContext'
import { MerchantContext } from '@/context/MerchantContext'
import { useView } from '@/context/ViewContext'
import { FiTruck, FiClock } from 'react-icons/fi'
import CartItem from './CartItem'

const IMAGE_BASE = process.env.NEXT_PUBLIC_LIARA_IMAGE_URL || ''

const StepOne = ({ onContinue }) => {
  const { cart, increaseQuantity, decreaseQuantity } = useContext(CartContext) || {}
  const { activeMerchant } = useContext(MerchantContext) || {}
  const { setLoadingObj } = useView()
  const [note, setNote] = useState('')
  const [loadingItem, setLoadingItem] = useState({ id: null, action: null })

  const items = cart?.items || []
  const itemsCount = items.length

  // محاسبات
  const subtotal = items.reduce(
    (acc, it) => acc + (Number(it.price) || 0) * (it.quantity || 1),
    0
  )
  const productsDiscount = Number(cart?.productsDiscount) || 0
  const shippingTotal = Number(cart?.shippingTotal) || 0
  const finalTotal =
    Number(cart?.totalAmount) || subtotal - productsDiscount + shippingTotal

  const merchantName =
    activeMerchant?.merchant?.name || activeMerchant?.name || 'فروشگاه تست '
  const merchantLogo =
    activeMerchant?.merchant?.logo || activeMerchant?.logo || null

  const runAction = async (id, action, fn) => {
    try {
      setLoadingItem({ id, action })
      setLoadingObj?.((prev) => ({ ...prev, countProduct: true }))
      await fn()
    } finally {
      setLoadingObj?.((prev) => ({ ...prev, countProduct: false }))
      setLoadingItem({ id: null, action: null })
    }
  }

  const isLoading = (id, action) =>
    loadingItem.id === id && loadingItem.action === action

  const isAnyLoading = !!loadingItem.id

  // حالت سبد خالی
  if (itemsCount === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center dana">
        <p className="text-gray-600">سبد خرید شما خالی است</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 dana" dir="rtl">
      {/* ===== ستون راست: محصولات ===== */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* هدر غرفه */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            {merchantLogo ? (
              <img
                src={IMAGE_BASE + merchantLogo}
                alt={merchantName}
                className="w-7 h-7 rounded-full object-cover border border-gray-200"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-amber-100 border border-amber-200" />
            )}
            <span className="danaBold text-sm text-gray-800">{merchantName}</span>
          </div>
          <span className="text-xs text-gray-500">
            {itemsCount.toLocaleString('fa-IR')} محصول
          </span>
        </div>

        {/* اطلاعات ارسال */}
        <div className="flex items-center justify-between px-5 py-3 text-xs text-gray-600 bg-gray-50/60 border-b border-gray-100">
          <div className="flex items-center gap-1.5">
            <FiTruck size={14} className="text-gray-500" />
            <span>هزینه ارسال:</span>
            <span className="text-green-600 danaBold">رایگان</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiClock size={14} className="text-gray-500" />
            <span>تخمین زمان تحویل: ۴ روزه</span>
          </div>
        </div>

        {/* بنر کوپن */}


        {/* لیست محصولات */}
        <ul className="divide-y divide-gray-100 px-5">
          {items.map((item, index) => {
            const itemId = item._id || item.productId || `item-${index}`
            const qty = item.quantity || 1
            const lineTotal = (Number(item.price) || 0) * qty
            const lowStock = item.stockQuantity && item.stockQuantity <= qty

            return (
              <CartItem
                key={itemId}
                item={item}
                lowStock={lowStock}
                lineTotal={lineTotal}
                isAnyLoading={isAnyLoading}
                isLoading={isLoading}
                qty={qty}
                itemId={itemId}
                runAction={runAction}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
              />
            )
          })}
        </ul>

        {/* توضیحات سفارش */}
        <div className="px-5 py-5 border-t border-gray-100">
          <label className="block text-sm danaMed text-gray-800 mb-2">
            توضیحات سفارش برای {merchantName}
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="برای غرفه‌دار توضیحات سفارش رو اینجا بنویس"
            rows={3}
            className="w-full text-sm text-gray-700 placeholder:text-gray-400 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition resize-none"
          />
        </div>
      </div>

      {/* ===== ستون چپ: جزئیات قیمت ===== */}
      <aside className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 lg:sticky lg:top-4">
          <h3 className="danaBold text-gray-800 text-base mb-4 text-left">
            جزئیات قیمت
          </h3>

          <div className="space-y-3 text-sm">
            <Row label="مجموع قیمت محصولات" value={subtotal} suffix="تومان" />
            <Row
              label="تخفیف محصولات"
              value={productsDiscount}
              suffix="تومان"
              valueClass="text-red-500"
              prefix={productsDiscount > 0 ? '-' : ''}
            />
            <Row label="مجموع هزینه ارسال" value={shippingTotal} suffix="تومان" />
          </div>

          <div className="border-t border-dashed border-gray-200 mt-5 pt-4 flex items-center justify-between">
            <span className="danaBold text-gray-800 text-sm">مبلغ قابل پرداخت</span>
            <span className="danaBold text-gray-900">
              {Math.floor(finalTotal).toLocaleString('fa-IR')}
              <span className="text-xs text-gray-500 danaMed mr-1">تومان</span>
            </span>
          </div>

          <button
            onClick={() => onContinue?.()}
            className="mt-5 w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.99] text-white py-3 rounded-lg danaBold text-sm transition-all shadow-sm hover:shadow-md"
          >
            تایید و ادامه
          </button>
        </div>
      </aside>
    </div>
  )
}

const Row = ({ label, value, suffix, valueClass = 'text-gray-800', prefix = '' }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-600">{label}</span>
    <span className={`danaMed ${valueClass}`}>
      {prefix}
      {Math.floor(Number(value) || 0).toLocaleString('fa-IR')}
      <span className="text-xs text-gray-500 mr-1">{suffix}</span>
    </span>
  </div>
)

export default StepOne
