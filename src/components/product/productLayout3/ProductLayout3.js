'use client';
import React from 'react';
import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo';
import ProductOptions from './ProductOptions';
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Product Section */}
        <div className="grid grid-cols-12 gap-8 mb-12">
          

          {/* Left: Product Details - 35% */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            <ProductInfo product={productData} />
            <div className="flex gap-3 items-start">
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

          {/* Right: Gallery - 65% */}
          <div className="col-span-12 lg:col-span-8">
            <ProductImageGallery 
              mainImage={productData.mainImage}
              galleryImages={productData.galleryImages}
            />
          </div>

        </div>

        {/* Tabs and Ratings Section */}
        <div className="grid grid-cols-12 gap-8">
          {/* Left: Tabs - 65% */}
          <div className="col-span-12 lg:col-span-8">
            <ProductTabs />
          </div>

          {/* Right: Ratings - 35% */}
          <div className="col-span-12 lg:col-span-4">
            <ProductRatings />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLayout3;