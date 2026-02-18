'use client'

import React, { createContext, useContext, useState } from 'react'

const OrderContext = createContext()

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState({
    address: null,
  })

 
  return <OrderContext.Provider value={{ order, setOrder }}>
    {children}
    </OrderContext.Provider>
}


export default OrderContext
