'use client'

import { createContext, useState, useEffect } from 'react'
import { apiRequest } from '@/utils/functions'
import { toast } from 'react-toastify'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  // بررسی وضعیت لاگین هنگام mount
  useEffect(() => {
    const checkLoginStatus = async () => {

      setLoading(true)
      const response = await apiRequest('/auth/is-login', 'GET')
      if (response.success && response.data.user) {
        console.log(response.data);
        
        setUser({...response.data.user,type: response.data.type})
      }
      setLoading(false)
    }

    checkLoginStatus()
  }, [])

  // تابع خروج
  const logout = async () => {
    // درخواست logout از سرور برای پاک‌کردن کوکی
    const response = await apiRequest('/auth/logout', 'POST')
    
    if (response.success) {
      toast.success('شما با موفقیت خارج شدید')
    } else {
      toast.error(response.error || 'خطایی در خروج رخ داد')
    }
    
    // پاک‌کردن localStorage
    localStorage.removeItem('masterToken')

    // بروز رسانی state
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}