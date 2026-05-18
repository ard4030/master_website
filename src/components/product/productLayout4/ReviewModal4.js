'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FiArrowLeft, FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';
import ModalLayout from '@/components/global/ModalLayout/ModalLayout';
import AnimLayout from '@/components/global/animationLayout/AnimLayout';

// TODO: آدرس را به endpoint واقعی تغییر دهید
const REVIEW_API_URL = 'https://jsonplaceholder.typicode.com/posts';

const ReviewModal4 = ({ isOpen, onClose, product }) => {
  const [text, setText] = useState('');
  const [showSender, setShowSender] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const imageUrl = process.env.NEXT_PUBLIC_LIARA_IMAGE_URL || '';
  const productImage = product?.mainImage ? `${imageUrl}${product.mainImage}` : null;

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setSubmitting(true);
    setError('');

    const payload = {
      productId: product?._id || null,
      productName: product?.name || '',
      text: text.trim(),
      isAnonymous,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(REVIEW_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('خطا در ارسال');
      setText('');
      setIsAnonymous(false);
      setShowSender(false);
      onClose();
    } catch {
      setError('ارسال دیدگاه با مشکل مواجه شد. لطفاً دوباره تلاش کنید.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ModalLayout isOpen={isOpen} handleClose={onClose} widthModal={680} heightModal="auto">
      <AnimLayout type="moveUp" className="w-full">
        <div className="bg-white w-full flex flex-col rounded-2xl overflow-hidden dana" dir="rtl">

          {/* ── هدر ── */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <h2 className="danaBold text-base text-gray-900">ثبت دیدگاه</h2>
              <FiArrowLeft size={17} className="text-gray-700" />
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition"
            >
              <FiX size={18} />
            </button>

          </div>

          <div className="px-5 py-5 flex flex-col gap-5">

            {/* ── اطلاعات محصول ── */}
            {product && (
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                {productImage && (
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-gray-200 bg-white">
                    <Image
                      src={productImage}
                      alt={product?.name || ''}
                      fill
                      sizes="56px"
                      className="object-contain"
                    />
                  </div>
                )}
                <p className="text-sm danaMed text-gray-800 leading-6 text-right flex-1">
                  {product?.name || ''}
                </p>
              </div>
            )}

            {/* ── فیلد متن ── */}
            <div className="flex flex-col gap-2">
              <label className="text-sm danaBold text-gray-800 text-right">
                متن دیدگاه:<span className="text-red-500 mr-0.5">*</span>
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="نظر خود را در مورد این کالا با کاربران دیگر به اشتراک بگذارید..."
                rows={5}
                className="w-full resize-none border border-gray-200 rounded-xl p-3 text-sm danaMed text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 transition leading-7"
              />
            </div>

            {/* ── ارسال با نام شما / ناشناس ── */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setShowSender((p) => !p)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
              >
                <span className="text-sm danaMed text-gray-700">
                  {isAnonymous ? 'ارسال با نام ناشناس' : 'ارسال با نام شما'}
                </span>
                {showSender ? <FiChevronUp size={16} className="text-gray-500" /> : <FiChevronDown size={16} className="text-gray-500" />}
              </button>
              {showSender && (
                <div className="border-t border-gray-100 px-4 py-3 flex flex-col gap-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="senderType"
                      checked={!isAnonymous}
                      onChange={() => setIsAnonymous(false)}
                      className="accent-blue-500 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm danaMed text-gray-700 group-hover:text-gray-900 transition">
                      ارسال با نام شما
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="senderType"
                      checked={isAnonymous}
                      onChange={() => setIsAnonymous(true)}
                      className="accent-blue-500 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm danaMed text-gray-700 group-hover:text-gray-900 transition">
                      ارسال با نام ناشناس
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* ── خطا ── */}
            {error && (
              <p className="text-xs text-red-500 danaMed text-center">{error}</p>
            )}

            {/* ── دکمه ثبت ── */}
            <button
              onClick={handleSubmit}
              disabled={!text.trim() || submitting}
              className={`w-full py-3 rounded-xl danaMed text-sm transition flex items-center justify-center gap-2 ${
                text.trim() && !submitting
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {submitting && (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              )}
              {submitting ? 'در حال ارسال...' : 'ثبت دیدگاه'}
            </button>

            {/* ── فوتر ── */}
            <p className="text-xs text-gray-400 danaMed text-center leading-5">
              ثبت دیدگاه به معنی موافقت با{' '}
              <span className="text-blue-500 cursor-pointer hover:underline">قوانین انتشار</span>{' '}
              است.
            </p>

          </div>
        </div>
      </AnimLayout>
    </ModalLayout>
  );
};

export default ReviewModal4;
