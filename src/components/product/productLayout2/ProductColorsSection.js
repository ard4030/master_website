'use client';
import React, { useState } from 'react';

const ProductColorsSection = ({ colors = [], selectedColor, onColorSelect }) => {
  const [selected, setSelected] = useState(selectedColor || colors[0]?.name);

  const handleSelect = (colorName) => {
    setSelected(colorName);
    if (onColorSelect) {
      onColorSelect(colorName);
    }
  };

  if (!colors || colors.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 py-4 dana border-b border-gray-200">
      <span className="font-semibold text-gray-900 danaMed">رنگ</span>
      <div className="flex gap-3 flex-wrap">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => handleSelect(color.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded border-2 transition-all ${
              selected === color.name
                ? 'border-gray-900 bg-gray-50'
                : 'border-gray-300 hover:border-gray-600'
            }`}
          >
            <div
              className="w-5 h-5 rounded-full border border-gray-400"
              style={{ backgroundColor: color.code }}
              title={color.name}
            />
            <span className="text-sm danaMed text-gray-700">{color.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductColorsSection;
