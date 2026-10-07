import React from 'react';
import { Sparkles, Target, Compass, Heart, Users, Award, ShieldCheck, ArrowRight } from 'lucide-react';

export const AboutPage = ({ onOpenQuote, settings = {} }) => {
  const vision =
    settings.vision ||
    'To empower forward-thinking entrepreneurs and businesses worldwide with next-generation digital identities, custom engineering, and transformational brand architecture.';
  const mission =
    settings.mission ||
    'To blend strategic design, bleeding-edge web technology, and data-driven branding to convert everyday businesses into industry leaders.';

  const team = [
    {
      name: 'R RAMAKRISHNAN',
      role: 'Founder & CEO',
      title: 'Founder & CEO • Strategic Brand Architect',
      image: '/uploads/team-ramakrishnan.jpg',
      bio: 'Visionary leader driving the digital transformation, branding strategy, and executive vision of BRANDDIGIX.'
    },
    {
      name: 'T J SAMJITH',
      role: 'Partner',
      title: 'Partner • Head of Technology & Engineering',
      image: '/uploads/team-samjith.jpg',
      bio: 'Specialist in full-stack architecture, high-performance web development, and secure cloud infrastructures.'
    },
    {
      name: 'R MUHILAN',
      role: 'Partner',
      title: 'Partner • Creative Director & Visual Design Lead',
      image: '/uploads/team-muhilan.jpg',
      bio: 'Master of brand identity systems, typography, color psychology, and memorable corporate aesthetics.'
    },
    {
      name: 'V KAMALESH',
      role: 'Partner',
      title: 'Partner • UI/UX & Product Experience Lead',
      image: '/uploads/team-kamalesh.jpg',
      bio: 'Expert in user behavior research, interaction design, mobile prototyping, and high-conversion wireframes.'
    }
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      {/* Header & Story Section */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Who We Are
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
          About BRANDDIGIX
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
          Born out of a relentless passion for design precision and technology innovation, BRANDDIGIX was founded to solve a major problem: helping modern companies build digital presence that converts attention into lasting business value.
        </p>
      </div>

      {/* Story Narrative Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
            Transforming Ideas Into <span className="cyber-cyan-text">Digital Reality</span>
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            In today's hyper-competitive digital economy, an average website or generic logo simply isn't enough. Businesses need a memorable brand story paired with seamless, high-speed user experiences.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            At BRANDDIGIX, we don't believe in one-size-fits-all templates. Whether you are launching a concept cafe like Karuppatti Cafe, scaling an enterprise software suite, or revamping your local business into a national powerhouse, our team architects custom digital solutions crafted for longevity.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl glass-card">
              <div className="text-2xl font-black text-cyan-400 font-heading">100%</div>
              <div className="text-xs text-slate-300 font-medium mt-1">Custom Engineered Solutions</div>
            </div>
            <div className="p-4 rounded-xl glass-card">
              <div className="text-2xl font-black text-cyan-400 font-heading">24/7</div>
              <div className="text-xs text-slate-300 font-medium mt-1">Dedicated Client Support</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_0_40px_rgba(0,210,255,0.2)]">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="BRANDDIGIX Team Studio"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
              <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                Creative Studio & Lab
              </span>
              <p className="text-white font-bold text-base mt-1">
                Where Creative Strategy Meets High-Performance Code
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-2xl border border-cyan-500/30 relative overflow-hidden">
          <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-4 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold font-heading text-white mb-2">Our Vision</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            {vision}
          </p>
        </div>

        <div className="glass-card p-8 rounded-2xl border border-cyan-500/30 relative overflow-hidden">
          <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-4 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold font-heading text-white mb-2">Our Mission</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            {mission}
          </p>
        </div>
      </div>

      {/* Leadership & Partners */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
            Leadership & Vision
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mt-1">
            Meet the BRANDDIGIX Team
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            The creative minds, engineers, and brand strategists behind our client success stories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <div key={idx} className="glass-card rounded-2xl overflow-hidden group">
              <div className="relative aspect-square overflow-hidden bg-slate-900">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-black/80 border border-cyan-500/40 text-cyan-300 backdrop-blur-md">
                    {member.role}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-lg font-bold font-heading text-white">{member.name}</h3>
                <div className="text-xs text-cyan-400 font-semibold">{member.title}</div>
                <p className="text-slate-400 text-xs leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What We Believe & Approach */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/30 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
            What We Believe & Our Approach
          </h3>
          <p className="text-slate-400 text-sm mt-2">
            Core principles that guide every prototype, line of code, and brand campaign we craft.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-white font-bold text-base mb-2 font-heading text-cyan-300">
              1. Aesthetics with Purpose
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Design should never just look pretty. Every element must guide user attention, establish authority, and compel action.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-white font-bold text-base mb-2 font-heading text-cyan-300">
              2. Speed as a Feature
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Slow websites kill conversion. We architect every web application with performance benchmarks to ensure instant loading.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-white font-bold text-base mb-2 font-heading text-cyan-300">
              3. Partnership Mindset
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              We treat your brand as our own. We offer transparent communication, proactive suggestions, and long-term tech support.
            </p>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => onOpenQuote()}
            className="cyber-button-primary px-8 py-3.5 rounded-full font-bold text-sm inline-flex items-center gap-2"
          >
            <span>Partner With BRANDDIGIX</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
