'use client'

import React, { createContext, useState } from 'react'

const OrderContext = createContext()

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState({
    // آدرس‌ها
    addresses: [],
    address: null,
    // روش‌های ارسال
    shippingMethods: [],
    shippingMethod: null,
    // درگاه‌های پرداخت
    paymentGateways: [],
    paymentGateway: null,
  })


  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

export default OrderContext
