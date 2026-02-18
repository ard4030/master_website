'use client';
import React, { useState } from 'react';

const ProductShippingSection = ({ freeShipping, shippingTime, discount }) => {
  const [shippingOpen, setShippingOpen] = useState(false);

  return (
    <div className="border-t pt-4 mt-4 dana">
      <button
        onClick={() => setShippingOpen(!shippingOpen)}
        className="flex items-center justify-between w-full hover:text-gray-600 transition"
      >
        <span className="font-semibold text-gray-900 danaMed">ارسال و تحویل</span>
        <svg
          className={`w-5 h-5 transition-transform ${
            shippingOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>

      {shippingOpen && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col items-center text-center">
            <span className="text-2xl mb-2">📦</span>
            <span className="text-sm text-gray-600 danaMed">{productShipping?.freeShipping ? 'ارسال رایگان' : 'ارسال معمولی'}</span>
            <span className="text-xs text-gray-500 danaReg">{productShipping?.discount ? `تخفیف: ${productShipping.discount}%` : 'قیمت کامل'}</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-2xl mb-2">📅</span>
            <span className="text-sm text-gray-600 danaMed">زمان تحویل</span>
            <span className="text-xs text-gray-500 danaReg">{freeShipping ? '3-4 روز کاری' : shippingTime || '3-4 روز کاری'}</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-2xl mb-2">🚚</span>
            <span className="text-sm text-gray-600 danaMed">بسته‌بندی</span>
            <span className="text-xs text-gray-500 danaReg">آماده ارسال</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-2xl mb-2">⏰</span>
            <span className="text-sm text-gray-600 danaMed">مهلت بازگشت</span>
            <span className="text-xs text-gray-500 danaReg">30 روز</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductShippingSection;
