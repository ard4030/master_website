'use client';
import React, { useState } from 'react';

const FilterSection = ({ title, items, onSelectItem }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className='bg-white p-4 rounded-2xl mb-3 border border-gray-200'>
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className='flex justify-between items-center cursor-pointer pb-2 border-b border-gray-200'
      >
        <h3 className='font-bold text-sm'>{title}</h3>
        <span className='text-lg'>{isExpanded ? '−' : '+'}</span>
      </div>
      
      {isExpanded && (
        <div className='mt-3 space-y-2'>
          {items.map((item, idx) => (
            <label key={idx} className='flex items-center gap-2 cursor-pointer'>
              <input 
                type='checkbox'
                onChange={() => onSelectItem?.(item)}
                className='w-4 h-4'
              />
              <span className='text-sm text-gray-700'>{item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSection;
