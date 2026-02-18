'use client';
import React from 'react';

const ProductReviewsTab = ({ reviews }) => {
  return (
    <div className="dana">
      <h3 className="text-lg font-bold mb-6 text-right">نظرات کاربران</h3>
      
      {/* Review Summary */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-end gap-4 justify-end mb-4">
          <div className="text-right">
            <div className="flex items-center justify-end gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">★</span>
              ))}
            </div>
            <p className="text-gray-600 text-sm">۲۷ دیدگاه</p>
          </div>
          <div className="text-3xl font-bold text-gray-900">۴.۲</div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0">
            <div className="flex items-start justify-between mb-3">
              <div className="text-right flex-1">
                <h4 className="font-bold text-gray-900 mb-1">{review.author}</h4>
                <p className="text-sm text-gray-600 mb-2">{review.date}</p>
                <p className="font-bold text-gray-900 mb-2">{review.title}</p>
              </div>
              <div className="flex items-center gap-1 ml-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">{review.comment}</p>
            <div className="flex items-center gap-4 justify-end">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{review.unhelpful}</span>
                <button className="text-gray-400 hover:text-gray-600">👎</button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{review.helpful}</span>
                <button className="text-gray-400 hover:text-gray-600">👍</button>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-sm text-gray-500">آیا این دیدگاه مفید بود؟</span>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Reviews Button */}
      <button className="w-full mt-6 py-3 border-2 border-red-600 text-red-600 font-bold rounded-lg hover:bg-red-50 transition">
        مشاهده تمام نظرات
      </button>
    </div>
  );
};

export default ProductReviewsTab;
