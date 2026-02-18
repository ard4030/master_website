'use client';
import React from 'react';

const CallToActionBanner = ({ text, onBuyClick }) => {
  return (
    <div className='bg-red-600 dana text-white py-3 px-4 rounded-2xl flex items-center gap-3 mb-4'>
      <span className='text-xl'>✪</span>
      <span className='flex-1 text-sm'>{text}</span>
      <button 
        onClick={onBuyClick}
        className='bg-red-700 hover:bg-red-800 px-6 py-2 rounded-lg font-bold whitespace-nowrap'
      >
        خرید کن
      </button>
    </div>
  );
};

export default CallToActionBanner;
