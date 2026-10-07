import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Sparkles, Maximize2 } from 'lucide-react';

export const GalleryPage = ({ onOpenLightbox }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Brand Designs',
    'Website Designs',
    'Logo Designs',
    'UI/UX',
    'Team',
    'Events',
    'Behind the Scenes'
  ];

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const res = await api.getGallery(activeCategory);
        if (res.success) {
          setItems(res.data);
        }
      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, [activeCategory]);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Visual Archive
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
          BRANDDIGIX Gallery
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
          A visual look behind our creative design systems, client deployments, brand concepts, and studio moments. Click any image to view in high resolution.
        </p>
      </div>

      {/* Category Tabs (Horizontal scroll on mobile, wrapped on desktop) */}
      <div className="flex gap-2 pb-2 mb-8 sm:mb-12 overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center px-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition whitespace-nowrap shrink-0 min-h-[38px] flex items-center ${
              activeCategory === cat
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,210,255,0.4)]'
                : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">Loading gallery images...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800">
          No gallery images found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(item, items, idx)}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group glass-card"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />

              {/* Dark Overlay with Details (Always readable on mobile, hover reveal on desktop) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition duration-300 p-4 sm:p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] sm:text-xs uppercase font-bold text-cyan-300 px-2.5 sm:px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40">
                    {item.category}
                  </span>
                  <div className="p-2 rounded-full bg-black/60 text-white">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-heading">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
