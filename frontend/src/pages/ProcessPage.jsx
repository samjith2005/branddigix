import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Search, Compass, Palette, Code2, RefreshCw, Rocket } from 'lucide-react';

export const ProcessPage = ({ onOpenQuote }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: '01',
      title: 'Discover',
      subtitle: 'Understand Your Business & Audience',
      icon: Search,
      short: 'In-depth market research, stakeholder interviews, competitor benchmarking, and target persona mapping.',
      details: [
        'Stakeholder discovery workshops & requirement definition',
        'Competitor landscape audit & positioning differentiation',
        'Target customer persona & psychological trigger mapping',
        'Technical stack feasibility & performance goals'
      ],
      deliverables: 'Discovery Document, Creative Brief, Technology Architecture Plan',
      timeline: 'Days 1 - 3'
    },
    {
      id: '02',
      title: 'Plan',
      subtitle: 'Create Digital & Visual Strategy',
      icon: Compass,
      short: 'Sitemap structuring, user journey maps, high-converting copy outline, and sprint scheduling.',
      details: [
        'Complete website architecture & sitemap visualization',
        'User experience (UX) wireframes & conversion funnel planning',
        'Content strategy & persuasive copy outlines',
        'Project milestone timeline & deliverables schedule'
      ],
      deliverables: 'Wireframes, Information Architecture, Project Roadmap',
      timeline: 'Days 4 - 7'
    },
    {
      id: '03',
      title: 'Design',
      subtitle: 'Create Visual Identity & UI Concepts',
      icon: Palette,
      short: 'Pixel-perfect high-fidelity visual concepts, custom typography, color tokens, and clickable prototypes.',
      details: [
        'Moodboards & visual branding direction options',
        'High-fidelity Figma UI design screens (desktop + mobile)',
        'Design systems: typography hierarchy, color palette, buttons, icons',
        'Interactive clickable prototype for hands-on stakeholder testing'
      ],
      deliverables: 'Figma Design System, Full UI Mockups, Interactive Prototype',
      timeline: 'Days 8 - 14'
    },
    {
      id: '04',
      title: 'Develop',
      subtitle: 'Build the Website / Product',
      icon: Code2,
      short: 'Production-ready coding using modern scalable frameworks, backend APIs, and database integration.',
      details: [
        'Component-driven frontend engineering (React, Tailwind CSS)',
        'Robust backend API & database integration (Node.js, Express, SQLite)',
        'Admin management panel implementation for zero-code dynamic updates',
        'Responsive layout optimization for mobile, tablet, and ultra-wide screens'
      ],
      deliverables: 'Staging Environment URL, Codebase, Database Schema',
      timeline: 'Days 15 - 24'
    },
    {
      id: '05',
      title: 'Review',
      subtitle: 'Client Feedback & Revisions',
      icon: RefreshCw,
      short: 'Rigorous client walkthroughs, iterative refinements, quality assurance testing, and security audits.',
      details: [
        'Comprehensive live staging walkthrough with client team',
        'Iterative design & content refinements based on feedback',
        'Cross-browser & cross-device compatibility audit',
        'Page speed, Core Web Vitals, and SSL security testing'
      ],
      deliverables: 'QA Checklist, Client Sign-off, Final Polish Report',
      timeline: 'Days 25 - 28'
    },
    {
      id: '06',
      title: 'Launch',
      subtitle: 'Final Delivery & Live Deployment',
      icon: Rocket,
      short: 'Production DNS configuration, SEO indexing, analytics setup, admin credentials handover, and go-live.',
      details: [
        'Domain mapping, SSL certificate activation & production server deployment',
        'Search engine indexing, XML sitemap submission & SEO tags',
        'Admin portal credentials handover & team walkthrough tutorial',
        '30-day post-launch warranty, uptime monitoring & continuous support'
      ],
      deliverables: 'Live Website, Master Admin Credentials, Documentation',
      timeline: 'Day 30 (Go Live!)'
    }
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          The Blueprint for Success
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
          Our Proven 6-Step Process
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
          We take the mystery and friction out of building digital products. Our battle-tested 6-phase framework ensures total transparency, razor-sharp speed, and superior end results.
        </p>
      </div>

      {/* Step Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {steps.map((st, idx) => {
          const Icon = st.icon;
          const isActive = activeStep === idx;
          return (
            <button
              key={st.id}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-2xl text-left transition-all duration-300 relative flex flex-col justify-between ${
                isActive
                  ? 'bg-cyan-950/80 border-2 border-cyan-400 shadow-[0_0_25px_rgba(0,210,255,0.3)] transform -translate-y-1'
                  : 'glass-card hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-black font-heading ${isActive ? 'text-cyan-300' : 'text-slate-500'}`}>
                  STEP {st.id}
                </span>
                <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              </div>
              <div className="font-bold text-sm text-white font-heading">{st.title}</div>
              <div className="text-[10px] text-slate-400 mt-1">{st.timeline}</div>
            </button>
          );
        })}
      </div>

      {/* Active Step Deep Dive Card */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/30 relative shadow-2xl">
        <div className="glow-orb w-72 h-72 bg-cyan-500/15 -top-10 -right-10" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl sm:text-5xl font-black font-heading text-cyan-400">
                {steps[activeStep].id}
              </span>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                  {steps[activeStep].title}
                </h2>
                <p className="text-cyan-400 text-sm font-semibold">
                  {steps[activeStep].subtitle}
                </p>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              {steps[activeStep].short}
            </p>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Key Activities in this Phase:
              </h4>
              <div className="space-y-2">
                {steps[activeStep].details.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4 bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                Estimated Timeline
              </span>
              <span className="text-base font-bold text-white font-heading">
                {steps[activeStep].timeline}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                Deliverables You Receive
              </span>
              <p className="text-xs text-cyan-300 font-medium leading-relaxed">
                {steps[activeStep].deliverables}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => onOpenQuote()}
                className="w-full cyber-button-primary py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
              >
                <span>Initiate Step 1 For Your Business</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
