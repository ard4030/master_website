'use client';
import React from 'react';

const ProductAttributes4 = ({ category, items = [], highOnly = false }) => {
  const filteredItems = highOnly ? items.filter((item) => item.high) : items;

  if (filteredItems.length === 0) return null;

  if (!highOnly) {
    return (
      <div className="border-t pt-5 mt-3 border-gray-200">
        {/* <h2 className="text-base danaBold text-gray-900 mb-1">مشخصات فنی بیشتر</h2> */}
        <p className="text-xs danaMed text-gray-400 mb-4">{category || 'مشخصات'}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredItems.map((attr, idx) => (
            <div key={idx} className="flex items-center justify-between  border border-gray-100 rounded-lg px-3 py-2.5">
              <span className="text-xs text-gray-500 danaMed">{attr.name}</span>
              <span className="text-xs danaBold text-gray-800">{attr.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="border-t pt-3 mt-1 border-gray-300">
      <h2 className="text-sm danaBold text-gray-900 mb-3">{category || 'مشخصات'}</h2>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {filteredItems.map((attr, idx) => (
          <div key={idx} className="flex flex-col gap-1 bg-neutral-50 rounded-md p-2">
            <span className="text-[10px] text-gray-400 danaMed">{attr.name}</span>
            <span className="text-xs danaMed text-gray-800">{attr.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductAttributes4;
