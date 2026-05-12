'use client';
import React from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

const ProductRatings = () => {
  const rating = 4.7;
  const totalReviews = 458;

  const ratings = [
    { stars: 5, percentage: 70, count: 320 },
    { stars: 4, percentage: 15, count: 68 },
    { stars: 3, percentage: 10, count: 45 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 dana" dir="rtl">
      <div className="flex items-end gap-4 mb-6 pb-6 border-b border-gray-200">
        <div className="text-5xl font-bold text-gray-900 danaBold">{rating}</div>
        <div className="flex-1">
          <div className="flex gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-lg text-yellow-400">
                {i < 4 ? <BsStarFill /> : <BsStar />}
              </span>
            ))}
          </div>
            <p className="text-sm text-gray-600 danaMed">از 5</p>
            <p className="text-sm text-gray-600 danaMed">{totalReviews} امتیاز جهانی</p>
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="space-y-3">
        {ratings.map((item) => (
          <div key={item.stars} className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-yellow-400">
              {[...Array(item.stars)].map((_, i) => (
                <span key={i}><BsStarFill /></span>
              ))}
            </div>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-500"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 w-12 danaMed">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRatings;
