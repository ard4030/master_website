import React from 'react'
import CategoryProducts from '@/components/category/CategoryProducts'

const page = async ({ params }) => {
  const { catId } = await params;

  let finalData = [];
  try {
    const res = await fetch('https://masterbackend.frontit.org/api/products', {
      method: 'GET',
      cache: 'no-store'
    })
    const data = await res.json()
    finalData = data;

    console.log('API products:', data?.products || data)
  } catch (error) {
    console.log('API products error:', error?.message || error)
  }

  

  return (
    <section className='mx-auto max-w-6xl px-4 py-8 dana'>
      <h1 className='mb-6 text-2xl font-bold text-gray-800'>
        محصولات دسته: <span className='text-emerald-600'>{catId}</span>
      </h1>

      <CategoryProducts data={finalData} catId={catId} />
    </section>
  )
}

export default page