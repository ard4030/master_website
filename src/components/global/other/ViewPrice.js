import { formatPrice } from '@/utils/functions'
import React from 'react'

const ViewPrice = ({value,curr='تومان'}) => {
  return (
    <div>
        <span>{formatPrice(value)} <span className='text-[12px] font-semibold text-gray-600'>{curr}</span> </span>
    </div>
  )
}

export default ViewPrice