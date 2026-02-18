'use client';
import React from 'react';

const SellerInfo = ({ sellerName, rating, reviews }) => {
  return (
    <div className='bg-white p-4 rounded-2xl mb-3 border border-gray-200'>
      <div className='flex items-center justify-between pb-2 border-b border-gray-200'>
        <h3 className='font-bold text-sm'>{sellerName}</h3>
        <button className='text-red-600 hover:text-red-700'>
          <span className='text-lg'>♡</span>
        </button>
      </div>
      <div className='mt-3 space-y-2 text-sm'>
        <div className='flex justify-between'>
          <span className='text-gray-600'>امتیاز فروشنده:</span>
          <span className='font-semibold'>{rating}%</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-600'>تعداد نظرات:</span>
          <span className='font-semibold'>{reviews}</span>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;
