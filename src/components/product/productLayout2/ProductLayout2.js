'use client';
import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '@/context/CartContext';
import ProductImageSection from './ProductImageSection';
import ProductInfoSection from './ProductInfoSection';
import ProductColorsSection from './ProductColorsSection';
import ProductActionsSection from './ProductActionsSection';
import ProductShippingSection from './ProductShippingSection';
import ProductRatingsSection from './ProductRatingsSection';

const ProductLayout2 = ({ idPage, product }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { addToCart } = useContext(CartContext);

  // در بار اول، اولین variant را انتخاب کند یا خود محصول را
  useEffect(() => {
    if (!selectedVariant) {
      if (product?.variants && product.variants.length > 0) {
        setSelectedVariant(product.variants[0]);
      } else {
        // اگر variants نیست، خود محصول را به عنوان variant انتخاب کن
        setSelectedVariant(product);
      }
    }
  }, [product]);

  const handleAddToCart = () => {
    if (addToCart && product) {
      // اگر variant دارد، از color+size یک ID درست کن
      // if (product.isVariants && selectedVariant) {
      //   variantId = `${selectedVariant.color}-${selectedVariant.size}`;
      // }

      const cartData = {
        _id: product._id,                                               
        isVariants: product.isVariants || false,                        
        variantId: selectedVariant._id || null, // یا می‌توانی color-size را اینجا بسازی
      };
      console.log('Sending to cart:', cartData);
      addToCart(cartData);
    }
  };

  // استخراج داده‌های محصول
  const variants = product?.variants || [];
  const firstVariant = selectedVariant || (variants.length > 0 ? variants[0] : null);

  const productData = {
    name: product?.name || 'نام محصول',
    price: firstVariant?.price || product?.price || 0,
    compareAtPrice: firstVariant?.compareAtPrice || product?.compareAtPrice || 0,
    description: product?.description || product?.shortDescription || 'توضیحات محصول',
    mainImage: product?.mainImage || 'placeholder.jpg',
    galleryImages: product?.galleryImages || [],
    discount: product?.discount,
    freeShipping: product?.freeShipping,
    shippingTime: product?.shippingTime,
    ratingAverage: product?.ratingAverage || 0,
    reviewCount: product?.reviewCount || 0,
    variants: variants,
  };

  // استخراج رنگها و سایزها از variants
  const uniqueColors = [...new Set(variants.map(v => v.color))].filter(Boolean);
  const uniqueSizes = [...new Set(variants.map(v => v.size))].filter(Boolean);

  const colors = uniqueColors.map((color, idx) => ({
    id: idx,
    name: color,
    code: getColorCode(color)
  }));

  const sizes = uniqueSizes.map((size, idx) => ({
    id: idx,
    name: size
  }));

  // برای انتخاب بر اساس رنگ و سایز
  const handleVariantSelect = (color, size) => {
    const variant = variants.find(v => v.color === color && v.size === size);
    if (variant) {
      setSelectedVariant(variant);
    }
  };

  return (
    <div className="min-h-screen bg-white dana" dir="rtl">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-8 danaMed">
          صفحه اصلی / محصولات
        </div>

        {/* Product Grid */}
        <div className="flex flex-col lg:flex-row gap-12 mb-12">
          {/* Left: Images */}
          <div className="flex-1">
            <ProductImageSection
              mainImage={productData.mainImage}
              galleryImages={productData.galleryImages}
            />
          </div>

          {/* Right: Product Info */}
          <div className="flex-1 space-y-4">
            <ProductInfoSection
              name={productData.name}
              price={productData.price}
              compareAtPrice={productData.compareAtPrice}
              description={productData.description}
            />

            {colors.length > 0 && (
              <ProductColorsSection 
                colors={colors}
                selectedColor={firstVariant?.color}
                onColorSelect={(color) => {
                  // اگر یک سایز انتخاب شده است، آن را نگه دار
                  const newVariant = variants.find(v => 
                    v.color === color && v.size === firstVariant?.size
                  ) || variants.find(v => v.color === color);
                  if (newVariant) setSelectedVariant(newVariant);
                }}
              />
            )}

            <ProductActionsSection
              onAddToCart={handleAddToCart}
              productId={product?._id}
              isVariants={product?.isVariants}
              variantId={selectedVariant?._id || null}
            />

            <ProductShippingSection
              freeShipping={productData.freeShipping}
              shippingTime={productData.shippingTime}
              discount={productData.discount}
            />
          </div>
        </div>

        {/* Ratings & Reviews Section */}
        <ProductRatingsSection
          ratingAverage={productData.ratingAverage}
          reviewCount={productData.reviewCount}
        />
      </div>
    </div>
  );
};

// تابع برای دریافت کد رنگی
function getColorCode(colorName) {
  const colorMap = {
    'سیاه': '#000000',
    'سفید': '#F5F5F5',
    'قرمز': '#FF0000',
    'آبی': '#0000FF',
    'سبز': '#00AA00',
    'زرد': '#FFFF00',
    'نارنجی': '#FFA500',
    'صورتی': '#FFC0CB',
    'خاکی': '#C0A080',
    'قهوه‌ای': '#8B6F47',
    'طلایی': '#D4A574',
  };
  return colorMap[colorName] || '#808080'; // خاکستری پیش فرض
}

export default ProductLayout2;