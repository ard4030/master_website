'use client';
import React from 'react';
import { FiX } from 'react-icons/fi';
import FilterSection from './FilterSection';

const FilterSidebar = ({ isOpen, onClose, filterItems }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden'
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 md:hidden overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className='flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white'>
          <h2 className='text-lg font-bold'>فیلترها</h2>
          <button onClick={onClose} className='text-gray-600 hover:text-gray-800'>
            <FiX size={24} />
          </button>
        </div>

        {/* Filters */}
        <div className='p-4 space-y-3'>
          <FilterSection title='فروشنده' items={filterItems.seller} />
          <FilterSection title='نحوه تحویل' items={filterItems.delivery} />
          <FilterSection title='محدوده قیمت' items={filterItems.price} />

          {/* Apply Button */}
          <button
            onClick={onClose}
            className='w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition mt-4'
          >
            اعمال فیلترها
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
