'use client'

import React, { useContext, useState, useEffect } from 'react'
import OrderContext from '@/context/OrderContext'
import { CartContext } from '@/context/CartContext'
import { apiRequest, getOrCreateDeviceId } from '@/utils/functions'
import { toast } from 'react-toastify'

const StepThree = () => {
  const { order, setOrder } = useContext(OrderContext)
  const { cart , setCart } = useContext(CartContext) || {}
  const [discountCode, setDiscountCode] = useState('')
  const [isValidatingCode, setIsValidatingCode] = useState(false)
  const [codeError, setCodeError] = useState('')
  const [codeSuccess, setCodeSuccess] = useState('')

  // بازگردانی کد تخفیف از order context هنگام بارگذاری
  useEffect(() => {
    if (order?.discountCode) {
      setDiscountCode(order.discountCode)
    }
  }, [])

  const handleSelectPaymentGateway = (gateway) => {
    setOrder({ ...order, paymentGateway: gateway })
  }

  const validateCouponCode = async () => {
    if (cart?.isCodeDiscounted) {
      setCodeError('کد تخفیف قبلاً اعمال شده است')
      return
    }

    if (!discountCode.trim()) {
      setCodeError('لطفاً کد تخفیف را وارد کنید')
      return
    }

    setIsValidatingCode(true)
    setCodeError('')
    setCodeSuccess('')

    try {
      const response = await apiRequest('/coupons/validate-code', 'POST', {
        code: discountCode,
        cartAmount: cart?.finalAmount || 0,
      })

      if (response.success) {
        setCodeSuccess(response.data.message || 'کد تخفیف معتبر است')
        setOrder({ ...order, coupon: response.data.data, discountCode: discountCode })
        reValidateCart(response.data.data)
      } else {
        setCodeError(response.error || 'کد تخفیف نامعتبر است')
      }
    } catch (error) {
      setCodeError('خطا در بررسی کد تخفیف')
      console.error('Error validating coupon:', error)
    } finally {
      setIsValidatingCode(false)
    }
  }

  const reValidateCart = (data) => {

    setCart({...cart,
      discountAmount: parseInt(data.discountAmount),
      finalAmount: parseInt(cart.finalAmount) - parseInt(data.discountAmount),
      isCodeDiscounted: true
    })
    setOrder({ 
      ...order, 
      coupon: data,
      discountAmount: data.discountAmount,
      isCodeDiscounted: true
    })
  }

  const removeCouponCode = () => {
    setCart({...cart,
      discountAmount: 0,
      finalAmount: cart.finalAmount + cart.discountAmount,
      isCodeDiscounted: false
    })
    setOrder({ 
      ...order, 
      coupon: null,
      discountCode: '',
      discountAmount: 0,
      isCodeDiscounted: false
    })
    setDiscountCode('')
    setCodeSuccess('')
    setCodeError('')
  }

  const submitOrder = async () => {
    // بررسی انتخاب درگاه پرداخت
    if (!order.paymentGateway) {
      alert('لطفاً یک درگاه پرداخت انتخاب کنید')
      return
    }

    try {
      const deviceId = getOrCreateDeviceId()
      
      const orderData = {
        address: order.address,
        coupon: order.coupon || null,
        paymentGateway: order.paymentGateway,
        shippingMethod: order.shippingMethod,
        deviceId: deviceId
      }

      const response = await apiRequest('/orders', 'POST', orderData)

      if (response.success) {
        toast.success("در حال انتقال به درگاه پرداخت...")
        window.location.href = response.data.link
        // می‌توانید کاربر را به صفحه تایید هدایت کنید
      } else {
        alert('خطا در ثبت سفارش: ' + response.error)
      }
    } catch (error) {
      alert('خطا در ارسال سفارش')
      console.error('Error submitting order:', error)
    }
  }

  if (!order.address || !order.shippingMethod) {
    return (
      <div className="bg-white rounded-lg shadow p-6" dir="rtl">
        <h2 className="text-2xl danaBold text-gray-800 mb-6">روش پرداخت</h2>
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600 dana">لطفاً ابتدا آدرس و روش ارسال را انتخاب کنید</p>
        </div>
      </div>
    )
  }

  console.log("order ", order )

  return (
    <div className="bg-white rounded-lg shadow p-6" dir="rtl">
      {/* خلاصه فاکتور */}
      <div className="mb-6 pb-6 border-b">
        <h2 className="text-2xl danaBold text-gray-800 mb-4">خلاصه سفارش</h2>

        {/* لیست محصولات */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h3 className="danaBold text-gray-700 mb-3">محصولات</h3>
          <div className="space-y-2">
            {cart?.items && cart.items.length > 0 ? (
              cart.items.map((item, index) => (
                <div key={item._id || item.id || `item-${index}`} className="flex justify-between items-center text-sm dana pb-2 border-b last:border-b-0">
                  <div className='flex items-center'>
                    <span className="text-gray-600">{item.name} x {item.quantity || 1}</span>
                  {item.msg && <p className="text-sm text-red-600 dana mr-5">{item.msg}</p>}
                  </div>
                  <span className="text-gray-800 font-medium">{(item.price * (item.quantity || 1)).toLocaleString('fa-IR')} تومان</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">هیچ محصولی موجود نیست</p>
            )}
          </div>
        </div>

        {/* آدرس انتخاب شده */}
        {order.address && (
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <h3 className="danaBold text-gray-700 mb-2">آدرس تحویل</h3>
            <p className="text-sm dana text-gray-700">
              {order.address.fullAddress}
            </p>
            <p className="text-xs dana text-gray-600 mt-1">
              {order.address.state} - {order.address.city}
            </p>
          </div>
        )}

        {/* روش ارسال */}
        {order.shippingMethod && (
          <div className="bg-green-50 rounded-lg p-4 mb-4">
            <h3 className="danaBold text-gray-700 mb-2">روش ارسال</h3>
            <div className="flex justify-between items-center">
              <p className="text-sm dana text-gray-700">{order.shippingMethod.description} {` (${order.shippingMethod.receive})`}</p>
              <span className="text-sm font-medium text-green-600">{parseInt(order.shippingMethod.price)?.toLocaleString('fa-IR') || '0'} تومان</span>
            </div>
          </div>
        )}

        {/* جمع و مجموع */}
        <div className="bg-gray-100 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm dana">
            <span className="text-gray-600">جمع محصولات:</span>
            <span className="text-gray-800">{cart?.totalAmount?.toLocaleString('fa-IR') || '۰'} تومان</span>
          </div>
          <div className="flex justify-between text-sm dana">
            <span className="text-gray-600">هزینه ارسال:</span>
            <span className="text-gray-800">{parseInt(cart.deliveryPrice)?.toLocaleString('fa-IR') || '۰'} تومان</span>
          </div>
          {
            cart.isCodeDiscounted && (
              <div className="flex justify-between text-sm dana">
                <span className="text-gray-600"> کد تخفیف:</span>
                <span className="text-gray-800">{parseInt(cart.discountAmount)?.toLocaleString('fa-IR') || '۰'} تومان</span>
              </div>
            )
          }
          <div className="border-t pt-2 flex justify-between danaBold">
            <span className="text-gray-800">جمع کل:</span>
            <span className="text-lg text-blue-600">{((cart?.finalAmount || 0)).toLocaleString('fa-IR')} تومان</span>
          </div>
        </div>
      </div>

      {/* فیلد کد تخفیف */}
      <div className="mb-6 pb-6 border-b">
        <h3 className="danaBold text-gray-800 mb-3">کد تخفیف</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            placeholder="کد تخفیف را وارد کنید"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm dana focus:outline-none focus:ring-2 focus:ring-blue-500"
            dir="rtl"
            disabled={cart?.isCodeDiscounted}
          />
          {!cart?.isCodeDiscounted ? (
            <button 
              onClick={validateCouponCode}
              disabled={isValidatingCode}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg danaBold hover:bg-blue-700 transition-colors text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isValidatingCode ? 'در حال بررسی...' : 'تایید'}
            </button>
          ) : (
            <button 
              onClick={removeCouponCode}
              className="px-4 py-2 bg-red-600 text-white rounded-lg danaBold hover:bg-red-700 transition-colors text-sm"
            >
              حذف
            </button>
          )}
        </div>
        {codeError && <p className="text-red-600 text-sm dana mt-2">{codeError}</p>}
        {codeSuccess && <p className="text-green-600 text-sm dana mt-2">{codeSuccess}</p>}
      </div>

      {/* انتخاب درگاه پرداخت */}
      <h2 className="text-2xl danaBold text-gray-800 mb-6">انتخاب درگاه پرداخت</h2>

      {order.paymentGateways && order.paymentGateways.length > 0 ? (
        <div className="space-y-3">
          {order.paymentGateways.map((gateway) => {

              let name = ""
              switch (gateway.name) {
                case "zarinpal":
                  name = "زرین‌پال"
                  break
                case "cart_to_cart":
                  name = "کارت به کارت"
                  break
                default:
                  name = gateway.name
              }
            return (
              <label
                key={gateway._id || gateway.id}
                className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors text-right border-2 border-transparent"
                style={{
                  borderColor: (order.paymentGateway?._id || order.paymentGateway?.id) === (gateway._id || gateway.id) ? '#2563eb' : 'transparent',
                }}
              >
                <input
                  type="radio"
                  name="paymentGateway"
                  checked={(order.paymentGateway?._id || order.paymentGateway?.id) === (gateway._id || gateway.id)}
                  onChange={() => handleSelectPaymentGateway(gateway)}
                  className="w-5 h-5"
                />
                <div className="mr-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="danaBold text-gray-800">{name}</h3>
                    {gateway.icon && (
                      <img src={gateway.icon} alt={gateway.name} className="w-12 h-12 object-cover rounded" />
                    )}
                  </div>
                  {gateway.description && (
                    <p className="text-sm text-gray-600 dana mt-1">{gateway.description}</p>
                  )}
                </div>
              </label>
            )
          }
          )}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600 dana">هیچ درگاه پرداختی در دسترس نیست</p>
        </div>
      )}

      {/* دکمه ارسال سفارش */}
      <div className="mt-8">
        <button
          onClick={submitOrder}
          className="w-full px-6 py-3 bg-green-600 text-white rounded-lg danaBold hover:bg-green-700 transition-colors text-lg"
        >
          تکمیل و پرداخت
        </button>
      </div>
    </div>
  )
}

export default StepThree
