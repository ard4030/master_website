'use client'

import React, { useContext, useEffect, useState } from 'react'
import { FiCheck, FiCreditCard, FiMapPin, FiTruck } from 'react-icons/fi'
import OrderContext from '@/context/OrderContext'
import { CartContext } from '@/context/CartContext'
import { apiRequest, getOrCreateDeviceId } from '@/utils/functions'
// import { toast } from 'react-toastify'
import { toast } from 'sonner'


const StepThree = () => {
  const { order, setOrder } = useContext(OrderContext)
  const { cart, setCart } = useContext(CartContext) || {}

  const [discountCode, setDiscountCode] = useState('')
  const [isValidatingCode, setIsValidatingCode] = useState(false)
  const [codeError, setCodeError] = useState('')
  const [codeSuccess, setCodeSuccess] = useState('')

  const items = cart?.items || []
  const selectedGatewayId = order?.paymentGateway?._id || order?.paymentGateway?.id
  const shippingPrice = Number(order?.shippingMethod?.price ?? cart?.deliveryPrice ?? 0) || 0
  const totalAmount = Number(cart?.totalAmount || 0)
  const discountAmount = Number(cart?.discountAmount || 0)
  const finalAmount = Number(cart?.finalAmount || 0)
  const hasGateways = Boolean(order?.paymentGateways?.length)
  const canSubmit = Boolean(order?.paymentGateway && hasGateways)

  useEffect(() => {
    if (order?.discountCode) {
      setDiscountCode(order.discountCode)
    }
  }, [order?.discountCode])

  const handleSelectPaymentGateway = (gateway) => {
    setOrder((prev) => ({ ...prev, paymentGateway: gateway }))
  }

  const reValidateCart = (couponData) => {
    const parsedDiscount = parseInt(couponData?.discountAmount || 0, 10) || 0

    if (setCart) {
      setCart((prev) => {
        const previousFinal = parseInt(prev?.finalAmount || 0, 10) || 0
        return {
          ...prev,
          discountAmount: parsedDiscount,
          finalAmount: Math.max(0, previousFinal - parsedDiscount),
          isCodeDiscounted: true,
        }
      })
    }

    setOrder((prev) => ({
      ...prev,
      coupon: couponData,
      discountAmount: parsedDiscount,
      isCodeDiscounted: true,
      discountCode,
    }))
  }

  const validateCouponCode = async () => {
    if (cart?.isCodeDiscounted) {
      setCodeError('کد تخفیف قبلا اعمال شده است')
      return
    }

    if (!discountCode.trim()) {
      setCodeError('لطفا کد تخفیف را وارد کنید')
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
        const couponData = response?.data?.data
        setCodeSuccess(response?.data?.message || 'کد تخفیف معتبر است')
        reValidateCart(couponData)
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

  const removeCouponCode = () => {
    if (setCart) {
      setCart((prev) => {
        const previousFinal = Number(prev?.finalAmount || 0)
        const previousDiscount = Number(prev?.discountAmount || 0)

        return {
          ...prev,
          discountAmount: 0,
          finalAmount: previousFinal + previousDiscount,
          isCodeDiscounted: false,
        }
      })
    }

    setOrder((prev) => ({
      ...prev,
      coupon: null,
      discountCode: '',
      discountAmount: 0,
      isCodeDiscounted: false,
    }))

    setDiscountCode('')
    setCodeSuccess('')
    setCodeError('')
  }

  const submitOrder = async () => {
    if (!order?.paymentGateway) {
      toast.error('لطفا یک درگاه پرداخت انتخاب کنید')
      return
    }

    try {
      const deviceId = getOrCreateDeviceId()
      console.log('order',order);
      
      const orderData = {
        address: order.address,
        coupon: order.coupon || null,
        paymentGateway: order.paymentGateway,
        shippingMethod: order.shippingMethod,
        deviceId,
      }

      const response = await apiRequest('/orders', 'POST', orderData)

      if (response.success) {
        toast.success('در حال انتقال به درگاه پرداخت...')
        window.location.href = response.data.link
      } else {
        toast.error(`خطا در ثبت سفارش: ${response.error}`)
      }
    } catch (error) {
      toast.error('خطا در ارسال سفارش')
      console.error('Error submitting order:', error)
    }
  }

  if (!order?.address || !order?.shippingMethod) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6" dir="rtl">
        <h2 className="text-xl danaBold text-gray-800 mb-5">مرحله پرداخت</h2>
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <p className="text-gray-600 dana">
            لطفا ابتدا در مرحله قبل آدرس و روش ارسال را انتخاب کنید
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 dana pb-[calc(148px+env(safe-area-inset-bottom))] lg:pb-0" dir="rtl">
      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-base danaBold text-gray-800">بازبینی سفارش و پرداخت</h2>
            <span className="text-xs px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 danaBold">
              مرحله نهایی
            </span>
          </div>

          <div className="p-5 space-y-4">
            <div className="bg-white/90 rounded-2xl p-4 md:p-5 border border-gray-200 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
              <h3 className="danaBold text-gray-800 mb-3 text-sm md:text-base">محصولات سفارش</h3>
              <div className="space-y-2.5">
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <div
                      key={item._id || item.id || `item-${index}`}
                      className="flex justify-between items-start gap-3 text-sm dana p-3 rounded-xl bg-white border border-gray-100"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-800 truncate leading-6">
                          {item.name} × {item.quantity || 1}
                        </p>
                        {item.msg && <p className="text-xs text-red-600 mt-1">{item.msg}</p>}
                      </div>
                      <span className="text-gray-900 danaBold mr-2 shrink-0 text-xs sm:text-sm">
                        {(Number(item.price || 0) * Number(item.quantity || 1)).toLocaleString('fa-IR')} تومان
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm bg-gray-50 rounded-xl px-3 py-4 text-center">هیچ محصولی برای نمایش وجود ندارد</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <FiMapPin className="text-blue-500" size={16} />
                  <h3 className="danaBold text-gray-700">آدرس تحویل</h3>
                </div>
                <p className="text-sm text-gray-700 leading-6">
                  {order.address.state} - {order.address.city} - {order.address.fullAddress}
                </p>
              </div>

              <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                <div className="flex items-center gap-2 mb-2">
                  <FiTruck className="text-emerald-600" size={16} />
                  <h3 className="danaBold text-gray-700">روش ارسال</h3>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-gray-700">
                    {order?.shippingMethod?.faName || order?.shippingMethod?.description || order?.shippingMethod?.name}
                  </p>
                  <span className="text-sm danaBold text-emerald-700 shrink-0">
                    {shippingPrice > 0 ? `${shippingPrice.toLocaleString('fa-IR')} تومان` : 'رایگان'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <FiCreditCard className="text-orange-500" size={18} />
            <h3 className="text-base danaBold text-gray-800">انتخاب درگاه پرداخت</h3>
          </div>

          {hasGateways ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {order.paymentGateways.map((gateway) => {
                const gatewayId = gateway._id || gateway.id
                const isSelected = selectedGatewayId === gatewayId

                return (
                  <PaymentGatewayCard
                    key={gatewayId}
                    gateway={gateway}
                    selected={isSelected}
                    onSelect={() => handleSelectPaymentGateway(gateway)}
                  />
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <p className="text-gray-600 dana">هیچ درگاه پرداختی در دسترس نیست</p>
            </div>
          )}
        </div>
      </div>

      <aside className="hidden lg:block lg:col-span-1">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 lg:sticky lg:top-4 space-y-5">
          <div>
            <h3 className="text-base danaBold text-gray-800 mb-3">خلاصه فاکتور</h3>
            <div className="space-y-2 text-sm">
              <PriceRow label="جمع محصولات" value={totalAmount} />
              <PriceRow label="هزینه ارسال" value={shippingPrice} />
              {cart?.isCodeDiscounted && (
                <PriceRow label="تخفیف کد" value={discountAmount} valueClass="text-red-500" prefix="-" />
              )}
              <div className="border-t border-dashed border-gray-200 pt-2 flex items-center justify-between">
                <span className="text-gray-800 danaBold">قابل پرداخت</span>
                <span className="text-lg text-gray-900 danaBold">
                  {finalAmount.toLocaleString('fa-IR')}
                  <span className="text-xs text-gray-500 mr-1 danaMed">تومان</span>
                </span>
              </div>
            </div>
          </div>

          <div className="pt-1 border-t border-gray-100">
            <h4 className="danaBold text-gray-800 text-sm mb-2">کد تخفیف</h4>
            <div className="flex gap-2">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="کد تخفیف"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm dana focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400 disabled:bg-gray-50"
                dir="rtl"
                disabled={cart?.isCodeDiscounted}
              />
              {!cart?.isCodeDiscounted ? (
                <button
                  onClick={validateCouponCode}
                  disabled={isValidatingCode}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg danaBold hover:bg-orange-600 transition-colors text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isValidatingCode ? '...' : 'اعمال'}
                </button>
              ) : (
                <button
                  onClick={removeCouponCode}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg danaBold hover:bg-red-600 transition-colors text-sm"
                >
                  حذف
                </button>
              )}
            </div>
            {codeError && <p className="text-red-600 text-xs dana mt-2">{codeError}</p>}
            {codeSuccess && <p className="text-green-600 text-xs dana mt-2">{codeSuccess}</p>}
          </div>

          <button
            onClick={submitOrder}
            disabled={!canSubmit}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg danaBold hover:bg-green-700 transition-colors text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            تکمیل سفارش و پرداخت
          </button>
        </div>
      </aside>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-4 py-3 shadow-[0_-6px_18px_rgba(15,23,42,0.12)]">
        <details className="group mb-3 rounded-lg border border-gray-200 bg-gray-50/70">
          <summary className="list-none cursor-pointer px-3 py-2.5 flex items-center justify-between text-sm text-gray-700 danaMed">
            <span>مشاهده جزئیات پرداخت</span>
            <span className="transition-transform group-open:rotate-180">⌄</span>
          </summary>
          <div className="px-3 pb-3 pt-1 border-t border-gray-200 space-y-2 text-sm">
            <PriceRow label="جمع محصولات" value={totalAmount} />
            <PriceRow label="هزینه ارسال" value={shippingPrice} />
            {cart?.isCodeDiscounted && (
              <PriceRow label="تخفیف کد" value={discountAmount} valueClass="text-red-500" prefix="-" />
            )}

            <div className="pt-2 border-t border-gray-200">
              <h4 className="danaBold text-gray-800 text-sm mb-2">کد تخفیف</h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="کد تخفیف"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm dana focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400 disabled:bg-gray-50"
                  dir="rtl"
                  disabled={cart?.isCodeDiscounted}
                />
                {!cart?.isCodeDiscounted ? (
                  <button
                    onClick={validateCouponCode}
                    disabled={isValidatingCode}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg danaBold hover:bg-orange-600 transition-colors text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isValidatingCode ? '...' : 'اعمال'}
                  </button>
                ) : (
                  <button
                    onClick={removeCouponCode}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg danaBold hover:bg-red-600 transition-colors text-sm"
                  >
                    حذف
                  </button>
                )}
              </div>
              {codeError && <p className="text-red-600 text-xs dana mt-2">{codeError}</p>}
              {codeSuccess && <p className="text-green-600 text-xs dana mt-2">{codeSuccess}</p>}
            </div>
          </div>
        </details>

        <div className="flex items-center justify-between gap-3">
          <div className="text-right">
            <p className="text-xs text-gray-500 danaMed">جمع مبلغ پرداختنی:</p>
            <p className="danaBold text-gray-900 text-xl leading-7">
              {Math.floor(finalAmount).toLocaleString('fa-IR')}
              <span className="text-xs text-gray-500 danaMed mr-1">تومان</span>
            </p>
          </div>

          <button
            onClick={submitOrder}
            disabled={!canSubmit}
            className="min-w-42 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-xl danaBold text-sm transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            پرداخت
          </button>
        </div>
      </div>
    </div>
  )
}

const PriceRow = ({ label, value, valueClass = 'text-gray-800', prefix = '' }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-600">{label}</span>
    <span className={`danaMed ${valueClass}`}>
      {prefix}
      {Math.floor(Number(value) || 0).toLocaleString('fa-IR')}
      <span className="text-xs text-gray-500 mr-1">تومان</span>
    </span>
  </div>
)

const PaymentGatewayCard = ({ gateway, selected, onSelect }) => {
  const title = getGatewayTitle(gateway?.name)

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative flex flex-col items-center text-center rounded-2xl border bg-white px-4 pt-6 pb-5 min-h-45 transition-all overflow-hidden focus:outline-none ${
        selected
          ? 'border-orange-400 ring-2 ring-orange-200/60 shadow-md bg-orange-50/60'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5'
      } cursor-pointer active:scale-[0.99]`}
    >
      <span
        className={`absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
          selected
            ? 'bg-orange-500 text-white scale-100 shadow-sm'
            : 'bg-gray-100 text-transparent scale-90 group-hover:scale-100 group-hover:bg-gray-200'
        }`}
      >
        <FiCheck size={15} />
      </span>

      <div
        className={`shrink-0 w-20 h-20 rounded-2xl border flex items-center justify-center overflow-hidden mb-3 transition-colors ${
          selected ? 'border-transparent bg-white shadow-sm' : 'border-gray-100 bg-gray-50/60'
        }`}
      >
        {gateway?.icon ? (
          <img
            src={gateway.icon}
            alt={gateway?.name || title}
            className="w-full h-full object-contain p-2"
          />
        ) : (
          <FiCreditCard size={30} className="text-orange-500" />
        )}
      </div>

      <h4 className="danaBold text-sm sm:text-base text-gray-800 mb-1.5">{title}</h4>

      <p className="text-[11px] sm:text-xs text-gray-500 leading-5 max-w-50">
        {gateway?.description || 'پرداخت امن از طریق درگاه انتخابی'}
      </p>
    </button>
  )
}

const getGatewayTitle = (gatewayName) => {
  switch (gatewayName) {
    case 'zarinpal':
      return 'زرین پال'
    case 'cart_to_cart':
      return 'کارت به کارت'
    default:
      return gatewayName || 'درگاه پرداخت'
  }
}

export default StepThree
