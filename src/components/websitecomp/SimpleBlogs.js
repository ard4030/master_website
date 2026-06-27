import React from 'react'
import Link from 'next/link'

export const blogsSchema = {
  name: 'بلاگ ساده',
  fields: [
    {
      key: 'sectionBg',
      label: 'رنگ پس زمینه بخش',
      type: 'color',
      default: '#0f1115'
    },
    {
      key: 'containerMaxWidth',
      label: 'حداکثر عرض (px)',
      type: 'text',
      placeholder: 'مثال: 1320',
      default: '1320'
    },
    {
      key: 'cardBg',
      label: 'رنگ پس زمینه کارت',
      type: 'color',
      default: '#f3f4f6'
    },
    {
      key: 'cardBorderColor',
      label: 'رنگ کادر کارت',
      type: 'color',
      default: '#e5e7eb'
    },
    {
      key: 'titleColor',
      label: 'رنگ تیتر کارت',
      type: 'color',
      default: '#334155'
    },
    {
      key: 'descColor',
      label: 'رنگ توضیحات',
      type: 'color',
      default: '#94a3b8'
    },
    {
      key: 'metaColor',
      label: 'رنگ متای کارت',
      type: 'color',
      default: '#9ca3af'
    },
    {
      key: 'accentColor',
      label: 'رنگ تاکیدی (دکمه و آیکن)',
      type: 'color',
      default: '#fb923c'
    },
    {
      key: 'readTimeLabel',
      label: 'برچسب زمان مطالعه',
      type: 'text',
      placeholder: 'مثال: زمان مطالعه',
      default: 'زمان مطالعه'
    },
    {
      key: 'categoryLabel',
      label: 'برچسب دسته بندی',
      type: 'text',
      placeholder: 'مثال: دسته بندی',
      default: 'دسته بندی'
    },
    {
      key: 'defaultReadTime',
      label: 'زمان مطالعه پیش فرض',
      type: 'text',
      placeholder: 'مثال: 5 دقیقه',
      default: '5 دقیقه'
    },
    {
      key: 'defaultDateText',
      label: 'تاریخ پیش فرض',
      type: 'text',
      placeholder: 'مثال: 3 مرداد 1403',
      default: '3 مرداد 1403'
    },
    {
      key: 'items',
      label: 'آیتم های بلاگ',
      type: 'slides',
      default: [
        {
          title: 'نحوه استفاده از AI در فروشگاه من',
          description: 'لورم ایپسوم متن ساختگی با تولید سادگی مفهوم صنعت طراحی...',
          buttonText: 'کسب و کار',
          link: '#',
          imageUrl: 'https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?auto=format&fit=crop&w=900&q=80'
        },
        {
          title: 'نحوه استفاده از AI در فروشگاه من',
          description: 'لورم ایپسوم متن ساختگی با تولید سادگی مفهوم صنعت طراحی...',
          buttonText: 'آموزش',
          link: '#',
          imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80'
        },
        {
          title: 'نحوه استفاده از AI در فروشگاه من',
          description: 'لورم ایپسوم متن ساختگی با تولید سادگی مفهوم صنعت طراحی...',
          buttonText: 'هوش مصنوعی',
          link: '#',
          imageUrl: 'https://images.unsplash.com/photo-1590650046871-92c887180603?auto=format&fit=crop&w=900&q=80'
        },
        {
          title: 'نحوه استفاده از AI در فروشگاه من',
          description: 'لورم ایپسوم متن ساختگی با تولید سادگی مفهوم صنعت طراحی...',
          buttonText: 'تحلیل داده',
          link: '#',
          imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80'
        },
        {
          title: 'نحوه استفاده از AI در فروشگاه من',
          description: 'لورم ایپسوم متن ساختگی با تولید سادگی مفهوم صنعت طراحی...',
          buttonText: 'تجربه کاربری',
          link: '#',
          imageUrl: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=900&q=80'
        },
        {
          title: 'نحوه استفاده از AI در فروشگاه من',
          description: 'لورم ایپسوم متن ساختگی با تولید سادگی مفهوم صنعت طراحی...',
          buttonText: 'اتوماسیون',
          link: '#',
          imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=900&q=80'
        }
      ]
    }
  ]
}

const defaultItems = blogsSchema.fields.find((field) => field.key === 'items')?.default || []

const getImageUrl = (imagePath) => {
  if (!imagePath || typeof imagePath !== 'string') return ''
  if (imagePath.startsWith('http')) return imagePath
  return `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL || ''}${imagePath}`
}

const parsePositiveNumber = (value, fallback) => {
  const parsed = Number.parseFloat(value)
  if (Number.isNaN(parsed) || parsed <= 0) return fallback
  return parsed
}

const ArrowLeftIcon = ({ color = '#fb923c' }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M19 12H5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 19L5 12L12 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const FlameIcon = ({ color = '#f97316' }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M12.7 2.5C12.9 4.8 14.2 6 15.2 7.2C16.5 8.8 17.2 10.1 17.2 12C17.2 15.1 14.8 17.5 11.7 17.5C8.6 17.5 6.2 15.1 6.2 12C6.2 8.3 8.8 6.6 10.1 4.7C10.7 3.9 11.2 3.1 11.4 2.5C11.5 2 12.7 2 12.7 2.5Z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M11.7 9.7C12.9 10.6 13.4 11.4 13.4 12.6C13.4 13.7 12.6 14.5 11.5 14.5C10.4 14.5 9.6 13.7 9.6 12.6C9.6 11.3 10.4 10.4 11.7 9.7Z" fill={color} />
  </svg>
)

const SimpleBlogs = ({
  sectionBg = '#0f1115',
  containerMaxWidth = '1320',
  cardBg = '#f3f4f6',
  cardBorderColor = '#e5e7eb',
  titleColor = '#334155',
  descColor = '#94a3b8',
  metaColor = '#9ca3af',
  accentColor = '#fb923c',
  readTimeLabel = 'زمان مطالعه',
  categoryLabel = 'دسته بندی',
  defaultReadTime = '5 دقیقه',
  defaultDateText = '3 مرداد 1403',
  items
}) => {
  const list = Array.isArray(items) && items.length > 0 ? items : defaultItems
  const maxWidth = parsePositiveNumber(containerMaxWidth, 1320)

  return (
    <section className="w-full px-3 py-6 md:px-6 md:py-10" style={{ backgroundColor: sectionBg }} dir="rtl">
      <div className="mx-auto" style={{ maxWidth: `${maxWidth}px` }}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
          {list.map((item, index) => {
            const title = item?.title || 'عنوان مقاله'
            const excerpt = item?.description || 'توضیح کوتاه مقاله در این بخش نمایش داده می شود.'
            const category = item?.buttonText || 'عمومی'
            const readTime = item?.readTime || defaultReadTime
            const dateText = item?.dateText || defaultDateText
            const imageUrl = getImageUrl(item?.imageUrl)
            const href = item?.link || '#'

            return (
              <article
                key={`${title}-${index}`}
                className="flex h-full flex-col overflow-hidden rounded-[18px] border p-3 md:p-4"
                style={{ backgroundColor: cardBg, borderColor: cardBorderColor }}
              >
                <div className="relative h-36 w-full overflow-hidden rounded-xl md:h-40">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                  ) : (
                    <div className="h-full w-full bg-linear-to-br from-slate-300 to-slate-400" />
                  )}
                </div>

                <h3 className="danaBold mt-4 text-center text-lg leading-8" style={{ color: titleColor }}>
                  {title}
                </h3>

                <p className="dana mt-2 line-clamp-2 text-center text-sm leading-7" style={{ color: descColor }}>
                  {excerpt}
                </p>

                <div className="mt-auto pt-5">
                  <div className="grid grid-cols-2 gap-2 text-[11px] md:text-xs" style={{ color: metaColor }}>
                    <div className="text-right">{readTimeLabel}</div>
                    <div className="text-left">{categoryLabel}</div>
                  </div>

                  <div className="mt-1 grid grid-cols-2 gap-2 text-[11px] md:text-xs" style={{ color: metaColor }}>
                    <div className="flex items-center justify-start gap-1 text-right">
                      <span>{readTime}</span>
                      <FlameIcon color={accentColor} />
                    </div>
                    <div className="text-left">{category}</div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <Link
                      href={href}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border transition-opacity hover:opacity-85"
                      style={{ borderColor: accentColor }}
                      aria-label={title}
                    >
                      <ArrowLeftIcon color={accentColor} />
                    </Link>

                    <span className="danaMed text-xs" style={{ color: metaColor }}>
                      {dateText}
                    </span>

                    <span className="h-8 w-8" aria-hidden="true" />
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SimpleBlogs