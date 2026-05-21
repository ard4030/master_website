'use client'
import { useContext, useEffect } from 'react';
import { MerchantContext, MerchantProvider } from '@/context/MerchantContext'
import Products1 from "@/components/websitecomp/Products1";
import TopSection1 from "@/components/websitecomp/TopSection1";
import ProductSwp2 from '@/components/websitecomp/ProductSwp2';
import AboutMe from '@/components/websitecomp/AboutMe';
import ProductsSwp3 from '@/components/websitecomp/ProductsSwp3';
import Footer1 from '@/components/websitecomp/Footer1';
import FeaturesSection from '@/components/websitecomp/FeaturesSection';
import SplitShowcase from '@/components/websitecomp/SplitShowcase';
import CategoriesSwiper from '@/components/websitecomp/CategoriesSwiper';
import HeroBannerSwiper from '@/components/websitecomp/HeroBannerSwiper';
import DigikalaSwiper from '@/components/websitecomp/DigikalaSwiper';
import DigikalaOfferSwiper from '@/components/websitecomp/DigikalaOfferSwiper';
import AboutUs from '@/components/websitecomp/AboutUs';
import BannerTwo from '@/components/websitecomp/BannerTwo';
import Footer2 from '@/components/websitecomp/Footer2';
import SimpleBanner from '@/components/websitecomp/SimpleBanner';
import Products2 from '@/components/websitecomp/Products2';
import ProductsSwiperBasic from '@/components/websitecomp/ProductSwiperBasic';
import Footer3 from '@/components/websitecomp/Footer3';
import Slider1Offer from '@/components/websitecomp/Slider1Offer';
import Slider1 from '@/components/websitecomp/Slider1';


function renderComponent(component, themeFont, themeColor) {
  if (!component) return null

  const { id, componentId, styles, instanceId, props } = component;

  // اگر کامپوننت useThemeBg=true داشت و themeColor موجود بود،
  // bgColor را با themeColor جایگزین کن. در غیر این صورت bgColor خودش حفظ می‌شود.
  const shouldUseThemeBg = props?.useThemeBg === true || props?.useThemeBg === 'true'
  const mergedProps = (themeColor && shouldUseThemeBg)
    ? { ...props, bgColor: themeColor }
    : props

  const extraProps = { 'data-theme-font': themeFont }
  // console.log('>>>>>>>>>>',id);
  

  // کامپوننت‌های جدید (site builder)
  switch (id) {
    case 'products1':
      return <Products1 key={instanceId} {...mergedProps} {...extraProps} />
    case 'topsection1':
      return <TopSection1 key={instanceId} {...mergedProps} {...extraProps} />
     case 'productSwp2':
      return <ProductSwp2 key={instanceId} {...mergedProps} {...extraProps} />
     case 'productsSwp3':
      return <ProductsSwp3 key={instanceId} {...mergedProps} {...extraProps} />
     case 'aboutMe':
      return <AboutMe key={instanceId} {...mergedProps} {...extraProps} />
     case 'footer1':
      return <Footer1 key={instanceId} {...mergedProps} {...extraProps} />
     case 'featuresSection':
      return <FeaturesSection key={instanceId} {...mergedProps} {...extraProps} />
     case 'splitShowcase':
      return <SplitShowcase key={instanceId} {...mergedProps} {...extraProps} />
     case 'categoriesSwiper':
      return <CategoriesSwiper key={instanceId} {...mergedProps} {...extraProps} />
     case 'heroBannerSwiper':
      return <HeroBannerSwiper key={instanceId} {...mergedProps} {...extraProps} />
     case 'digikalaSwiper':
      return <DigikalaSwiper key={instanceId} {...mergedProps} {...extraProps} />
     case 'digikalaOfferSwiper':
      return <DigikalaOfferSwiper key={instanceId} {...mergedProps} {...extraProps} />
     case 'simpleBanner':
      return <SimpleBanner key={instanceId} {...mergedProps} {...extraProps} />
    case 'products2':
      return <Products2 key={instanceId} {...mergedProps} {...extraProps} /> 
     case 'aboutUs':
      return <AboutUs key={instanceId} {...mergedProps} {...extraProps} />
     case 'bannerTwo':
      return <BannerTwo key={instanceId} {...mergedProps} {...extraProps} />      
     case 'footer2':
      return <Footer2 key={instanceId} {...mergedProps} {...extraProps} />    
     case 'footer3':
      return <Footer3 key={instanceId} {...mergedProps} {...extraProps} />   
     case 'productSwiperBasic':
      return <ProductsSwiperBasic key={instanceId} {...mergedProps} {...extraProps} />    
       case 'slider1Offer':
      return <Slider1Offer key={instanceId} {...mergedProps} {...extraProps} />
      case 'slider1':
      return <Slider1 key={instanceId} {...mergedProps} {...extraProps} />
    default:
      return null
  }
}

export default function HomeWrapper({ homepageData }) {
  const activeTheme = homepageData?.data?.activeTheme
  const newTheme = homepageData?.data?.theme
  const themeFont = activeTheme?.font || 'dana';
  const themeColor = activeTheme?.colorTheme || false;

  const {setActiveMerchant,setLoading} = useContext(MerchantContext);

  useEffect(() => {
    if(homepageData) {
      setActiveMerchant(homepageData?.data)
      setLoading(false)
    }
  },[homepageData])

  // استفاده از تم جدید (اگر موجود باشد) یا تم قدیمی
  const componentsToRender = newTheme?.components || activeTheme?.components || []
  
  console.log(',,,,,,',componentsToRender,homepageData.data);
  
  return (
    
      <div className="w-full min-h-screen bg-white" data-theme-font={themeFont}>
        {/* Render components from theme */}
        {componentsToRender && Array.isArray(componentsToRender) && componentsToRender.length > 0 ? (
          <div data-theme-font={themeFont}>
            {componentsToRender.map((component, index) => (
              renderComponent(component, themeFont, themeColor)
            ))}
          </div>
        ) : (
          // Fallback if no components
          <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <div className="text-center">
              <p className="text-gray-600 mb-4">صفحه اصلی خالی است</p>
            </div>
          </div>
        )}
      </div>
  
  )
}
