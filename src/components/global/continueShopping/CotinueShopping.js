import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiCheckCircle, FiShoppingBag } from 'react-icons/fi';
import ModalLayoutPro from '@/components/global/ModalLayout/ModalLayoutPro';

const ContinueShopping = ({
  open = false,
  onClose,
  productList = [],
}) => {
  const imageBase = process.env.NEXT_PUBLIC_LIARA_IMAGE_URL || '';
  const items = Array.isArray(productList) ? productList : [];
  const totalCount = items.reduce((sum, item) => sum + (item?.quantity || 0), 0);

  const headerContent = (
    <div className="flex items-center justify-between" dir="rtl">
      <div className="flex items-center gap-2 text-green-700">
        <FiCheckCircle size={19} />
        <h3 className="danaBold text-sm md:text-base text-gray-900">محصول به سبد اضافه شد</h3>
      </div>
      <span className="text-xs danaMed text-gray-500">{totalCount.toLocaleString('fa-IR')} کالا</span>
    </div>
  );

  const footerContent = (
    <div className="grid grid-cols-2 gap-2" dir="rtl">
      <button
        type="button"
        onClick={onClose}
        className="h-11 rounded-xl border border-gray-300 text-gray-700 danaMed text-sm hover:bg-gray-50 transition"
      >
        ادامه خرید
      </button>
      <Link
        href="/cart"
        className="h-11 rounded-xl bg-[#0084ff] text-white danaMed text-sm hover:bg-blue-700 transition flex items-center justify-center"
      >
        تسویه حساب
      </Link>
    </div>
  );

  return (
    <ModalLayoutPro
      isOpen={open}
      handleClose={onClose}
      widthModal={560}
      heightModal="74vh"
      headerContent={headerContent}
      footerContent={footerContent}
    >
      <div className="flex flex-col gap-3" dir="rtl">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500 danaMed text-sm">
            هنوز محصولی در سبد وجود ندارد.
          </div>
        ) : (
          items.map((item, index) => {
            const imagePath = item?.image || item?.mainImage || item?.productImage || '';
            const itemImage = imagePath
              ? (/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(imagePath) ? imagePath : `${imageBase}${imagePath}`)
              : '';
            const itemName = item?.name || item?.productName || 'محصول';
            const itemPrice = Number(item?.price || item?.finalPrice || 0);
            const itemQty = Number(item?.quantity || 1);

            return (
              <div
                key={`${item?.productId || item?._id || 'item'}-${item?.variantId || index}`}
                className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3"
              >
                <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                  {itemImage ? (
                    <Image
                      src={itemImage}
                      alt={itemName}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <FiShoppingBag size={18} />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="danaBold text-sm text-gray-900 truncate">{itemName}</p>
                  <p className="danaMed text-xs text-gray-500 mt-1">تعداد: {itemQty.toLocaleString('fa-IR')}</p>
                </div>

                <div className="text-left shrink-0">
                  <p className="danaBold text-sm text-gray-900">{Math.floor(itemPrice * itemQty).toLocaleString('fa-IR')}</p>
                  <p className="danaMed text-[11px] text-gray-500">تومان</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </ModalLayoutPro>
  );
};

export default ContinueShopping;