import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { ArrowRight, Sparkles, ExternalLink, Filter, Layers } from 'lucide-react';

export const PortfolioPage = ({ onOpenProject, onOpenQuote }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Web Development',
    'UI/UX',
    'Branding',
    'Logo Design',
    'Graphic Design',
    'Digital Solutions'
  ];

  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true);
      try {
        const res = await api.getPortfolio(activeCategory);
        if (res.success) {
          setProjects(res.data);
        }
      } catch (err) {
        console.error('Error fetching portfolio:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [activeCategory]);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Our Work & Case Studies
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
          Crafted with Precision & Impact
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
          Explore our completed client projects, high-fidelity prototypes, and brand identity systems developed to drive real commercial results.
        </p>
      </div>

      {/* Category Pills (Horizontal scroll on mobile, wrapped on desktop) */}
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

      {/* Portfolio Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">Loading portfolio...</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800">
          No projects found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => onOpenProject(proj)}
              className="glass-card rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={proj.cover_image}
                    alt={proj.project_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F26] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 backdrop-blur-md">
                      {proj.category}
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md ${
                      proj.project_type?.includes('Concept')
                        ? 'bg-amber-950/80 border border-amber-500/40 text-amber-300'
                        : 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300'
                    }`}>
                      {proj.project_type || 'Client Project'}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold font-heading text-white group-hover:text-cyan-400 transition flex items-center justify-between">
                    <span>{proj.project_name}</span>
                    <ArrowRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition -translate-x-2 group-hover:translate-x-0" />
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm mt-2 line-clamp-3 leading-relaxed">
                    {proj.short_description}
                  </p>

                  {proj.technologies && (
                    <div className="mt-4 flex flex-wrap gap-1">
                      {proj.technologies.split(',').slice(0, 3).map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                        >
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-800/60 text-xs text-cyan-400 font-semibold">
                <span>View Full Case Study</span>
                <span className="text-slate-400">{proj.completion_date}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA Box */}
      <div className="mt-20 p-8 rounded-2xl glass-panel border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-white font-heading">
            Have a project in mind for your brand?
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Let's discuss your vision and turn it into a high-performance digital product.
          </p>
        </div>
        <button
          onClick={() => onOpenQuote()}
          className="cyber-button-primary px-6 py-3 rounded-xl text-sm font-bold shrink-0"
        >
          Start Your Project
        </button>
      </div>
    </div>
  );
};
