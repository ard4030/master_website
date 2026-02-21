'use client'

import React, { useContext } from 'react'
import OrderContext from '@/context/OrderContext'

const StepThree = () => {
  const { order, setOrder } = useContext(OrderContext)

  const handleSelectPaymentGateway = (gateway) => {
    setOrder({ ...order, paymentGateway: gateway })
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

  return (
    <div className="bg-white rounded-lg shadow p-6" dir="rtl">
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
    </div>
  )
}

export default StepThree
