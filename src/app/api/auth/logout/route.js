import { NextResponse } from 'next/server'

export async function POST(request) {
  const response = NextResponse.json({
    success: true,
    message: 'شما با موفقیت خارج شدید'
  })

  // حذف کوکی‌های توکن
  response.cookies.delete('masterToken')
  response.cookies.delete('token')
  response.cookies.delete('authToken')

  // تنظیم max-age = 0 برای سازگاری بیشتر
  response.cookies.set('masterToken', '', { maxAge: 0, path: '/' })
  response.cookies.set('token', '', { maxAge: 0, path: '/' })
  response.cookies.set('authToken', '', { maxAge: 0, path: '/' })

  return response
}
