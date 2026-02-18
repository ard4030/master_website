'use client';
import React, { useState } from 'react';
import ProductActionsSection from './productLayout2/ProductActionsSection';

const PriceBox = ({ price, originalPrice, discount,handleAddToCart,product,variantId  }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className='bg-white p-4 rounded-2xl mb-4 border border-gray-200'>
      <div className='mb-4 pb-3 border-b border-gray-200'>
        <div className='flex items-baseline gap-3'>
          <span className='text-2xl font-bold text-red-600'>
            {parseInt(price).toLocaleString('fa-IR')}
          </span>
          {originalPrice && (
            <>
              <span className='text-gray-500 line-through text-sm'>
                {parseInt(originalPrice).toLocaleString('fa-IR')}
              </span>
              {discount && (
                <span className='bg-red-100 text-red-600 px-2 py-1 rounded-lg text-xs'>
                  {discount}%
                </span>
              )}
            </>
          )}
        </div>
      </div>

      <div className='mb-4'>
        <div className='flex items-center gap-2'>
          <span className='text-sm text-gray-600'>تعداد:</span>
          <div className='flex items-center border border-gray-300 rounded-lg'>
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className='px-3 py-1 hover:bg-gray-100'
            >
              −
            </button>
            <span className='px-4 py-1 border-l border-r border-gray-300'>{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className='px-3 py-1 hover:bg-gray-100'
            >
              +
            </button>
          </div>
        </div>
      </div>
            <ProductActionsSection
              onAddToCart={handleAddToCart}
              productId={product?._id}
              isVariants={product?.isVariants}
              variantId={variantId}
            />
      {/* <button className='w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition'>
        افزودن به سبد
      </button> */}
    </div>
  );
};

export default PriceBox;
