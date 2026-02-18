'use client'

import React, { useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AuthContext } from '@/context/AuthContext'
import { MerchantContext } from '@/context/MerchantContext'
import { MdDashboard, MdAssessment, MdShoppingCart, MdAccountBalanceWallet, MdPayments, MdNotifications, MdSettings, MdHeadset, MdCategory, MdInventory2, MdDesignServices, MdLocationOn } from 'react-icons/md'

const Sidebar = () => {
  const pathname = usePathname()
  const { user } = useContext(AuthContext)
  const { homepageData } = useContext(MerchantContext) || {}

  const menuItems = [
    {
      label: 'داشبورد',
      href: '/dashboard/userprofile',
      icon: MdDashboard,
      type: ['user', 'merchant'],
      permissions: [],
    },
    {
      label: 'شارش های من',
      href: '/dashboard/reports',
      icon: MdAssessment,
      type: ['user'],
      permissions: [],
    },
    {
      label: 'آدرس‌های من',
      href: '/dashboard/addresses',
      icon: MdLocationOn,
      type: ['user'],
      permissions: [],
    },

    {
      label: 'اطلاع رسانی',
      href: '/dashboard/notifications',
      icon: MdNotifications,
      type: ['user', 'merchant'],
      permissions: [],
      badge: 2,
    },

    {
      label: 'پشتیبانی',
      href: '/dashboard/support',
      icon: MdHeadset,
      type: ['user', 'merchant'],
      permissions: [],
    },
  ]

  const isActive = (href) => pathname === href

  // فیلتر کردن منو بر اساس نوع کاربر و دسترسی
  const filteredMenuItems = menuItems.filter((item) => {
    const hasType = item.type.includes(user?.type || user?.role || 'user')
    return hasType 
  })

  return (
    <aside className={`h-screen bg-white border-r border-gray-200 py-6 px-4 flex flex-col max-w-xs overflow-y-auto dana`}>
      {/* بخش پروفایل */}
      <div className="text-center mb-6">
        {/* آواتار یا لوگو */}
        <div className="flex justify-center mb-4">
          <div className="relative w-20 h-20">
            {user?.type === 'merchant' && homepageData?.data?.merchant?.storeImage ? (
              // لوگو فروشگاه برای merchant
              <img
                src={`${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL || 'https://arianfood.storage.c2.liara.space/uploads/'}${homepageData.data.merchant.storeImage}`}
                alt={homepageData.data.merchant.storeName || 'فروشگاه'}
                className="w-20 h-20 rounded-lg object-contain bg-gray-100 border-4 border-blue-500"
              />
            ) : (
              // آواتار کاربر
              <img
                src={user?.avatar || 'https://via.placeholder.com/80'}
                alt={user?.name || 'کاربر'}
                className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
              />
            )}
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs danaBold px-2 py-1 rounded-full">
              {user?.type === 'merchant' ? 'فروشنده' : 'خریدار'}
            </span>
          </div>
        </div>
        
        {/* نام کاربر یا نام فروشگاه */}
        <h2 className="text-lg danaBold text-gray-800 mb-1">
          {user?.type === 'merchant' && homepageData?.data?.merchant?.storeName
            ? homepageData.data.merchant.storeName
            : user?.name || user?.phone || 'کاربر'}
        </h2>
        
        {/* سطح و وضعیت */}
        <p className="text-xs text-gray-500 mb-4">
          {user?.type === 'merchant' ? 'حساب فروشنده' : 'حساب خریدار'}
        </p>
      </div>

      {/* جدایی کننده */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* منوی اصلی */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {filteredMenuItems.map((item) => {
            const IconComponent = item.icon
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 relative dana ${
                    isActive(item.href)
                      ? 'bg-gray-100 text-blue-600 danaBold'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className="text-xl" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  
                  {/* بجدج اطلاعات */}
                  {item.badge && (
                    <span className="flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs danaBold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* فوتر سایدبار */}
      <div className="border-t border-gray-200 pt-4 mt-6">
        <div className="text-center">
          <p className="text-xs text-gray-500">
            نسخه 1.0
          </p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
