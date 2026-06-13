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
      className={`${fullWidth ? 'w-full' : 'inline-flex'} items-center justify-center gap-1 px-5 py-2.5 text-gray-400 rounded-lg danaBold text-sm transition-colors ${className}`}
    >
      <MdAdd size={16} />
      {label}
    </button>
  )
}

export default AddAddressButton
