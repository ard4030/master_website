'use client';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { FaImage } from 'react-icons/fa6';

const BannerTwo = ({
  displayType = '2',
  banner1='',
  link1='',
  banner2='',
  link2='',
  banner3='',
  link3='',
  banner4='',
  link4='',
}) => {

  const getImageUrl = (imagePath) => {
    if (!imagePath) return ''
    if (imagePath.startsWith('http')) return imagePath
    return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${imagePath}`
  }

  const allCards = [
    { id: 1, imageUrl: banner1 ? getImageUrl(banner1) : banner1, href: link1 },
    { id: 2, imageUrl: banner2 ? getImageUrl(banner2) : banner2, href: link2 },
    { id: 3, imageUrl: banner3 ? getImageUrl(banner3) : banner3, href: link3 },
    { id: 4, imageUrl: banner4 ? getImageUrl(banner4) : banner4, href: link4 },
  ]

  const is4 = displayType === '4'
  const cards = is4 ? allCards : allCards.slice(0, 2)
  const gridClass = is4
    ? 'grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4'
    : 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8'

  return (
    <div className={`${gridClass} max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-4 bg-white`}>
      {cards.map((item) => (
        <Link href={item.href || '#'} key={item.id} className='col-span-1'>
          {item.imageUrl
            ? <Image src={item.imageUrl} width={900} alt='image' height={450} className='w-full aspect-2/1 object-cover rounded-lg bg-gray-50' />
            : <div className='w-full rounded-lg bg-gray-200 aspect-2/1 flex justify-center items-center'><FaImage /></div>
          }
        </Link>
      ))}
    </div>
  )
}

export default BannerTwo