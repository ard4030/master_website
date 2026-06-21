'use client'

import React from 'react'
import { MdAdd } from 'react-icons/md'

const AddAddressButton = ({
  onClick,
  label = 'افزودن آدرس',
  fullWidth = false,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group ${fullWidth ? 'flex w-full' : 'inline-flex'} items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-dashed border-[#ff5e1f] bg-[#ff5e1f]/5 text-[#ff5e1f] danaBold text-sm shadow-sm transition-all duration-200 hover:bg-[#ff5e1f]/10 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#ff5e1f]/20 ${className}`}
    >
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#ff5e1f] text-white transition-colors duration-200">
        <MdAdd size={16} />
      </span>
      {label}
    </button>
  )
}

export default AddAddressButton
