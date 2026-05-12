'use client';
import React from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { IoBagOutline } from 'react-icons/io5';

const ProductInfo = ({product}) => {
  const productName = 'مایکروسافت لومیا 640 XL RM-1065 8GB دوال سیم';
  const rating = 4.5;
  const reviewCount = 154;
  const attributes = [
    { label: 'ساخت', value: 'استرالیا' },
    { label: 'طراحی', value: 'مدرن' },
    { label: 'ارسال', value: 'تحویل 2 روزه' }
  ];

  return (
    <div className="dana" dir="rtl">
      {/* نام محصول */}
      <h1 className="text-2xl  text-gray-900 mb-4 danaBold">
        {product.name}
      </h1>

      {/* امتیاز و سفارش‌ها */}
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-lg text-yellow-400">
                {i < 4 ? <BsStarFill /> : <BsStar />}
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-600 relative top-[3px] danaMed">{rating}</span>
        </div>
        <div className="flex items-center gap-1 relative top-[1px]">
          <IoBagOutline className="text-lg text-gray-600" />
          <span className="text-sm text-gray-600 danaMed mr-2">{reviewCount} سفارش</span>
        </div>
      </div>

      {/* Attributes */}
      <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
        {attributes.map((attr, index) => (
          <div key={index} className="flex justify-between danaMed">
            <span className="text-gray-400">{attr.label}:</span>
            <span className="danaMed text-black">{attr.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductInfo;
