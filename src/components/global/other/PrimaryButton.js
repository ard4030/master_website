"use client";
import Link from "next/link";

export default function PrimaryButton({
  text,
  icon,
  onClick,
  href,
  disabled = false,
  outlined = false, // پراپ outlined اضافه شد
}) {
  let baseClass =
    "flex items-center justify-center gap-3 px-6 py-3 rounded-[10px] danaMed text-md transition-colors";

  let buttonColorClasses = "";

  if (outlined) {
    // استایل‌های Outlined
    if (disabled) {
      buttonColorClasses = "bg-transparent text-gray-400 border border-gray-300 cursor-not-allowed";
    } else {
      buttonColorClasses = "bg-transparent text-gray-600 border border-gray-300 hover:bg-gray-50";
    }
  } else {
    // استایل‌های معمولی (Solid)
    if (disabled) {
      buttonColorClasses = "bg-gray-300 text-gray-600 cursor-not-allowed";
    } else {
      buttonColorClasses = "bg-[#0a33ff] text-white hover:bg-blue-600";
    }
  }

  const finalClass = `${baseClass} ${buttonColorClasses}`;

  // اگر لینک بود و فعال بود
  if (href && !disabled) {
    return (
      <Link href={href} className={finalClass}>
        {icon && <span className="flex items-center">{icon}</span>}
        <span className={icon ? "" : "text-center w-full"}>{text}</span>
      </Link>
    );
  }

  // اگر لینک نبود یا غیرفعال بود → دکمه
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={finalClass}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      <span className={icon ? "" : "text-center w-full"}>{text}</span>
    </button>
  );
}
