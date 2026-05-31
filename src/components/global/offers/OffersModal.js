'use client';
import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdClose, MdChevronRight, MdCheckCircle, MdLocalOffer } from 'react-icons/md';
import { CartContext } from '@/context/CartContext';
import { MerchantContext } from '@/context/MerchantContext';
import ModalLayout from '@/components/global/ModalLayout/ModalLayout';
import OfferDetailView from './OfferDetailView';

const EASE_EXPO = [0.16, 1, 0.3, 1];

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: EASE_EXPO } },
};

export default function OffersModal({ open, onClose }) {
  const { cartDetails, cartItemState } = useContext(CartContext);
  const { activeMerchant } = useContext(MerchantContext);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const offers = Array.isArray(activeMerchant?.offers) ? activeMerchant.offers : [];
  const voucherName = cartItemState?.cartDetailt?.vocuher_name;
  const discountAmount = Number(cartDetails?.discountedAmount ?? 0);
  const discountPct = cartDetails?.merchantDiscountedAmount;
  const hasItems = (cartItemState?.cartItem?.length ?? 0) > 0;
  const isApplied = hasItems && (discountAmount > 0 || !!voucherName);

  const appliedIdx = isApplied
    ? offers.findIndex((o) => {
        if (voucherName && String(o.details ?? '').toLowerCase().includes(voucherName.toLowerCase()))
          return true;
        if (discountPct && String(o.msg ?? '').includes(String(discountPct))) return true;
        return false;
      })
    : -1;

  const resolvedAppliedIdx = appliedIdx >= 0 ? appliedIdx : isApplied && offers.length > 0 ? 0 : -1;
  const appliedOffer = resolvedAppliedIdx >= 0 ? offers[resolvedAppliedIdx] : null;
  const availableOffers = offers.filter((_, i) => i !== resolvedAppliedIdx);

  const handleClose = () => {
    setSelectedOffer(null);
    onClose();
  };

  return (
    <ModalLayout isOpen={open} handleClose={handleClose} widthModal={420} bottomSheet>
      <div className="relative w-full flex flex-col bg-white dark:bg-gray-900 rounded-t-2xl md:rounded-xl overflow-hidden max-h-[85vh]">

        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <h2 className="font-opensans text-xl font-bold text-gray-900 dark:text-white">
            Your deals &amp; benefits
          </h2>
          <button
            onClick={handleClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close"
          >
            <MdClose size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">

          {availableOffers.length > 0 && (
            <div className="mb-6">
              <p className="font-opensans text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                Available
              </p>
              <motion.ul variants={listVariants} initial="hidden" animate="visible">
                {availableOffers.map((offer, i) => (
                  <motion.li key={i} variants={itemVariant}>
                    <button
                      onClick={() => setSelectedOffer(offer)}
                      className="w-full flex items-center gap-3 py-3.5 border-b border-gray-100 dark:border-gray-800 last:border-0 text-left group"
                    >
                      <span className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-[#52bbe6]/10 transition-colors">
                        <MdLocalOffer
                          size={18}
                          className="text-gray-400 group-hover:text-[#52bbe6] transition-colors"
                        />
                      </span>
                      <span className="flex-1 font-opensans text-sm font-medium text-gray-700 dark:text-gray-200 leading-snug">
                        {offer.msg}
                      </span>
                      <MdChevronRight size={20} className="text-gray-300 dark:text-gray-600 shrink-0" />
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          )}

          {isApplied && appliedOffer && (
            <div>
              <p className="font-opensans text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                Applied
              </p>
              <button
                onClick={() => setSelectedOffer(appliedOffer)}
                className="w-full flex items-center gap-3 py-3.5 pl-3 border-l-4 border-green-500 text-left rounded-r-lg hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors"
              >
                <span className="w-9 h-9 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                  <MdLocalOffer size={18} className="text-green-600 dark:text-green-400" />
                </span>
                <span className="flex-1 font-opensans text-sm font-medium text-gray-700 dark:text-gray-200 leading-snug">
                  {appliedOffer.msg}
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400 shrink-0">
                  <MdCheckCircle size={14} />
                  Active
                </span>
              </button>
            </div>
          )}

          {offers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <MdLocalOffer size={40} className="text-gray-200 dark:text-gray-700 mb-3" />
              <p className="font-opensans text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">No deals today</p>
              <p className="font-opensans text-xs text-gray-400 dark:text-gray-500">Check back next time you order.</p>
            </div>
          )}
        </div>

        <AnimatePresence>
          {selectedOffer && (
            <OfferDetailView
              offer={selectedOffer}
              onBack={() => setSelectedOffer(null)}
              onClose={handleClose}
            />
          )}
        </AnimatePresence>
      </div>
    </ModalLayout>
  );
}
