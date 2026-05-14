'use client'

import React, { useState, useContext } from 'react'
import Link from 'next/link'
import Login from '@/components/global/Login'
import { AuthContext } from '@/context/AuthContext'
import { CartContext } from '@/context/CartContext'
import { usePathname } from 'next/navigation'
import { MdShoppingCart, MdPerson, MdLogout } from 'react-icons/md'
import { apiRequest } from '@/utils/functions'
import { MerchantContext } from '@/context/MerchantContext'
import Image from 'next/image'
import Header1 from '../websitecomp/Header1'

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [loginMode, setLoginMode] = useState('user') // 'user'
  const { user, setUser } = useContext(AuthContext)
  const { cart } = useContext(CartContext) || {}
  const pathName = usePathname()
  const { activeMerchant,loading } = useContext(MerchantContext)

  console.log("hommm ",activeMerchant)

  // محاسبه تعداد کل آیتم ها در سبد
  const cartItemsCount = cart?.items?.reduce((total, item) => total + (item.quantity || 1), 0) || 0

  const handleLogout = async () => {
    // درخواست logout از سرور برای پاک‌کردن کوکی
    await apiRequest('/auth/logout', 'POST')
    
    // پاک‌کردن localStorage
    localStorage.removeItem('masterToken')
    localStorage.removeItem('masterCart')
    // بروز رسانی state
    setUser(null)
  }

  const handleUserLogin = () => {
    setLoginMode('user')
    setIsLoginOpen(true)
  }

  const findHeader = () => {
    if(activeMerchant){
      let header = activeMerchant.activeTheme.components.find(item => item.type == "header");
      const { id, componentId, styles, instanceId, props } = header;

      switch (header.id) {
        case "header1":
          return <Header1 
          activeMerchant={activeMerchant}
          key={instanceId} {...props}
          handleLogout={handleLogout} 
          handleUserLogin={handleUserLogin} 
          cartItemsCount={cartItemsCount} />
        default:
          return <Header />
      }
    }
  }


  return (
    <>
    {
      !pathName.startsWith('/dashboard')  &&
      !pathName.startsWith('/sitebuilder') && 
      !pathName.startsWith('/newsitebuilder') && (
      loading?
      <header className="sticky top-0 z-100 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex-shrink-0">
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <nav className="flex items-center gap-4">
            <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
          </nav>
        </div>
      </header>
      :
      activeMerchant &&
      findHeader()
      )
      // <header className="sticky top-0 z-100 bg-white border-b border-gray-200 dana">
      //   <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      //     {/* سمت راست - لوگو */}
      //     <div className="flex items-center">
      //       <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
      //         {/* <span className="text-xl danaBold text-gray-800">MasterShop</span> */}
      //         <Image 
      //         width={40}
      //         height={40}
      //         alt='logo'
      //         src={process.env.NEXT_PUBLIC_LIARA_IMAGE_URL+activeMerchant.merchant.storeImage} />
      //       </Link>
      //     </div>

      //     {/* سمت چپ - آیکون ها و دکمه‌ها */}
      //     <nav className="flex items-center gap-4 dana">
      //       {/* آیکون سبد خرید */}
      //       <Link href="/cart" className="relative text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded-lg transition-all" title="سبد خرید">
      //         <MdShoppingCart size={24} />
      //         {cartItemsCount > 0 && (
      //           <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
      //             {cartItemsCount}
      //           </span>
      //         )}
      //       </Link>

      //       {/* آیکون های پروفایل و خروج */}
      //       {user ? (
      //         <>
      //           <Link href="/dashboard/userprofile" className="text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded-lg transition-all" title="پروفایل">
      //             <MdPerson size={24} />
      //           </Link>
      //           <button onClick={handleLogout} className="text-gray-700 hover:text-red-600 hover:bg-gray-100 p-2 rounded-lg transition-all" title="خروج">
      //             <MdLogout size={24} />
      //           </button>
      //         </>
      //       ) : (
      //         <button onClick={handleUserLogin} className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all active:scale-95">
      //           ورود
      //         </button>
      //       )}
      //     </nav>
      //   </div>
      // </header>

    }
    <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} loginMode={loginMode} />
    </>
  )
}

export default Header