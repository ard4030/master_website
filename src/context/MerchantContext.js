'use client'

import apiRequest from '@/utils/functions'
import { usePathname } from 'next/navigation'
import { createContext, useEffect, useState } from 'react'

export const MerchantContext = createContext()

export const MerchantProvider = ({ children }) => {
  const [activeMerchant,setActiveMerchant] = useState(null)
  const [loading,setLoading] = useState(true)
  // const activeTheme = homepageData?.data?.activeTheme;
  const pathName = usePathname();
 

  useEffect(() => {
    if(!activeMerchant && !pathName.startsWith("/product")){
      if(!loading){
        getMerchant()
      }
    }
  },[])

  const getMerchant = async () => {
    setLoading(true)
    const res = await apiRequest("/homepage","GET");
    if(res.success){
      setActiveMerchant(res.data.data)
    }
    // console.log("----------",res.data.data)
    setLoading(false)
  }

  return (
    <MerchantContext.Provider
      value={{
        activeMerchant,setActiveMerchant,
        loading,setLoading,getMerchant
        // homepageData,
        // activeTheme,
        // components: activeTheme?.components || []
      }}
    >
      {children}
    </MerchantContext.Provider>
  )
}
