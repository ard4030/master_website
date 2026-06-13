import React from 'react';
import Link from 'next/link';

const BroadCromp = ({ items = [] }) => {
  if (!items.length) return null;

  return (
    <nav aria-label="breadcrumb" className="w-full" dir="rtl">
      <ol className="flex items-center gap-1.5 text-xs md:text-sm danaMed text-gray-500 overflow-x-auto whitespace-nowrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={`${item?.label || 'item'}-${index}`}>
              <li className="shrink-0">
                {item?.href && !isLast ? (
                  <Link href={item.href} className="hover:text-blue-600 transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? 'text-gray-800 danaBold' : ''}>{item?.label}</span>
                )}
              </li>
              {!isLast ? <li className="text-gray-300">/</li> : null}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default BroadCromp;