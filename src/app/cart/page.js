'use client'

import React, { useState, useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import OrderContext from '@/context/OrderContext'
import Login from '@/components/global/Login'
import StepIndicator from '@/components/cart/StepIndicator'
import StepOne from '@/components/cart/StepOne'
import StepTwo from '@/components/cart/StepTwo'
import StepThree from '@/components/cart/StepThree'
import StepFour from '@/components/cart/StepFour'
import { toast } from 'react-toastify'

const CartPage = () => {
  const { user } = useContext(AuthContext)
  const { order } = useContext(OrderContext)
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const steps = [
    { id: 1, label: 'سبد خرید' },
    { id: 2, label: 'آدرس تحویل' },
    { id: 3, label: 'روش پرداخت' },
    { id: 4, label: 'تایید' }
  ]

  const handleStepChange = (step) => {
    // بررسی آیا می‌خواهند از مرحله 2 به بعد برود
    if (step > currentStep && currentStep === 2) {
      if (!order.address) {
        toast.error('لطفاً یک آدرس را انتخاب کنید')
        return
      }
      if (!order.shippingMethod) {
        toast.error('لطفاً یک روش ارسال را انتخاب کنید')
        return
      }
    }

    // اگر مرحله 2 یا بعدتر باشد و لاگین نکرده باشیم
    if (step > 1 && !user) {
      setIsLoginOpen(true)
      return
    }
    setCurrentStep(step)
  }

  const renderStep = () => {
    // اگر مرحله 2 یا بعدتر و لاگین نیست، null برگردان
    if (currentStep > 1 && !user) {
      return null
    }

    switch (currentStep) {
      case 1:
        return <StepOne onContinue={() => handleStepChange(2)} />
      case 2:
        return (
          <StepTwo
            onContinue={() => handleStepChange(3)}
            onBack={() => setCurrentStep(1)}
          />
        )
      case 3:
        return <StepThree />
      case 4:
        return <StepFour />
      default:
        return <StepOne onContinue={() => handleStepChange(2)} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 dana">
      <div className="max-w-6xl mx-auto">
        {/* Steps */}
        {/* <StepIndicator steps={steps} currentStep={currentStep} setCurrentStep={handleStepChange} /> */}

        {/* دکمه بازگشت بالا */}
        {currentStep > 1 && (
          <div className="mb-5 flex justify-start">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              className="danaBold px-5 py-2.5 rounded-xl border border-blue-200 bg-white text-blue-700 hover:bg-blue-50 hover:border-blue-300 shadow-sm hover:shadow transition-all"
            >
              بازگشت به مرحله قبل
            </button>
          </div>
        )}

        {/* محتوای مرحله */}
        {renderStep()}
      </div>

      {/* مدال لاگین */}
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} loginMode="user" />
    </div>
  )
}

export default CartPage
