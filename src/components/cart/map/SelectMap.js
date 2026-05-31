'use client'

import React from 'react'
import dynamic from 'next/dynamic'
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
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
              aria-label="بستن"
            >
              ×
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
