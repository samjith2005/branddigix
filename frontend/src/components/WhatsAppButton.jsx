import React, { useState, useEffect } from 'react';

export const WhatsAppButton = ({ phone = '918015810518', message = 'Hello! I visited your website and would like to know more about your services.' }) => {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(true);
  const [tooltip, setTooltip] = useState(false);

  // Show button after 1.5s or on first scroll
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    const onScroll = () => setVisible(true);
    window.addEventListener('scroll', onScroll, { once: true, passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Stop pulse after 8s
  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 8000);
    return () => clearTimeout(t);
  }, []);

  const handleClick = () => {
    const cleanPhone = phone.replace(/\D/g, '');
    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/${cleanPhone}?text=${encodedMsg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`fixed z-[990] transition-all duration-700 right-3.5 sm:right-6 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] sm:bottom-6 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      {/* Desktop Tooltip (hidden on small touch screens) */}
      <div
        className={`hidden sm:flex absolute right-16 bottom-2 bg-slate-900/95 backdrop-blur-md text-white text-xs px-3.5 py-2.5 rounded-xl shadow-2xl whitespace-nowrap border border-green-500/30 transition-all duration-300 items-center gap-2 pointer-events-none ${
          tooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}
        style={{ boxShadow: '0 0 20px rgba(37,211,102,0.25)' }}
      >
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shrink-0" />
        <div>
          <div className="font-semibold text-slate-100">Chat with us on WhatsApp</div>
          <div className="text-[10px] text-slate-400">Usually replies instantly</div>
        </div>
        {/* Tooltip arrow */}
        <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-3 h-3 bg-slate-900 border-r border-t border-green-500/30 rotate-45" />
      </div>

      {/* Pulse rings */}
      {pulse && (
        <>
          <div
            className="absolute inset-0 rounded-full bg-green-500 pointer-events-none"
            style={{ animation: 'waPulse1 2s ease-out infinite' }}
          />
          <div
            className="absolute inset-0 rounded-full bg-green-400 pointer-events-none"
            style={{ animation: 'waPulse2 2s ease-out infinite 0.5s' }}
          />
        </>
      )}

      {/* Main Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setTooltip(true)}
        onMouseLeave={() => setTooltip(false)}
        className="relative w-13 h-13 sm:w-14 sm:h-14 p-3 rounded-full flex items-center justify-center shadow-2xl cursor-pointer border-2 border-green-400/30 transition-all duration-300 hover:scale-110 active:scale-95 min-h-[48px] min-w-[48px]"
        style={{
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          boxShadow: '0 4px 24px rgba(37,211,102,0.5), 0 0 0 1px rgba(37,211,102,0.2)'
        }}
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        {/* WhatsApp SVG Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-6 h-6 sm:w-7 sm:h-7 fill-white drop-shadow-sm"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </button>

      {/* Keyframe animations */}
      <style>{`
        @keyframes waPulse1 {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes waPulse2 {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(2.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
