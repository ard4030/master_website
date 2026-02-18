'use client'

import React, { useContext } from 'react'
import { CartContext } from '@/context/CartContext'

const StepOne = () => {
  const { cart } = useContext(CartContext) || {}

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl danaBold text-gray-800 mb-6">سبد خرید شما</h2>

      {cart?.items && cart.items.length > 0 ? (
        <div className="space-y-4">
          {cart.items.map((item, index) => (
            <div
              key={item._id || item.id || `item-${index}`}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="text-right flex-1">
                <h3 className="danaBold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600 dana">تعداد: {item.quantity || 1}</p>
              </div>
              <div className="text-left">
                <p className="danaBold text-blue-600">
                  {(item.price * (item.quantity || 1)).toLocaleString('fa-IR')} تومان
                </p>
              </div>
            </div>
          ))}

          {/* کل قیمت */}
          <div className="border-t pt-4 mt-6">
            <div className="flex justify-between items-center">
              <span className="text-lg danaBold">جمع کل:</span>
              <span className="text-2xl danaBold text-blue-600">
                {cart.totalAmount?.toLocaleString('fa-IR') || '0'} تومان
              </span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 dana py-8">سبد خرید خالی است</p>
      )}
    </div>
  )
}

export default StepOne
