'use client';
import React from 'react';

const ProductHeader = ({ title,category, rating, reviewCount, discount, seller }) => {
  return (
    <div className='bg-white dana p-4 mb-4 rounded-2xl'>
      <div className='flex justify-between items-start'>
        <div className='flex-1'>
          <h1 className='text-lg font-bold text-gray-800'>{title}</h1>
          <h1 className='text-xs text-gray-800'>{category}</h1>
          <div className='flex gap-4 mt-2 text-sm'>
            <span className='flex items-center gap-1'>
              <span className='text-yellow-400'>★</span>
              {rating}
            </span>
            <span className='text-gray-600'>{reviewCount} دیدگاه</span>
          </div>
        </div>
        <div className='text-right'>
          {discount && <span className='bg-red-500 text-white px-2 py-1 rounded text-sm'>{discount}%</span>}
          <div className='text-gray-600 text-xs mt-1'>{seller}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
