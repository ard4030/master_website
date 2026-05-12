'use client';
import React from 'react';

const ProductButtons = () => {
  return (
    <div className="flex gap-3 dana" dir="rtl">
      <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition danaMed flex items-center justify-center gap-2">
        <span>🛒</span>
        افزودن به سبد
      </button>
      <button className="flex-1 bg-blue-100 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-200 transition danaMed">
        خرید سریع
      </button>
    </div>
  );
};

export default ProductButtons;
