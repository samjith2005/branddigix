import React, { useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const ServiceModal = ({ service, onClose, onOpenQuote }) => {
  useEffect(() => {
    if (service) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-[#0A0F26] border border-cyan-500/30 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-[0_0_50px_rgba(0,210,255,0.2)] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cover Image */}
        <div className="relative h-48 sm:h-64 w-full bg-slate-900 overflow-hidden shrink-0">
          <img
            src={service.image || 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80'}
            alt={service.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F26] via-transparent to-black/40" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2.5 rounded-full bg-black/70 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition min-h-[40px] min-w-[40px] flex items-center justify-center"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge */}
          <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-6">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
              {service.category}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
              {service.name}
            </h2>
            {service.price && (
              <span className="text-cyan-400 font-bold text-base sm:text-lg font-heading">
                {service.price}
              </span>
            )}
          </div>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
            {service.description}
          </p>

          {/* Key Deliverables */}
          <div className="space-y-3 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400" />
              What's Included in this Solution
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Custom Strategic Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>100% Responsive & High Speed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Source Files & Full Ownership</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Dedicated Revisions & Support</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition min-h-[44px]"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                if (onOpenQuote) onOpenQuote(service.name);
              }}
              className="cyber-button-primary px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 min-h-[44px]"
            >
              <span>Get Quote for {service.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
