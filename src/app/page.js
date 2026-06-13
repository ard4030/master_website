import HomeWrapper from './HomeWrapper'

async function getHomepageData() {

  let final = {
    data:null,
    error:null
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'
    const response = await fetch(`${baseUrl}/homepage`, {
      method: 'GET',
      cache: 'no-store'
    })
    
    let data = await response.json()
    // console.log("[[[[[ ",data)
    if(data.success){
      final.data = data.data
    }else{
      final.error = data.message
    }

  } catch (error) {
    final.error = error.message
  }
  // console.log("final ",final)

  return final

}

export async function generateMetadata() {
  const homepageData = await getHomepageData()
  
  const merchant = homepageData.data?.merchant || {}
  
  return {
    title: merchant.metaTitle || 'فروشگاه',
    description: merchant.metaDescription || '',
    keywords: merchant.metaKeywords || '',
    ...(merchant.canonicalUrl && { alternates: { canonical: merchant.canonicalUrl } }),
    openGraph: {
      title: merchant.ogTitle || merchant.metaTitle || 'فروشگاه',
      description: merchant.ogDescription || merchant.metaDescription || '',
      ...(merchant.ogImage && { images: [{ url: merchant.ogImage }] }),
    },
  }
}

export default async function Home() {
  const homepageData = await getHomepageData()
  // اطلاعات تم قبلاً در homepageData.data.theme موجود است

  // console.log("sss",homepageData)
  if(homepageData.data){
    return <HomeWrapper homepageData={homepageData} />
  }else{
    return <p className='text-center font-[dana-medium] w-[80%] mx-auto
     text-[20px] mt-20 bg-red-100 p-5 rounded-[10px] text-red-500'>{homepageData.error}</p>
  }

}
