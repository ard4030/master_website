'use client';
import React, { useState, useContext } from 'react';
import ProductOptions4 from './ProductOptions4';
import ProductPrice4 from './ProductPrice4';
import ProductImageGallery4 from './ProductImageGallery4';
import ProductCategory from './ProductCategory';
import { FiShare2, FiHeart, FiPlus, FiTrash2, FiMinus } from 'react-icons/fi';
import { IoBarChartOutline } from 'react-icons/io5';
import { CartContext } from '@/context/CartContext';
import { isCart } from '@/utils/functions';

const ProductLayout4 = ({ idPage, product }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [matchVariant, setMatchVariant] = useState(null);
  const { addToCart, cart, increaseQuantity, decreaseQuantity, loading } = useContext(CartContext);

  const description = product?.description || product?.shortDescription || '';

  const price = matchVariant?.price || 0;
  const compareAtPrice = matchVariant?.compareAtPrice || product?.compareAtPrice || 0;
  const discountPercent =
    compareAtPrice > 0 && price > 0
      ? Math.round((1 - price / compareAtPrice) * 100)
      : 0;

      // بعدا داینامیک باید بگیریم
  const attributesProducts = [
    { label: 'پردازنده', value: 'اگزینوس ۲۴۰۰ (۴ نانومتری)' },
    { label: 'ظرفیت حافظه داخلی', value: '۲۵۶ گیگابایت' },
    { label: 'حافظه رم', value: '۸ گیگابایت' },
    { label: 'ظرفیت باتری', value: '۴۹۰۰ میلی آمپر' },
    { label: 'کیفیت دوربین اصلی', value: '۵۰ مگاپیکسل' },
    { label: 'فناوری صفحه نمایش', value: 'Dynamic LTPO AMOLED 2X' },
    { label: 'سیستم عامل', value: 'Android 14' },
    { label: 'ابعاد', value: '۱۴۷.۰ × ۷۰.۶ × ۷.۶ میلیمتر' },
  ]

  const cartItem =
    !loading && matchVariant
      ? isCart({
          productId: product._id,
          variantId: matchVariant?._id,
          isVariants: product?.isVariants,
          items: cart?.items,
        })
      : null;

  /* ── محتوای مشترک بین موبایل و دسکتاپ ── */
  const sharedOptions = (
    <ProductOptions4
      product={product}
      isVariants={product?.isVariants}
      variants={product?.variants}
      variantsFull={product?.variantsFull}
      onMatchVariantChange={setMatchVariant}
    />
  );

  const sharedMeta = (
    <>
      <ProductCategory categories={product?.category} />
      {product?.tags?.length > 0 && (
        <div className="text-sm danaMed text-gray-600">
          <span>برچسب‌ها: </span>
          {product.tags.map((tag, i) => (
            <span key={i} className="text-blue-500 cursor-pointer hover:underline ml-2">
              {tag}
            </span>
          ))}
        </div>
      )}
    </>
  );

  const sharedDescription = description && (
    <div className="border-t pt-5 mt-1">
      <h2 className="text-sm danaBold text-gray-900 mb-2">توضیحات</h2>
      <div
        className={`text-gray-700 danaMed leading-7 text-sm transition-all ${
          !showFullDesc ? 'line-clamp-3' : ''
        }`}
      >
        {description}
      </div>
      <button
        onClick={() => setShowFullDesc((p) => !p)}
        className="text-blue-500 danaMed text-sm mt-1"
      >
        {showFullDesc ? 'نمایش کمتر ▲' : 'نمایش بیشتر ▼'}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dana" dir="rtl">

      {/* ══════════════ موبایل ══════════════ */}
      <div className="md:hidden">
        {/* تصویر - sticky زیر همه لایه‌ها */}
        <div className="sticky top-0 z-0 bg-gray-50 h-72">
          <ProductImageGallery4
            mainImage={product?.mainImage || ''}
            galleryImages={product?.galleryImages || []}
          />
        </div>

        {/* کارت محتوا - روی تصویر اسکرول می‌شود */}
        <div className="relative z-10 bg-white rounded-t-3xl -mt-6 pb-32 px-4 pt-5 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
          {/* نوار فروش ویژه */}
          <div className="flex justify-end border-b border-blue-100 pb-2 mb-3">
            <span className="text-blue-600 danaMed text-sm">فروش ویژه</span>
          </div>

          {/* آیکون‌ها */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-3 text-gray-500">
              <button><FiHeart size={20} /></button>
              <button><FiShare2 size={20} /></button>
            </div>
            {product?.brand && (
              <span className="text-sm danaMed text-gray-500 border-b border-gray-400 pb-0.5">
                {product.brand}
              </span>
            )}
          </div>

          {/* نام محصول */}
          <h1 className="text-sm danaBold text-gray-900 leading-7 mb-4">
            {product?.name || 'نام محصول'}
          </h1>

          {sharedOptions}
          <div className="mt-3 flex flex-col gap-2">{sharedMeta}</div>
          {sharedDescription}
        </div>
      </div>

      {/* ══════ نوار پایین ثابت - فقط موبایل ══════ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-9999 bg-white border-t border-gray-200 px-4 py-3 grid grid-cols-12 gap-2 items-center" style={{ boxShadow: '0 -2px 12px rgba(0,0,0,0.10)' }}>
        {/* قیمت */}
        <div className="col-span-4 flex flex-col items-end">
          {discountPercent > 0 && (
            <span className="text-xs text-gray-400 line-through danaMed">
              {Math.floor(compareAtPrice).toLocaleString('fa-IR')}
            </span>
          )}
          <span className="text-sm danaBold text-gray-900">
            {matchVariant ? `${Math.floor(price).toLocaleString('fa-IR')} تومان` : '---'}
          </span>
        </div>

        {/* دکمه / کانتر */}
        <div className="col-span-8">
          {!matchVariant ? (
            <button disabled className="w-full bg-gray-300 text-white py-3 rounded-xl danaMed text-sm cursor-not-allowed">
              انتخاب گزینه
            </button>
          ) : loading ? (
            <button disabled className="w-full bg-blue-300 text-white py-3 rounded-xl danaMed text-sm">
              ...
            </button>
          ) : cartItem ? (
            <div className="flex items-center gap-1">
              <button
                onClick={() => decreaseQuantity(cartItem.productId, cartItem.variantId)}
                className="w-11 h-11 flex items-center justify-center border border-red-300 rounded-xl text-red-500"
              >
                {cartItem.quantity > 1 ? <FiMinus size={17} /> : <FiTrash2 size={16} />}
              </button>
              <span className="flex-1 h-11 flex items-center justify-center border border-gray-300 rounded-xl danaMed text-gray-900">
                {cartItem.quantity}
              </span>
              <button
                onClick={() => increaseQuantity(cartItem.productId, cartItem.variantId)}
                className="w-11 h-11 flex items-center justify-center border border-gray-300 rounded-xl text-gray-700"
              >
                <FiPlus size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() =>
                addToCart({
                  _id: product._id,
                  isVariants: product?.isVariants,
                  variantId: matchVariant?._id || null,
                })
              }
              className="w-full bg-blue-600 text-white py-3 rounded-xl danaMed text-sm hover:bg-blue-700 transition"
            >
              افزودن به سبد
            </button>
          )}
        </div>
      </div>

      {/* ══════════════ دسکتاپ ══════════════ */}
      <div className="hidden md:block">
        <div className="bg-pink-50 border-b border-pink-100 px-6 py-2 text-center">
          <span className="text-pink-600 danaMed text-sm">پیشنهاد شکفت‌انگیز</span>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-cols-12 gap-3 mb-8">
            {/* ستون اول: گالری */}
            <div className="col-span-5">
              <ProductImageGallery4
                mainImage={product?.mainImage || ''}
                galleryImages={product?.galleryImages || []}
              />
            </div>

            {/* ستون دوم: اطلاعات */}
            <div className="col-span-4 flex flex-col gap-3">
              <div className="flex justify-start gap-2">
                <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:border-gray-400 transition">
                  <FiShare2 size={18} />
                </button> 
                <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:border-gray-400 transition">
                  <IoBarChartOutline size={18} />
                </button>
              </div>
              <h1 className="text-base danaBold text-gray-900 leading-8">
                {product?.name || 'نام محصول'}
              </h1>
              {sharedOptions}
              {sharedMeta}

              {attributesProducts?.length > 0 && (
                <div className="border-t pt-3 mt-1">
                  <h2 className="text-sm danaBold text-gray-900 mb-3">مشخصات</h2>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {attributesProducts.map((attr, idx) => (
                      <div key={idx} className="flex flex-col gap-1 bg-neutral-50 rounded-md p-2">
                        <span className="text-[10px] text-gray-400 danaMed">{attr.label}</span>
                        <span className="text-xs danaMed text-gray-800">{attr.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ستون سوم: قیمت sticky */}
            <div className="col-span-3 self-start sticky top-4">
              <ProductPrice4
                product={product}
                matchVariant={matchVariant}
                isVariants={product?.isVariants}
              />
            </div>
          </div>

          {/* توضیحات */}
          {description && (
            <div className="border-t pt-6 mb-8">
              <h2 className="text-base danaBold text-gray-900 mb-3">توضیحات</h2>
              <div
                className={`text-gray-700 danaMed leading-8 text-sm transition-all ${
                  !showFullDesc ? 'line-clamp-3' : ''
                }`}
              >
                {description}
              </div>
              <button
                onClick={() => setShowFullDesc((p) => !p)}
                className="text-blue-500 danaMed text-sm mt-2 flex items-center gap-1"
              >
                {showFullDesc ? 'نمایش کمتر ▲' : 'نمایش بیشتر ▼'}
              </button>
            </div>
          )}

          {/* نظرات */}
          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base danaBold text-gray-900">نظرات</h2>
              <button className="text-blue-500 danaMed text-sm border border-blue-400 rounded-lg px-3 py-1 hover:bg-blue-50 transition">
                افزودن نظر
              </button>
            </div>
            <p className="text-sm text-gray-500 danaMed text-center py-2">
              شما هم درباره این محصول نظر خود را بنویسید.
            </p>
            <p className="text-xs text-gray-400 danaMed text-center">
              برای ثبت نظر، لازم است ابتدا وارد حساب کاربری خود شوید.
            </p>
            <div className="flex justify-center mt-4">
              <button className="border border-gray-300 rounded-lg px-8 py-2 text-sm danaMed text-gray-700 hover:border-gray-400 transition">
                افزودن نظر
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProductLayout4;
