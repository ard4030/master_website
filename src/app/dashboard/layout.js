'use client'

import React, { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import Sidebar from '@/components/dashboard/Sidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'

const DashboardLayout = ({ children }) => {
  const { user, loading } = useContext(AuthContext)

  // درحال بارگیری
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 font-medium">درحال بارگیری...</p>
        </div>
      </div>
    )
  }

  // کاربر لاگین نیست
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">لاگین نیستید</h2>
          <p className="text-gray-600 mb-6">لطفاً برای دسترسی به داشبورد وارد شوید</p>
          <a
            href="/"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium inline-block"
          >
            بازگشت به صفحه اول
          </a>
        </div>
      </div>
    )
  }

  // کاربر لاگین است
  return (
    <div className="flex h-screen bg-gray-50">
      {/* سایدبار */}
      <div className="w-72 flex-shrink-0">
        <Sidebar />
      </div>

      {/* محتوا و هدر */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* هدر */}
        <DashboardHeader />

        {/* محتوا */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout