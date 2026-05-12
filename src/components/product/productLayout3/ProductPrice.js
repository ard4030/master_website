'use client';
import React from 'react';

const ProductPrice = () => {
  const price = 298.00;

  return (
    <div className="dana" dir="rtl">
      <div className="mb-6 pb-6 border-b border-gray-200">
        <label className="block text-sm font-semibold text-gray-600 mb-2 danaMed">
          قیمت
        </label>
        <p className="text-4xl font-bold text-gray-900 danaBold">
          ${price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductPrice;
