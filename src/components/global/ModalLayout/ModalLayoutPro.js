'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Modal from '@mui/material/Modal';
import { AnimatePresence, motion } from 'framer-motion';
import useIsMobile from '../../hooks/isMobileHook';

const ModalLayoutPro = ({
  isOpen,
  handleClose,
  children,
  widthModal = 400,
  heightModal = 'auto',
  headerContent = null,
  footerContent = null,
}) => {
  const MODAL_Z_INDEX = 99999;
  const MOBILE_TOP_GAP = 62;
  const isMobile = useIsMobile();
  const hasHeader = Boolean(headerContent);
  const hasFooter = Boolean(footerContent);
  const computedDesktopWidth = typeof widthModal === 'number' ? `${widthModal}px` : widthModal;
  const animationDurationMs = isMobile ? 360 : 260;
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(isOpen);

  const motionVariants = useMemo(
    () => (isMobile
      ? {
          hidden: { y: '100%' },
          visible: { y: 0 },
          exit: { y: '100%' },
        }
      : {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
          exit: { opacity: 0 },
        }),
    [isMobile],
  );

  useEffect(() => {
    let timer;
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => setIsVisible(true));
    } else if (shouldRender) {
      setIsVisible(false);
      timer = setTimeout(() => {
        setShouldRender(false);
      }, animationDurationMs);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen, shouldRender, animationDurationMs]);

  const style = {
    position: 'absolute',
    top: isMobile ? MOBILE_TOP_GAP : '50%',
    bottom: isMobile ? 0 : 'auto',
    left: isMobile ? '0%' : '50%',
    transform: isMobile ? 'none' : 'translate(-50%, -50%)',
    right: isMobile ? 0 : 'auto',
    width: isMobile ? '100vw' : `min(${computedDesktopWidth}, calc(100vw - 32px))`,
    maxWidth: isMobile ? '100vw' : `calc(100vw - 32px)`,
    height: isMobile ? `calc(100dvh - ${MOBILE_TOP_GAP}px)` : heightModal,
    maxHeight: isMobile ? `calc(100dvh - ${MOBILE_TOP_GAP}px)` : '90vh',
    backgroundColor: 'white',
    padding: 0,
    borderRadius: isMobile ? '16px 16px 0 0' : 16,
    overflow: 'hidden',
    boxSizing: 'border-box',
    outline: 'none',
    zIndex: MODAL_Z_INDEX + 1,
    display: 'flex',
    flexDirection: 'column',
  };

  const headerStyle = {
    flexShrink: 0,
    padding: isMobile ? 'calc(12px + env(safe-area-inset-top)) 16px 12px' : 16,
    borderBottom: hasHeader ? '1px solid #e5e7eb' : 'none',
    backgroundColor: 'inherit',
  };

  const footerStyle = {
    flexShrink: 0,
    padding: isMobile ? '12px 16px calc(12px + env(safe-area-inset-bottom))' : 16,
    borderTop: hasFooter ? '1px solid #e5e7eb' : 'none',
    backgroundColor: 'inherit',
  };

  const contentStyle = {
    flex: '1 1 auto',
    minHeight: 0,
    width: '100%',
    padding: 16,
    overflowY: 'auto',
    boxSizing: 'border-box',
  };

  const animationLayerStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  if (!shouldRender) return null;

  return (
    <div className='dana font-opensans'>
      <Modal
        open={shouldRender}
        onClose={handleClose}
        keepMounted
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ zIndex: MODAL_Z_INDEX }}
        style={{backdropFilter:'blur(8px)'}}
        className='bg-white/5'
      >
        <AnimatePresence>
          {isVisible ? (
            <motion.div
              key='modal-layout-pro'
              initial='hidden'
              animate='visible'
              exit='exit'
              variants={motionVariants}
              transition={{
                duration: isMobile ? 0.36 : 0.26,
                ease: isMobile ? [0.22, 1, 0.36, 1] : [0.2, 0.9, 0.2, 1],
              }}
              style={style}
              className='rounded-xl md:bg-white'
            >
              <div style={animationLayerStyle}>
                {hasHeader ? <div style={headerStyle}>{headerContent}</div> : null}
                <div style={contentStyle}>{children}</div>
                {hasFooter ? <div style={footerStyle}>{footerContent}</div> : null}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Modal>
    </div>
  );
};

export default ModalLayoutPro;
