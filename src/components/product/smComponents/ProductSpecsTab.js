'use client';
import React from 'react';

const ProductSpecsTab = ({ specifications }) => {
  return (
    <div className="dana">
      <h3 className="text-lg font-bold mb-6 text-right">اطلاعات و دیدگاه کاربران</h3>
      <div className="space-y-4">
        {specifications.map((spec, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
          >
            <span className="text-gray-700">{spec.value}</span>
            <span className="font-bold text-gray-900">{spec.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSpecsTab;
