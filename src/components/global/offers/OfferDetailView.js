'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdArrowBack, MdClose } from 'react-icons/md';

const EASE_EXPO = [0.16, 1, 0.3, 1];
const ALLOWED_TAGS = new Set(['B', 'STRONG', 'BR']);

function sanitizeLimitedHtml(value) {
  if (!value) return '';
  if (typeof DOMParser === 'undefined')
    return String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const doc = new DOMParser().parseFromString(String(value), 'text/html');
  const walk = (node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType !== 1) return;
      if (!ALLOWED_TAGS.has(child.tagName)) {
        child.replaceWith(doc.createTextNode(child.textContent ?? ''));
        return;
      }
      while (child.attributes.length > 0) child.removeAttribute(child.attributes[0].name);
      walk(child);
    });
  };
  walk(doc.body);
  return doc.body.innerHTML;
}

export default function OfferDetailView({ offer, onBack, onClose }) {
  const descHtml = sanitizeLimitedHtml(offer?.details ?? '');

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.28, ease: EASE_EXPO }}
      className="absolute inset-0 bg-white dark:bg-gray-900 z-10 flex flex-col rounded-xl overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 pt-5 pb-2 shrink-0">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Back to offers"
        >
          <MdArrowBack size={20} className="text-gray-700 dark:text-gray-200" />
        </button>
        <button
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Close"
        >
          <MdClose size={20} className="text-gray-700 dark:text-gray-200" />
        </button>
      </div>

      <div className="flex justify-center mt-6 mb-5 shrink-0">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 14, stiffness: 260, delay: 0.08 }}
          className="w-24 h-24 rounded-full bg-[#52bbe6]/10 dark:bg-[#52bbe6]/20 flex items-center justify-center"
        >
          <span aria-hidden="true" className="text-5xl font-black text-[#52bbe6] leading-none select-none">
            %
          </span>
        </motion.div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <h2 className="font-opensans text-lg font-bold text-gray-900 dark:text-white text-center mb-4 leading-snug">
          {offer?.msg}
        </h2>
        {descHtml && (
          <p
            className="font-opensans text-sm text-gray-500 dark:text-gray-400 leading-relaxed text-center"
            dangerouslySetInnerHTML={{ __html: descHtml }}
          />
        )}
      </div>
    </motion.div>
  );
}
