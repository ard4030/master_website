'use client';
import React, { useState } from 'react';

const ColorSelector = ({ colors, onColorChange }) => {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorSelect = (color) => {
    setSelectedColor(color.id);
    if (onColorChange) {
      onColorChange(color);
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl">
      <h3 className="font-bold text-sm mb-4 pb-3 border-b border-gray-200">انتخاب رنگ</h3>
      
      <div className="flex flex-wrap gap-4">
        {colors.map((color) => (
          <div
            key={color.id}
            onClick={() => handleColorSelect(color)}
            className="flex flex-col items-center gap-1 cursor-pointer group"
          >
            {/* دایره رنگ */}
            <div
              className={`
                relative w-8 h-8 rounded-full shrink-0
                transition-all duration-200 border-2
                ${selectedColor === color.id
                  ? 'border-red-600 ring-2 ring-red-300'
                  : 'border-gray-300 group-hover:border-gray-400'
                }
              `}
              style={{ backgroundColor: color.hex || color.code }}
              title={color.name}
            >
              {/* چک مارک */}
              {selectedColor === color.id && (
                <svg
                  className="absolute inset-0 w-full h-full p-1 text-white drop-shadow"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>

            {/* نام رنگ */}
            <span className="text-xs text-gray-600 text-center w-10">
              {color.name || color.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
