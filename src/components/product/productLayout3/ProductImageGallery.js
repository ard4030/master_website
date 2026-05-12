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
    <div className="flex gap-4 dana" dir="rtl">
      {/* عکس بزرگ وسط */}
      <div className="flex-1 bg-gray-100 border-2 border-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
        <img
          src={selectedImage < images.length ? images[selectedImage] : images[0]}
          alt="محصول"
          className="w-full h-96 object-contain"
        />
      </div>

      {/* تصاویر کوچک سمت چپ */}
      {images && images.length > 0 && (
        <div className="flex flex-col gap-3">
          {images.slice(0, 7).map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-20 h-20 rounded-lg border-2 overflow-hidden transition ${
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
    </div>
  );
};

export default ProductImageGallery;
