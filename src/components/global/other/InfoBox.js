import React from 'react';
import { FaInfo } from 'react-icons/fa6';

const InfoBox = ({ text }) => {
  if (!text) return null;

  return (
    <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mt-3">
      <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-amber-400 text-white mt-0.5">
        <FaInfo size={11} />
      </span>
      <p className="text-xs text-amber-800 danaMed leading-6">{text}</p>
    </div>
  );
};

export default InfoBox;
