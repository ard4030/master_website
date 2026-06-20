import React from 'react'
import ProductLayout from '@/components/product/productLayout/ProductLayout'
import ProductLayout2 from '@/components/product/productLayout2/ProductLayout2';
import ProductLayout3 from '@/components/product/productLayout3/ProductLayout3';
import ProductLayout4 from '@/components/product/productLayout4/ProductLayout4';
import { cookies, headers } from "next/headers";


const page = async ({params}) => {
    const id = (await params).id;
    const headersList = await headers();
    const host = headersList.get('host');
    
    let productData = null
    const apiUrl = process.env.BASE_URL || 'http://localhost:3001'
    const response = await fetch(`${apiUrl}/products/${id}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        'origin': `https://${host}`,
        'domain': host,
        'referer': `https://${host}/`,
      },
    })
    if (response.ok) {
      const result = await response.json()
      productData = result.data.data || result
    }

    if(!productData) return <h1>محصول دریافت نشد</h1>

    let render;
    switch (productData.data.activeTheme.activeMenu) {
      case 'productlayout':
        render = <ProductLayout idPage={id} product={productData.data.product} />
        break;
      case 'productlayout2':
        render = <ProductLayout2 idPage={id} product={productData.data.product} />
        break;
      case 'productlayout3':  
        render = <ProductLayout3 idPage={id} product={productData.data.product} />
        break

      case 'productlayout4':  
        render = <ProductLayout4 idPage={id} product={productData.data.product} />
        break
      default:
        render = <ProductLayout idPage={id} product={productData.data.product} />
    }
    
  return (
    <div>{render}</div>
    // <ProductLayout3 idPage={id} product={productData.data.product} />
  )
}

export default page