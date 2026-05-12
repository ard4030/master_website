'use client';
import React from 'react';

const SellerCard = () => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 dana" dir="rtl">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center text-xl">
          🏪
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 danaMed">فروشگاه گوانجوی ترید</h3>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-yellow-500">⭐</span>
            <span className="text-sm font-semibold danaMed">4.2</span>
            <span className="text-xs text-gray-600 danaMed">• 1290 محصول فروخته شده</span>
          </div>
        </div>
      </div>
      <button className="w-full py-2 text-blue-600 font-semibold text-sm hover:bg-blue-50 rounded transition danaMed">
        پروفایل فروشنده
      </button>
    </div>
  );
};

export default SellerCard;
