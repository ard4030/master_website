'use client';
import React from 'react';
import Modal from '@mui/material/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import useIsMobile from '../hooks/isMobileHook';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.5 },
  exit: { opacity: 0 },
};

const modalVariantsMobile = {
  hidden: { y: '100vh', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3, type: 'spring', damping: 25, stiffness: 500 } },
  exit: { y: '100vh', opacity: 0 },
};

const modalVariantsDesktop = {
  hidden: { y: '-50%', opacity: 0, scale: 0.8 },
  visible: { y: '-50%', opacity: 1, scale: 1, transition: { duration: 0.3, type: 'spring', damping: 25, stiffness: 500 } },
  exit: { y: '-50%', opacity: 0, scale: 0.8 },
};

const ModalLayout = ({ isOpen, handleClose, children, widthModal = 400, heightModal = 'auto' }) => {
  const isMobile = useIsMobile();

  const style = {
    position: 'absolute',
    top: isMobile ? 0 : '50%',
    bottom: isMobile ? 0 : 'auto',
    left: isMobile ? '0%' : '50%',
    transform: isMobile ? 'none' : 'translate(-50%, -50%)',
    width: isMobile ? '100%' : widthModal,
    maxWidth: widthModal,
    height: isMobile?'100%' : heightModal,
    maxHeight: isMobile?'100%' : '90vh',
    backgroundColor: isMobile?'':'white',
    padding: 0, // padding رو اینجا صفر گذاشتیم چون داخلش div جداگانه داریم
    borderRadius: isMobile ? 0 : 16,
    overflowY: 'hidden',
    boxSizing: 'border-box',
    outline: 'none',
    zIndex: 1301,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  // استایل برای div داخلی که محتوا رو وسط میذاره و padding و محدودیت سایز داره
  const contentStyle = {
    width: '100%',
    height: isMobile ? '100%' : 'auto',
    padding: 16,
    overflowY: 'auto',
    boxSizing: 'border-box',
  };

  return (
    <div className='dana font-opensans'>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{backdropFilter:'blur(8px)'}}
        className='bg-white/5'
      >
        <div style={style} className='p-4 rounded-xl md:bg-white'>
            {children}
        </div>
      </Modal>
    </div>
  );
};

export default ModalLayout;
