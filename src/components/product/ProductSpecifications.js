'use client';
import React from 'react';

const ProductSpecifications = ({ specs,product }) => {
  return (
    <div className='bg-white p-4 rounded-2xl'>
      <h3 className='font-bold text-sm mb-4 pb-3 border-b border-gray-200'>توضیحات</h3>
      {/* <div className='space-y-3'>
        {specs.map((spec, idx) => (
          <div key={idx} className='flex justify-between text-sm'>
            <span className='text-gray-600'>{spec.label}</span>
            <span className='font-semibold text-gray-800'>{spec.value}</span>
          </div>
        ))}
      </div> */}
        <span>{product.description}</span>
    </div>
  );
};

export default ProductSpecifications;
