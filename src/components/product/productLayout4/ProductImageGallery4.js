'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ProductImageGallery4 = ({ mainImage = '', galleryImages = [] }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const imageUrl = process.env.NEXT_PUBLIC_LIARA_IMAGE_URL || '';

  const images =
    galleryImages && galleryImages.length > 0
      ? galleryImages.map((img) => `${imageUrl}${img}`)
      : mainImage
      ? [`${imageUrl}${mainImage}`]
      : [];

  return (
    <div className="flex flex-col gap-3 dana" dir="rtl">

      {/* ── موبایل: Swiper ── */}
      <div className="md:hidden relative">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: '.swiper-prev-4',
            nextEl: '.swiper-next-4',
          }}
          pagination={{ clickable: true }}
          loop={images.length > 1}
          className="rounded-xl overflow-hidden bg-gray-50 w-full aspect-square"
        >
          {images.length > 0 ? (
            images.map((img, i) => (
              <SwiperSlide key={i}>
                <div className="relative w-full aspect-square">
                  <Image
                    src={img}
                    alt={`تصویر ${i + 1}`}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority={i === 0}
                  />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="w-full aspect-square flex items-center justify-center bg-gray-50">
                <span className="text-gray-400 danaMed text-sm">تصویری موجود نیست</span>
              </div>
            </SwiperSlide>
          )}
        </Swiper>

        {/* دکمه‌های ناوبری */}
        {images.length > 1 && (
          <>
            <button className="swiper-prev-4 absolute top-1/2 right-2 -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-gray-700 hover:bg-white transition">
              <FiChevronRight size={18} />
            </button>
            <button className="swiper-next-4 absolute top-1/2 left-2 -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-gray-700 hover:bg-white transition">
              <FiChevronLeft size={18} />
            </button>
          </>
        )}
      </div>

      {/* ── دسکتاپ: گالری با تامبنیل ── */}
      <div className="hidden md:flex flex-col gap-3">
        <div className="relative border border-gray-200 rounded-xl overflow-hidden bg-gray-50 w-full aspect-square sm:aspect-4/3">
          {images.length > 0 ? (
            <Image
              src={images[selectedImage] ?? images[0]}
              alt="تصویر محصول"
              fill
              sizes="50vw"
              className="object-contain"
              priority
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400 danaMed text-sm">
              تصویری موجود نیست
            </div>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 justify-end flex-wrap">
            {images.slice(0, 5).map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
                  selectedImage === index
                    ? 'border-blue-500 shadow-sm'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <Image
                  src={img}
                  alt={`تصویر ${index + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default ProductImageGallery4;
