'use client';
import React from 'react';

const Breadcrumb = ({ items = [] }) => {
  return (
    <div className="bg-gray-100 px-6 py-3 mb-8 rounded-lg dana" dir="rtl">
      <div className="text-sm text-gray-600 max-w-7xl mx-auto">
        {items.map((item, index) => (
          <span key={index}>
            <span className="hover:text-gray-800 transition cursor-pointer">
              {item}
            </span>
            {index < items.length - 1 && (
              <span className="mx-2">/</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;
