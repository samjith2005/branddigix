import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { ArrowRight, Sparkles, CheckCircle2, Search, Filter } from 'lucide-react';

export const ServicesPage = ({ onOpenService, onOpenQuote }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.getServices();
        if (res.success) {
          setServices(res.data);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const categories = [
    'All',
    'Branding',
    'Web Development',
    'UI/UX',
    'Graphic Design',
    'Digital Solutions',
    'Theme Creations'
  ];

  const filteredServices = services.filter((srv) => {
    const matchesCat = activeCategory === 'All' || srv.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesQuery = srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         srv.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          End-to-End Capabilities
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
          Our Services & Solutions
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
          From full corporate brand identity to enterprise web software, explore our tailored digital services designed to turn your business into an industry front-runner.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
        {/* Category Pills (Horizontal scroll on mobile) */}
        <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar md:flex-wrap md:justify-start px-0.5">
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

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
          />
        </div>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">Loading services...</div>
      ) : filteredServices.length === 0 ? (
        <div className="text-center py-16 text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800">
          No services found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((srv) => (
            <div
              key={srv.id}
              className="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-slate-950">
                  <img
                    src={srv.image || 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80'}
                    alt={srv.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-black/75 border border-slate-700 text-cyan-300 backdrop-blur-md">
                      {srv.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-bold font-heading text-white group-hover:text-cyan-400 transition">
                      {srv.name}
                    </h3>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-3 line-clamp-3">
                    {srv.description}
                  </p>

                  {srv.price && (
                    <div className="mt-4 inline-block text-xs font-bold text-cyan-400 px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/20">
                      {srv.price}
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-slate-800/60">
                <button
                  onClick={() => onOpenService(srv)}
                  className="text-xs font-semibold text-slate-300 hover:text-white transition"
                >
                  View Details
                </button>
                <button
                  onClick={() => onOpenQuote(srv.name)}
                  className="cyber-button-primary px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>Get Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
