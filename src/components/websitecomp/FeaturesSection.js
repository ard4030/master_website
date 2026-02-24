'use client'

import React from 'react'

/**
 * کامپوننت بخش ویژگی‌ها
 * @param {Array} features - آرایه ویژگی‌ها شامل شیء‌هایی با icon و text
 * @param {String} backgroundColor - رنگ زمینه
 * @param {String} section Title - عنوان بخش
 * @param {String} sectionDescription - توضیح بخش
 */
const FeaturesSection = ({
  features = [
    {
      icon: '✓',
      text: 'شمقات اصل بودن کالا'
    },
    {
      icon: '📦',
      text: 'هفت روز ضمانت بازگشت کالا'
    },
    {
      icon: '24/7',
      text: '۷ روز هفتم، ۲۴ ساعته'
    },
    {
      icon: '🏪',
      text: 'امکان پرداخت در محل'
    },
    {
      icon: '🚚',
      text: 'امکان تحویل اکسپرس'
    }
  ],
  backgroundColor = 'bg-white',
  sectionTitle = '',
  sectionDescription = ''
}) => {
  return (
    <div className={`w-full ${backgroundColor} py-12`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        {sectionTitle && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl danaBold text-gray-900 mb-4">
              {sectionTitle}
            </h2>
            {sectionDescription && (
              <p className="text-gray-600 danaMed text-base max-w-2xl mx-auto">
                {sectionDescription}
              </p>
            )}
          </div>
        )}

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 hover:shadow-lg transition-shadow duration-300 rounded-lg"
            >
              {/* Icon Container */}
              <div className="mb-4 text-5xl text-orange-500">
                {feature.icon}
              </div>

              {/* Text */}
              <p className="text-gray-700 danaMed text-sm leading-relaxed">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturesSection
