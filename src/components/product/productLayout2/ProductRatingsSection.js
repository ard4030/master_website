'use client';
import React from 'react';

const ProductRatingsSection = ({ ratingAverage = 4.5, reviewCount = 0, reviews = [] }) => {
  const defaultReviews = [
    {
      author: 'خریدار رضایت‌مند',
      rating: 5,
      date: '13 مهر 1403',
      comment: 'محصول بسیار عالی و با کیفیت بالا است. بسته‌بندی مناسب و ارسال سریع بود. خیلی راضی هستم از این خرید.'
    }
  ];

  const reviewList = reviews && reviews.length > 0 ? reviews : defaultReviews;
  const ratingBreakdown = [5, 4, 3, 2, 1].map((rating, index) => ({
    rating,
    count: Math.ceil(reviewCount * (index === 0 ? 0.6 : 0.1))
  }));

  return (
    <div className="mt-12 pt-8 border-t dana">
      <h2 className="text-2xl font-bold mb-8 danaBold">امتیازات و نظرات</h2>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* صفحه سمت چپ - خلاصه امتیازات */}
        <div className="flex items-start gap-8">
          <div className="text-center">
            <div className="text-6xl font-bold text-gray-900 danaBold">{ratingAverage}</div>
            <div className="text-sm text-gray-600 mt-2 danaMed">/5</div>
            <div className="flex gap-1 justify-center mt-2">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${
                    i < Math.round(ratingAverage) ? '⭐' : '☆'
                  }`}
                />
              ))}
            </div>
            <div className="text-xs text-gray-500 mt-2 danaMed">
              ({reviewCount || 50} نظر جدید)
            </div>
          </div>

          {/* نمودار امتیازات */}
          <div className="flex-1 space-y-2">
            {ratingBreakdown.map(({ rating, count }) => (
              <div key={rating} className="flex items-center gap-2 danaMed">
                <span className="text-sm text-gray-600 w-8">⭐ {rating}</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{
                      width: `${Math.max(
                        20,
                        (count / Math.max(...ratingBreakdown.map(r => r.count))) *
                          100
                      )}%`
                    }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* صفحه سمت راست - نظرات */}
        <div className="space-y-4">
          {reviewList.slice(0, 3).map((review, index) => (
            <div key={index} className="border-b pb-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-gray-900 danaMed">{review.author}</p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < review.rating ? '⭐' : '☆'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500 danaReg">{review.date}</span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-3 danaReg">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductRatingsSection;
