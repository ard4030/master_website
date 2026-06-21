'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { FiX } from 'react-icons/fi'
import ModalLayout from '@/components/global/ModalLayout/ModalLayout'
import AnimLayout from '@/components/global/animationLayout/AnimLayout'

const MapNeshan = dynamic(
  () => import('@/components/global/MapNeshan/MapNeshan'),
  { ssr: false }
)

const SelectMap = ({ isOpen, onClose, onConfirm, initialPosition }) => {
  return (
    <ModalLayout isOpen={isOpen} handleClose={onClose} widthModal={640}>
      <AnimLayout type="fade" className="dana">
        <div
          className="flex flex-col bg-white rounded-xl h-full md:h-auto md:max-h-[85vh] w-full"
          dir="rtl"
        >
          {/* هدر */}
          <div className="shrink-0 flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100 bg-white rounded-t-xl">
            <h2 className="danaBold text-sm sm:text-base text-gray-900">
              انتخاب موقعیت روی نقشه
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="بستن"
              className="group w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 text-gray-500 hover:text-red-500 active:scale-95 transition"
            >
              <FiX size={18} className="transition-transform group-hover:rotate-90" />
            </button>
          </div>

          {/* محتوای اسکرول */}
          <div className="flex-1 min-h-0 overflow-y-auto p-4 overscroll-contain">
            <MapNeshan
              initialPosition={initialPosition}
              onConfirm={(picked) => {
                onConfirm?.(picked)
                onClose?.()
              }}
            />
          </div>
        </div>
      </AnimLayout>
    </ModalLayout>
  )
}

export default SelectMap
