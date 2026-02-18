'use client';
import React from 'react';
import { FiTruck, FiRotateCcw, FiShield, FiHeadphones } from 'react-icons/fi';

const ShippingInfo = ({ features }) => {
  const defaultFeatures = [
    { title: 'ارسال رایگان', description: 'بر روی سفارش های بالای 500 هزار', icon: <FiTruck className='text-2xl' /> },
    { title: 'بازگرداندن کالا', description: 'تا 30 روز', icon: <FiRotateCcw className='text-2xl' /> },
    { title: 'گارانتی اصالت', description: 'کالاهای اصل 100%', icon: <FiShield className='text-2xl' /> },
    { title: 'پشتیبانی 24 ساعته', description: 'راهنمایی و پاسخگویی', icon: <FiHeadphones className='text-2xl' /> },
  ];

  const displayFeatures = features && features.length > 0 ? features : defaultFeatures;

  return (
    <div className='bg-white p-4 rounded-2xl border border-gray-200'>
      <h3 className='font-bold text-sm mb-4 pb-3 border-b border-gray-200'>شرایط و نحوه ارسال</h3>
      <div className='grid grid-cols-2 gap-3'>
        {displayFeatures.map((feature, idx) => (
          <div key={idx} className='flex gap-3'>
            <div className='text-gray-600'>
              {feature.icon || <span className='text-2xl'>{feature.iconEmoji}</span>}
            </div>
            <div>
              <p className='text-xs text-gray-600'>{feature.title}</p>
              <p className='text-xs font-semibold text-gray-800'>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShippingInfo;
