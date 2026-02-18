'use client';
import React from 'react';

const ProductAttributes = ({ attributes }) => {
  if (!attributes || attributes.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-2xl space-y-4">
      <h3 className="font-bold text-sm mb-4 pb-3 border-b border-gray-200">ویژگی های محصول</h3>
      
      <div className="space-y-4">
        {attributes.map((attr, idx) => (
          <div key={idx} className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0">
            <p className="text-xs text-gray-500 mb-2 font-semibold">{attr.label}</p>
            <p className="text-sm text-gray-800">{attr.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductAttributes;
