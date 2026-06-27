'use client'

import React, { useState, useEffect, useContext } from 'react'
import OtpInput from 'react-otp-input'
import { apiRequest } from '@/utils/functions'
import { AuthContext } from '@/context/AuthContext'
import { MerchantContext } from '@/context/MerchantContext'

const IMAGE_BASE = process.env.NEXT_PUBLIC_LIARA_IMAGE_URL || ''

const Login = ({ isOpen, onClose, loginMode = 'user',payload=() => null }) => {
  const { setUser } = useContext(AuthContext)
  const { activeMerchant } = useContext(MerchantContext) || {}
  const [loginType, setLoginType] = useState('phone')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [smsSent, setSmsSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [timeLeft, setTimeLeft] = useState(0)
  const [checkingCode, setCheckingCode] = useState(false)
  const [noAccess, setNoAccess] = useState(false)

  const merchantName =
    activeMerchant?.merchant?.storeName ||
    activeMerchant?.merchant?.name ||
    activeMerchant?.name ||
    'فروشگاه'
  const merchantLogo =
    activeMerchant?.merchant?.logo || activeMerchant?.logo || null

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
        setUser(response.data.user);
        payload()
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden dana flex flex-col md:flex-row">
        {/* پنل برند (سمت راست در RTL) */}
        <div className="hidden md:flex md:w-2/5 bg-[#ff5e1f] items-center justify-center p-8">
          {merchantLogo ? (
            <img
              src={IMAGE_BASE + merchantLogo}
              alt={merchantName}
              className="max-w-[220px] max-h-[220px] object-contain drop-shadow-lg"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-white text-center">
              <div className="w-28 h-28 rounded-full bg-white/15 flex items-center justify-center danaBold text-5xl">
                {merchantName?.charAt(0) || 'ش'}
              </div>
              <div className="danaBold text-2xl mt-2">{merchantName}</div>
            </div>
          )}
        </div>

        {/* پنل فرم (سمت چپ در RTL) */}
        <div className="w-full md:w-3/5 p-6 sm:p-8 relative">
          {/* دکمه بستن */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-gray-500 hover:text-gray-800 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="بستن"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* لوگوی فروشگاه در موبایل */}
          <div className="md:hidden flex justify-center mb-4 mt-2">
            {merchantLogo ? (
              <img
                src={IMAGE_BASE + merchantLogo}
                alt={merchantName}
                className="w-20 h-20 object-contain rounded-xl bg-[#ff5e1f] p-2"
              />
            ) : (
              <div className="w-20 h-20 rounded-xl bg-[#ff5e1f] text-white flex items-center justify-center danaBold text-3xl">
                {merchantName?.charAt(0) || 'ش'}
              </div>
            )}
          </div>

          {/* عنوان عادی / هدر مرحله OTP */}
          {smsSent ? (
            <div className="flex items-center justify-between mt-6 mb-6">
              <button
                type="button"
                onClick={handleWrongPhone}
                className="text-gray-500 hover:text-gray-800 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                aria-label="بازگشت"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <h2 className="text-lg danaBold text-gray-900">ورود با کد تایید</h2>
            </div>
          ) : (
            <h2 className="text-2xl danaBold text-gray-900 text-center mt-6 mb-6">
              {loginMode === 'merchant' ? 'ورود فروشنده' : 'عضویت یا ورود'}
            </h2>
          )}

          {/* تب‌های انتخاب - فقط در حالت ورود اولیه */}
          {!smsSent && (
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setLoginType('phone')
                setEmail('')
                setError('')
              }}
              className={`flex-1 py-2 px-3 rounded-lg danaMed text-sm transition-colors ${
                loginType === 'phone'
                  ? 'bg-white text-[#ff5e1f] shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              موبایل
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginType('email')
                setSmsSent(false)
                setPhone('')
                setVerificationCode('')
                setError('')
              }}
              className={`flex-1 py-2 px-3 rounded-lg danaMed text-sm transition-colors ${
                loginType === 'email'
                  ? 'bg-white text-[#ff5e1f] shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              ایمیل
            </button>
          </div>
          )}

          {/* فرم */}
          <form
            className="space-y-4 danaMed"
            onSubmit={(e) => {
              e.preventDefault()
              if (loginType === 'phone' && !smsSent) handleRegister()
            }}
          >
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* ورود با ای‌میل */}
            {loginType === 'email' && (
              <>
                <div>
                  <label className="block text-sm danaMed text-gray-800 mb-2">
                    ای‌میل:
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="اینجا بنویس"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5e1f]/30 focus:border-[#ff5e1f] outline-none transition danaMed text-gray-800 placeholder:text-gray-400"
                  />
                  <p className="text-xs text-gray-400 mt-2 text-left ltr" dir="ltr">
                    example@email.com
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#ff5e1f] hover:bg-[#e84e10] text-white py-3 rounded-lg danaBold transition-colors mt-4"
                >
                  ورود
                </button>
              </>
            )}

            {/* ورود با موبایل */}
            {loginType === 'phone' && (
              <>
                {!smsSent && (
                  <>
                    <div>
                      <label className="block text-sm danaMed text-gray-800 mb-2">
                        شماره تلفن همراه:
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="اینجا بنویس"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5e1f]/30 focus:border-[#ff5e1f] outline-none transition danaMed text-gray-800 placeholder:text-gray-400"
                      />
                      <p className="text-xs text-gray-400 mt-2">
                        مثال: <span className="ltr inline-block" dir="ltr">۰۹۱۲۳۴۵۶۷۸۹</span>
                      </p>
                    </div>

                    <p className="text-xs text-gray-500 text-center leading-6">
                      عضویت شما به منزله پذیرش{' '}
                      <a
                        href="#"
                        className="text-[#ff5e1f] underline underline-offset-2"
                      >
                        مقررات {merchantName}
                      </a>{' '}
                      است
                    </p>

                    <label className="flex items-center gap-2 justify-center text-xs text-gray-600 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={noAccess}
                        onChange={(e) => setNoAccess(e.target.checked)}
                        className="w-4 h-4 accent-[#ff5e1f] rounded"
                      />
                      <span>به این شماره دسترسی ندارم</span>
                    </label>

                    <button
                      type="button"
                      onClick={handleRegister}
                      disabled={!phone || loading}
                      className="w-full bg-[#ff5e1f] hover:bg-[#e84e10] text-white py-3 rounded-lg danaBold transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed mt-2"
                    >
                      {loading ? 'درحال ارسال...' : 'دریافت کد تأیید'}
                    </button>
                  </>
                )}

                {smsSent && (
                  <>
                    {/* پیام ارسال کد */}
                    <p className="text-sm text-gray-700 text-center leading-7">
                      کد تایید به شماره{' '}
                      <span className="danaBold text-gray-900">
                        «<span className="ltr inline-block" dir="ltr">{phone}</span>»
                      </span>{' '}
                      پیامک شد.
                    </p>

                    {/* کادرهای کد تایید */}
                    <div className="mt-6">
                      <label className="block text-sm danaMed text-gray-700 mb-3 text-right">
                        کد تایید
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
                              className="!w-14 !h-14 sm:!w-16 sm:!h-16 !mx-1 !text-center !text-2xl danaBold !border !border-gray-200 !rounded-xl focus:!border-[#ff5e1f] focus:!ring-2 focus:!ring-[#ff5e1f]/20 !outline-none !transition !bg-white hover:!border-gray-300"
                            />
                          )}
                          shouldAutoFocus
                          skipDefaultStyles={true}
                        />
                      </div>
                    </div>

                    {/* تایمر با آیکن ساعت */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>
                        مانده تا دریافت مجدد کد{' '}
                        <span className="danaBold text-gray-700 ltr inline-block" dir="ltr">
                          {formatTime(timeLeft)}
                        </span>
                      </span>
                    </div>

                    {checkingCode && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
                        <p className="text-sm text-gray-700">درحال تایید کد...</p>
                      </div>
                    )}

                    {!checkingCode && (
                      <button
                        type="button"
                        onClick={handleWrongPhone}
                        className="w-full text-[#ff5e1f] py-2 danaBold hover:text-[#e84e10] transition-colors text-sm mt-4"
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
    </div>
  )
}

export default Login



