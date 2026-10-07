import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import {
  ArrowRight,
  Sparkles,
  Layers,
  Code2,
  Palette,
  TrendingUp,
  Globe,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  Star,
  Users,
  MessageSquare,
  Eye
} from 'lucide-react';

export const Home = ({
  setActivePage,
  onOpenProject,
  onOpenService,
  onOpenQuote,
  onOpenLightbox,
  settings = {}
}) => {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [srvRes, portRes, galRes, testRes] = await Promise.all([
          api.getServices(),
          api.getPortfolio('All'),
          api.getGallery('All'),
          api.getTestimonials()
        ]);

        if (srvRes.success) setServices(srvRes.data.slice(0, 6));
        if (portRes.success) setProjects(portRes.data.slice(0, 4));
        if (galRes.success) setGallery(galRes.data.slice(0, 6));
        if (testRes.success) setTestimonials(testRes.data);
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const heroTitle = settings.hero_title || 'Build Your Brand. Build Your Digital Future.';
  const heroSubtitle =
    settings.hero_subtitle ||
    'BRANDDIGIX helps businesses build their digital presence through creative design, websites and custom digital solutions.';
  const ctaPrimary = settings.cta_primary || 'Explore Services';
  const ctaSecondary = settings.cta_secondary || 'View Our Work';

  return (
    <div className="relative overflow-hidden">
      {/* Background Decorative Glow Orbs */}
      <div className="glow-orb w-[600px] h-[600px] bg-cyan-600/15 -top-40 -left-40 animate-pulse-slow" />
      <div className="glow-orb w-[600px] h-[600px] bg-blue-600/15 top-1/3 -right-40 animate-pulse-slow" />
      <div className="glow-orb w-[700px] h-[700px] bg-cyan-500/10 bottom-20 left-1/4" />

      {/* =========================================
          HERO SECTION (Matching Poster Aesthetic)
         ========================================= */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            {/* Cyber Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-semibold tracking-wider uppercase shadow-[0_0_20px_rgba(0,210,255,0.25)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>We Build Digital Brands</span>
            </div>

            {/* Sub-headline from poster */}
            <div className="text-xs sm:text-sm font-bold tracking-[0.25em] text-cyan-400 uppercase">
              Your Vision. Our Digital Expertise.
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.15]">
              {heroTitle.includes('Build Your Brand') ? (
                <>
                  Build Your Brand. <br />
                  <span className="cyber-cyan-text">Build Your Digital Future.</span>
                </>
              ) : (
                heroTitle
              )}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => {
                  setActivePage('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="cyber-button-primary w-full sm:w-auto px-7 py-3.5 rounded-full text-sm sm:text-base font-bold flex items-center justify-center gap-2.5 tracking-wide min-h-[46px]"
              >
                <span>{ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActivePage('portfolio');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="cyber-button-secondary w-full sm:w-auto px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold flex items-center justify-center gap-2 min-h-[46px]"
              >
                <span>{ctaSecondary}</span>
                <Eye className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenQuote()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full text-sm font-medium text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 bg-slate-900/60 transition min-h-[46px]"
              >
                Contact Us
              </button>
            </div>

            {/* Bullet Point Highlights directly from the flyer */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <Code2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Modern. Fast. Scalable.</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <Palette className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Designs That Inspire</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <TrendingUp className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Strategic & Result Driven</span>
              </div>
            </div>
          </div>

          {/* Right Visual Cyber Mockup Column */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Background Orb & Circuit Ring */}
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-spin" style={{ animationDuration: '30s' }} />
              <div className="absolute inset-8 rounded-full border border-dashed border-blue-500/30 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '24s' }} />

              {/* Central Glowing Cyber Card */}
              <div className="relative w-full max-w-[310px] sm:max-w-sm rounded-2xl glass-panel p-4 sm:p-6 shadow-[0_0_40px_rgba(0,210,255,0.2)] border border-cyan-500/30 transform hover:scale-[1.02] transition duration-500">
                {/* Header inside mockup */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[10px] text-cyan-400 font-mono tracking-wider">BRANDDIGIX CORE</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400">Core Strategy</div>
                      <div className="text-sm font-bold text-white">Ideas into Digital Reality</div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                      <TrendingUp className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                      <div className="text-[10px] font-semibold text-slate-200">Grow Business</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                      <Palette className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                      <div className="text-[10px] font-semibold text-slate-200">Creative Design</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                      <Globe className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                      <div className="text-[10px] font-semibold text-slate-200">Digital Presence</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-500/30 flex items-center justify-between text-xs">
                    <span className="text-slate-300">Ready to transform?</span>
                    <button
                      onClick={() => onOpenQuote()}
                      className="text-cyan-300 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Build Your Brand</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Orbit Badges (Responsive placement) */}
              <div className="hidden sm:flex absolute -top-4 -right-2 px-3 py-1.5 rounded-xl glass-card text-xs font-semibold text-cyan-300 items-center gap-2 border border-cyan-400/40 shadow-lg animate-float">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>100% Custom Tech</span>
              </div>

              <div className="hidden sm:flex absolute -bottom-4 -left-2 px-3.5 py-1.5 rounded-xl glass-card text-xs font-semibold text-white items-center gap-2 border border-blue-400/40 shadow-lg animate-float" style={{ animationDelay: '2s' }}>
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>High Performance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          WHY BRANDDIGIX? SECTION
         ========================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mt-2">
            Why BRANDDIGIX Stands Out
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            We don't just write code or make logos. We build comprehensive, conversion-focused digital powerhouses for forward-thinking brands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center mb-4 text-cyan-400 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-white mb-2">Modern & Scalable</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Engineered with clean code, lightning-fast rendering speeds, and modern tech architecture built to scale effortlessly.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center mb-4 text-cyan-400 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-white mb-2">Bespoke Design</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              No generic templates. Every color, typography choice, and interface layout is custom-tailored to reflect your brand's unique identity.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center mb-4 text-cyan-400 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-white mb-2">Results & Growth</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Every section, call-to-action, and user journey is meticulously planned to drive real customer enquiries and maximize conversion.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center mb-4 text-cyan-400 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-white mb-2">End-to-End Delivery</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              From conceptual design and development to launch, maintenance, and marketing support, we handle the entire digital journey.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          OUR SERVICES PREVIEW SECTION
         ========================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
              Our Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mt-1">
              Services We Specialize In
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              From foundational brand identities to high-performance custom web applications.
            </p>
          </div>

          <button
            onClick={() => {
              setActivePage('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-4 md:mt-0 text-cyan-400 hover:text-cyan-300 font-semibold text-sm flex items-center gap-1.5 transition self-start"
          >
            <span>View All Services</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-400">Loading services...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src={srv.image || 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80'}
                      alt={srv.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-black/70 border border-slate-700 text-cyan-300 backdrop-blur-md">
                        {srv.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold font-heading text-white group-hover:text-cyan-400 transition">
                      {srv.name}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed mt-2 line-clamp-3">
                      {srv.description}
                    </p>

                    {srv.price && (
                      <div className="mt-4 text-xs font-semibold text-cyan-400">
                        {srv.price}
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-800/60">
                  <button
                    onClick={() => onOpenService(srv)}
                    className="text-xs font-semibold text-slate-300 hover:text-white transition"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onOpenQuote(srv.name)}
                    className="cyber-button-primary px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                  >
                    <span>Get Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* =========================================
          FEATURED PROJECTS / PORTFOLIO PREVIEW
         ========================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
              Our Work & Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mt-1">
              Featured Case Studies
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Real results and concept innovations crafted for industry pioneers.
            </p>
          </div>

          <button
            onClick={() => {
              setActivePage('portfolio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-4 md:mt-0 text-cyan-400 hover:text-cyan-300 font-semibold text-sm flex items-center gap-1.5 transition self-start"
          >
            <span>Explore All Work</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => onOpenProject(proj)}
              className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={proj.cover_image}
                  alt={proj.project_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition" />

                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 backdrop-blur-md">
                    {proj.category}
                  </span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md ${
                    proj.project_type?.includes('Concept')
                      ? 'bg-amber-950/80 border border-amber-500/40 text-amber-300'
                      : 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300'
                  }`}>
                    {proj.project_type || 'Client Project'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold font-heading text-white group-hover:text-cyan-400 transition flex items-center justify-between">
                  <span>{proj.project_name}</span>
                  <ArrowRight className="w-5 h-5 text-cyan-400 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition duration-300" />
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-2 line-clamp-2">
                  {proj.short_description}
                </p>

                {proj.technologies && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {proj.technologies.split(',').slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================
          OUR 6-STEP PROCESS
         ========================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mt-1">
            Our 6-Step Digital Process
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            A proven, seamless methodology ensuring every milestone is clear, timely, and executed to perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              title: 'Discover',
              subtitle: 'Understand Your Business',
              desc: 'We dive deep into your market, target audience, brand goals, and competitors to define clear project objectives.'
            },
            {
              step: '02',
              title: 'Plan',
              subtitle: 'Create Strategy',
              desc: 'We formulate the architecture, user flows, content layout, and visual direction for flawless execution.'
            },
            {
              step: '03',
              title: 'Design',
              subtitle: 'Create Visual/UI Concepts',
              desc: 'We design stunning, pixel-perfect mockups and interactive prototypes in Figma with custom design tokens.'
            },
            {
              step: '04',
              title: 'Develop',
              subtitle: 'Build the Website / Product',
              desc: 'We engineer clean, secure, responsive code with modern frameworks, animations, and database integration.'
            },
            {
              step: '05',
              title: 'Review',
              subtitle: 'Client Feedback & Revisions',
              desc: 'We collaborate with you through rigorous reviews, adjustments, cross-browser audits, and speed optimizations.'
            },
            {
              step: '06',
              title: 'Launch',
              subtitle: 'Final Delivery & Growth',
              desc: 'We deploy to production servers, configure SSL & SEO metadata, hand over master credentials, and support your launch.'
            }
          ].map((item, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl relative group">
              <div className="text-3xl font-black font-heading text-cyan-400/40 group-hover:text-cyan-400 transition duration-300 mb-2">
                {item.step}
              </div>
              <h3 className="text-lg font-bold font-heading text-white">{item.title}</h3>
              <div className="text-xs font-semibold text-cyan-400 mb-2">{item.subtitle}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================
          GALLERY PREVIEW SECTION
         ========================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
              Visual Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mt-1">
              Creative Gallery
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Brand designs, UI/UX studies, logo explorations, and studio moments.
            </p>
          </div>

          <button
            onClick={() => {
              setActivePage('gallery');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-4 md:mt-0 text-cyan-400 hover:text-cyan-300 font-semibold text-sm flex items-center gap-1.5 transition self-start"
          >
            <span>Open Gallery</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(item, gallery, idx)}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group glass-card"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 p-4 flex flex-col justify-end">
                <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold text-white leading-tight mt-1">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================
          CLIENT TESTIMONIALS SECTION
         ========================================= */}
      {testimonials.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
              Client Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mt-1">
              Trusted by Ambitious Brands
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((test) => (
              <div key={test.id} className="glass-card p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(test.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic">
                    "{test.testimonial}"
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-800/80">
                  <img
                    src={test.profile_image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                    alt={test.client_name}
                    className="w-10 h-10 rounded-full object-cover border border-cyan-400/40"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white font-heading">{test.client_name}</h4>
                    <p className="text-[11px] text-cyan-400">{test.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =========================================
          FINAL CONTACT CTA BANNER
         ========================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-6 sm:p-14 text-center border border-cyan-500/30 glass-panel shadow-[0_0_60px_rgba(0,210,255,0.2)]">
          <div className="glow-orb w-80 h-80 bg-cyan-500/20 top-0 left-1/3" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <span className="inline-block text-xs uppercase font-bold tracking-widest text-cyan-400 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40">
              Let's Build Something Great
            </span>
            <h2 className="text-2xl sm:text-5xl font-black font-heading text-white">
              Ready to Transform Your Digital Future?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Whether you need an iconic logo, a blazing-fast business website, or custom digital systems, the BRANDDIGIX team is ready to deliver.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => onOpenQuote()}
                className="cyber-button-primary w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl min-h-[46px]"
              >
                <span>Request a Free Quote</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  setActivePage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="cyber-button-secondary w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base flex items-center justify-center min-h-[46px]"
              >
                <span>Contact Direct</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
