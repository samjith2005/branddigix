import React from 'react';

export const BrandLogo = ({ className = '', iconOnly = false, size = 'default' }) => {
  const iconSizes = {
    small: 'w-8 h-8',
    default: 'w-10 h-10',
    large: 'w-14 h-14'
  };

  const textSizes = {
    small: 'text-lg',
    default: 'text-2xl',
    large: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official BRANDDIGIX Logo Image */}
      <div className={`relative flex items-center justify-center ${iconSizes[size] || iconSizes.default} rounded-xl overflow-hidden drop-shadow-[0_0_14px_rgba(0,210,255,0.6)]`}>
        <img
          src="/branddigix-logo.jpg"
          alt="BRANDDIGIX Logo"
          className="w-full h-full object-cover rounded-xl"
          onError={(e) => {
            // Fallback: hide img and show text if image fails to load
            e.target.style.display = 'none';
          }}
        />
      </div>

      {/* Brand Name Typography */}
      {!iconOnly && (
        <div className="flex flex-col">
          <span className={`font-black tracking-wider leading-none uppercase font-heading bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent ${textSizes[size] || textSizes.default}`}>
            BRAND<span className="text-cyan-400">DIGIX</span>
          </span>
          <span className="text-[9px] tracking-[0.25em] text-cyan-400/90 font-semibold uppercase mt-0.5">
            We Build Digital Brands
          </span>
        </div>
      )}
    </div>
  );
};
