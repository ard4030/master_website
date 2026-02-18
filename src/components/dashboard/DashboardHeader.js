'use client'

import React, { useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AuthContext } from '@/context/AuthContext'
import { MdLogout } from 'react-icons/md'

const DashboardHeader = () => {
  const pathname = usePathname()
  const { logout } = useContext(AuthContext)

  // نقشه‌ی مسیرها به تایتل‌ها
  const routeTitles = {
    '/dashboard': 'داشبورد',
    '/dashboard/reports': 'شارش های من',
    '/dashboard/marketplace': 'بازار معاملات',
    '/dashboard/categories': 'دسته بندی',
    '/dashboard/products': 'محصولات',
    '/dashboard/bank-accounts': 'حساب های بانکی',
    '/dashboard/wallet': 'کیف پول',
    '/dashboard/notifications': 'اطلاع رسانی',
    '/dashboard/settings': 'تنظیمات',
    '/dashboard/support': 'پشتیبانی',
  }

  // تایتل صفحه فعلی
  const pageTitle = routeTitles[pathname] || 'داشبورد'

  const handleLogout = () => {
    if (confirm('آیا مطمئن هستید که می‌خواهید خروج کنید؟')) {
      logout()
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between dana">
      {/* سمت راست - تایتل صفحه */}
      <h1 className="text-2xl danaBold text-gray-800">
        {pageTitle}
      </h1>

      {/* سمت چپ - دکمه صفحه اصلی و خروج */}
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors danaMed text-sm"
        >
          صفحه اصلی
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors danaMed text-sm"
        >
          <MdLogout className="text-lg" />
          <span>خروج</span>
        </button>
      </div>
    </header>
  )
}

export default DashboardHeader
