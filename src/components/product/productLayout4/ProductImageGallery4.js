'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import GalleryModal4 from './GalleryModal4';

const ProductImageGallery4 = ({ mainImage = '', galleryImages = [], title = '' }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [mobileSwiper, setMobileSwiper] = useState(null);

  const imageUrl = process.env.NEXT_PUBLIC_LIARA_IMAGE_URL || '';

  const images = useMemo(() => {
    const isAbsolute = (value) =>
      /^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(value) || /^(data:|blob:)/i.test(value);

    const joinUrl = (base, path) => {
      if (!path) return '';
      if (isAbsolute(path)) return path;
      if (!base) return path;
      const cleanBase = String(base).replace(/\/+$/, '');
      const cleanPath = String(path).replace(/^\/+/, '');
      return `${cleanBase}/${cleanPath}`;
    };

    const pickPath = (value) => {
      if (!value) return '';
      if (typeof value === 'string') return value;
      if (typeof value !== 'object') return '';
      return (
        value.url ||
        value.src ||
        value.path ||
        value.filePath ||
        value.image ||
        value.imageUrl ||
        value.location ||
        ''
      );
    };

    const result = [];
    const mainSrc = mainImage ? joinUrl(imageUrl, pickPath(mainImage)) : '';
    if (mainSrc) result.push(mainSrc);

    const gallery =
      Array.isArray(galleryImages)
        ? galleryImages
        : (galleryImages ? [galleryImages] : []);

    for (const img of gallery) {
      const src = joinUrl(imageUrl, pickPath(img));
      if (src && !result.includes(src)) result.push(src);
    }

    return result;
  }, [mainImage, galleryImages, imageUrl]);
  
  const openModal = (index) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const goToMobileSlide = (index) => {
    setSelectedImage(index);
    if (!mobileSwiper) return;
    if (images.length > 1) {
      mobileSwiper.slideToLoop(index);
      return;
    }
    mobileSwiper.slideTo(index);
  };

  const prevModal = useCallback(() => {
    if (images.length < 2) return;
    setModalIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const nextModal = useCallback(() => {
    if (images.length < 2) return;
    setModalIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  useEffect(() => {
    if (!isModalOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') prevModal();
      if (e.key === 'ArrowLeft') nextModal();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isModalOpen, prevModal, nextModal]);

  useEffect(() => {
    if (selectedImage >= images.length) setSelectedImage(0);
  }, [images.length, selectedImage]);

  return (
    <>
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
          onSwiper={setMobileSwiper}
          onSlideChange={(swiper) => setSelectedImage(swiper.realIndex)}
          className="rounded-xl overflow-hidden bg-gray-50 w-full aspect-square"
        >
          {images.length > 0 ? (
            images.map((img, i) => (
              <SwiperSlide key={i}>
                <div
                onClick={() => openModal(i)}
                className="relative w-full aspect-square cursor-pointer">
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

        {images.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 px-4">
            {images.map((img, index) => (
              <button
                key={`mobile-thumb-${index}`}
                onClick={() => goToMobileSlide(index)}
                className={`relative w-14 h-14 shrink-0 rounded-lg border-2 overflow-hidden transition-all ${
                  selectedImage === index
                    ? 'border-blue-500 shadow-sm'
                    : 'border-gray-200'
                }`}
              >
                <Image
                  src={img}
                  alt={`تصویر کوچک ${index + 1}`}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
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
                onClick={() => { setSelectedImage(index); openModal(index); }}
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

    {/* ── مودال گالری ── */}
    <GalleryModal4
      isOpen={isModalOpen}
      onClose={closeModal}
      images={images}
      modalIndex={modalIndex}
      setModalIndex={setModalIndex}
      title={title}
      prevModal={prevModal}
      nextModal={nextModal}
    />
    </>
  );
};

export default ProductImageGallery4;

