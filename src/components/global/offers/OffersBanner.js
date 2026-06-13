'use client';
import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion, useAnimation } from 'framer-motion';
import { MdLocalOffer, MdCheckCircle } from 'react-icons/md';
import { CartContext } from '@/context/CartContext';
import { MerchantContext } from '@/context/MerchantContext';
import { ViewContext } from '@/context/ViewContext';

const EASE_EXPO = [0.16, 1, 0.3, 1];

export default function OffersBanner({ onClick }) {
  const { cartDetails, cartItemState } = useContext(CartContext);
  const { activeMerchant } = useContext(MerchantContext);
  const { darkMode } = useContext(ViewContext);
  const reduceMotion = useReducedMotion();
  const bannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIsApplied, setPrevIsApplied] = useState(false);
  const controls = useAnimation();

  const offers = Array.isArray(activeMerchant?.offers) ? activeMerchant.offers : [];
  const voucherName = cartItemState?.cartDetailt?.vocuher_name;
  const discountAmount = Number(cartDetails?.discountedAmount ?? 0);
  const discountPct = cartDetails?.merchantDiscountedAmount;
  const hasItems = (cartItemState?.cartItem?.length ?? 0) > 0;
  const isApplied = hasItems && (discountAmount > 0 || !!voucherName);
  const appliedLabel = voucherName
    ? `${voucherName} applied`
    : discountPct
    ? `${discountPct}% off applied`
    : 'Offer applied';

  useEffect(() => {
    controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: EASE_EXPO, delay: 0.3 },
    });
  }, [controls]);

  useEffect(() => {
    if (isApplied || offers.length <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % offers.length);
    }, 3000);
    return () => clearInterval(id);
  }, [isApplied, offers.length]);

  const fireConfetti = useCallback(() => {
    if (reduceMotion || !bannerRef.current) return;
    import('canvas-confetti').then(({ default: confetti }) => {
      const rect = bannerRef.current.getBoundingClientRect();
      const canvas = document.createElement('canvas');
      canvas.style.cssText = `position:fixed;top:${rect.top}px;left:${rect.left}px;width:${rect.width}px;height:${rect.height}px;pointer-events:none;z-index:9999;border-radius:9999px;overflow:hidden;`;
      canvas.width = rect.width;
      canvas.height = rect.height;
      document.body.appendChild(canvas);
      const shoot = confetti.create(canvas, { resize: false, useWorker: false });
      const burst = (angle, x) =>
        shoot({
          particleCount: 28,
          angle,
          spread: 50,
          origin: { x, y: 1 },
          colors: ['#f97316', '#facc15', '#10b981', '#fb923c', '#fde047'],
          scalar: 0.65,
          gravity: 1.4,
          ticks: 120,
        });
      burst(65, 0.3);
      burst(115, 0.7);
      setTimeout(() => { shoot.reset(); canvas.remove(); }, 1800);
    });
  }, [reduceMotion]);

  useEffect(() => {
    if (isApplied && !prevIsApplied) {
      fireConfetti();
      if (!reduceMotion) {
        controls.start({
          scale: [1, 1.07, 0.97, 1],
          transition: { duration: 0.52, ease: EASE_EXPO },
        });
      }
    }
    setPrevIsApplied(isApplied);
  }, [isApplied, prevIsApplied, fireConfetti, reduceMotion, controls]);

  if (!offers.length) return null;

  const extraCount = offers.length - 1;

  return (
    <motion.div
      initial={reduceMotion ? {} : { y: 32, opacity: 0 }}
      animate={controls}
      className="fixed left-1/2 -translate-x-1/2 bottom-20 md:bottom-6 z-40 flex flex-col items-center gap-1.5"
    >
      <motion.button
        ref={bannerRef}
        onClick={onClick}
        animate={{
          backgroundColor: isApplied
            ? '#16a34a'
            : darkMode ? 'rgba(17,24,39,0.92)' : 'rgba(255,255,255,0.96)',
          boxShadow: isApplied
            ? '0 0 14px 4px rgba(22,163,74,0.4)'
            : darkMode ? '0 4px 20px rgba(0,0,0,0.28)' : '0 4px 20px rgba(0,0,0,0.10)',
          borderColor: isApplied
            ? 'rgba(255,255,255,0.15)'
            : 'rgba(82,187,230,0.3)',
        }}
        whileHover={reduceMotion ? {} : {
          y: -2,
          scale: 1.02,
          transition: { duration: 0.2, ease: EASE_EXPO },
        }}
        whileTap={reduceMotion ? {} : {
          scale: 0.96,
          transition: { duration: 0.1, ease: EASE_EXPO },
        }}
        transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE_EXPO }}
        className="relative overflow-hidden flex items-center gap-2.5 px-4 py-2.5 min-h-[44px] rounded-full backdrop-blur-md border min-w-[200px] max-w-[88vw] cursor-pointer"
        style={{ WebkitBackdropFilter: 'blur(12px)' }}
        aria-label="View available offers and discounts"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isApplied ? (
            <motion.span
              key="check"
              initial={reduceMotion ? {} : { scale: 0, opacity: 0, rotate: -30 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={reduceMotion ? {} : { scale: 0, opacity: 0, rotate: 30 }}
              transition={{ type: 'spring', damping: 16, stiffness: 280 }}
              className="shrink-0"
            >
              <MdCheckCircle size={18} className="text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="tag"
              initial={reduceMotion ? {} : { scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={reduceMotion ? {} : { scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.15, ease: EASE_EXPO }}
              className="shrink-0"
            >
              <MdLocalOffer size={18} className="text-[#52bbe6]" />
            </motion.span>
          )}
        </AnimatePresence>

        <div className="flex-1 overflow-hidden min-w-0 text-left">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isApplied ? 'applied-label' : String(activeIndex)}
              initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? {} : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: EASE_EXPO }}
              className={`block text-[13px] font-semibold font-opensans leading-snug truncate ${isApplied || darkMode ? 'text-white' : 'text-gray-800'}`}
            >
              {isApplied ? appliedLabel : offers[activeIndex]?.msg}
            </motion.span>
          </AnimatePresence>
        </div>

        {!isApplied && extraCount > 0 && (
          <motion.span
            animate={reduceMotion ? {} : { scale: [1, 1.08, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="shrink-0 bg-[#52bbe6]/25 text-[#52bbe6] text-[11px] font-bold rounded-full px-1.5 py-0.5 leading-none"
          >
            +{extraCount}
          </motion.span>
        )}

        {isApplied && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.28) 50%, transparent 65%)',
              backgroundSize: '200% 100%',
              animation: reduceMotion ? 'none' : 'shimmer 0.8s ease-out forwards',
            }}
          />
        )}
      </motion.button>

      <AnimatePresence>
        {!isApplied && offers.length > 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: EASE_EXPO }}
            className="flex items-center gap-[3px]"
            aria-hidden="true"
          >
            {offers.map((_, i) => (
              <motion.span
                key={i}
                layout
                transition={{ layout: { type: 'spring', damping: 22, stiffness: 320 } }}
                className={`h-[3px] rounded-full ${i === activeIndex ? 'bg-[#52bbe6] w-3' : `${darkMode ? 'bg-white/25' : 'bg-gray-300'} w-[3px]`}`}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
