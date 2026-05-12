'use client';
import React, { useState, useContext } from 'react';
import { CartContext } from '@/context/CartContext';

const ProductRightSection = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  const colors = ['نارنجی', 'سبز', 'مشکی', 'سفید'];
  const attributes = [
    { label: 'Made in', value: 'Australia' },
    { label: 'Design', value: 'Modern' },
    { label: 'Delivery', value: '2 days delivery' }
  ];

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      quantity: quantity,
      selectedColor: selectedColor
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg dana" dir="rtl">
      {/* Product Name */}
      <h1 className="text-2xl font-bold text-gray-900 mb-4 danaBold">
        {product?.name || 'نام محصول'}
      </h1>

      {/* Rating & Orders */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-lg">
                {i < Math.round(product?.ratingAverage || 4.5) ? '⭐' : '☆'}
              </span>
            ))}
          </div>
          <span className="text-sm font-semibold danaMed">
            {product?.ratingAverage || 4.5}
          </span>
        </div>
        <span className="text-sm text-gray-600 danaMed">
          {product?.reviewCount || 154} سفارش
        </span>
      </div>

      {/* Attributes */}
      <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
        {attributes.map((attr, index) => (
          <div key={index} className="flex justify-between danaMed">
            <span className="text-gray-600">{attr.label}:</span>
            <span className="font-semibold text-gray-900">{attr.value}</span>
          </div>
        ))}
      </div>

      {/* Color Selection */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3 danaMed">
          Screen size
        </label>
        <div className="flex gap-3">
          {colors.map((color, index) => (
            <button
              key={index}
              onClick={() => setSelectedColor(color)}
              className={`px-4 py-2 rounded-lg border-2 transition danaMed ${
                selectedColor === color
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3 danaMed">
          Quantity
        </label>
        <div className="flex items-center gap-3 border border-gray-300 rounded-lg w-fit">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 text-lg text-gray-600 hover:text-gray-900 transition"
          >
            −
          </button>
          <span className="px-4 py-2 text-lg font-semibold text-gray-900 danaMed">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-2 text-lg text-gray-600 hover:text-gray-900 transition"
          >
            +
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <label className="block text-sm font-semibold text-gray-600 mb-2 danaMed">
          Price
        </label>
        <p className="text-3xl font-bold text-gray-900 danaBold">
          ${(product?.price || 298).toLocaleString('en-US')}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 danaMed"
        >
          <span>🛒</span>
          Add to cart
        </button>
        <button className="flex-1 bg-blue-100 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-200 transition danaMed">
          Buy now
        </button>
        <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-xl">
          ❤️
        </button>
      </div>
    </div>
  );
};

export default ProductRightSection;
