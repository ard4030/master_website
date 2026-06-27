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
// import { toast } from 'react-toastify'
import { toast } from 'sonner'

import { CartContext } from '@/context/CartContext'
import { SuggestionsModal } from '@/components/global/suggestions/SuggestionsModal'

const CartPage = () => {
  const { user } = useContext(AuthContext)
  const { order } = useContext(OrderContext);
  const { cart,showSuggestions, setShowSuggestions } = useContext(CartContext);
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const steps = [
    { id: 1, label: 'سبد خرید' },
    { id: 2, label: 'آدرس تحویل' },
    { id: 3, label: 'روش پرداخت' },
    { id: 4, label: 'تایید' }
  ];

  const checkSuggestions = (productList=[]) => {
    console.log(productList);
    // اینجا باید لیست جک بشه و هر کدوم از ایتما 
    // ساجسشن داشتن ایدیشون وارد یک ارایه بشه
    // و من اون ایدی رو پاس میدم به مودال ساجسشن
    // و این ارایه فرستاده میشه برای یک api
    // این ای پی ای طبق ایدی هایی که فرستادم اطلاعات و لیست محصولات رو نشون میده
    return true;
    
  }

  const handleStepChange = (step) => {
    // console.log(step,currentStep);
    if(step > currentStep && currentStep === 1){
      // console.log(38,);
      
      const hasSuggestions = checkSuggestions(cart.items);
      if (hasSuggestions) {
        setShowSuggestions(true);
        return;
      }
    }
    
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

  const countinueSteps = (lastStep,nextStep) => {
  setCurrentStep(2)
  }

  const handleSuggestionsNextStep = () => {
    setShowSuggestions(false)
    console.log('wwwwee',currentStep);
    
    if (!user) {
      setIsLoginOpen(true)
      return
    }

    setCurrentStep(2)
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
        {showSuggestions&&
        <SuggestionsModal productList={cart.items} nextStep={handleSuggestionsNextStep} />}
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
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} loginMode="user" payload={() => countinueSteps(1,2)} />
    </div>
  )
}

export default CartPage
