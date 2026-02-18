'use client'
import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SideModalLayout = ({ children, isOpen, handleClose }) => {

    useEffect(() => {
        if (isOpen) {
        document.body.style.overflow = 'hidden'
        } else {
        document.body.style.overflow = 'auto'
        }
        return () => {
        document.body.style.overflow = 'auto'
        }
    }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="w-full h-full fixed left-0 top-0 grid grid-cols-12 z-[1302]">
          {/* بک‌دراپ */}
          <motion.div
            className="modalBack col-span-1 sm:col-span-8 md:col-span-8 bg-gray-600/20 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          ></motion.div>

          {/* پنل کناری */}
          <motion.div
            className="sm:col-span-4 md:col-span-4 col-span-12 bg-white dark:bg-gray-700 h-full shadow-xl"
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default SideModalLayout
