'use client'

import React from 'react'

/**
 * کامپوننت فوتر - استایل 1
 * @param {String} phone - شماره تماس
 * @param {String} hours - ساعات کاری
 * @param {String} address - آدرس دفتر مرکزی
 * @param {Array} columns - آرایه ستون‌های فوتر
 * @param {String} copyright - متن کپی‌رایت
 */
const Footer1 = ({
  phone = '۰۲۱ ۸۸۴۲۹۸۱',
  hours = '۸:۰۰ الی ۱۷:۰۰',
  address = 'تهران، شیراز شریفی بالاتر از مطهری پلاک ۷۱۱ واحد ۶',
  columns = [
    {
      title: 'درباره زردکوه',
      links: [
        { text: 'درباره ما', href: '#about' },
        { text: 'تماس با زردکوه', href: '#contact' },
        { text: 'سوالات متداول', href: '#faq' },
        { text: 'همکاری با زردکوه', href: '#collaboration' }
      ]
    },
    {
      title: 'صفحه نخست',
      links: [
        { text: 'صفحه نخست', href: '#home' },
        { text: 'رویه انجام سفارش', href: '#shipping' },
        { text: 'رویه بازگشت کالا', href: '#return' },
        { text: 'شرایط استفاده', href: '#terms' }
      ]
    },
    {
      title: 'خدمات',
      links: [
        { text: 'خدمات فروش و پس فروش', href: '#services' },
        { text: 'خدمات قرض و پس از قرض', href: '#credit' },
        { text: 'کودکی در جهت آسایش و رضایت', href: '#kids' },
        { text: 'لطفا شماره موبایل خود را وارد کنید', href: '#phone' }
      ]
    }
  ],
  copyright = 'استفاده از محتوای این سایت برای مقاصد تجاری و غیرتجاری و ذکر منبع بلامانع است. کلیه حقوق این سایت متعلق به شرکت ای‌تی برای تجارت چهانین می‌رسد.'
}) => {
  // تابع کمکی برای تبدیل URL تصویر
  const getImageUrl = (imagePath) => {
    if (!imagePath) return ''
    if (imagePath.startsWith('http')) return imagePath
    return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${imagePath}`
  }

  const contactItems = [
    { label: 'شماره تماس', value: phone, icon: '📍' },
    { label: 'ساعات کاری', value: hours, icon: '🕐' },
    { label: 'دفتر مرکزی', value: address, icon: '🏢' }
  ]

  return (
    <footer className="dana bg-gray-50 border-t border-gray-300 py-10 px-5 md:py-14 md:px-8 rtl font-dana" dir="rtl">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10 mb-8">
        {/* Contact Info Section */}
        <div className="flex flex-col gap-6 md:col-span-1 lg:col-span-1">
          {contactItems.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-400 rounded-full shrink-0 text-lg">
                {item.icon}
              </div>
              <div>
                <h4 className="m-0 text-sm font-semibold text-gray-800 mb-1">{item.label}</h4>
                <p className="m-0 text-xs text-gray-600 leading-relaxed">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Links Sections */}
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col">
            <h5 className="m-0 text-sm md:text-base font-bold text-gray-800 mb-3">{column.title}</h5>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              {column.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a 
                    href={link.href} 
                    className="text-xs md:text-sm text-gray-600 no-underline transition-colors duration-300 hover:text-yellow-500"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="max-w-6xl mx-auto pt-5 md:pt-7 border-t border-gray-300 text-center">
        <p className="m-0 text-gray-500 text-xs md:text-sm leading-relaxed">
          {copyright}
        </p>
      </div>
    </footer>
  )
}

export default Footer1