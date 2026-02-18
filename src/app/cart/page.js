'use client'

import React, { useState, useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import Login from '@/components/global/Login'
import StepIndicator from '@/components/cart/StepIndicator'
import StepOne from '@/components/cart/StepOne'
import StepTwo from '@/components/cart/StepTwo'
import StepThree from '@/components/cart/StepThree'
import StepFour from '@/components/cart/StepFour'

const CartPage = () => {
  const { user } = useContext(AuthContext)
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const steps = [
    { id: 1, label: 'سبد خرید' },
    { id: 2, label: 'آدرس تحویل' },
    { id: 3, label: 'روش پرداخت' },
    { id: 4, label: 'تایید' }
  ]

  const handleStepChange = (step) => {
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
        return <StepOne />
      case 2:
        return <StepTwo />
      case 3:
        return <StepThree />
      case 4:
        return <StepFour />
      default:
        return <StepOne />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 dana">
      <div className="max-w-4xl mx-auto">
        {/* Steps */}
        <StepIndicator steps={steps} currentStep={currentStep} setCurrentStep={handleStepChange} />

        {/* محتوای مرحله */}
        {renderStep()}

        {/* دکمه‌های ناوبری */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-6 py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors dana"
          >
            بازگشت
          </button>

          <button
            onClick={() => handleStepChange(Math.min(4, currentStep + 1))}
            disabled={currentStep === 4}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors danaBold"
          >
            ادامه
          </button>
        </div>
      </div>

      {/* مدال لاگین */}
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} loginMode="user" />
    </div>
  )
}

export default CartPage
