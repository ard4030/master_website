'use client';
import React, { useState } from 'react';

const ProductInfoSection = ({ name, price, compareAtPrice, description }) => {
  const [descriptionOpen, setDescriptionOpen] = useState(false);

  // محاسبه درصد تخفیف
  const discountPercent = compareAtPrice && price < compareAtPrice 
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  return (
    <div className="space-y-4 dana">
      {/* نام محصول */}
      <h1 className="text-3xl font-bold text-gray-900 danaBold">{name}</h1>

      {/* قیمت */}
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className="text-2xl font-bold text-gray-900 danaBold">
          {price?.toLocaleString('fa-IR')} تومان
        </span>
        {compareAtPrice && compareAtPrice > price && (
          <>
            <span className="text-lg text-gray-500 line-through danaMed">
              {compareAtPrice?.toLocaleString('fa-IR')} تومان
            </span>
            {discountPercent > 0 && (
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs danaMed">
                {discountPercent}% تخفیف
              </span>
            )}
          </>
        )}
      </div>

      {/* توضیحات */}
      <div className="border-t border-b border-gray-200 py-4">
        <button
          onClick={() => setDescriptionOpen(!descriptionOpen)}
          className="flex items-center justify-between w-full hover:text-gray-600 transition"
        >
          <span className="font-semibold text-gray-900 danaMed">توضیحات</span>
          <svg
            className={`w-5 h-5 transition-transform ${
              descriptionOpen ? 'rotate-180' : ''
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
        {descriptionOpen && (
          <p className="text-gray-600 text-sm mt-4 leading-relaxed danaMed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductInfoSection;
