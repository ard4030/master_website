'use client';
import React, { useState, useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import { useView } from '@/context/ViewContext';
import { isCart } from '@/utils/functions';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { BsShieldCheck } from 'react-icons/bs';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import CircularProgress from '@mui/material/CircularProgress';

// داده استاتیک بیمه - بعداً از product می‌آید
const staticInsurance = {
  title: 'بیمه محصول',
  price: 1999000,
  detailsUrl: '#',
};

const ProductPrice4 = ({ product, matchVariant, isVariants, onAddSuccess }) => {
  const { addToCart, cart, increaseQuantity, decreaseQuantity, loading } = useContext(CartContext);
  const { loadingObj, setLoadingObj } = useView();
  const [insuranceAdded, setInsuranceAdded] = useState(false);
  const [loadingAction, setLoadingAction] = useState(null); // 'add' | 'inc' | 'dec' | null

  const isCountLoading = loadingObj?.countProduct;

  const withCountLoading = async (action, fn) => {
    try {
      setLoadingAction(action);
      setLoadingObj((prev) => ({ ...prev, countProduct: true }));
      await fn();
    } finally {
      setLoadingObj((prev) => ({ ...prev, countProduct: false }));
      setLoadingAction(null);
    }
  };

  const handleAdd = async () => {
    await withCountLoading('add', () =>
      addToCart({ _id: product._id, isVariants, variantId: matchVariant?._id || null })
    );

    if (typeof onAddSuccess === 'function') onAddSuccess();
  };

  const handleIncrease = (productId, variantId) =>
    withCountLoading('inc', () => increaseQuantity(productId, variantId));

  const handleDecrease = (productId, variantId) =>
    withCountLoading('dec', () => decreaseQuantity(productId, variantId));

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
    <div className="border border-gray-200 bg-neutral-50 rounded-xl p-4 flex flex-col gap-4 shadow-xs">
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
      <div className="min-h-13">
        {!matchVariant ? null : loading ? (
          <span className="text-sm danaMed text-gray-400">در حال بارگذاری...</span>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            {cartItem ? (
              <motion.div
                key="counter"
                initial={{ opacity: 0, scale: 0.85, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -6 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26, mass: 0.6 }}
                className="flex flex-col gap-2"
              >
                {/* کانتر */}
                <div className="flex items-center justify-between gap-2">
                  {/* سطل آشغال / منفی */}
                  <motion.button
                    whileTap={isCountLoading ? undefined : { scale: 0.88 }}
                    whileHover={isCountLoading ? undefined : { scale: 1.04 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    onClick={() => handleDecrease(cartItem.productId, cartItem.variantId)}
                    disabled={isCountLoading}
                    className="w-10 h-10 flex items-center justify-center border border-red-300 rounded-lg text-red-500 hover:bg-red-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loadingAction === 'dec' ? (
                      <CircularProgress size={16} thickness={5} sx={{ color: '#ef4444' }} />
                    ) : (
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={cartItem.quantity > 1 ? 'minus' : 'trash'}
                          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                          animate={{ rotate: 0, opacity: 1, scale: 1 }}
                          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                          transition={{ duration: 0.18 }}
                        >
                          {cartItem.quantity > 1 ? <FiMinus size={17} /> : <FiTrash2 size={17} />}
                        </motion.span>
                      </AnimatePresence>
                    )}
                  </motion.button>

                  {/* تعداد */}
                  <div className="flex-1 h-10 relative flex items-center justify-center border border-gray-300 rounded-lg overflow-hidden">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={cartItem.quantity}
                        initial={{ y: 20, opacity: 0, scale: 0.7 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -20, opacity: 0, scale: 0.7 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                        className="text-base danaMed text-gray-900 absolute"
                      >
                        {cartItem.quantity.toLocaleString('fa-IR')}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  {/* افزایش */}
                  <motion.button
                    whileTap={isCountLoading ? undefined : { scale: 0.88 }}
                    whileHover={isCountLoading ? undefined : { scale: 1.04 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    onClick={() => handleIncrease(cartItem.productId, cartItem.variantId)}
                    disabled={isCountLoading}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loadingAction === 'inc' ? (
                      <CircularProgress size={16} thickness={5} sx={{ color: '#6b7280' }} />
                    ) : (
                      <FiPlus size={17} />
                    )}
                  </motion.button>
                </div>
                {/* متن وضعیت */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.12 }}
                  className="text-sm danaMed text-gray-500 text-center"
                >
                  در سبد شما
                </motion.p>
                <Link href="/cart" className="text-sm danaMed text-blue-500 hover:underline text-center">
                  مشاهده سبد خرید
                </Link>
              </motion.div>
            ) : (
              <motion.button
                key="add-btn"
                initial={{ opacity: 0, scale: 0.92, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -6 }}
                whileTap={isCountLoading ? undefined : { scale: 0.96 }}
                whileHover={isCountLoading ? undefined : { scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                onClick={handleAdd}
                disabled={isCountLoading}
                className="w-full h-12 mt-4 bg-[#0084ff] text-white rounded-lg danaMed hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loadingAction === 'add' ? (
                  <CircularProgress size={22} thickness={4.5} sx={{ color: '#ffffff' }} />
                ) : (
                  'افزودن به سبد خرید'
                )}
              </motion.button>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default ProductPrice4;
