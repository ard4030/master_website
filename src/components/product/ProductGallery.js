'use client';
import React, { useState } from 'react';
import imgDef from '@/../public/assets/images/acer.webp';
import Image from 'next/image';
const ProductGallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className='bg-white p-4 rounded-2xl mb-4'>
      <div className='flex gap-4'>
        {/* Thumbnail list */}
        <div className='flex flex-col gap-2'>
          {images.map((img, idx) => (
            <Image
              key={idx}
              src={img || imgDef}
              alt={`Product ${idx}`}
              width={64}
              height={64}
              onMouseEnter={() => setSelectedIndex(idx)}
              className={`w-16 h-16 object-cover cursor-pointer rounded-xl border-2 ${
                selectedIndex === idx ? 'border-red-600' : 'border-gray-300'
              }`}
            />
          ))}
        </div>
        {/* Main image */}
        <div className='flex-1'>
          <Image
            src={images[selectedIndex]? images[selectedIndex] : imgDef}
            alt='Main product'
            width={400}
            height={400}
            className='w-full h-96 object-cover rounded-2xl bg-gray-100'
          />
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
