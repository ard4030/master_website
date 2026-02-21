"use client";
import React, { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { MdAdd, MdRemove } from "react-icons/md";
import { isCart } from "@/utils/functions";

const ProductActionsSection = ({onAddToCart,productId,isVariants,variantId,}) => {

  const { cart, isLoading, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const cartItems = isCart({
    productId,
    variantId,
    items: cart?.items,
    isVariants,
  });
  const quantity = cartItems?.quantity || 0;

  const handleIncrease = () => {
    increaseQuantity(productId, isVariants ? variantId : null);
  };

  const handleDecrease = () => {
    decreaseQuantity(productId, isVariants ? variantId : null);
  };

  return (
    <div className="flex gap-3 pt-4 dana">
      {isLoading ? (
        "..."
      ) : (
        <>
          {cartItems ? (
            // اگر محصول در سبد است، دکمه‌های + و - نمایش دهید
            <div className="flex items-center gap-3">
              <button
                onClick={handleDecrease}
                disabled={isLoading}
                className="w-10 h-10 flex items-center justify-center border-2 border-gray-900 hover:bg-gray-100 rounded transition danaMed text-lg"
              >
                −
              </button>
              <span className="w-12 h-10 flex items-center justify-center danaBold text-gray-900">
                {quantity}
              </span>
              <button
                onClick={handleIncrease}
                disabled={isLoading}
                className="w-10 h-10 flex items-center justify-center border-2 border-gray-900 hover:bg-gray-100 rounded transition danaMed text-lg"
              >
                +
              </button>
            </div>
          ) : (
            // اگر محصول در سبد نیست، دکمه افزودن نمایش دهید
            <button
              onClick={onAddToCart}
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition"
            >
              افزودن به سبد
            </button>
            // <button

            // className="flex-1 px-6 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition danaMed disabled:opacity-50"
            // >
            // افزودن به سبد
            // </button>
          )}
        </>
      )}
    </div>
  );
};

export default ProductActionsSection;
