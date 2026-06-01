'use client';
import React, { useState, useContext } from 'react';
import ProductOptions4 from './ProductOptions4';
import ProductPrice4 from './ProductPrice4';
import ProductImageGallery4 from './ProductImageGallery4';
import ProductCategory from './ProductCategory';
import ProductAttributes4 from './ProductAttributes4';
import { FiShare2, FiHeart, FiPlus, FiTrash2, FiMinus, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { IoBarChartOutline } from 'react-icons/io5';
import { CartContext } from '@/context/CartContext';
import { isCart } from '@/utils/functions';
import InfoBox from '@/components/global/other/InfoBox';
import ReviewModal4 from './ReviewModal4';
import BroadCromp from '@/components/global/broadCromp/BroadCromp';
import CircularProgress from '@mui/material/CircularProgress';
import ContinueShopping from '@/components/global/continueShopping/CotinueShopping';

const ProductLayout4 = ({ idPage, product }) => {
  console.log(product);
  const openCart = true;

  // این مقدار بعدا از سرور میاد
  const activeOpenSide = true;

  
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [matchVariant, setMatchVariant] = useState(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [mobileAddLoading, setMobileAddLoading] = useState(false);
  const [openContinueModal, setOpenContinueModal] = useState(false);
  const { addToCart, cart, increaseQuantity, decreaseQuantity, loading } = useContext(CartContext);

  const description = product?.description || product?.shortDescription || '';
  const categoryLabel =
    Array.isArray(product?.category)
      ? (typeof product.category[0] === 'string'
          ? product.category[0]
          : product.category[0]?.name || product.category[0]?.title)
      : (typeof product?.category === 'string'
          ? product.category
          : product?.category?.name || product?.category?.title);

  const breadcrumbItems = [
    { label: 'خانه', href: '/' },
    ...(categoryLabel ? [{ label: categoryLabel, href: '/product' }] : []),
    { label: product?.name || 'جزئیات محصول' },
  ];
  const hasGalleryImages = Array.isArray(product?.galleryImages) && product.galleryImages.length > 0;

  const price = matchVariant?.price || 0;
  const compareAtPrice = matchVariant?.compareAtPrice || product?.compareAtPrice || 0;
  const discountPercent =
    compareAtPrice > 0 && price > 0
      ? Math.round((1 - price / compareAtPrice) * 100)
      : 0;

      // بعدا داینامیک باید بگیریم
  const attributesProducts = {
    category: 'مشخصات فنی',
    items: [
      { name: 'پردازنده', value: 'اگزینوس ۲۴۰۰ (۴ نانومتری)', high: true },
      { name: 'ظرفیت حافظه داخلی', value: '۲۵۶ گیگابایت', high: true },
      { name: 'حافظه رم', value: '۸ گیگابایت', high: true },
      { name: 'ظرفیت باتری', value: '۴۹۰۰ میلی آمپر', high: true },
      { name: 'کیفیت دوربین اصلی', value: '۵۰ مگاپیکسل', high: false },
      { name: 'فناوری صفحه نمایش', value: 'Dynamic LTPO AMOLED 2X', high: false },
      { name: 'سیستم عامل', value: 'Android 14', high: false },
      { name: 'ابعاد', value: '۱۴۷.۰ × ۷۰.۶ × ۷.۶ میلیمتر', high: false },
    ],
  }

  const cartItem =
    !loading && matchVariant
      ? isCart({
          productId: product._id,
          variantId: matchVariant?._id,
          isVariants: product?.isVariants,
          items: cart?.items,
        })
      : null;

  const openContinueIfEnabled = () => {
    if (!activeOpenSide) return;
    setOpenContinueModal(true);
  };

  const handleMobileAddToCart = async () => {
    if (mobileAddLoading || !matchVariant) return;
    try {
      setMobileAddLoading(true);
      await addToCart({
        _id: product._id,
        isVariants: product?.isVariants,
        variantId: matchVariant?._id || null,
      });
      openContinueIfEnabled();
    } finally {
      setMobileAddLoading(false);
    }
  };

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
        className="text-blue-500 danaMed text-sm mt-1 flex items-center gap-1"
      >
        {showFullDesc ? (
          <><FiChevronUp size={14} /> نمایش کمتر</>
        ) : (
          <><FiChevronDown size={14} /> نمایش بیشتر</>
        )}
      </button>
    </div>
  );



  return (
    <div className="min-h-screen bg-white dana" dir="rtl">
      <div className="bg-pink-50 border-b border-pink-100 px-4 md:px-6 py-2 text-center">
        <span className="text-pink-600 danaMed text-sm">پیشنهاد شگفت‌انگیز</span>
      </div>

      <ContinueShopping
        open={openContinueModal}
        onClose={() => setOpenContinueModal(false)}
        productList={cart?.items || []}
      />


      <div className="max-w-6xl mx-auto p-4 ">
        <BroadCromp items={breadcrumbItems} />
      </div>


      {/* ══════════════ موبایل ══════════════ */}
      <div className="md:hidden">
        {/* تصویر - sticky زیر همه لایه‌ها */}
        <div className="sticky top-0 z-0 bg-gray-50">
          <ProductImageGallery4
            mainImage={product?.mainImage || ''}
            galleryImages={product?.galleryImages || []}
          />
        </div>

        {/* کارت محتوا - روی تصویر اسکرول می‌شود */}
        <div className={`relative z-10 bg-white rounded-t-3xl pb-32 px-4 pt-5 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] ${
          hasGalleryImages ? 'mt-2' : '-mt-6'
        }`}>
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
              {product?.specifications?.length > 0 && 
                product?.specifications.map((spec, idx) => (
                <ProductAttributes4
                  key={idx}
                  category={spec.category}
                  items={spec.items}
                  highOnly
                />
              ))
              }
          {sharedDescription}

          {/* مشخصات فنی کامل */}
          {product?.specifications?.length > 0 && (
            <div className="border-t pt-5 mt-1">
              {product.specifications.map((spec, idx) => (
                <ProductAttributes4
                  key={idx}
                  category={spec.category}
                  items={spec.items}
                />
              ))}
            </div>
          )}

          {/* نظرات */}
          <div className="border-t pt-5 mt-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm danaBold text-gray-900">نظرات</h2>
              <button
                onClick={() => setReviewOpen(true)}
                className="text-blue-500 danaMed text-sm border border-blue-400 rounded-lg px-3 py-1 hover:bg-blue-50 transition"
              >
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
              <button
                onClick={() => setReviewOpen(true)}
                className="border border-gray-300 rounded-lg px-8 py-2 text-sm danaMed text-gray-700 hover:border-gray-400 transition"
              >
                افزودن نظر
              </button>
            </div>
          </div>

          <ReviewModal4
            isOpen={reviewOpen}
            onClose={() => setReviewOpen(false)}
            product={product}
          />
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
              onClick={handleMobileAddToCart}
              disabled={mobileAddLoading}
              className="w-full bg-[#0084ff] text-white py-3 rounded-xl danaMed text-sm hover:bg-blue-700 transition disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {mobileAddLoading ? (
                <CircularProgress size={20} thickness={4.5} sx={{ color: '#ffffff' }} />
              ) : (
                'افزودن به سبد'
              )}
            </button>
          )}
        </div>
      </div>

      {/* ══════════════ دسکتاپ ══════════════ */}
      <div className="hidden md:block">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-cols-12 gap-3 mb-8">
            {/* ستون اول: گالری */}
            <div className="col-span-5 relative">
              <ProductImageGallery4
                mainImage={product?.mainImage || ''}
                galleryImages={product?.galleryImages || []}
              />
              {/* آیکون‌های overlay روی گالری */}
              <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-10">
                <button className="w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg text-gray-500 hover:border-gray-400 hover:bg-white transition shadow-sm">
                  <FiShare2 size={16} />
                </button>
                <button className="w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg text-gray-500 hover:border-gray-400 hover:bg-white transition shadow-sm">
                  <IoBarChartOutline size={16} />
                </button>
              </div>
              <InfoBox text="لطفاً هنگام دریافت سفارش، از لحظه باز کردن بسته‌بندی تا نمایش کامل کالا، به‌صورت پیوسته فیلم‌برداری کنید. این ویدئو تنها مدرک قابل استناد برای بررسی هرگونه ایراد، آسیب یا مغایرت احتمالی است و ارائه آن الزامی می‌باشد." />
            </div>

            {/* ستون دوم: اطلاعات */}
            <div className="col-span-4 flex flex-col gap-3">
              {product?.brand && (
                <span className="text-sm danaMed text-gray-500 border-b border-gray-200 pb-2">
                  {product.brand}
                </span>
              )}              
              <h1 className="text-lg danaBold text-gray-900 leading-8">
                {product?.name || 'نام محصول'}
              </h1>
              {sharedOptions}
              {sharedMeta}

              {product?.specifications?.length > 0 && 
                product?.specifications.map((spec, idx) => (
                <ProductAttributes4
                  key={idx}
                  category={spec.category}
                  items={spec.items}
                  highOnly
                />
              ))
              }
            </div>

            {/* ستون سوم: قیمت sticky */}
            <div className="col-span-3 self-start sticky top-4">
              <ProductPrice4
                product={product}
                matchVariant={matchVariant}
                isVariants={product?.isVariants}
                onAddSuccess={openContinueIfEnabled}
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
                {showFullDesc ? (
                  <><FiChevronUp size={14} /> نمایش کمتر</>
                ) : (
                  <><FiChevronDown size={14} /> نمایش بیشتر</>
                )}
              </button>
            </div>
          )}

          {/* مشخصات فنی (در صورت وجود) */}
          {product?.specifications?.length > 0 && 
            product?.specifications.map((spec, idx) => (
              <ProductAttributes4
                key={idx}
                category={spec.category}
                items={spec.items}
                
              />
            ))
          }

          {/* نظرات */}
          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base danaBold text-gray-900">نظرات</h2>
              <button
                onClick={() => setReviewOpen(true)}
                className="text-blue-500 danaMed text-sm border border-blue-400 rounded-lg px-3 py-1 hover:bg-blue-50 transition"
              >
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
              <button
                onClick={() => setReviewOpen(true)}
                className="border border-gray-300 rounded-lg px-8 py-2 text-sm danaMed text-gray-700 hover:border-gray-400 transition"
              >
                افزودن نظر
              </button>
            </div>
          </div>

          <ReviewModal4
            isOpen={reviewOpen}
            onClose={() => setReviewOpen(false)}
            product={product}
          />
        </div>
      </div>

    </div>
  );
};

export default ProductLayout4;
