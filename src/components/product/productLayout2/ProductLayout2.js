'use client';
import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '@/context/CartContext';
import ProductImageSection from './ProductImageSection';
import ProductInfoSection from './ProductInfoSection';
import ProductShippingSection from './ProductShippingSection';
import ProductRatingsSection from './ProductRatingsSection';
import ProductPriceSection from './ProductPriceSection';

const ProductLayout2 = ({ idPage, product }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);

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

            <ProductPriceSection 
            product={product} 
            isVariants={product.isVariants} 
            variants={product.variants} 
            variantsFull={product.variantsFull} />

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


export default ProductLayout2;