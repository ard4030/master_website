'use client';
import React, { useState, useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import { isCart } from '@/utils/functions';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { BsShieldCheck } from 'react-icons/bs';
import Link from 'next/link';

// داده استاتیک بیمه - بعداً از product می‌آید
const staticInsurance = {
  title: 'بیمه محصول',
  price: 1999000,
  detailsUrl: '#',
};

const ProductPrice4 = ({ product, matchVariant, isVariants }) => {
  const { addToCart, cart, increaseQuantity, decreaseQuantity, loading } = useContext(CartContext);
  const [insuranceAdded, setInsuranceAdded] = useState(false);

  // بعداً از product.insurance می‌آید
  const insurance = product?.insurance || staticInsurance;

  const price = matchVariant?.price || 0;
  const compareAtPrice = matchVariant?.compareAtPrice || product?.compareAtPrice || 0;
  const discountPercent =
    compareAtPrice > 0 && price > 0
      ? Math.round((1 - price / compareAtPrice) * 100)
      : 0;

  const cartItem =
    !loading && matchVariant
      ? isCart({
          productId: product._id,
          variantId: matchVariant?._id,
          isVariants,
          items: cart?.items,
        })
      : null;

  return (
    <div className="border border-gray-200 bg-neutral-50 rounded-xl p-4 flex flex-col gap-4shadow-xs">
      {/* قیمت */}
      <div className="flex flex-col gap-1">
        {discountPercent > 0 && (
          <div className="flex items-center gap-2">
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded danaMed">
              {discountPercent}%
            </span>
            <span className="text-gray-400 line-through danaMed text-sm">
              {Math.floor(compareAtPrice).toLocaleString('fa-IR')} تومان
            </span>
          </div>
        )}
        <div className="text-xl danaMed text-gray-900">
          {matchVariant ? (
            <>
              {Math.floor(price).toLocaleString('fa-IR')}
              <span className="text-xs danaMed text-gray-500 mr-1">تومان</span>
            </>
          ) : (
            <span className="text-sm danaMed text-gray-400">لطفاً گزینه‌ها را انتخاب کنید</span>
          )}
        </div>
      </div>

      {/* موجودی */}
      {matchVariant && (
        <div className="flex justify-between items-center text-xs border-t pt-3 border-gray-200">
          <span className="text-gray-600 danaMed">موجودی:</span>
          <span
            className={`danaMed ${
              matchVariant.stockQuantity > 0 ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {matchVariant.stockQuantity > 0
              ? ` موجود (${matchVariant.stockQuantity} عدد)`
              : ' ناموجود'}
          </span>
        </div>
      )}

      {/* بیمه */}
      {insurance && (
        <div className="border border-gray-200 rounded-xl overflow-hidden text-sm danaMed">
          {insuranceAdded ? (
            <>
              <div className="flex items-center justify-between px-3 py-2 bg-white border-b border-gray-100">
                <Link href={insurance.detailsUrl} className="flex items-center gap-1 text-gray-500 text-xs">
                  جزئیات
                  <span className="text-gray-400">‹</span>
                </Link>
                <div className="flex items-center gap-1.5 text-green-600">
                  <span className="text-xs">بیمه به کالا اضافه شد</span>
                  <BsShieldCheck size={16} />
                </div>
              </div>
              <div className="flex items-center justify-between px-3 py-2 bg-white">
                <button
                  onClick={() => setInsuranceAdded(false)}
                  className="flex items-center gap-1.5 border border-red-400 text-red-500 rounded-lg px-3 py-1.5 text-xs hover:bg-red-50 transition"
                >
                  <FiTrash2 size={13} />
                  حذف بیمه
                </button>
                <span className="text-gray-800 text-sm">
                  {insurance.price.toLocaleString('fa-IR')}
                  <span className="text-xs text-gray-500 mr-1">تومان</span>
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
                <Link href={insurance.detailsUrl} className="flex items-center gap-1 text-gray-500 text-xs">
                  جزئیات
                  <span className="text-gray-400">‹</span>
                </Link>
                <div className="flex items-center gap-1.5 text-blue-600">
                  <span className="text-xs danaMed">خرید بیمه برای کالا</span>
                  <BsShieldCheck size={16} />
                </div>
              </div>
              <div className="flex items-center justify-between px-3 py-2">
                <button
                  onClick={() => setInsuranceAdded(true)}
                  className="flex items-center gap-1.5 border border-gray-300 text-gray-700 rounded-lg px-3 py-1.5 text-xs hover:bg-gray-50 transition"
                >
                  افزودن بیمه
                  <FiPlus size={13} />
                </button>
                <span className="text-gray-800 text-sm">
                  {insurance.price.toLocaleString('fa-IR')}
                  <span className="text-xs text-gray-500 mr-1">تومان</span>
                </span>
              </div>
            </>
          )}
        </div>
      )}

      {/* دکمه افزودن / کانتر */}
      <div>
        {!matchVariant ? null : loading ? (
          <span className="text-sm danaMed text-gray-400">در حال بارگذاری...</span>
        ) : cartItem ? (
          <div className="flex flex-col gap-2">
            {/* کانتر */}
            <div className="flex items-center justify-between gap-2">
              {/* سطل آشغال */}
              <button
                onClick={() => decreaseQuantity(cartItem.productId, cartItem.variantId)}
                className="w-10 h-10 flex items-center justify-center border border-red-300 rounded-lg text-red-500 hover:bg-red-50 transition"
              >
                {cartItem.quantity > 1 ? <FiMinus size={17} /> : <FiTrash2 size={17} />}
              </button>
              {/* تعداد */}
              <span className="flex-1 h-10 flex items-center justify-center border border-gray-300 rounded-lg text-base danaMed text-gray-900">
                {cartItem.quantity}
              </span>
              {/* افزایش */}
              <button
                onClick={() => increaseQuantity(cartItem.productId, cartItem.variantId)}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                <FiPlus size={17} />
              </button>
            </div>
            {/* متن وضعیت */}
            <p className="text-sm danaMed text-gray-500 text-center">در سبد شما</p>
            <Link href="/cart" className="text-sm danaMed text-blue-500 hover:underline text-center">
              مشاهده سبد خرید
            </Link>
          </div>
        ) : (
          <button
            onClick={() =>
              addToCart({ _id: product._id, isVariants, variantId: matchVariant?._id || null })
            }
            className="w-full bg-[#0084ff] mt-4 text-white py-3 rounded-lg danaMed  hover:bg-blue-700 transition"
          >
            افزودن به سبد خرید
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductPrice4;
