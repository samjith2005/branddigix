import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { Menu, X, ArrowRight, Shield, PhoneCall } from 'lucide-react';

export const Navbar = ({ activePage, setActivePage, onOpenQuote }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Our Work' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About Us' },
    { id: 'process', label: 'Our Process' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050814]/95 backdrop-blur-xl border-b border-cyan-500/20 py-2.5 sm:py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-gradient-to-b from-[#050814]/90 to-transparent py-3 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="cursor-pointer transition hover:opacity-90 shrink-0"
          >
            <BrandLogo size="default" />
          </div>

          {/* Desktop Navigation (visible on lg and above) */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 xl:px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 relative whitespace-nowrap ${
                    isActive
                      ? 'text-cyan-300 font-semibold bg-cyan-950/50 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,210,255,0.25)]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-4 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#00D2FF]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('admin')}
              className="text-xs text-slate-400 hover:text-cyan-300 px-3 py-2 rounded-lg border border-slate-700/50 hover:border-cyan-500/40 transition flex items-center gap-1.5 bg-slate-900/50 min-h-[38px]"
              title="Admin Panel Login"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Admin</span>
            </button>

            <button
              onClick={onOpenQuote || (() => handleNavClick('contact'))}
              className="cyber-button-primary px-5 py-2 rounded-full text-xs xl:text-sm font-semibold flex items-center gap-2 tracking-wide min-h-[38px]"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile & Tablet Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('admin')}
              className="text-xs text-slate-400 p-2.5 rounded-xl border border-slate-700/70 bg-slate-900/70 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Admin Portal"
            >
              <Shield className="w-4 h-4 text-cyan-400" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-200 hover:text-white bg-slate-900/70 border border-slate-700/70 hover:border-cyan-500/40 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center transition"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[60px] sm:top-[72px] z-40 bg-black/80 backdrop-blur-sm lg:hidden animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden relative z-50 bg-[#070C22]/98 backdrop-blur-2xl border-b border-cyan-500/25 px-5 sm:px-6 py-5 shadow-2xl max-h-[calc(100vh-76px)] overflow-y-auto animate-slideDown">
          <div className="flex flex-col space-y-1.5">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition min-h-[44px] flex items-center justify-between ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-950/70 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,210,255,0.15)]'
                      : 'text-slate-200 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#00D2FF]" />}
                </button>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-800/80 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenQuote) onOpenQuote();
                  else handleNavClick('contact');
                }}
                className="cyber-button-primary w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 min-h-[48px]"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleNavClick('admin')}
                className="w-full py-3 rounded-xl border border-slate-700/80 bg-slate-900/80 text-slate-300 hover:text-white flex items-center justify-center gap-2 text-xs font-semibold min-h-[44px]"
              >
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>Admin Login Portal</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
