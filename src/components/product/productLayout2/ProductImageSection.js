'use client';
import React, { useState } from 'react';

const ProductImageSection = ({ mainImage, galleryImages = [] }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  
  const imageUrl = process.env.NEXT_PUBLIC_LIARA_IMAGE_URL || '';
  
  const images = galleryImages && galleryImages.length > 0
    ? galleryImages.map(img => `${imageUrl}${img}`)
    : mainImage
    ? [`${imageUrl}${mainImage}`]
    : ['/placeholder.jpg'];

  return (
    <div>
      {/* تصویر اصلی */}
      <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 max-w-md mx-auto">
        <img
          src={selectedImage < images.length ? images[selectedImage] : images[0]}
          alt="محصول"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* تصاویر کوچک */}
      {images && images.length > 1 && (
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
          {images.slice(0, 3).map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? 'border-gray-800'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <img
                src={img}
                alt={`تصویر ${index + 1}`}
                className="w-full h-32 object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageSection;
