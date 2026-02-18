'use client'

import { MerchantProvider } from '@/context/MerchantContext'
import Products1 from "@/components/websitecomp/Products1";
import TopSection1 from "@/components/websitecomp/TopSection1";

function renderComponent(component) {
  if (!component) return null

  const { id, componentId, styles, instanceId, props } = component

  // کامپوننت‌های جدید (site builder)
  switch (id) {
    case 'products1':
      return <Products1 key={instanceId} {...props} />
    case 'topsection1':
      return <TopSection1 key={instanceId} {...props} />
    default:
      return null
  }
}

export default function HomeWrapper({ homepageData }) {
  const activeTheme = homepageData?.data?.activeTheme
  const newTheme = homepageData?.data?.theme

  // استفاده از تم جدید (اگر موجود باشد) یا تم قدیمی
  const componentsToRender = newTheme?.components || activeTheme?.components || []

  return (
    <MerchantProvider homepageData={homepageData}>
      <div className="w-full min-h-screen bg-white">
        {/* Render components from theme */}
        {componentsToRender && Array.isArray(componentsToRender) && componentsToRender.length > 0 ? (
          <div>
            {componentsToRender.map((component, index) => (
              renderComponent(component)
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
    </MerchantProvider>
  )
}
