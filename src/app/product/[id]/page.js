import React from 'react'
import ProductLayout from '@/components/product/productLayout/ProductLayout'
import ProductLayout2 from '@/components/product/productLayout2/ProductLayout2';

const page = async ({params}) => {
    const id = (await params).id;
    
    let productData = null
    try {
      const apiUrl = process.env.BASE_URL || 'http://localhost:3001'
      const response = await fetch(`${apiUrl}/products/${id}`, {
        cache: 'no-store'
      })
      if (response.ok) {
        const result = await response.json()
        productData = result.data.data || result
      }
    } catch (error) {
      console.error('خطا در دریافت محصول:', error)
    }

    let render;
    switch (productData.data.activeTheme.activeMenu) {
      case 'productlayout':
        render = <ProductLayout idPage={id} product={productData.data.product} />
        break;
      case 'productlayout2':
        render = <ProductLayout2 idPage={id} product={productData.data.product} />
        break;
      default:
        render = <ProductLayout idPage={id} product={productData.data.product} />
    }
    
  return (
    <div>{render}</div>
  )
}

export default page