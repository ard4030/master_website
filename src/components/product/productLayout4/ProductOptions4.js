'use client';
import React, { useEffect, useState } from 'react';

const ProductOptions4 = ({ isVariants, variants, variantsFull, product, onMatchVariantChange }) => {
  const [activeVariant, setActiveVariant] = useState(null);

  useEffect(() => {
    if (isVariants && variants?.length > 0) {
      const act = {};
      variants[0].attributes.forEach((el) => {
        act[el.name] = el.value;
      });
      setActiveVariant(act);
    } else {
      onMatchVariantChange?.({ price: product?.price, stockQuantity: product?.stockQuantity, compareAtPrice: product?.compareAtPrice });
    }
  }, []);

  const checkActive = (name, value) => activeVariant?.[name] === value;

  const changeVariant = (name, value) => {
    setActiveVariant((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!activeVariant || !variants?.length) return;
    const matched = variants.find((v) =>
      Object.entries(activeVariant).every(([name, value]) =>
        v.attributes.some((attr) => attr.name === name && attr.value === value)
      )
    );
    onMatchVariantChange?.(matched ?? null);
  }, [activeVariant]);

  if (!variantsFull?.length) return null;

  return (
    <div className="dana flex flex-col gap-3" dir="rtl">
      {variantsFull.map((item, index) => (
        <div key={index}>
          <label className="block text-sm font-semibold text-gray-900 mb-2 danaMed">
            {item.name}
          </label>
          <div className="flex gap-2 flex-wrap">
            {item.values.map((val, i) => (
              <button
                key={i}
                onClick={() => changeVariant(item.name, val.value)}
                className={`px-4 py-2 rounded-lg border-2 transition danaMed text-sm ${
                  checkActive(item.name, val.value)
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {val.value}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductOptions4;
