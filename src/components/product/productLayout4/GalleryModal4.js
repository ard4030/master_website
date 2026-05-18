'use client';
import React from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import ModalLayout from '@/components/global/ModalLayout/ModalLayout';
import AnimLayout from '@/components/global/animationLayout/AnimLayout';

const GalleryModal4 = ({
  isOpen,
  onClose,
  images = [],
  modalIndex,
  setModalIndex,
  title = '',
  prevModal,
  nextModal,
}) => {
  return (
    <ModalLayout isOpen={isOpen} handleClose={onClose} widthModal={900} heightModal={600}>
      <AnimLayout type="fade" className="h-full">
        <div
          className="bg-white w-full h-full flex flex-col rounded-xl overflow-hidden dana"
          dir="rtl"
        >
          {/* هدر */}
          <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100">
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 transition"
            >
              <FiX size={20} />
            </button>
            <h2 className="danaMed text-base text-gray-800">تصاویر رسمی</h2>
          </div>

          {/* تب */}
          <div className="flex justify-end px-5 border-b border-gray-100">
            <span className="text-sm text-blue-600 border-b-2 border-blue-600 pb-2 danaMed cursor-default">
              تصاویر
            </span>
          </div>

          {/* بدنه */}
          <div className="flex flex-col sm:flex-row flex-1 overflow-hidden min-h-0">
            {/* تصویر اصلی */}
            <div className="relative flex items-center justify-center bg-gray-50 p-4 h-56 sm:h-auto sm:flex-1 shrink-0 sm:shrink">
              {images.length > 0 && (
                <div className="relative w-full h-full max-w-sm">
                  <Image
                    src={images[modalIndex]}
                    alt={`تصویر ${modalIndex + 1}`}
                    fill
                    sizes="(max-width:640px) 90vw, 50vw"
                    className="object-contain"
                    priority
                  />
                </div>
              )}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevModal}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow flex items-center justify-center text-gray-700 hover:bg-gray-100 transition"
                  >
                    <FiChevronRight size={20} />
                  </button>
                  <button
                    onClick={nextModal}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow flex items-center justify-center text-gray-700 hover:bg-gray-100 transition"
                  >
                    <FiChevronLeft size={20} />
                  </button>
                </>
              )}
            </div>

            {/* پنل تامبنیل‌ها */}
            {/* موبایل: نوار افقی اسکرول‌پذیر | دسکتاپ: پنل عمودی کنار */}
            <div className="sm:w-72 flex flex-col border-t sm:border-t-0 sm:border-r border-gray-100 shrink-0">
              {title && (
                <p className="hidden sm:block text-sm danaMed text-gray-700 px-4 py-3 border-b border-gray-100 text-right leading-6">
                  {title}
                </p>
              )}
              {/* موبایل: ردیف افقی */}
              <div className="flex sm:hidden overflow-x-auto gap-2 p-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setModalIndex(index)}
                    className={`relative w-16 h-16 rounded-lg border-2 overflow-hidden shrink-0 transition-all ${
                      modalIndex === index
                        ? 'border-blue-500 shadow-sm'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`تصویر ${index + 1}`}
                      fill
                      sizes="64px"
                      className="object-contain bg-white"
                    />
                  </button>
                ))}
              </div>
              {/* دسکتاپ: گرید عمودی */}
              <div className="hidden sm:grid overflow-y-auto p-3 grid-cols-4 gap-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setModalIndex(index)}
                    className={`relative aspect-square rounded-lg border-2 overflow-hidden transition-all ${
                      modalIndex === index
                        ? 'border-blue-500 shadow-sm'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`تصویر ${index + 1}`}
                      fill
                      sizes="80px"
                      className="object-contain bg-white"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimLayout>
    </ModalLayout>
  );
};

export default GalleryModal4;
