'use client';
import React, { useState } from 'react';

const ProductImageGallery = ({ mainImage = '', galleryImages = [] }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  
  const imageUrl = process.env.NEXT_PUBLIC_LIARA_IMAGE_URL || '';

  
  // ساخت آرایه عکس‌ها
  const images = galleryImages && galleryImages.length > 0
    ? galleryImages.map(img => `${imageUrl}${img}`)
    : mainImage
    ? [`${imageUrl}${mainImage}`]
    : ['/api/placeholder/500/400?text=Laptop'];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 dana md:gap-4" dir="rtl">
      {/* تصاویر کوچک */}
      {images && images.length > 0 && (
        <div className="flex md:flex-col gap-2 md:gap-3 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 flex-1 md:flex-none">
          {images.slice(0, 7).map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg border-2 overflow-hidden transition ${
                selectedImage === index
                  ? 'border-blue-600'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <img
                src={img}
                alt={`تصویر ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* عکس بزرگ */}
      <div className="flex-1 bg-gray-100 border-2 border-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
        <img
          src={selectedImage < images.length ? images[selectedImage] : images[0]}
          alt="محصول"
          className="w-full h-60 md:h-96 object-contain"
        />
      </div>
    </div>
  );
};

export default ProductImageGallery;
