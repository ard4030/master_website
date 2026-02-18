'use client'

import React, { useState, useEffect, useContext } from 'react'
import OtpInput from 'react-otp-input'
import { apiRequest } from '@/utils/functions'
import { AuthContext } from '@/context/AuthContext'

const Login = ({ isOpen, onClose, loginMode = 'user' }) => {
  const { setUser} = useContext(AuthContext)
  const [loginType, setLoginType] = useState('email')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [smsSent, setSmsSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [timeLeft, setTimeLeft] = useState(0)
  const [checkingCode, setCheckingCode] = useState(false)

  // تایمر 2 دقیقه
  useEffect(() => {
    if (!smsSent) return

    setTimeLeft(120) // 2 دقیقه

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setSmsSent(false)
          setVerificationCode('')
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [smsSent])

  // بررسی کد تایید هنگام تکمیل
  useEffect(() => {
    if (verificationCode.length === 5 && smsSent && !checkingCode) {
      handleVerifyCode()
    }
  }, [verificationCode])

  // تابع تایید کد
  const handleVerifyCode = async () => {
    setCheckingCode(true)
    setError('')
    
    const endpoint = loginMode === 'merchant' ? '/merchants/verify-otp' : '/auth/verify-otp'
    const response = await apiRequest(endpoint, 'POST', {
      phone: phone,
      code: verificationCode
    })

    if (response.success) {
      // ذخیره اطلاعات کاربر در AuthContext
      if (response.data?.user) {
        setUser(response.data.user)
      }
      // بستن مودال
      onClose()
      // ریست کردن فرم
      setSmsSent(false)
      setVerificationCode('')
      setPhone('')
    } else {
      setError(response.error || 'کد تایید نامعتبر است')
      setVerificationCode('')
    }
    
    setCheckingCode(false)
  }
  // تابع ارسال درخواست ثبت نام
  const handleRegister = async () => {
    setLoading(true)
    setError('')
    // انتخاب endpoint براساس نوع login (user یا merchant)
    const endpoint = loginMode === 'merchant' ? '/merchants/register' : '/auth/register-user'
    const response = await apiRequest(endpoint, 'POST', {
      phone: phone
    })
    if (response.success) {
      setSmsSent(true)
    } else {
      setError(response.error || 'خطا در ارسال کد')
    }
    setLoading(false)
  }

  const handleWrongPhone = () => {
    setSmsSent(false)
    setVerificationCode('')
    setTimeLeft(0)
    setError('')
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100 dana">
        {/* سرصفحه */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl danaBold text-gray-800">
            {loginMode === 'merchant' ? '🏪 ورود فروشنده' : 'ورود به سامانه'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-blue-600 text-3xl font-light rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            aria-label="بستن"
          >
            ×
          </button>
        </div>

        {/* تب های انتخاب */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => {
              setLoginType('email')
              setSmsSent(false)
              setPhone('')
              setVerificationCode('')
            }}
            className={`flex-1 py-2 px-4 rounded-lg danaBold transition-colors text-base ${
              loginType === 'email'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ای میل
          </button>
          <button
            onClick={() => {
              setLoginType('phone')
              setEmail('')
            }}
            className={`flex-1 py-2 px-4 rounded-lg danaBold transition-colors text-base ${
              loginType === 'phone'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            موبایل
          </button>
        </div>

        {/* فرم */}
        <form className="space-y-5 danaMed">
          {/* نمایش خطا */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg danaMed">
              {error}
            </div>
          )}
          {/* ورود با ای‌میل */}
          {loginType === 'email' && (
            <>
              <div>
                <label className="block text-sm danaMed text-gray-700 mb-2">
                  ای میل
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition danaMed"
                />
              </div>

              {/* دکمه ورود - فقط برای ای‌میل */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg danaBold hover:bg-blue-700 transition-colors mt-6"
              >
                ورود
              </button>
            </>
          )}

          {/* ورود با موبایل */}
          {loginType === 'phone' && (
            <>
              {/* فیلد شماره موبایل - فقط اگر کد ارسال نشده باشد */}
              {!smsSent && (
                <div>
                  <label className="block text-sm danaMed text-gray-700 mb-2">
                    شماره موبایل
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09123456789"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition danaMed"
                  />
                </div>
              )}

              {/* دکمه ارسال کد - فقط اگر کد ارسال نشده باشد */}
              {!smsSent && (
                <button
                  type="button"
                  onClick={handleRegister}
                  disabled={!phone || loading}
                  className="w-full bg-green-600 text-white py-2 rounded-lg danaBold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? '⏳ درحال ارسال...' : 'ارسال کد'}
                </button>
              )}

              {/* بعد از ارسال کد */}
              {smsSent && (
                <>
                  {/* تایمر */}
                  <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-700 mb-2">کد تایید برای پیام‌رسان ارسال شد</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatTime(timeLeft)}
                    </p>
                  </div>

                  {/* فیلد کد تایید */}
                  <div className="my-8">
                    <label className="block text-sm font-medium text-gray-700 mb-6 text-center">
                      کد 6 رقمی را وارد کنید
                    </label>
                    <div className="flex justify-center ltr" dir="ltr">
                      <OtpInput
                        value={verificationCode}
                        onChange={setVerificationCode}
                        numInputs={5}
                        renderSeparator={<span className="hidden"></span>}
                        renderInput={(props) => (
                          <input
                            {...props}
                            inputMode="numeric"
                            className="!w-16 !h-16 !mx-2 !text-center !text-3xl !font-bold !border-2 !border-gray-300 !rounded-xl !focus:border-blue-500 !focus:ring-2 !focus:ring-blue-300 !outline-none !transition !bg-white hover:!border-gray-400"
                          />
                        )}
                        shouldAutoFocus
                        skipDefaultStyles={true}
                      />
                    </div>
                  </div>

                  {/* پیغام درحال تایید */}
                  {checkingCode && (
                    <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-700">⏳ درحال تایید کد...</p>
                    </div>
                  )}

                  {/* دکمه شماره اشتباه است */}
                  {!checkingCode && (
                    <button
                      type="button"
                      onClick={handleWrongPhone}
                      className="w-full text-red-600 py-2 rounded-lg font-semibold hover:text-red-700 transition-colors text-sm"
                    >
                      ← شماره موبایل اشتباه است
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </form>

        </div>
        </div>
      )}
    </>
  )
}

export default Login



