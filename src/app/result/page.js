'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { apiRequest } from '@/utils/functions'

const page = () => {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const transId = searchParams.get('transId')
  
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  console.log("order ", order)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true)
        const response = await apiRequest(`/orders/${orderId}`, 'GET')
        
        if (!response.success) {
          throw new Error(response.error || 'خطا در دریافت اطلاعات سفارش')
        }
        
        setOrder(response.data.order)
        setError(null)
      } catch (err) {
        setError(err.message)
        setOrder(null)
      } finally {
        setLoading(false)
      }
    }

    if (orderId) {
      fetchOrder()
    }
  }, [orderId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-bl from-slate-100 to-blue-200 p-5 flex items-center justify-center dana">
        <div className="bg-white rounded-3xl shadow-2xl p-16 text-center">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-5"></div>
          <p className="text-lg font-dana-bold text-indigo-600">درحال بارگذاری...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-bl from-slate-100 to-blue-200 p-5 flex items-center justify-center dana">
        <div className="bg-red-50 border-2 border-red-300 rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-dana-bold text-red-700 mb-3">⚠️ خطا</h2>
          <p className="text-gray-600 leading-relaxed">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-bl from-slate-100 to-blue-200 p-5 flex items-center justify-center dana" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-12 animate-in slide-in-from-bottom duration-500">
        
        {/* هدر */}
        <div className="flex justify-between items-start mb-10 pb-8 border-b-2 border-slate-200">
          <div>
            <h1 className="text-4xl font-dana-bold text-slate-900 mb-2">تایید سفارش شما</h1>
            <p className="text-sm text-gray-600 font-dana-medium">سفارش با موفقیت ثبت شد</p>
          </div>
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center animate-scale-in">
            <span className="text-4xl text-white font-bold">✓</span>
          </div>
        </div>

        {/* فروشنده */}
        {order.merchantId && (
          <div className="bg-slate-50 p-6 rounded-2xl mb-8 border-r-4 border-indigo-600">
            <h3 className="text-xs font-dana-bold text-gray-500 uppercase tracking-wider mb-3">فروشنده</h3>
            <p className="text-lg font-dana-bold text-slate-900">{order.merchantId.storeName}</p>
            <p className="text-sm text-gray-600 mt-1 font-dana-regular">{order.merchantId.phone}</p>
          </div>
        )}

        {/* شماره‌ها */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-b from-slate-100 to-blue-200 p-5 rounded-2xl text-center border-t-4 border-indigo-600">
            <p className="text-xs font-dana-bold text-gray-600 uppercase tracking-wider mb-2">شماره سفارش</p>
            <p className="text-lg font-dana-bold text-slate-900 break-all">{order.orderId}</p>
          </div>
          <div className="bg-gradient-to-b from-slate-100 to-blue-200 p-5 rounded-2xl text-center border-t-4 border-indigo-600">
            <p className="text-xs font-dana-bold text-gray-600 uppercase tracking-wider mb-2">شناسه تراکنش</p>
            <p className="text-lg font-dana-bold text-slate-900 break-all">{transId}</p>
          </div>
        </div>

        {/* وضعیت */}
        <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-5 rounded-2xl mb-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-emerald-600 rounded-full animate-pulse"></span>
            <span className="font-dana-bold text-slate-900 text-base">
              {order.status === 'paid' ? 'پرداخت شده' : order.status}
            </span>
          </div>
          <p className="text-sm text-gray-700 font-dana-regular">
            {new Date(order.createdAt).toLocaleDateString('fa-IR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* محصولات */}
        {order?.cart?.items && order.cart.items.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-dana-bold text-slate-900 mb-4">محصولات سفارش</h3>
            <div className="space-y-3">
              {order.cart.items.map((item, index) => (
                <div key={index} className="flex gap-4 bg-slate-50 p-4 rounded-xl border-l-4 border-indigo-600 hover:shadow-md transition-shadow">
                  <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={process.env.NEXT_PUBLIC_LIARA_IMAGE_URL+item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-dana-bold text-slate-900">{item.name}</h4>
                    <p className="text-sm text-gray-600 mt-1 font-dana-regular">{item.price.toLocaleString('fa-IR')} تومان</p>
                    <p className="text-xs text-gray-500 mt-1 font-dana-regular">تعداد: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-dana-bold text-indigo-600 text-base">
                      {(item.price * item.quantity).toLocaleString('fa-IR')} تومان
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ارسال */}
        {order?.cart && (
          <div className="bg-emerald-50 p-6 rounded-2xl mb-8 border-r-4 border-emerald-600">
            <h3 className="text-xs font-dana-bold text-gray-600 uppercase tracking-wider mb-3">روش ارسال</h3>
            <p className="font-dana-bold text-slate-900 text-base">{order.cart.deliveryDescription || '-'}</p>
            <p className="text-sm text-gray-700 mt-2 font-dana-regular">{order.cart.deliveryReceive || '-'}</p>
          </div>
        )}

        {/* خلاصه هزینه */}
        {order?.cart && (
          <div className="bg-white border-2 border-slate-200 p-6 rounded-2xl mb-8 space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 font-dana-regular text-sm text-gray-600">
              <span>جمع محصولات:</span>
              <span>{(order.cart.finalAmount || 0).toLocaleString('fa-IR')} تومان</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 font-dana-regular text-sm text-gray-600">
              <span>هزینه ارسال:</span>
              <span>{(order.cart.deliveryPrice || 0).toLocaleString('fa-IR')} تومان</span>
            </div>
            {order.cart.discountAmount > 0 && (
              <div className="flex justify-between items-center pb-3 border-b border-slate-200 font-dana-regular text-sm text-red-600">
                <span>تخفیف:</span>
                <span>-{order.cart.discountAmount.toLocaleString('fa-IR')} تومان</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-3 font-dana-bold text-base">
              <span className="text-slate-900">مبلغ قابل پرداخت:</span>
              <span className="text-indigo-600 text-lg">
                {((parseInt(order.cart.finalAmount || 0) + parseInt(order.cart.deliveryPrice || 0)) - (order.cart.discountAmount || 0)).toLocaleString('fa-IR')} تومان
              </span>
            </div>
          </div>
        )}

        {/* دکمه‌ها */}
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:shadow-lg text-white py-3 px-6 rounded-xl font-dana-bold text-base transition-all duration-300 hover:-translate-y-1">
            پیگیری سفارش
          </button>
          <button className="bg-slate-100 hover:bg-slate-200 text-slate-900 py-3 px-6 rounded-xl font-dana-bold text-base border-2 border-slate-300 transition-all duration-300">
            بازگشت به خانه
          </button>
        </div>

      </div>

      <style jsx>{`
        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scaleIn 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}

export default page