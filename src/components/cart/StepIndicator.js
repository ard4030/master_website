'use client'

import React from 'react'
import { MdCheck } from 'react-icons/md'

const StepIndicator = ({ steps, currentStep, setCurrentStep }) => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            {/* شماره مرحله */}
            <div
              onClick={() => setCurrentStep(step.id)}
              className={`flex items-center justify-center w-12 h-12 rounded-full cursor-pointer transition-all ${
                currentStep >= step.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {currentStep > step.id ? (
                <MdCheck size={24} />
              ) : (
                <span className="danaBold">{step.id}</span>
              )}
            </div>

            {/* خط پیوند */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 transition-all ${
                  currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            )}

            {/* برچسب مرحله */}
            <span
              className={`text-sm danaMed transition-all ${
                currentStep === step.id ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StepIndicator
