'use client'

import { createContext } from 'react'

export const MerchantContext = createContext()

export const MerchantProvider = ({ children, homepageData }) => {
  const activeTheme = homepageData?.data?.activeTheme

  return (
    <MerchantContext.Provider
      value={{
        homepageData,
        activeTheme,
        components: activeTheme?.components || []
      }}
    >
      {children}
    </MerchantContext.Provider>
  )
}
