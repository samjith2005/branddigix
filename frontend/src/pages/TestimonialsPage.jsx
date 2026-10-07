import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Sparkles, Star, Quote, ArrowRight } from 'lucide-react';

export const TestimonialsPage = ({ onOpenQuote }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await api.getTestimonials();
        if (res.success) {
          setTestimonials(res.data);
        }
      } catch (err) {
        console.error('Error loading testimonials:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Client Stories & Reviews
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
          What Our Clients Say
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
          We take immense pride in elevating the businesses of our partners. Hear directly from founders and executives who have scaled with BRANDDIGIX.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400">Loading client testimonials...</div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-16 text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800">
          No testimonials published yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="glass-card p-8 rounded-2xl flex flex-col justify-between relative group"
            >
              <Quote className="w-10 h-10 text-cyan-500/20 absolute top-6 right-6 group-hover:text-cyan-500/40 transition" />

              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-5">
                  {[...Array(test.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-200 text-sm leading-relaxed italic relative z-10">
                  "{test.testimonial}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 mt-8 pt-5 border-t border-slate-800/80">
                <img
                  src={test.profile_image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                  alt={test.client_name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400/40 shadow-md"
                />
                <div>
                  <h4 className="text-base font-bold text-white font-heading">{test.client_name}</h4>
                  <p className="text-xs text-cyan-400 font-medium">{test.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom CTA */}
      <div className="text-center pt-8">
        <h3 className="text-2xl font-bold font-heading text-white mb-3">
          Ready to Write Your Own Success Story?
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto mb-6">
          Join leading brands who chose BRANDDIGIX for digital clarity, speed, and elevated branding.
        </p>
        <button
          onClick={() => onOpenQuote()}
          className="cyber-button-primary px-8 py-3.5 rounded-full font-bold text-sm inline-flex items-center gap-2"
        >
          <span>Start Your Transformation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
