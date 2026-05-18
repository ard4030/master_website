'use client';
import React from 'react';
import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo';
import ProductOptions from './ProductOptions';
import ProductOptionsMobile from './ProductOptionsMobile';
import ProductButtons from './ProductButtons';
import SellerCard from './SellerCard';
import ProductTabs from './ProductTabs';
import ProductRatings from './ProductRatings';

const ProductLayout3 = ({ idPage, product }) => {

    
  // استخراج داده‌های محصول
  const variants = product?.variants || [];
  const firstVariant = (variants.length > 0 ? variants[0] : null);

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
      {/* Breadcrumb */}
      <div className="bg-gray-100 px-6 py-3 mb-8 dana" dir="rtl">
        <div className="text-sm text-gray-600 max-w-7xl mx-auto danaMed">
          خانه / الکترونیک / لوازم خانگی / تلویزیون‌ها
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full md:max-w-[85%] mx-auto px-4 md:px-0 py-8 pb-70 md:pb-8">
        {/* Product Section */}
        <div className="flex flex-col-reverse lg:flex-row gap-8 mb-12">
          
          {/* Right: Gallery - 65% (Mobile: top, Desktop: right) */}
          <div className="w-full lg:w-[65%]">
            <ProductImageGallery 
              mainImage={productData.mainImage}
              galleryImages={productData.galleryImages}
            />
          </div>

          {/* Left: Product Details - 35% (Mobile: bottom, Desktop: left) */}
          <div className="w-full lg:w-[35%] space-y-4">
            <ProductInfo product={productData} />
            {/* Desktop Version */}
            <div className="hidden md:flex gap-3 items-start">
              <div className="flex-1">
                <ProductOptions
                  product={product} 
                  isVariants={product.isVariants} 
                  variants={product.variants} 
                  variantsFull={product.variantsFull}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Mobile Bottom Bar - Product Options */}
        <div className="md:hidden mb-20">
          <ProductOptionsMobile
            product={product} 
            isVariants={product.isVariants} 
            variants={product.variants} 
            variantsFull={product.variantsFull}
          />
        </div>

        {/* Tabs and Ratings Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Tabs - 65% */}
          <div className="w-full lg:w-[65%]">
            <ProductTabs />
          </div>

          {/* Right: Ratings - 35% */}
          <div className="w-full lg:w-[35%]">
            <ProductRatings />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLayout3;