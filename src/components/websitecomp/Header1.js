import { AuthContext } from '@/context/AuthContext'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState } from 'react'

const Header1 = ({ 
  width = '100',
  alignment = 'center',
  cartItemsCount,
  handleUserLogin,
  handleLogout,
  activeMerchant
}) => {
  const [searchValue, setSearchValue] = useState('')
  const {user} = useContext(AuthContext)
  console.log("user ",activeMerchant)

  const logo = user?.storeImage || activeMerchant?.merchant?.storeImage

  return (
    <div style={{ display: 'flex', justifyContent: alignment === 'center' ? 'center' : alignment === 'flex-start' ? 'flex-start' : 'flex-end' }}>
      <header className="sticky top-0 z-100 bg-white border-b border-gray-200 py-3" style={{ width: `${width}%` }}>
      <div className=" mx-auto px-5 flex items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
          <Image src={process.env.NEXT_PUBLIC_LIARA_IMAGE_URL + logo} alt="Store Logo" width={50} height={50} />
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex items-center bg-gray-100 border border-gray-300 rounded-lg px-4 gap-2">
          <input
            type="text"
            placeholder="جستجوی محصول ، دسته بندی و .."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="flex-1 bg-transparent dana py-3 text-sm text-gray-800 placeholder-gray-500 outline-none"
          />
          <button className="flex items-center text-gray-600 hover:text-gray-900 p-1 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Account Icons */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Link href="/dashboard/userprofile" className="text-gray-600 hover:text-blue-600 hover:bg-gray-100 p-2 rounded-lg transition-colors" title="پروفایل">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </Link>
                {/* <button onClick={handleLogout} className="text-gray-600 hover:text-red-600 hover:bg-gray-100 p-2 rounded-lg transition-colors" title="خروج">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                </button> */}
              </>
            ) : (
              <button onClick={handleUserLogin} className="text-gray-600 hover:text-blue-600 hover:bg-gray-100 p-2 rounded-lg transition-colors cursor-pointer" title="ورود">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>
            )}
          </div>

          {/* Cart Icon */}
          <div className="relative text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
              {cartItemsCount || 0}
            </span>
          </div>
        </div>
      </div>
      </header>
    </div>
  )
}

export default Header1