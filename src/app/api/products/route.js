import { NextResponse } from 'next/server'

const MOCK_PRODUCTS = [
  {
    id: 1,
    title: 'گوشی هوشمند A12',
    category: 'mobile',
    price: 12800000,
    image: '/assets/images/shiping/post.webp',
    stock: 12
  },
  {
    id: 2,
    title: 'هدفون بی سیم X20',
    category: 'mobile',
    price: 2490000,
    image: '/assets/images/shiping/tipax.png',
    stock: 18
  },
  {
    id: 3,
    title: 'کفش اسپرت RunPro',
    category: 'fashion',
    price: 3190000,
    image: '/assets/images/shiping/zarrinpal.png',
    stock: 9
  },
  {
    id: 4,
    title: 'ساعت کلاسیک S9',
    category: 'fashion',
    price: 4750000,
    image: '/assets/images/shiping/post.webp',
    stock: 7
  },
  {
    id: 5,
    title: 'ماگ سرامیکی مینیمال',
    category: 'home',
    price: 390000,
    image: '/assets/images/shiping/tipax.png',
    stock: 40
  },
  {
    id: 6,
    title: 'چراغ مطالعه LED',
    category: 'home',
    price: 990000,
    image: '/assets/images/shiping/zarrinpal.png',
    stock: 22
  }
]

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const categoryName = searchParams.get('categoryName')?.trim().toLowerCase()

  const products = categoryName
    ? MOCK_PRODUCTS.filter((item) => item.category.toLowerCase() === categoryName)
    : MOCK_PRODUCTS

  return NextResponse.json({
    success: true,
    category: categoryName || 'all',
    count: products.length,
    products
  })
}
