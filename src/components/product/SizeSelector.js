'use client';
import React, { useState } from 'react';

const SizeSelector = ({ sizes, onSizeChange }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    if (onSizeChange) {
      onSizeChange(size);
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl">
      <h3 className="font-bold text-sm mb-4 pb-3 border-b border-gray-200">انتخاب سایز</h3>
      
      <div className="flex flex-wrap gap-2">
        {sizes.map((size, idx) => (
          <button
            key={idx}
            onClick={() => handleSizeSelect(size)}
            className={`
              px-3 py-2 rounded-lg border-1 font-semibold text-sm
              transition-all duration-200
              ${selectedSize === size
                ? 'border-red-600 bg-red-50 text-red-600'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }
            `}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
