'use client';
import React, { useState } from 'react';

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'توضیحات' },
    { id: 'reviews', label: 'نظرات' },
    { id: 'company', label: 'شرکت' },
    { id: 'guide', label: 'راهنمای استفاده' }
  ];

  return (
    <div className="dana" dir="rtl">
      {/* Tab Navigation */}
      <div className="flex gap-8 border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 font-semibold transition danaMed ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'description' && (
          <div className="space-y-4 danaMed text-gray-700 leading-relaxed">
            <p>
              این محصول با کیفیت عالی و طراحی مدرن ساخته شده است. مناسب برای کسانی که به دنبال دستگاهی قدرتمند و قابل اعتماد می‌باشند. این محصول دارای ویژگی‌های بسیاری است که باعث می‌شود به یکی از بهترین انتخاب‌ها تبدیل شود.
            </p>
            <p>
              قیمت آن نسبت به بازار قیمت رقابتی دارد و کیفیت نیز از مظنه بیشتر است. فروشنده این محصول بسیار قابل اعتماد و سریع در ارسال است.
            </p>
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">حجم حافظه</span>
                <span className="text-gray-700">128 گیگابایت</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">نوع ماده</span>
                <span className="text-gray-700">پلاستیک و فلزی</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">وضوح صفحه</span>
                <span className="text-gray-700">720 x اینچ</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4 danaMed">
            <p className="text-gray-700">محتوای نظرات در اینجا نمایش داده خواهد شد</p>
          </div>
        )}

        {activeTab === 'company' && (
          <div className="space-y-4 danaMed">
            <p className="text-gray-700">اطلاعات شرکت در اینجا نمایش داده خواهد شد</p>
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="space-y-4 danaMed">
            <p className="text-gray-700">راهنمای استفاده در اینجا نمایش داده خواهد شد</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
