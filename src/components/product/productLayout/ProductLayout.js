'use client';
import React, { useContext, useEffect, useState } from 'react';
import ProductHeader from '../ProductHeader';
import CallToActionBanner from '../CallToActionBanner';
import ProductGallery from '../ProductGallery';
import SellerInfo from '../SellerInfo';
import PriceBox from '../PriceBox';
import ProductSpecifications from '../ProductSpecifications';
import ProductAttributes from '../ProductAttributes';
import SizeSelector from '../SizeSelector';
import ColorSelector from '../ColorSelector';
import ShippingInfo from '../ShippingInfo';
import ProductSpecsTab from '../smComponents/ProductSpecsTab';
import ProductReviewsTab from '../smComponents/ProductReviewsTab';
import Sticky from 'react-stickynode';
import { CartContext } from '@/context/CartContext';

const ProductLayout = ({ idPage,product }) => {
  const [pageId, setPageId] = useState('');
  const [activeTab, setActiveTab] = useState('specs');
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
    console.log('>>>>>>>.',product);
    
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

  useEffect(() => {
    console.log(product);
    
    setPageId(idPage);
  }, [idPage]);

  // نمونه داده ها
  const productData = {
    title: product?.name,
    category : product?.category[0]?.name,
    rating: 4.2,
    reviewCount: '۲۷ دیدگاه',
    discount: 37,
    seller: 'دیجی‌کالا',
    price: '89000',
    originalPrice: '140000',
    images: [
      `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${product?.mainImage}`,
      "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
      "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    ],
  };

  const specifications = [
    { label: 'تعداد در بسته', value: '12 عدد' },
    { label: 'جنس', value: 'نخ 100%' },
    { label: 'رنگ', value: 'سفید' },
    { label: 'سایز', value: 'فری سایز' },
  ];

  const productAttributes = [
    { label: 'جنس', value: 'نخ 100% طبیعی' },
    { label: 'وزن', value: '150 گرم' },
    { label: 'ابعاد بسته', value: '20 × 15 × 10 سانتی‌متر' },
    { label: 'تعداد در بسته', value: '12 عدد' },
  ];

  const availableSizes = ['S', 'M', 'L', 'XL', 'XXL', 'فری سایز'];

  const availableColors = [
    { id: 1, name: 'سفید', hex: '#FFFFFF', code: '#fff' },
    { id: 2, name: 'مشکی', hex: '#000000', code: '#000' },
    { id: 3, name: 'قرمز', hex: '#EF4444', code: '#dc2626' },
    { id: 4, name: 'آبی', hex: '#3B82F6', code: '#2563eb' },
    { id: 5, name: 'خاکی', hex: '#A3A3A3', code: '#6b7280' },
    { id: 6, name: 'سبز', hex: '#10B981', code: '#059669' },
  ];

  const shippingFeatures = [
    { title: 'ارسال رایگان', description: 'بر روی سفارش های بالای 500 هزار' },
    { title: 'بازگرداندن کالا', description: 'تا 30 روز' },
    { title: 'گارانتی اصالت', description: 'کالاهای اصل 100%' },
    { title: 'پشتیبانی 24 ساعته', description: 'راهنمایی و پاسخگویی' },
  ];

  const reviews = [
    {
      id: 1,
      author: 'کاربر دیجیکالا',
      rating: 5,
      title: 'محصول بسیار خوب',
      comment: 'سلام این تاپ با درستی رسیده است، خیلی کیفیت خوبی دارد. لبس تاپ خیلی راحت است و رنگ بسیار جذاب است.',
      helpful: 7,
      unhelpful: 0,
      date: '31 بهمن 1404',
    },
    {
      id: 2,
      author: 'حسن علی',
      rating: 4,
      title: 'خوب اما کمی کوچک',
      comment: 'جنس بسیار خوب است و رنگ واقعا دلچسب است. تنها مشکل اینکه کمی کوچک تر از سایزش بود.',
      helpful: 3,
      unhelpful: 1,
      date: '25 بهمن 1404',
    },
    {
      id: 3,
      author: 'فاطمه محمودی',
      rating: 5,
      title: 'عالی است',
      comment: 'محصول عالی است و کالیتی بسیار خوب دارد. پیشنهاد می‌دهم برای خریداران.',
      helpful: 12,
      unhelpful: 2,
      date: '20 بهمن 1404',
    },
  ];

  return (
    <div className="px-2 py-4 w-[80%] mx-auto bg-white min-h-screen" dir="rtl">
      
      <ProductHeader
        title={productData.title}
        category={productData.category}
        rating={productData.rating}
        reviewCount={productData.reviewCount}
        discount={productData.discount}
        seller={productData.seller}
      />
      {/* <CallToActionBanner
        text="درخت پایان فصل مد و پوشاک شروع شد"
        onBuyClick={() => console.log("خرید کلیک شد")}
      /> */}
      <div className="grid grid-cols-1 font-dana dana lg:grid-cols-12 gap-4">


        {/* Right Sidebar - Desktop Only */}
        <div className="lg:col-span-5 dana">
          <ProductGallery images={productData.images} />
          <ShippingInfo features={shippingFeatures} />
        </div>

        {/* Main Content */}
        <div className="lg:block lg:col-span-4  dana space-y-4">
          <ProductAttributes attributes={productAttributes} />
          <SizeSelector sizes={availableSizes} onSizeChange={(size) => console.log('سایز انتخاب شده:', size)} />
          <ColorSelector colors={availableColors} onColorChange={(color) => console.log('رنگ انتخاب شده:', color)} />
        </div>

        {/* Left Sidebar */}
        <Sticky
          className="z-1 relative lg:col-span-3 dana"
          enabled={true}
          top={80}
          bottomBoundary={1200}
        >
          <div className="lg:col-span-3 dana">
            <PriceBox
              price={product.price}
              originalPrice={productData.originalPrice}
              discount={productData.discount}
              handleAddToCart={handleAddToCart}
              // onAddToCart={handleAddToCart}
              productId={product?._id}
              isVariants={product?.isVariants}
              variantId={selectedVariant?._id || null}
              product={product}
            />

          </div>
        </Sticky>
            <ProductSpecifications specs={specifications} />
      </div>

      {/* Tabs Section */}
      <div className="mt-8 bg-white rounded-lg shadow dana">
        {/* Tab Headers */}
        <div className="flex border-b border-gray-200 gap-2 md:gap-0" dir="rtl">
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-4 md:px-6 py-4 font-bold text-sm md:text-base transition-all border-b-2 ${
              activeTab === 'specs'
                ? 'text-red-600 border-red-600'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            مشخصات
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 md:px-6 py-4 font-bold text-sm md:text-base transition-all border-b-2 ${
              activeTab === 'reviews'
                ? 'text-red-600 border-red-600'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            نظرات
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-4 md:px-6 py-4 font-bold text-sm md:text-base transition-all border-b-2 ${
              activeTab === 'questions'
                ? 'text-red-600 border-red-600'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            پرسش‌ها
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`px-4 md:px-6 py-4 font-bold text-sm md:text-base transition-all border-b-2 ${
              activeTab === 'compare'
                ? 'text-red-600 border-red-600'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            مقایسه
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 md:p-8 dana">
          {/* Specifications Tab */}
          {activeTab === 'specs' && (
            <ProductSpecsTab specifications={specifications} />
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <ProductReviewsTab reviews={reviews} />
          )}

          {/* Questions Tab */}
          {activeTab === 'questions' && (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">هنوز سوالی پرسیده نشده است</p>
              <button className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition">
                اولین سوال را بپرسید
              </button>
            </div>
          )}

          {/* Compare Tab */}
          {activeTab === 'compare' && (
            <div className="text-center py-8">
              <p className="text-gray-600">هنوز کالایی برای مقایسه انتخاب نشده است</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductLayout;