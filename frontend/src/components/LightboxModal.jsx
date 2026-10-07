import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

export const LightboxModal = ({ image, onClose, onPrev, onNext, hasPrev, hasNext }) => {
  if (!image) return null;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext && hasNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-fadeIn"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div
        className="flex items-center justify-between z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-semibold">
            {image.category}
          </span>
          <h3 className="text-white font-medium text-sm sm:text-base hidden sm:block">
            {image.title}
          </h3>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image with Navigation Arrows */}
      <div
        className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {hasPrev && (
          <button
            onClick={onPrev}
            className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-black/60 hover:bg-cyan-950/80 border border-slate-700 hover:border-cyan-400 text-white transition shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <img
          src={image.image}
          alt={image.title}
          className="max-h-[78vh] max-w-full object-contain rounded-lg shadow-2xl transition duration-300"
        />

        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-black/60 hover:bg-cyan-950/80 border border-slate-700 hover:border-cyan-400 text-white transition shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Caption Footer */}
      <div
        className="text-center z-10 max-w-2xl mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-white font-semibold text-base sm:text-lg block sm:hidden">
          {image.title}
        </h3>
        {image.description && (
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            {image.description}
          </p>
        )}
      </div>
    </div>
  );
};
